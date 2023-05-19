import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/create-auth.dto';
import { response, Response } from 'express';
import { nguoi_dung } from '@prisma/client';
import {
  customDataResponse
} from 'src/utils/custom-function';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private jwtService: JwtService) { }

  @Post("/login")
  async login(@Body() userLoginDto: UserLoginDto, @Res() response: Response) {
    try {
      let data = await this.authService.login(userLoginDto)
      let decodedData = this.jwtService.decode(data)
      if (decodedData !== null) {
        let responseData = customDataResponse(data, HttpStatus.OK, "Login successfully")
        response.send(responseData)
      } else {
        let responseData = customDataResponse(null, HttpStatus.UNAUTHORIZED, data)
        response.send(responseData)
      }
    } catch (error) {
      throw new HttpException("Backend Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return
  }

  @Post('/register')
  async register(@Res() response: Response, @Body() createUserDto: nguoi_dung) {
    try {
      let data = await this.authService.register(createUserDto);
      if (typeof data !== "string") {
        let responseData = customDataResponse(null, HttpStatus.CREATED, "User created successfully")
        response.send(responseData)
      } else {
        let responseData = customDataResponse(null, HttpStatus.FORBIDDEN, "User is existed")
        response.send(responseData)
      }
    } catch (error) {
      throw new HttpException("Backend Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}



