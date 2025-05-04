import { Module } from '@nestjs/common';
import { AutorService } from './autor.service';
import { AutorController } from './autor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutorEntity, PrestamoEntity } from './entities/autor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AutorEntity, PrestamoEntity])],
  controllers: [AutorController],
  providers: [AutorService],
})
export class AutorModule {}
