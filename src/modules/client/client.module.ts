import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerService } from 'src/common/logger/logger.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { SendinblueService } from 'src/modules/sendinblue/sendinblue.service';
import { AuthService } from 'src/authentication/auth/auth.service';


@Module({
  imports: [],
  providers: [LoggerService, ClientService, PrismaService, AuthService, JwtService, SendinblueService ,{
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor
  },
  {provide: APP_GUARD, useClass: AuthGuard}
],
  controllers: [ClientController]
})
export class ClientModule { }
