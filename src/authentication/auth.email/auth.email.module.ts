import { Module } from '@nestjs/common';
import { AuthEmailService } from './auth.email.service';
import { AuthEmailController } from './auth.email.controller';
import { SendinblueService } from 'src/modules/sendinblue/sendinblue.service';

@Module({
  providers: [AuthEmailService, SendinblueService],
  controllers: [AuthEmailController]
})
export class AuthEmailModule {}
