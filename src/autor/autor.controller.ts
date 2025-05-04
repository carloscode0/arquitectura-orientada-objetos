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
import { AutorService } from './autor.service';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { PaginacionDto } from './dto/Paginacion-dto';
import { AutorEntity } from './entities/autor.entity';

@Controller('autor')
export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar autores' })
  @ApiCreatedResponse({ type: AutorEntity })
  create(@Body() CreateAutorDto: CreateAutorDto): Promise<AutorEntity> {
    return this.autorService.create(CreateAutorDto);
  }

  // Listar autores
  @Get()
  @ApiOperation({ summary: 'Listar autores' })
  @ApiOkResponse({ type: AutorEntity, isArray: true })
  async findAll(@Query() paginacion: PaginacionDto) {
    return this.autorService.findAll(paginacion);
  }

  // Listar un autor por id
  @Get(':id')
  @ApiOperation({ summary: 'Listar autor por id' })
  @ApiOkResponse({ type: AutorEntity, isArray: true })
  findOne(@Param('id') id: string) {
    return this.autorService.findOne(+id);
  }

  // Actualizar autor
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar autor' })
  @ApiOkResponse({ type: UpdateAutorDto })
  update(
    @Param('id') id: string,
    @Body() UpdateAutorDto: UpdateAutorDto,
  ): Promise<AutorEntity> {
    return this.autorService.update(+id, UpdateAutorDto);
  }
  // Eliminar autor
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar autor' })
  remove(@Param('id') id: string) {
    return this.autorService.remove(+id);
  }
}
