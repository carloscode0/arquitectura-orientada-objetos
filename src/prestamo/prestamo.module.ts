import { Module } from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { PrestamoController } from './prestamo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamoEntity } from './entities/prestamo.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PrestamoEntity])],
  controllers: [PrestamoController],
  providers: [PrestamoService],
})
export class PrestamoModule {}
