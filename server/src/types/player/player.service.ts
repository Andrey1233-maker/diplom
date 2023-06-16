import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './player.type';
import { Repository } from 'typeorm';
import { IUser } from '../user/user.type';
import { ITable } from '../table/table.type';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  // создание сущности игрока
  async createPlayer(user: IUser, table: ITable, role: number = 0) {
    try {
      const newPlayer = await this.playerRepository.create({
        user,
        table,
        role,
      });

      await this.playerRepository.save(newPlayer);

      return newPlayer;
    } catch (e) {
      throw new Error(`createPlayer: invalid request ~ ${e}`);
    }
  }

  async getPlayerById(id: string) {
    try {
      const player = await this.playerRepository.findOneBy({ id });

      return player;
    } catch (e) {
      throw new Error(`getPlayerById: invalid request ~ ${e}`);
    }
  }

  async setRoleToPlayer(id: string, newRole: number) {
    try {
      await this.playerRepository.update({ id }, { role: newRole });
      const updatedPlayer = await this.playerRepository.findOneBy({ id });
      return updatedPlayer;
    } catch (e) {
      throw new Error(`setRoleToPlayer: invalid request ~ ${e}`);
    }
  }

  async deletePlayer(id: string) {
    try {
      await this.playerRepository.delete({ id });
    } catch (e) {
      throw new Error(`deletePlayer: invalid request ~ ${e}`);
    }
  }

  async getPlayerByUserIdAndTable(tableId: string, userId: string) {
    try {
      const player = await this.playerRepository.createQueryBuilder('player')
        .leftJoinAndSelect('player.user', 'user')
        .leftJoinAndSelect('player.table', 'table')
        .where('user.id = :userId', { userId })
        .andWhere('table.id = :tableId', { tableId })
        .getOne()

      return player
    }
    catch(e) {
      throw new Error(`getPlayerByUserIdAndTable: invalid request ~ ${e}`);
    }
  }
}
