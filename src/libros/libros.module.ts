import { Module } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { LibrosController } from './libros.controller';
import { AutorEntity, LibroEntity } from './entities/libro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LibroEntity, AutorEntity])],
  controllers: [LibrosController],
  providers: [LibrosService],
})
export class LibrosModule {}
