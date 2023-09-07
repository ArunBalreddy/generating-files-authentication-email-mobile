import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
// import { SendinblueService } from 'src/sendinblue/sendinblue.service';

@Injectable()
export class AuthService {
  private readonly otpMap = new Map<string, string>(); // Map to store user email/mobile and OTP
 
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(id: number, clientName: string) {
    const response = await this.prisma.client.findUnique({
      where: {
        id,
        name: clientName,
      },
    });
    if (!response)
      throw new NotFoundException({
        message: 'There is no client on this credentials',
      });
    const tokens = await this.getTokens(id, clientName);
    await this.updateRefreshToken(id, tokens.refresh_token);

    return tokens;
  }

  async logout(clientId: number) {
    try {
      const client = await this.prisma.client.update({
        where: {
          id: clientId,
          hashedRt: {
            not: null,
          },
        },
        data: {
          hashedRt: null,
        },
      });
      return 'logged out successfully';
    } catch (error) {
      throw error;
    }
  }

  async refresh(clientId: number, rt: string) {
    const client = await this.prisma.client.findUnique({
      where: {
        id: clientId,
      },
    });

    if (!client)
      throw new NotFoundException({
        message: 'There is no client on this credentials',
      });
    const rtMatches = await bcrypt.compare(rt, client.hashedRt);

    if (!rtMatches)
      throw new ForbiddenException({ message: "RefreshToken didn't match" });
    const tokens = await this.getTokens(client.id, client.name);
    await this.updateRefreshToken(client.id, tokens.refresh_token);
    return tokens;
  }

  async updateRefreshToken(clientId: number, rt: string) {
    const hashedToken = await bcrypt.hash(rt, 10);
    const clinet = await this.prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        hashedRt: hashedToken,
      },
    });
  }

  async isTokenExpired(token: string): Promise<boolean> {
    try {
      const decodedToken = (await jwt.verify(token, 'at-secret')) as {
        exp: number;
      };
      const currentTimestamp = Math.floor(Date.now() / 1000);
      //   console.log(decodedToken.exp < currentTimestamp)
      return decodedToken.exp < currentTimestamp;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return true; // Token has expired
      }
      return true;
    }
  }

  async getTokens(clientId: number, name: string) {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: clientId,
        name,
      },
      {
        secret: 'at-secret',
        expiresIn: 60 * 1,
      }, // 1 minute
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: clientId,
        name,
      },
      {
        secret: 'rt-secret',
        expiresIn: 60 * 60 * 24,
      }, // 24 hours
    );

    return { access_token: accessToken, refresh_token: refreshToken };
  }
}
