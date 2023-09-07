import { BadRequestException, Injectable } from '@nestjs/common';
import { SendinblueService } from 'src/modules/sendinblue/sendinblue.service';

@Injectable()
export class AuthEmailService {

    private readonly otpMap = new Map<string, string>(); // Map to store user email/mobile and OTP
    constructor(private readonly sendinblueService: SendinblueService) {}

    async sendEmailOTP(email: string): Promise<void> {
        const otp = this.generateOTP();
        console.log({otpCreated: otp})
        this.storeOTP(email, otp);
    
        const subject = 'OTP Verification';
        const content = `Your OTP is: ${otp}`;
        await this.sendinblueService.sendTransactionalEmail(email, subject, content);
      }
    
      async sendMobileOTP(mobile: string): Promise<void> {
        const otp = this.generateOTP();
        this.storeOTP(mobile, otp);
        const content = `Your OTP is: ${otp}`;
        // Use SendinBlue API to send SMS
        await this.sendinblueService.sendSMS(mobile, content)
      }

    generateOTP(): string {
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
        return otp;
      }
    
      storeOTP(identifier: string, otp: string): void {
        // this.otpMap.set(identifier, otp);
        const otpExpirationTime = new Date();
      otpExpirationTime.setMinutes(otpExpirationTime.getMinutes() + 5); // Set OTP expiration time (e.g., 5 minutes from now)
      
      const otpData = { otp, expirationTime: otpExpirationTime };
      const serializedOtpData = JSON.stringify(otpData); // Serialize OTP data
      
      this.otpMap.set(identifier, serializedOtpData);
      }
    
      verifyOTP(identifier: string, userProvidedOTP: string) {
        const serializedOtpData = this.otpMap.get(identifier);
    
        if (serializedOtpData) {
          const otpData = JSON.parse(serializedOtpData); // Deserialize OTP data
    
          const dateTime = { currentTime: new Date() };
          const currentTime = JSON.stringify(dateTime);
          const currentTimeData = JSON.parse(currentTime);
    
          if(otpData.otp !== userProvidedOTP) throw new BadRequestException('The provided OTP is invalid'); // OTP is invalid 
    
          if (
            otpData.expirationTime > currentTimeData.currentTime
          ) {
            // OTP is valid and hasn't expired
            return 'OTP verified successfully'
          }
          throw new BadRequestException('Your OTP has been Expired');
        }
      }
}
