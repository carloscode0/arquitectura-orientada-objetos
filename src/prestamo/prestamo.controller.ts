import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { PrestamoEntity } from './entities/prestamo.entity';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { PaginacionDto } from './dto/Paginacion-dto';

@Controller('prestamo')
export class PrestamoController {
  constructor(private readonly prestamoService: PrestamoService) {}

  // Registrar préstamo
  @Post('prestamo')
  @ApiOperation({ summary: 'Registrar préstamo' })
  @ApiCreatedResponse({ type: PrestamoEntity })
  createPrestamo(
    @Body() CreatePrestamoDto: CreatePrestamoDto,
  ): Promise<PrestamoEntity> {
    return this.prestamoService.register(CreatePrestamoDto);
  }

  // Listar libros
  @Get()
  @ApiOperation({ summary: 'Listar libros' })
  @ApiOkResponse({ type: PrestamoEntity, isArray: true })
  async findAll(@Query() paginacion: PaginacionDto) {
    return this.prestamoService.findAll(paginacion);
  }

  // Listar un registro por id
  @Get(':id')
  @ApiOperation({ summary: 'Listar prestamo por id' })
  @ApiOkResponse({ type: PrestamoEntity, isArray: true })
  findOne(@Param('id') id: string) {
    return this.prestamoService.findOne(+id);
  }

  // Actualizar préstamo
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar registro por id' })
  @ApiOkResponse({ type: UpdatePrestamoDto })
  update(
    @Param('id') id: string,
    @Body() UpdatePrestamoDto: UpdatePrestamoDto,
  ): Promise<PrestamoEntity> {
    return this.prestamoService.update(+id, UpdatePrestamoDto);
  }

  // Eliminar registro
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar registro préstamo por id' })
  remove(@Param('id') id: string) {
    return this.prestamoService.remove(+id);
  }
}
