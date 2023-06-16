import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Table } from './table.type';
import { Repository } from 'typeorm';
import { ICreateTableDTO } from './dto/tableDTO';
import { PlayerService } from '../player/player.service';
import { UserService } from '../user/user.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private tableRepository: Repository<Table>,
    private playerService: PlayerService,
    private userService: UserService,
    private notificationService: NotificationService,
  ) {}

  async createTable(createModel: ICreateTableDTO) {
    try {
      const newTable = await this.tableRepository.create(createModel);
      await this.tableRepository.save(newTable);

      const creator = await this.userService.getUserById(createModel.userId);

      const player = await this.playerService.createPlayer(
        creator,
        newTable,
        2,
      );

      await this.notificationService.createNotification(
        `Вы создали комнату: ${newTable.title}`,
        creator.id,
      );

      return {
        table: newTable,
        player,
      };
    } catch (e) {
      throw new Error(`createTable: invalid request ~ ${e}`);
    }
  }

  async getTableById(id: string, userId: string) {
    try {
      const table = await this.tableRepository
        .createQueryBuilder('table')
        .leftJoinAndSelect('table.players', 'player')
        .leftJoinAndSelect('player.user', 'user')
        .leftJoinAndSelect('player.currencies', 'currency')
        .where('table.id = :id', { id })
        .getOne();

      const player = await this.playerService.getPlayerByUserIdAndTable(id, userId)
      return { table, player };
    } catch (e) {
      throw new Error(`getTableById: invalid request ~ ${e}`);
    }
  }

  async getTablesWithUser(userId: string) {
    try {
      const tables = await this.tableRepository
        .createQueryBuilder('table')
        .leftJoinAndSelect('table.players', 'player')
        .leftJoinAndSelect('player.user', 'user')
        .leftJoinAndSelect('player.currencies', 'currency')
        .where('user.id = :id', { id: userId })
        .getMany();

      return tables;
    } catch (e) {
      throw new Error(`getTableWithUser: invalid request ~ ${e}`);
    }
  }

  async deleteTable(id: string) {
    try {
      await this.tableRepository.delete({ id });
    } catch (e) {
      throw new Error(`deleteTable: invalid request ~ ${e}`);
    }
  }

  async addUserToTable(userEmail: string, tableId: string, userId: string) {
    try {

      const player = await this.playerService.getPlayerByUserIdAndTable(tableId, userId)

      if(player.role === 2) {
        const table = await this.tableRepository.findOneBy({ id: tableId })
        const user = await this.userService.getUserByEmail(userEmail)

        if(user && table) {
          const newPlayer = await this.playerService.createPlayer(user, table)
          await this.notificationService.createNotification(`Вы добавленны в комнату ${table.title}`, user.id)
          return newPlayer
        }
      }

      throw new Error(`addUserToTable: invalid request ~ "user not found"`)
    }
    catch(e) {
      return {
        message: e,
        error: true,
      }
    }
  }

}
