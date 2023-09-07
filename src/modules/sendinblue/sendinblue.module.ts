import { Module } from '@nestjs/common';
import { SendinblueService } from './sendinblue.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [SendinblueService, ConfigService],
  exports: [SendinblueService]
})
export class SendinblueModule {}
