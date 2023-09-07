import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Param,
} from '@nestjs/common';
import { tap } from 'rxjs';
import { LoggerService } from 'src/common/logger/logger.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: LoggerService,
    private readonly prismaService: PrismaService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const { method, originalUrl, ip } = request;

    const args = context.getArgs();
    const id = args[0].params.id; // Access the parameter "id" from the first argument.

    const startTime = Date.now();
    return next.handle().pipe(
      tap(async () => {
        const endTime = Date.now();
        const resTime = endTime - startTime;
        const { statusCode, statusMessage } = response;

        const forwardedFor = request.headers['x-forwarded-for'];
        const realIp = request.headers['x-real-ip'];
        // Get the client's IP address.
        const clientIp =
          forwardedFor || realIp || request.connection.remoteAddress;

          let id = 1;
          if (request.user) {
              id = request.user.id
              if (request.user.id === undefined){
                id = request.user.sub
              }
          }
        
        const dateTime = new Date();
      
     
        const activityLog = await this.prismaService.activityLog.create({
          data: {
            client_id: id,
            operation: method,
            time_stamp: dateTime,
            status: statusCode,
          },
        });

        this.logger.log(
          `Incoming request: ${method} ${originalUrl} from ${ip}, Outgoing response: ${statusCode} ${statusMessage}, timeTaken: ${resTime}ms`,
        );
      }),
    );
  }
}
