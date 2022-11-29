import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      //ignora valores fora do padrao dto
      whitelist: true,
      //lanca erro se mandar jason que não esteja no dto
      forbidNonWhitelisted: true,
    })
  );

  useContainer(app.select(AppModule), {fallbackOnErrors: true});

  await app.listen(process.env.API_PORT || 3000);
}
bootstrap();
