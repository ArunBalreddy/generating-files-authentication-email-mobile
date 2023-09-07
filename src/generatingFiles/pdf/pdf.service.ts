// pdf.service.ts
import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';

@Injectable()
export class PdfService {
  // async generateTablePDF(data: any[]): Promise<Buffer> {
  //   return new Promise((resolve, reject) => {
  //     const doc = new PDFDocument();
  //     const buffers = [];

  //     doc.on('data', (buffer) => buffers.push(buffer));
  //     doc.on('end', () => {
  //       const pdfBuffer = Buffer.concat(buffers);
  //       resolve(pdfBuffer);
  //     });

  // const headers = ['ClientID', 'ClientName', 'Category', 'AdminEmail'];
  // const columnWidth = 150;
  // const rowsPerPage = 10; // Number of rows per page

  // doc.pipe(fs.createWriteStream('output.pdf'));

  // let currentPage = 1;
  // let y = 50;

  // function newPage() {
  //   doc.addPage();
  //   y = 50;
  //   currentPage++;
  // }

  // doc.font('Helvetica-Bold').fontSize(14);
  // headers.forEach((header, index) => {
  //   const x = 10 + index * columnWidth;
  //   doc.text(header, x, y, { width: columnWidth, align: 'center' });
  // });

  // y += 20;

  //     doc.font('Helvetica').fontSize(12);
  //     data.forEach((row, rowIndex) => {
  //       if ((rowIndex + 1) % rowsPerPage === 0 && rowIndex !== 0) {
  //         newPage();
  //         // Reset x and y positions for the new page
  //         y = 50;
  //       }

  //       const xStart = 10;
  //       Object.values(row).forEach((value, columnIndex) => {
  //         const x = xStart + columnIndex * columnWidth;
  //         doc.text(value.toString(), x, y, { width: columnWidth, align: 'center' });
  //       });

  //       y += 20; // Adjust this value for row height
  //     });

  //     doc.end();
  //   });

  // }

  async generateTablePDF(data: any[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'a4' }); // Set the page size to A4
      const buffers = [];
  
      doc.on('data', (buffer) => buffers.push(buffer));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });
  
      const headers = ['ClientID', 'ClientName', 'Category', 'AdminEmail'];
      const columnWidth = 150;
      const rowsPerPage = 14; // Number of rows per page
      const rowHeight = 50; // Adjust this value for desired row height
  
      let currentPage = 1;
      let y = 50;
  
      function newPage() {
        doc.addPage();
        y = 50;
        currentPage++;
        renderHeaders();
      }
  
      function renderHeaders() {
        doc.font('Helvetica-Bold').fontSize(14);
        headers.forEach((header, index) => {
          const x = 1 + index * columnWidth;
          doc.text(header, x, y, { width: columnWidth, align: 'center' });
        });
  
        y += 20;
        doc.font('Helvetica').fontSize(12); // Switch back to regular font
      }
  
      doc.pipe(fs.createWriteStream('output.pdf'));
  
      renderHeaders();
  
      data.forEach((row, rowIndex) => {
        if ((rowIndex + 1) % rowsPerPage === 0 && rowIndex !== 0) {
          newPage();
        }
  
        const xStart = 1;
        Object.values(row).forEach((value, columnIndex) => {
          const x = xStart + columnIndex * columnWidth;
          doc.text(value.toString(), x, y, { width: columnWidth, align: 'center' });
        });
  
        y += rowHeight;
      });
  
      doc.end();
    });
  }
  
  
  

  async generateStaticPDF(): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const buffers: any[] = [];

      doc.on('data', (buffer) => buffers.push(buffer));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      doc.text('This is a static PDF without dynamic content.');
      doc.end();
    });
  }

  async generateMultiPagePDF(): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const buffers: any[] = [];

      doc.on('data', (buffer) => buffers.push(buffer));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      for (let i = 1; i <= 40; i++) {
        if (i !== 1) {
          doc.addPage();
        }
        doc.text(`Page ${i} content.`);
      }

      doc.end();
    });
  }
}
