import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { AuthService } from 'src/authentication/auth/auth.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';


interface JwtPayloadInterface {
  name: string;
  sub: number;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
    private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const jwtToken = request.headers?.authorization?.split(' ')[1];
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    try {
      const payload = (await jwt.decode(jwtToken)) as unknown  as JwtPayloadInterface
   
   
      const client = await this.prismaService.client.findUnique({
        where: {
          id: payload.sub,
        },
      });
    
      if (client.name !== payload.name) throw new NotFoundException();

      const isTokenExpired  = await this.authService.isTokenExpired(jwtToken) // Checking the jwt expired or not

      console.log({isTokenExpired})
      if (isTokenExpired) throw new UnauthorizedException({message: 'Jwt Token Expired'})

      return true;
    } catch (error) {
      return false;
    }
  }
}
