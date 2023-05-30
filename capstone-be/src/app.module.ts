import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ImagesModule } from './images/images.module';
import { CommentsModule } from './comments/comments.module';



@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot({ isGlobal: true }), ImagesModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
