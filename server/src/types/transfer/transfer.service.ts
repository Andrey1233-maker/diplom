import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transfer } from './transfer.type';
import { InjectRepository } from '@nestjs/typeorm';
import { ICurrency } from '../currency/currency.type';

@Injectable()
export class TransferService {

    constructor(
        @InjectRepository(Transfer)
        private transferRepositiry: Repository<Transfer>
    )  {}

    async getTrnsfersByTableId(tableId: string) {
        try {
            const transfers = await this.transferRepositiry.createQueryBuilder('transfer')
                .leftJoinAndSelect('transfer.currencyRecipier', 'wallet')
                .leftJoinAndSelect('wallet.player', 'player')
                .leftJoinAndSelect('player.table', 'table')
                .leftJoinAndSelect('transfer.currencySender', 'wallet2')
                .leftJoinAndSelect('wallet2.player', 'player2')
                .leftJoinAndSelect('player2.user', 'user2')
                .leftJoinAndSelect('player.user', 'user')
                .where('table.id = :id', { id: tableId })
                .getMany()
            
                return transfers
        }
        catch(e) {
            throw new Error(`getTrnsfersByTableId: invalid request ~ ${e}`)
        }
    }

    async getTrnsfersByTableIdAndPlayer(tableId: string, playerId: string) {
        try {
            const transfers = await this.transferRepositiry.createQueryBuilder('transfer')
                .leftJoinAndSelect('transfer.currencyRecipier', 'wallet')
                .leftJoinAndSelect('wallet.player', 'player')
                .leftJoinAndSelect('player.table', 'table')
                .leftJoinAndSelect('transfer.currencySender', 'wallet2')
                .leftJoinAndSelect('wallet2.player', 'player2')
                .leftJoinAndSelect('player2.user', 'user2')
                .leftJoinAndSelect('player.user', 'user')
                .where('table.id = :id', { id: tableId })
                .where('player.id = :playerId', { playerId })
                .orWhere('player2.id = :playerId')
                .getMany()
            
                return transfers
        }
        catch(e) {
            throw new Error(`getTrnsfersByTableId: invalid request ~ ${e}`)
        }
    }

    async createTransfer(wallet1: ICurrency, wallet2: ICurrency, sum: number) {
        try {
            const newTransfer = await this.transferRepositiry.create({sum, currencyRecipier: wallet2, currencySender: wallet1})
            await this.transferRepositiry.save(newTransfer)
            return newTransfer
        }
        catch(e) {
            throw new Error(`createTransfer: invalid request ~ ${e}`)
        }
    }
}
