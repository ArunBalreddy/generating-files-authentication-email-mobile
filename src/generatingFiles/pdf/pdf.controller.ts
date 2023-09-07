// pdf.controller.ts
import { Controller, Get,  Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';
import { Public } from 'src/common/decorators/public.decorator';
import * as fs from 'fs';
import axios from 'axios';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService,
              private readonly prismaService: PrismaService) {}

  @Public()
  @Get('download')
  async downloadPDF(@Res() res: Response): Promise<void> {
    try {
      const dataFromDatabase = await this.fetchDataFromDatabase(); // Implement this method to fetch data from PostgreSQL
    const pdfBuffer = await this.pdfService.generateTablePDF(dataFromDatabase);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=table.pdf');
    res.send(pdfBuffer);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error generating PDF');
    }
  }

  
  //   @Public()
  //   @Get('multi-page')
  //   async downloadMultiPagePDF(@Res() res: Response): Promise<void> {
  //     try {
  //       const pdfBuffer = await this.pdfService.generateMultiPagePDF();
  //       res.setHeader('Content-Type', 'application/pdf');
  //       res.setHeader(
  //         'Content-Disposition',
  //         'attachment; filename=multi_page.pdf',
  //       );
  //       res.send(pdfBuffer);
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).https://www.africau.edu/images/default/sample.pdfsend('Error generating PDF');
  //     }
  //   }

  @Public()
  @Get()
  async serveOnlinePDF(@Res() res: Response): Promise<void> {
    try {
      const pdfUrl = 'https://www.africau.edu/images/default/sample.pdf'; // Replace with the actual PDF URL
      const response = await axios.get(pdfUrl, { responseType: 'stream' });

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename=online.pdf');
      response.data.pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error serving online PDF');
    }
  }


  @Public()
  @Get('view')
  async generatePDF(@Res() res: Response) {
    const dataFromDatabase = await this.fetchDataFromDatabase(); // Implement this method to fetch data from PostgreSQL
    const pdfBuffer = await this.pdfService.generateTablePDF(dataFromDatabase);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=table.pdf');
    res.send(pdfBuffer);
  }

  private async fetchDataFromDatabase(): Promise<any[]> {
    // fetch data from PostgreSQL
    const data = await this.prismaService.clientDetails.findMany({
      select: {
        category: {
          select: {
            name: true
          }
        },
        client: {
          select: {
            name: true
          }
        },
        client_id: true,
        status: true,
        admin_email: true,
      }
    })

    const updatedData = data.map(client => {
      return {
        clientId: client.client_id,
        clientName: client.client.name,
        status: client.category.name,
        adminEmail: client.admin_email
      }
    })

    return updatedData;
  }

}
