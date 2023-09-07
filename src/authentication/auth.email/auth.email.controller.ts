import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthEmailService } from './auth.email.service';

@Controller('auth-email')
export class AuthEmailController {
  constructor(private readonly authEmailService: AuthEmailService) {}

  @Public()
  @Post('send-email-otp')
  async sendEmailOTP(@Body('email') email: string) {
    await this.authEmailService.sendEmailOTP(email);
    return { message: 'OTP sent to email' };
  }

  @Public()
  @Post('send-mobile-otp')
  async sendMobileOTP(@Body('mobile') mobile: string) {
    await this.authEmailService.sendMobileOTP(mobile);
    return { message: 'OTP sent to mobile' };
  }

  @Public()
  @Post('verify-otp')
  async verifyOTP(
    @Body('identifier') identifier: string,
    @Body('otp') otp: string,
  ): Promise<string>{
    const result = this.authEmailService.verifyOTP(identifier, otp);
    return result
  }
  
}
