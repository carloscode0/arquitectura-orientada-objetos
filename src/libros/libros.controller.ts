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
import { LibrosService } from './libros.service';
import { CreateLibroDto, CreatePrestamoLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { PaginacionDto } from './dto/Paginacion-dto';
import { LibroEntity, PrestamoEntity } from './entities/libro.entity';

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar libros' })
  @ApiOkResponse({ type: LibroEntity, isArray: true })
  async findAll(@Query() paginacion: PaginacionDto) {
    return this.librosService.findAll(paginacion);
  }

  @Post()
  @ApiOperation({ summary: 'Registrar libro' })
  @ApiCreatedResponse({ type: LibroEntity })
  create(@Body() createLibroDto: CreateLibroDto): Promise<LibroEntity> {
    return this.librosService.create(createLibroDto); // ✅ Correcto
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar libro' })
  @ApiOkResponse({ type: UpdateLibroDto })
  update(
    @Param('id') id: string,
    @Body() updateInterpreteDto: UpdateLibroDto,
  ): Promise<LibroEntity> {
    return this.librosService.update(+id, updateInterpreteDto);
  }

  @Post('prestamo')
  @ApiOperation({ summary: 'Registrar préstamo' })
  @ApiCreatedResponse({ type: PrestamoEntity })
  createPrestamo(
    @Body() createPrestamoLibroDto: CreatePrestamoLibroDto,
  ): Promise<PrestamoEntity> {
    return this.librosService.register(createPrestamoLibroDto);
  }
}
