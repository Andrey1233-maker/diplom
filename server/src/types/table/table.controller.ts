import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TableService } from './table.service';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';

@Controller('table')
export class TableController {
  constructor(private tableService: TableService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async createTable(
    @Body() body: { title: string; description: string; styles: string },
    @Request() req,
  ) {
    try {
      const table = await this.tableService.createTable({
        ...body,
        userId: req.user.id,
      });
      return table;
    } catch (e) {
      return e;
    }
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getTables(@Request() req) {
    try {
      const tables = await this.tableService.getTablesWithUser(req.user.id);
      return tables;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getTable(@Param('id') id: string, @Request() req) {
    try {
      const response = await this.tableService.getTableById(id, req.user.id);
      return response;
    } catch (e) {
      throw e;
    }
  }

  @Post('/:id/user/:email')
  @UseGuards(JwtAuthGuard)
  async inviteUserToTable(@Param('id') id: string, @Param('email') email: string, @Request() req) {
    const response = await this.tableService.addUserToTable(email, id, req.user.id)
    return response
  }

  @Delete('/:id')
  async deleteTable(@Param('id') id: string) {
    try {
      const response = await this.tableService.deleteTable(id);
      return response;
    } catch (e) {
      throw e;
    }
  }
}
