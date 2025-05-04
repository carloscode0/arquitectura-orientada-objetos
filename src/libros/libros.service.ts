import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import {  LibroEntity } from './entities/libro.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { PaginacionDto } from './dto/Paginacion-dto';

@Injectable()
export class LibrosService {
  constructor(
    @InjectRepository(LibroEntity)
    private repositoryLibro: Repository<LibroEntity>,
    // private repositoryAutor: Repository<AutorEntity>,
  ) {}

  // Registrar libro
  async create(CreateLibroDto: CreateLibroDto): Promise<LibroEntity> {
    // verifica la existencia de un registro con el mismo nombre
    if (await this.repositoryLibro.findOneBy({ nombre: CreateLibroDto.nombre }))
      throw new ConflictException(
        `El nombre '${CreateLibroDto.nombre}' ya existe.`,
      );

    // verifica la existencia de un registro con el mismo codigo
    if (await this.repositoryLibro.findOneBy({ codigo: CreateLibroDto.codigo }))
      throw new ConflictException(
        `El codigo '${CreateLibroDto.codigo}' ya existe.`,
      );

    // Registra nuevo libro
    const newLibro = await this.repositoryLibro.save({
      nombre: CreateLibroDto.nombre,
      codigo: CreateLibroDto.codigo,
      autor: CreateLibroDto.autor,
    });

    return newLibro;
  }

  // Listar libros
  async findAll({ busqueda, pagina, limite }: PaginacionDto) {
    const [libros, totalreg] = await this.repositoryLibro.findAndCount({
      relations: ["relAutor"], //declarar relacion
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
    for (const item of libros) {
      item.numero = numero++;
    }
    return { totalreg, totalpag, libros };
  }

  //listar un libro por id
  async findOne(id: number) {
    const libro = await this.repositoryLibro.findOne({
      where: { id },
    });

    if (!libro) throw new ConflictException(`El libro con ${id} no existe.`);
    return libro;
  }

  // actualizar libro
  async update(
    id: number,
    UpdateCarreraDto: UpdateLibroDto,
  ): Promise<LibroEntity> {
    // verifica la existencia del libro
    const existe = await this.repositoryLibro.findOne({ where: { id } });
    if (!existe) throw new ConflictException(`El libro ${id} no existe.`);

    // verifica la existencia de un registro con el mismo nombre
    if (UpdateCarreraDto.nombre == existe.nombre)
      throw new ConflictException(`El nombre '${existe.nombre}' ya existe.`);

    // verifica la existencia de un registro con el mismo codigo
    if (UpdateCarreraDto.codigo == existe.codigo)
      throw new ConflictException(`El codigo '${existe.codigo}' ya existe.`);

    const updateCarrera = Object.assign(existe, UpdateCarreraDto);
    return await this.repositoryLibro.save(updateCarrera);
  }

  //eliminar libro
  async remove(id: number): Promise<{ message: string }> {
    const existe = await this.repositoryLibro.findOne({ where: { id } });
    if (!existe)
      throw new ConflictException(`El libro con ID: ${id} no existe.`);

    await this.repositoryLibro.delete(id);
    return { message: `El libro con ID: ${id}, fue eliminado correctamente.` };
  }
}
