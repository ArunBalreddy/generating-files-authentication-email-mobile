import { Injectable } from '@nestjs/common';
import { Stream } from 'stream';
import * as fastcsv from 'fast-csv';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { cli } from 'winston/lib/winston/config';

@Injectable()
export class CsvService {
  constructor(private readonly prisma: PrismaService) {}

  async generateCSV(): Promise<Stream> {
    const csvStream = new Stream.PassThrough();

    // Create a writable stream with the CSV format
    const csvWritableStream = fastcsv.format({ headers: true });

    // Write static information
    csvWritableStream.write([['SyncOffice Report']]);
    csvWritableStream.write([['Report Name', 'Company_location']]);
    csvWritableStream.write([['Date', new Date().toLocaleDateString()]]);
    csvWritableStream.write([]);

    // Write headers
    csvWritableStream.write([
      ['ID', 'ClientName', 'ClinetCode', 'Category', 'AdminEmail'],
      // ... add more headers as needed
    ]);

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

    dataFromDatabase.forEach((row) => {
      csvWritableStream.write([
        [row.client_id.toString(), row.client.name, row.client.client_code, row.category.name, row.admin_email],
        // ... add more data columns as needed
      ]);
    });

    // Pipe the CSV writable stream to the CSV stream
    csvWritableStream.pipe(csvStream);

    // End the CSV writable stream when done
    csvWritableStream.end();

    return csvStream;
  }

  async convertDataToCsv(): Promise<Stream> {
    const csvStream = new Stream.PassThrough();
    const csvWritableStream = fastcsv.format({ headers: true });


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

    //   const jsonData = dataFromDatabase.map(client => {
    //     return {
    //         clientId: client.client_id,
    //         clientName: client.client.name,
    //         category: client.category.name,
    //         status: client.status,
    //         adminEmail: client.admin_email
    //     }
    //   }) 

    const jsonData = dataFromDatabase.map(client => {
        return {
          '*clientId': client.client_id,
          '*clientName': client.client.name,
          '*category': client.category.name,
          '*status': client.status,
          '*adminEmail': client.admin_email,
        };
      });

    // Write headers based on the first JSON object
    if (jsonData.length > 0) {
      const headers = Object.keys(jsonData[0]);
      csvWritableStream.write(headers);
    }

    // Write each JSON object as a CSV row
    jsonData.forEach((dataObj) => {
      csvWritableStream.write(Object.values(dataObj));
    });

    // Pipe the CSV writable stream to the CSV stream
    csvWritableStream.pipe(csvStream);

    // End the CSV writable stream when done
    csvWritableStream.end();

    return csvStream;
  }
}
