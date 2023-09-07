// csv/csv.controller.ts
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { CsvService } from './csv.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Public()
  @Get('generate')
  async generateCSV(@Res() res: Response): Promise<void> {
    const csvStream = await this.csvService.convertDataToCsv();

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=myfile.csv');

    csvStream.pipe(res);
  }
}
