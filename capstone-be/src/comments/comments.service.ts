import { Injectable } from '@nestjs/common';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CommentsService {
  private prisma = new PrismaClient()
  async createNewComment(createCommentDto: CreateCommentDto) {
    let date = new Date()
    let { id_nguoi_dung, id_hinh, noi_dung } = createCommentDto
    let newComment = {
      id_nguoi_dung,
      id_hinh,
      ngay_binh_luan: date.toISOString(),
      noi_dung,
    }
    let data = await this.prisma.binh_luan.create({ data: newComment })
    return data;
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
