import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './modules/client/client.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { APP_FILTER,  APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerService } from './common/logger/logger.service';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';
import { HttpErrorFilter } from './common/logger/http-error.filter';
import { PrismaService } from './modules/prisma/prisma.service';
import { UserInterceptor } from './common/interceptors/user.interceptor';
import { AuthModule } from './authentication/auth/auth.module';
import { AuthController } from './authentication/auth/auth.controller';
import { AuthService } from './authentication/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { SendinblueModule } from './modules/sendinblue/sendinblue.module';
import { AuthEmailModule } from './authentication/auth.email/auth.email.module';
import { AuthMobileModule } from './authentication/auth.mobile/auth.mobile.module';
import { PdfModule } from './generatingFiles/pdf/pdf.module';
import { ExcelModule } from './generatingFiles/excel/excel.module';
import { CsvModule } from './generatingFiles/csv/csv.module';


@Module({
  imports: [ClientModule, PrismaModule, AuthModule, SendinblueModule, AuthEmailModule, AuthMobileModule, PdfModule, ExcelModule, CsvModule,],
  controllers: [AppController, AuthController],
  providers: [ PrismaService, AppService, AuthService, JwtService, 
  //   {
  //   provide: APP_INTERCEPTOR,
  //   useClass: ClassSerializerInterceptor
  // },
    LoggerService,
  {provide: APP_INTERCEPTOR, useClass: LoggerInterceptor},
  // {provide: APP_FILTER, useClass: HttpErrorFilter},
  {provide: APP_INTERCEPTOR, useClass: UserInterceptor},
],
})
export class AppModule { }
