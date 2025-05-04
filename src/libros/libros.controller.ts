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
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { PaginacionDto } from './dto/Paginacion-dto';
import { LibroEntity } from './entities/libro.entity';

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  // Registrar libro
  @Post()
  @ApiOperation({ summary: 'Registrar libro' })
  @ApiCreatedResponse({ type: LibroEntity })
  create(@Body() createLibroDto: CreateLibroDto): Promise<LibroEntity> {
    return this.librosService.create(createLibroDto);
  }

  // Listar libros
  @Get()
  @ApiOperation({ summary: 'Listar libros' })
  @ApiOkResponse({ type: LibroEntity, isArray: true })
  async findAll(@Query() paginacion: PaginacionDto) {
    return this.librosService.findAll(paginacion);
  }

  // Listar un libro por id
  @Get(':id')
  @ApiOperation({ summary: 'Listar un libro por id' })
  @ApiOkResponse({ type: LibroEntity, isArray: true })
  findOne(@Param('id') id: string) {
    return this.librosService.findOne(+id);
  }

  // Actualizar libro
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar libro' })
  @ApiOkResponse({ type: UpdateLibroDto })
  update(
    @Param('id') id: string,
    @Body() updateInterpreteDto: UpdateLibroDto,
  ): Promise<LibroEntity> {
    return this.librosService.update(+id, updateInterpreteDto);
  }

  // Eliminar libro
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar registro libro por id' })
  remove(@Param('id') id: string) {
    return this.librosService.remove(+id);
  }
}
