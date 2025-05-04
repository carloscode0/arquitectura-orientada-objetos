import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AutorEntity } from './entities/autor.entity';
import { Like, Repository } from 'typeorm';
import { PaginacionDto } from './dto/Paginacion-dto';

@Injectable()
export class AutorService {
  constructor(
    @InjectRepository(AutorEntity)
    private repositoryAutor: Repository<AutorEntity>,
  ) {}

  // Registrar autor
  async create(CreateAutorDto: CreateAutorDto): Promise<AutorEntity> {
    // verifica la existencia de un registro con el mismo nombre
    if (await this.repositoryAutor.findOneBy({ nombre: CreateAutorDto.nombre }))
      throw new ConflictException(
        `El nombre '${CreateAutorDto.nombre}' ya existe.`,
      );

    // Registra nuevo autor
    const newAutor = await this.repositoryAutor.save({
      nombre: CreateAutorDto.nombre,
    });

    return newAutor;
  }

  // Listar autores
  async findAll({ busqueda, pagina, limite }: PaginacionDto) {
    const [autores, totalreg] = await this.repositoryAutor.findAndCount({
      skip: (pagina - 1) * limite, //saltar paginas
      take: limite, //limite de pagina
      where: busqueda ? [{ nombre: Like(`%${busqueda}%`) }] : undefined,
      //mostrar solo coincidencia
      order: { id: 'DESC' }, //ordenar por id desendente
    });
    // estrae el total de registros
    var totalpag = Math.ceil(totalreg / limite);
    // agregar numeracion a tabla
    let numero = (pagina - 1) * limite + 1;
    for (const item of autores) {
      item.numero = numero++;
    }
    return { totalreg, totalpag, autores };
  }

  //listar un autor por id
  async findOne(id: number) {
    const libro = await this.repositoryAutor.findOne({
      where: { id },
    });

    if (!libro)
      throw new ConflictException(`El autor con el: ${id} no existe.`);
    return libro;
  }

  //Actualizar autor
  async update(
    id: number,
    UpdateAutorDto: UpdateAutorDto,
  ): Promise<AutorEntity> {
    // verifica la existencia del libro
    const existe = await this.repositoryAutor.findOne({ where: { id } });
    if (!existe) throw new ConflictException(`El libro ${id} no existe.`);

    // verifica la existencia de un registro con el mismo nombre
    if (UpdateAutorDto.nombre == existe.nombre)
      throw new ConflictException(`El nombre '${existe.nombre}' ya existe.`);

    const update = Object.assign(existe, UpdateAutorDto);
    return await this.repositoryAutor.save(update);
  }

  //Eliminar autor
  async remove(id: number): Promise<{ message: string }> {
    const existe = await this.repositoryAutor.findOne({ where: { id } });
    if (!existe)
      throw new NotFoundException(`El préstamo con ID ${id} no existe.`);

    await this.repositoryAutor.delete(id);
    return { message: `Préstamo con ID ${id} eliminado correctamente.` };
  }
}
