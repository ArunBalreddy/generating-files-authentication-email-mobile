import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { tap } from 'rxjs';
import { ClientService } from 'src/modules/client/client.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';

interface JwtPayloadInterface {
  name: string;
  id: number;
  iat: number;
  exp: number;
}

export class UserInterceptor implements NestInterceptor {
  constructor(private readonly prismaService: PrismaService,
              private readonly clientService: ClientService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const jwtToken = request?.headers?.authorization?.split(' ')[1];
    const user = (await jwt.decode(jwtToken)) as JwtPayloadInterface;
    request.user = user;
    const { method } = request;

    return next.handle().pipe(
    //   tap(async () => {
    //     const dateTime = new Date();
    //     const { statusCode } = context.switchToHttp().getResponse();
    //     let id = 1;
    //     if (request.user) {
    //         id = user.id
    //     }
    //     console.log({clientId: id})

    //   const activityLog = await this.prismaService.activityLog.create({
    //     data: {
    //         client_id: id,
    //         operation: method,
    //         time_stamp: dateTime,
    //         status: statusCode,
    //       }
    //   })
    //     console.log(activityLog)
    //   }),
    );
  }
}
