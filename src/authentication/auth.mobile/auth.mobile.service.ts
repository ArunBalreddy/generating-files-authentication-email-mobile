import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthMobileService {
  private readonly otpMap = new Map<string, string>(); // Map to store user email/mobile and OTP

  async sendOTP(phoneNumber: string): Promise<any> {
    const apiKey = '638edc45f3630';
    const apiSecret = 'API_SECRET';

    const otp = this.generateOTP();
    const data = this.storeOTP(phoneNumber, otp)
    const message = `Hello, Greetings from syncoffice, here is the OTP ${otp} to reset your password sms service`;

    const params = new URLSearchParams({
      apikey: apiKey,
      secret: apiSecret,
      number: phoneNumber,
      message: message,
    });
    const baseUrl = `http://softsms.in/app/smsapi/index.php?key=638edc45f3630&type=text&contacts=${phoneNumber}&senderid=SYNCOF&peid=1201166400223088666&templateid=1207167030497818842&msg=${message}`;
    console.log(baseUrl)

    try {
      console.log('sending otp to mobile', otp);
      const response = await axios.post(baseUrl);
      // console.log(response);
      return response.data;
    } catch (error) {
      throw new Error('Error sending OTP via SoftSMS');
    }
  }

  generateOTP(): string {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    return otp;
  }

  storeOTP(identifier: string, otp: string): void {
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
