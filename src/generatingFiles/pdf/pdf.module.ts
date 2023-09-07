import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  providers: [PdfService, {provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor}],
  controllers: [PdfController]
})
export class PdfModule {}
