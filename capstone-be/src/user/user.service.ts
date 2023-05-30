import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { nguoi_dung } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  private prisma = new PrismaClient();

  async getListUser() {
    let listUser = await this.prisma.nguoi_dung.findMany()
    return listUser;
  }

  async getUserDetail(id: number) {
    let data = await this.prisma.nguoi_dung.findFirst({
      where: {
        id_nguoi_dung: id,
      }
    });
    if (data) {
      return data;
    } else {
      return "User Not Found"
    }

  }

  async updateUserInformation(id: number, updateUserDto: nguoi_dung, imgUrl: any) {
    const { email, mat_khau, ho_ten, tuoi } = updateUserDto;

    let userExisted = await this.prisma.nguoi_dung.findFirst({
      where: {
        id_nguoi_dung: id,
      }
    })
    let hashPassword = await bcrypt.hash(mat_khau, 10)
    let newUser = {
      email: email,
      mat_khau: hashPassword,
      ho_ten: ho_ten,
      tuoi: Number(tuoi),
      avatar: imgUrl
    }
    if (userExisted !== null) {
      let updateUser = await this.prisma.nguoi_dung.update({
        where: {
          id_nguoi_dung: id,
        },
        data: newUser
      })
      return updateUser
    } else {
      return "User not found"
    }
  }

  async deleteUser(id: number) {
    let isUserExisted = await this.prisma.nguoi_dung.findFirst({
      where: {
        id_nguoi_dung: id,
      }
    })
    if (isUserExisted) {
      await this.prisma.nguoi_dung.delete({
        where: {
          id_nguoi_dung: id,
        }
      })
      let listUser = await this.prisma.nguoi_dung.findMany();
      return listUser
    } else {
      return "User not found"
    }
  }
}
