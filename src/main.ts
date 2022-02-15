import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  await app.init();
  await app.listen(port);
  console.log(`🚀🚀.... App initialized on ${port} ...🚀`);
}
bootstrap();
