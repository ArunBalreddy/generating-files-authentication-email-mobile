import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Stream } from 'stream';

@Injectable()
export class ExcelService {
  constructor(private readonly prisma: PrismaService) {}

  async generateExcel(): Promise<Stream> {
    const workbook = new ExcelJS.Workbook();

    // Add first worksheet
    const firstSheet = workbook.addWorksheet('Sheet 1');

    // Add static data (title, report name, company location, date)
    firstSheet.addRow(['SyncOffice Report']);
    firstSheet.addRow(['Report Name', 'Company_location']);
    firstSheet.addRow(['Date', new Date().toLocaleDateString()]);

    // Add empty row for spacing
    firstSheet.addRow([]);
    firstSheet.addRow([]);

    // Add headers
    const headerRow = firstSheet.addRow([
      'ID',
      'ClientName',
      'ClinetCode',
      'Category',
      'AdminEmail',
      // ... add more headers as needed
    ]);

    // Style the header row with bold font
    headerRow.eachCell((cell) => {
      cell.style = {
        ...cell.style,
        font: { bold: true },
      };
    });

    // Use Prisma to fetch data
    const dataFromDatabase = await this.prisma.clientDetails.findMany({
      select: {
        category: {
          select: {
            name: true,
          },
        },
        client: {
          select: {
            name: true,
            client_code: true,
          },
        },
        client_id: true,
        status: true,
        admin_email: true,
      },
    });

    let currentSheet = firstSheet;
    let currentRowCount = 0;

    // Add fetched data rows to sheets
    dataFromDatabase.forEach((row) => {
      if (currentRowCount >= 1000000) {
        // If the current sheet's row count exceeds the limit, create a new sheet
        currentSheet = workbook.addWorksheet(`Sheet ${workbook.worksheets.length + 1}`);
        currentRowCount = 0;

        // Add headers to the new sheet
        const newHeaderRow = currentSheet.addRow([
          'ID',
          'ClientName',
          'ClinetCode',
          'Category',
          'AdminEmail',
          // ... add more headers as needed
        ]);

        // Style the new header row with bold font
        newHeaderRow.eachCell((cell) => {
          cell.style = {
            ...cell.style,
            font: { bold: true },
          };
        });
      }

      // Add data row to the current sheet
      currentSheet.addRow([
        row.client_id,
        row.client.name,
        row.client.client_code,
        row.category.name,
        row.admin_email,
        // ... add more data columns as needed
      ]);

      currentRowCount++;
    });

    const stream = new Stream.PassThrough();
    await workbook.xlsx.write(stream);

    return stream;
  }
}
