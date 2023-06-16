import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {

    constructor(
        private playerService: PlayerService,
    ) {}

    @Post('/:id/role')
    async seetRoleForUser(@Param('id') id: string, @Body() { role }: { role: number }) {
        const response = await this.playerService.setRoleToPlayer(id, role)
        return response
    }

    @Delete('/:id')
    async deletePlayer(@Param('id') id: string)
    {
        const response = await this.playerService.deletePlayer(id)
        return response
    }
}
