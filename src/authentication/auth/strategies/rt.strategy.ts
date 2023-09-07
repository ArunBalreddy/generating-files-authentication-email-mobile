import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt'
import {Request} from 'express'
import { Injectable } from "@nestjs/common";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh'){

    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // ignoreExpiration: false,
            secretOrKey: 'rt-secret',
            passReqToCallback: true,
        })
    }

    validate(req: Request, payload: any){
    const refreshToken = req.headers?.authorization?.split(' ')[1];
    return {...payload, refreshToken }
    }

}