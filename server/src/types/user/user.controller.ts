import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { LocalStrategy } from 'src/auth/local.strategy';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userServise: UserService) {}

  @Get('/whoami')
  @UseGuards(JwtAuthGuard)
  async getUser(@Request() req) {
    try {
      const user = await this.userServise.getUserByEmail(req.user.email);
      await this.userServise.setConfirm(req.user.id);
      return { user };
    } catch (e) {
      return {
        message: `getUser: invalid request ~ ${e}`,
        error: true,
      };
    }
  }
}
