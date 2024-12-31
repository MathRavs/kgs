import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Key generator service')
    .setDescription(
      ` 
      This service provides APIs to generate and manage unique keys for various use cases. 
      It supports customizable key formats, expiration times, and validations. 
      Common applications include session identifiers, API keys, and unique resource locators.
    `,
    )
    .setVersion('1.0')
    .addTag('kgs')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
