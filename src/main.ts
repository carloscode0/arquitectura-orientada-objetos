import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("Biblioteca")
    .setDescription("API")
    .setVersion("1.0")
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      in: "header",
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("apidoc", app, document, {
    swaggerOptions: { filter: true, displayRequestDuration: true },
  });

  await app.listen(process.env.PORT || 3000);
  console.log(`App corriendo en ${await app.getUrl()}/apidoc`);
}
bootstrap();
