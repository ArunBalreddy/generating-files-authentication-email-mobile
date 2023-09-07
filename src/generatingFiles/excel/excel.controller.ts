import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExcelService } from './excel.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Public()
  @Get('generate')
  async generateExcel(@Res() res: Response): Promise<void> {
    const excelStream = await this.excelService.generateExcel();

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'inline; filename=myfile.xlsx');

    excelStream.pipe(res);
  }
}
