import { Injectable } from '@nestjs/common';
import { UserLoginDto } from './dto/create-auth.dto';
import { nguoi_dung } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config/dist';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private configService: ConfigService) {
  }
  private prisma = new PrismaClient()

  async login(userLoginDto: UserLoginDto) {
    let { email, mat_khau } = userLoginDto
    const user = await this.prisma.nguoi_dung.findFirst({
      where: {
        email,
      }
    })
    const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
    if (isMatch) {
      let jwtToken = await this.jwtService.signAsync({ data: user }, { expiresIn: "5m", secret: this.configService.get("SECRET_KEY") })
      return jwtToken
    } else {
      return "Mật khẩu không chính xác"
    }
  }

  async register(createUserDto: nguoi_dung) {
    const { email, mat_khau, ho_ten, tuoi, avatar } = createUserDto;
    let userExisted = await this.prisma.nguoi_dung.findFirst({
      where: {
        email: email,
      }
    })
    if (userExisted) {
      return "Email is already existed";
    } else {
      let hashPassword = await bcrypt.hash(mat_khau, 10)
      let newUser = {
        email: email,
        mat_khau: hashPassword,
        ho_ten: ho_ten,
        tuoi: tuoi,
        avatar: avatar
      }
      await this.prisma.nguoi_dung.create({ data: newUser })
    }
  }
}
