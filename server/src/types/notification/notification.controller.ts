import {
  Controller,
  Delete,
  Get,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getNotification(@Request() req) {
    try {
      const notifications =
        await this.notificationService.getNotificationByUserId(req.user.id);
      return notifications;
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteNotification(@Param('id') id: string) {
    try {
      const response = await this.notificationService.deleteNotificationById(
        id,
      );
      return response;
    } catch (e) {
      throw e;
    }
  }
}
