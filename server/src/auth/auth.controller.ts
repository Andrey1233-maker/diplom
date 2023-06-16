import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ICreateUserDTO } from 'src/types/user/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google/callback')
  async googleCallbackAuth(@Query() query, @Res() res) {
    try {
      const user = await this.authService.validateGoogleAccount(query);
      const token = await this.authService.login(user);
      res.status(200).redirect(`http://localhost:3000/token/${token.token}`);
    } catch (e) {
      console.log(e);
      return {
        message: e,
        error: true,
      };
    }
  }

  @Get('/default/login')
  async defaultAuth(@Query() query: { email: string; auth_key: string }) {
    try {
      const token = await this.authService.validateDefaultAccount(
        query.email,
        query.auth_key,
      );
      return {
        token,
      };
    } catch (e) {
      return {
        message: e,
        error: true,
      };
    }
  }

  @Post('/default/reg')
  async defaultReg(@Body() body: ICreateUserDTO) {
    try {
      const token = await this.authService.registration(body);
      return {
        message: 'Reg is succesfull',
        error: false,
      };
    } catch (e) {
      return {
        message: e,
        error: true,
      };
    }
  }
}

/*https://accounts.google.com/o/oauth2/auth?client_id=724831104412-3j4keepifvf6n3jdes2ti455v0ick2lp.apps.googleusercontent.com&redirect_uri=http://localhost:5000/auth/google/callback&access_type=offline&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email*/
