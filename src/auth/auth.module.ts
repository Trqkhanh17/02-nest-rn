import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService,ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:async (configService:ConfigService) =>({
        global:true,
        secret:configService.get<string>('JWT_SECRET'),
        signOptions:{
          expiresIn:configService.get<string>('JWT_ACCESS_TOKEN_EXPIRED')
        }
      })
    })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
