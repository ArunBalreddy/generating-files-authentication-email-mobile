import {  Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthMobileService } from './auth.mobile.service';
import { Public } from 'src/common/decorators/public.decorator';
// import { HttpStatusCode } from 'axios';
import { ok } from 'assert';

@Controller('auth-mobile')
export class AuthMobileController {
  constructor(private readonly softSMSService: AuthMobileService) {}

  @Public()
  @Post('send-otp')
  async sendOTP(@Body() body: { phoneNumber: string }): Promise<any> {
    const result = await this.softSMSService.sendOTP(body.phoneNumber);
    return { message: 'OTP sent successfully', result };
  }

  @Public()
  // @HttpStatus(200)
  @Post('verify-otp')
  async verifyOTP(
    @Body('identifier') identifier: string,
    @Body('otp') otp: string,
  ): Promise<string>{
    const result = this.softSMSService.verifyOTP(identifier, otp);
    return result
  }
}
