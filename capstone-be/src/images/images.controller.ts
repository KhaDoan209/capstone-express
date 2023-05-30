import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query, HttpCode, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ImagesService } from './images.service';
import { customDataResponse } from 'src/utils/custom-function';
import {
  HttpException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { firebaseService } from './firebase.service';
import { UploadImageDto } from './dto/image.dto';

import { Public } from 'src/auth/public.decorator';


// @UseGuards(AuthGuard)
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Get('/get-list-image')
  @Public()
  async getListImage() {
    try {
      let data = await this.imagesService.getListImage();
      return customDataResponse(data, HttpStatus.OK, 'Get list image successfully');
    } catch (error) {
      throw new HttpException("Backend Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('/find-image-by-name/:name')
  async findImageByName(@Param('name') name: string) {
    try {
      let data = await this.imagesService.findImageByName(name);
      return customDataResponse(data, HttpStatus.OK, 'Get image by name successfully');
    } catch (error) {
      throw new HttpException("Backend Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('/get-image-detail/:id')
  async getImageDetail(@Param('id') id: string) {
    try {
      let data = await this.imagesService.getImageDetail(+id);
      if (typeof data != "string") {
        return customDataResponse(data, HttpStatus.OK, 'Get image detail successfully');
      } else {
        return customDataResponse(undefined, HttpStatus.NOT_FOUND, data);
      }
    } catch (error) {
      throw new HttpException("Backend Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('/get-comment-by-image/:id')
  async getCommentByImageId(@Param('id') id: string) {
    try {
      let data = await this.imagesService.getCommentByImageId(+id)
      return customDataResponse(data, HttpStatus.OK, "Get comment successfully")
    } catch (error) {
      throw new HttpException("Backend Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('/get-list-image-by-user/:userId')
  async getImageListByUser(@Param('userId') userId: string) {
    try {
      let data = await this.imagesService.getImageListByUserId(+userId);
      return customDataResponse(data, HttpStatus.OK, "Get list image by user id successfully")
    } catch (error) {
      throw new HttpException("Backend Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('/get-saved-image-by-user/:userId')
  async getSavedImageByUser(@Param('userId') userId: string) {
    try {
      let data = await this.imagesService.getSavedImageByUser(+userId);
      return customDataResponse(data, HttpStatus.OK, "Get list saved images sucessfully")
    } catch (error) {
      throw new HttpException("Backend Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  @Get('/check-stored-image')
  async checkStoredImage(@Query("userId") userId: string,
    @Query("imgId") imgId: string,) {
    try {
      let data = await this.imagesService.checkStoredImage(+userId, +imgId);
      if (typeof data !== "string") {
        return customDataResponse(data, HttpStatus.OK, "Get image storage status successfully");
      } else {
        return customDataResponse(undefined, HttpStatus.NOT_FOUND, data);
      }
    } catch (error) {
      throw new HttpException("Backend Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  @Post('/save-image')
  async saveImage(@Query("userId") userId: string,
    @Query("imgId") imgId: string) {
    try {
      let data = await this.imagesService.saveImage(+userId, +imgId)
      return customDataResponse(undefined, HttpStatus.OK, data)
    } catch (error) {
      throw new HttpException("Backend Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post('/upload-image/')
  @UseInterceptors(FileInterceptor("file"))
  async uploadImage(@Body() body: UploadImageDto, @UploadedFile() file: Express.Multer.File) {
    try {

      let { imgUrl, imgName } = await firebaseService.uploadImage(file);
      let data = await this.imagesService.uploadImage(body, imgName, imgUrl)
      return customDataResponse(undefined, HttpStatus.OK, data)

    } catch (error) {
      throw new HttpException("Backend Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  @Delete('/delete-image/:id')
  async deleteImageById(@Param('id') id: string) {
    try {
      let imgName = await this.imagesService.deleteImageById(+id);
      await firebaseService.deleteImage(`${imgName}`)
      return customDataResponse(undefined, HttpStatus.OK, "Delete image successfully")
    } catch (error) {
      throw new HttpException("Backend Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
