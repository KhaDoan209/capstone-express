import { PartialType } from '@nestjs/mapped-types';

export class CreateCommentDto {
   id_nguoi_dung: number;
   id_hinh: number;
   noi_dung: string
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) { }