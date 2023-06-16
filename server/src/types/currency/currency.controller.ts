import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import CurrencyService from './currency.service';
import ICreateWalletDTO from './walletDTO/createWallet';

@Controller('wallet')
export class CurrencyController {
  constructor(private currenciService: CurrencyService) {}

  @Get('/:id')
  async getWallet(@Param('id') id: string) {
    const response = await this.currenciService.getWalletByUuid(id);
    return response;
  }

  @Get('/by-table/:uuid')
  async getWalletsByTableUuid(@Param('uuid') uuid: string) {
    const wallets = await this.currenciService.getWalletsByTableUuid(uuid);
    return { wallets };
  }

  @Get('/by-player/:uuid')
  async getWalletsByPalyer(@Param('uuid') uuid: string) {
    const wallets = await this.currenciService.getWalletsByPlayerUuid(uuid);
    return wallets;
  }

  @Post('')
  async postCreateWallet(@Body() body: ICreateWalletDTO) {
    const createdWallet = await this.currenciService.createWallet(body);
    return { wallet: createdWallet };
  }

  @Post('/:id/transfer')
  async createTransfer(@Param('id') id: string, @Body() body: {recipientId: string, sum: number}) {
    const response = await this.currenciService.createTransfer(id, body.recipientId, body.sum)
    return response
  }

  @Delete('/:id')
  async deleteWallet(@Param('id') id: string) {
    const response = await this.currenciService.deleteWallet(id)
    return response
  }
}
