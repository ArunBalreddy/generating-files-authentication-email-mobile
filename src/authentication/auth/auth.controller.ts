import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/common/decorators/user.decorator';
import { Request } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { SigninDto } from 'src/modules/client/dtos/client.dto';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Public()
    @Post('signin')
    signin(@Body() user: SigninDto){ 
        return this.authService.signin(user.id, user.name)
    }


    @Post('logout')
    logout(@User() user){
        const clientId = user.id
        return this.authService.logout(clientId)
    }

    @Public()
    @Post('refresh')
    refresh(@Req() req: Request, @User() user){
        const refreshToken = req.headers?.authorization?.split(' ')[1];
        return this.authService.refresh(user.sub, refreshToken)
    }
}
