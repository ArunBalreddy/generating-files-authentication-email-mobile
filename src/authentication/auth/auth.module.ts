import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { SendinblueModule } from 'src/modules/sendinblue/sendinblue.module';

@Module({
  imports: [ SendinblueModule,
    // Other imports...
    JwtModule.register({
      secret: 'at-secret', // Replace with your access token secret key
      signOptions: { expiresIn: '15m' }, // Access token expiration
    }),
    JwtModule.register({
      // name: 'refresh',
      secret: 'rt-secret', // Replace with your refresh token secret key
      signOptions: { expiresIn: '1d' }, // Refresh token expiration
    }),
  ],
  providers: [AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
