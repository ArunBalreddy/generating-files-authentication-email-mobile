import { Module } from '@nestjs/common';
import { AuthMobileService } from './auth.mobile.service';
import { AuthMobileController } from './auth.mobile.controller';

@Module({
  providers: [AuthMobileService],
  controllers: [AuthMobileController]
})
export class AuthMobileModule {}