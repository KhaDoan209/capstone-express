import { Injectable } from '@nestjs/common';
import { UploadImageDto } from './dto/image.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ImagesService {
  private prisma = new PrismaClient()

  async getListImage() {
    let data = await this.prisma.hinh_anh.findMany()
    return data;
  }

  async findImageByName(name: string) {
    let data = await this.prisma.hinh_anh.findMany({
      where: {
        ten_hinh: {
          contains: name
        }
      }
    })
    return data
  }

  async getImageDetail(id: number) {
    let data = await this.prisma.hinh_anh.findFirst(
      {
        where: {
          id_hinh: id,
        },
        include: {
          nguoi_dung: true,
        }
      }
    )
    if (data) {
      return data
    } else {
      return "Image not found"
    }
  }

  async getCommentByImageId(id: number) {
    let data = await this.prisma.hinh_anh.findFirst(
      {
        where: {
          id_hinh: id
        }, include: {
          binh_luan: true,
        }
      }
    )
    return data
  }

  async getImageListByUserId(id: number) {
    let listImage = await this.prisma.nguoi_dung.findFirst({
      where: {
        id_nguoi_dung: id,
      }, include: {
        hinh_anh: true
      }
    })
    return listImage
  }

  async getSavedImageByUser(id: number) {
    let listSavedImages = await this.prisma.nguoi_dung.findFirst({
      where: {
        id_nguoi_dung: id,
      }, include: {
        hinh_anh: {
          include: {
            luu_anh: true,
          },
        },
      }
    })
    return listSavedImages
  }

  async checkStoredImage(userId: number, imgId: number) {
    let isImageExisted = await this.prisma.hinh_anh.findUnique({
      where: {
        id_hinh: imgId,
      }
    })
    let isUserExisted = await this.prisma.nguoi_dung.findUnique({
      where: {
        id_nguoi_dung: userId,
      }
    })
    if (isImageExisted && isUserExisted) {
      let data = await this.prisma.luu_anh.findFirst(
        {
          where: {
            id_nguoi_dung: userId,
            id_hinh: imgId,
          }
        }
      )
      if (data) {
        let response = {
          data: data,
          isSaved: true
        }
        return response
      } else {
        let response = {
          data: data,
          isSaved: false
        }
        return response
      }
    } else {
      return "User or image not found"
    }
  }

  async saveImage(userId: number, imgId: number) {
    let isImgSaved = await this.prisma.luu_anh.findFirst({
      where: {
        id_nguoi_dung: userId,
        id_hinh: imgId,
      }
    })
    if (isImgSaved) {
      await this.prisma.luu_anh.delete({
        where: {
          id_nguoi_dung_id_hinh: {
            id_nguoi_dung: userId,
            id_hinh: imgId,
          },
        },
      });
      return "Image unsaved successfully"
    } else {
      let date = new Date()
      let newImgSave = {
        id_nguoi_dung: userId,
        id_hinh: imgId,
        ngay_luu: date.toISOString(),
      }
      await this.prisma.luu_anh.create({
        data: newImgSave
      })
      return "Image saved successfully"
    }
  }

  async uploadImage(body: UploadImageDto, imgName: string, imageUrl: string) {
    let newImage = {
      id_nguoi_dung: Number(body.id_nguoi_dung),
      mo_ta: body.mo_ta,
      ten_hinh: imgName,
      duong_dan: imageUrl,
    }
    await this.prisma.hinh_anh.create({ data: newImage })
    return "Upload image successfully"
  }

  async deleteImageById(id: number) {
    let imgToDelete = await this.prisma.hinh_anh.findUnique({
      where: {
        id_hinh: id
      }
    })
    if (imgToDelete) {
      const { luu_anh, binh_luan, hinh_anh } = this.prisma
      await this.prisma.$transaction([
        luu_anh.deleteMany({
          where: {
            id_hinh: id,
          }
        }),
        binh_luan.deleteMany({
          where: {
            id_hinh: id,
          }
        }),
        hinh_anh.delete({
          where: {
            id_hinh: id,
          }
        })
      ]);
      return imgToDelete.ten_hinh
    } else {
      return "Image not found"
    }
  }
}
