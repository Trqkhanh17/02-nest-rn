import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '@/auth/passport/local-auth.guard';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';
import { Public } from '@/decorator/customize';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
  ) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  @Public()
  Register(@Body() registerDto: CreateAuthDto) {
    return this.authService.handleRegister(registerDto);
  }

  @Get('mail')
  @Public()
  async testMail() {
    await this.mailerService
      .sendMail({
        to: 'nguyentrungnghiem2023@gmail.com', // list of receivers
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>hello from quockhanhdev</b>', // HTML body content
      })
      .then((res) => {
        console.log('✅ Email sent:', res);
      })
      .catch((err) => {
        console.log(err);
      });
    return 'ok';
  }
}
