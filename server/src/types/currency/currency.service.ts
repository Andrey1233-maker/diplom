import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Currency, ICurrency } from './currency.type';
import { InjectRepository } from '@nestjs/typeorm';
import ICreateWalletDTO from './walletDTO/createWallet';
import { TableService } from '../table/table.service';
import { PlayerService } from '../player/player.service';
import { ITransfer, Transfer } from '../transfer/transfer.type';
import { TransferService } from '../transfer/transfer.service';

@Injectable()
export default class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
    private tableService: TableService,
    private playerService: PlayerService,
    private transferService: TransferService,
  ) {}

  async createWallet(createModel: ICreateWalletDTO): Promise<ICurrency> {
    const player = await this.playerService.getPlayerById(
      createModel.playerId,
    );

    const newWallet = this.currencyRepository.create({
      balance: createModel.balance,
      player,
      number: createModel.number,
      style: createModel.style,
    });

    await this.currencyRepository.save(newWallet);

    return newWallet;
  }

  async deleteWallet(id: string): Promise<ICurrency> {
    const deletedWallet = await this.currencyRepository.findOneBy({ id });
    if (deletedWallet.balance > 0) {
      throw new Error(
        'deleteWallet: invalid request ~ balance on wallet may be zero',
      );
    }
    await this.currencyRepository.delete({ id })
    return deletedWallet;
  }

  async updateBalanceOnWallet(
    uuid: string,
    newBalance: number,
  ): Promise<ICurrency> {
    await this.currencyRepository.update({ id: uuid }, { balance: newBalance });
    const wallet = await this.currencyRepository.findOneBy({ id: uuid });
    return wallet;
  }

  async changeBalanceOnWallet(
    balanceDiff: number,
    uuid: string,
  ): Promise<ICurrency> {
    const currentWallet = await this.currencyRepository.findOneBy({ id: uuid });
    const newBalance = currentWallet.balance + balanceDiff;
    if (newBalance < 0) {
      throw new Error(
        'changeBalanceOnWallet: invalid operation ~ balance on wallet cant be negative',
      );
    }

    await this.currencyRepository.update({ id: uuid }, { balance: newBalance });
    const updatedWallet = await this.currencyRepository.findOneBy({ id: uuid });
    return updatedWallet;
  }

  async getWalletByUuid(id: string): Promise<{wallet: ICurrency, transfers: ITransfer[]}> {
    const wallet = await this.currencyRepository.createQueryBuilder('wallet')
      .leftJoinAndSelect('wallet.outTransfers', 'ot')
      .leftJoinAndSelect('wallet.inTransfers', 'it')
      .leftJoinAndSelect('ot.currencySender', 'ocf')
      .leftJoinAndSelect('it.currencySender', 'icf')
      .leftJoinAndSelect('ot.currencyRecipier', 'ocs')
      .leftJoinAndSelect('it.currencyRecipier', 'ics')
      .leftJoinAndSelect('ocf.player', 'opf')
      .leftJoinAndSelect('ocs.player', 'ops')
      .leftJoinAndSelect('icf.player', 'ipf')
      .leftJoinAndSelect('ics.player', 'ips')
      .leftJoinAndSelect('opf.user', 'ouf')
      .leftJoinAndSelect('ops.user', 'ous')
      .leftJoinAndSelect('ipf.user', 'iuf')
      .leftJoinAndSelect('ips.user', 'ius')
      .where('wallet.id = :id', { id })
      .getOne()

    const transfers = [...wallet.inTransfers, ...wallet.outTransfers]
    wallet.inTransfers = []
    wallet.outTransfers = []
    const sorteredTransfers = transfers.sort((transferA, transferB) => {
      if(transferA.id > transferB.id) {
        return -1
      }
      return 1
    })
    return { 
      wallet,
      transfers: sorteredTransfers,
    };
  }

  async getWalletsByTableUuid(uuid: string): Promise<ICurrency[]> {
    const wallets = await this.currencyRepository
      .createQueryBuilder('wallet')
      .leftJoin('wallet.player', 'table')
      .where('table.id = :uuid', { uuid })
      .getMany();

    return wallets;
  }

  async getWalletsByPlayerUuid(uuid: string): Promise<ICurrency[]> {
    const wallets = await this.currencyRepository
      .createQueryBuilder('wallet')
      .leftJoin('wallet.player', 'player')
      .where('player.id = :uuid', { uuid })
      .getMany();

    return wallets;
  }

  async createTransfer(senderId: string, recipientId: string, sum: number) {
    try {
      if(recipientId == '-1') {
        const wallet = await this.currencyRepository.findOneBy({id: senderId})
        if(wallet.balance - sum >= 0) {
          await this.currencyRepository.update({id: senderId}, {balance:  Number(Number(wallet.balance) - Number(sum))})
          await this.transferService.createTransfer(wallet, null, sum)
        }
        else {
          throw new Error('sum is big')
        }
        return{
          message: 'OK',
          error: false,
        }
      }
      if(senderId == '-1') {
        const wallet = await this.currencyRepository.findOneBy({id: recipientId})
      
        await this.currencyRepository.update({id: recipientId}, {balance: Number(Number(wallet.balance) + Number(sum))})
        await this.transferService.createTransfer(null, wallet, sum)

        return{
          message: 'OK',
          error: false,
        }
      }
      await this.currencyRepository.manager.transaction(async (transManager) => {
        const sender = await transManager.findOneBy(Currency, { id: senderId})  
        const recipient = await transManager.findOneBy(Currency, { id: recipientId})  
        if(sender.balance < sum) {
          throw new Error(`Недостаточно средств`)
        }
        await transManager.update(Currency, { id: senderId }, { balance: Number(Number(sender.balance) - Number(sum)) })
        await transManager.update(Currency, { id: recipientId }, { balance: Number(Number(recipient.balance) + Number(sum)) })

        const newTransfer = await transManager.create(Transfer, { sum, currencySender: sender, currencyRecipier: recipient})
        await transManager.save(newTransfer)
      })

      return {
        message: 'OK',
        error: false,
      }
    }
    catch(e) {
      throw new Error(`createTransfer: invalid request ~ ${e}`)
    }
  }
}
