import { Controller, Get, Param } from '@nestjs/common';
import { TransferService } from './transfer.service';

@Controller('transfer')
export class TransferController {

    constructor(
        private transferService: TransferService,
    )
    { }

    @Get('/table/:id')
    async getTransefersByTable(@Param('id') id: string) {
        const response = await this.transferService.getTrnsfersByTableId(id)
        return response
    }

    @Get('/table/:id/player/:playerId')
    async getTransfersByTableAndPlayer(@Param('id') id: string, @Param('playerId') playerId: string) {
        const response = await this.transferService.getTrnsfersByTableIdAndPlayer(id, playerId)
        return response
    }

}
