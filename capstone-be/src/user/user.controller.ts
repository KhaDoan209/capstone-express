import { Controller, Get, Put, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { HttpCode, Res, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { Response } from 'express';
import { nguoi_dung } from '@prisma/client';
import { customDataResponse } from 'src/utils/custom-function';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { firebaseService } from 'src/images/firebase.service';

@UseGuards(AuthGuard("jwt"))
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService
  ) { }

  @Get("/get-list-user")
  @HttpCode(200)
  async getListUser(@Res() response: Response) {
    try {
      const listUser = await this.userService.getListUser();
      if (listUser) {
        let responseData = customDataResponse(listUser, HttpStatus.OK, "Get user list successfully")
        response.send(responseData)
      } else {
        throw new HttpException('', HttpStatus.BAD_REQUEST)
      }
    } catch (error) {
      throw new HttpException("Backend Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('/get-user-detail/:id')
  async getUserDetail(@Res() response: Response, @Param('id') id: string) {
    try {
      let data = await this.userService.getUserDetail(Number(id));
      if (typeof data !== "string") {
        let responseData = customDataResponse(data, HttpStatus.OK, "User detail get successfully")
        response.send(responseData)
      } else {
        let responseData = customDataResponse(null, HttpStatus.NOT_FOUND, data)
        response.send(responseData)
      }
    } catch (error) {
      throw new HttpException("Backend Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  @Put('/update-user-information/:id')
  @UseInterceptors(FileInterceptor("file"))
  async updateUserInformation(@Res() response: Response, @Body() updateUserDto: nguoi_dung, @Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    try {
      if (file === undefined) {
        let data = await this.userService.updateUserInformation(Number(id), updateUserDto, null)
        if (typeof data !== "string") {
          let responseData = customDataResponse(data, HttpStatus.OK, "User has been updated")
          response.send(responseData)
        } else {
          let responseData = customDataResponse(null, HttpStatus.NOT_FOUND, data)
          response.send(responseData)
        }
      } else {
        let { imgUrl, imgName } = await firebaseService.uploadImage(file);

        let data = await this.userService.updateUserInformation(Number(id), updateUserDto, imgUrl)
        response.send(data)
        // if (typeof data !== "string") {
        //   let responseData = customDataResponse(data, HttpStatus.OK, "User has been updated")
        //   response.send(responseData)
        // } else {
        //   let responseData = customDataResponse(null, HttpStatus.NOT_FOUND, data)
        //   response.send(responseData)
        // }
      }
    } catch (error) {
      throw new HttpException("Backend Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  @Delete('/delete-user/:id')
  async deleteUser(@Res() response: Response, @Param('id') id: string) {
    try {
      let data = await this.userService.deleteUser(+id);
      if (typeof data !== "string") {
        let responseData = customDataResponse(data, HttpStatus.OK, "User deleted successfully")
        response.send(responseData)
      } else {
        let responseData = customDataResponse(null, HttpStatus.NOT_FOUND, data)
        response.send(responseData)
      }
    } catch (error) {
      throw new HttpException("Backend Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
