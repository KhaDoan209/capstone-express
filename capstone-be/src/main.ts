import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { AuthGuard } from 'src/auth/auth.guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix("/api")
  app.enableCors();
  app.use(express.static('.'))
  app.useGlobalGuards(new AuthGuard(app.get(Reflector)));
  await app.listen(8888);

}
bootstrap();
