import { Module } from '@nestjs/common';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from './transfer.type';

@Module({
  imports: [TypeOrmModule.forFeature([Transfer])],
  controllers: [TransferController],
  providers: [TransferService],
  exports:[TransferService] 
})
export class TransferModule {}
