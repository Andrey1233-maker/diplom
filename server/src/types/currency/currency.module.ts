import { Module } from '@nestjs/common';
import CurrencyService from './currency.service';
import { CurrencyController } from './currency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from './currency.type';
import { TableModule } from '../table/table.module';
import { PlayerModule } from '../player/player.module';
import { TransferModule } from '../transfer/transfer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Currency]), TableModule, PlayerModule, TransferModule],
  providers: [CurrencyService],
  controllers: [CurrencyController]
})
export class CurrencyModule {}
