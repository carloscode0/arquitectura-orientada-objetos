import { Module } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { LibrosController } from './libros.controller';
import { LibroEntity, PrestamoEntity } from './entities/libro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LibroEntity, PrestamoEntity])],
  controllers: [LibrosController],
  providers: [LibrosService],
})
export class LibrosModule {}
