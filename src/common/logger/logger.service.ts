import { Injectable } from '@nestjs/common';
import { createLogger, transports, format } from 'winston';

@Injectable()
export class LoggerService {
  private readonly logger = createLogger({
    transports: [
      new transports.Console({
        format: format.combine(
          format.timestamp(),
          format.colorize(),
          format.simple(),
        ),
      }),
      new transports.File({
        filename: 'logs/app.log',
        level: 'debug',
        format: format.combine(
          format((info) => {
            // Exclude error logs from being written to the app.log file.
            if (info.level !== 'error') {
              return info;
            }
          })(),
          format.timestamp(),
          format.json(),
        ),
      }),
      new transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: format.combine(format.timestamp(), format.json()),
      }),
    ],
  });

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}
