import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PrestamoEntity } from './entities/prestamo.entity';
import { PaginacionDto } from './dto/Paginacion-dto';

@Injectable()
export class PrestamoService {
  constructor(
    @InjectRepository(PrestamoEntity)
    private repositoryPrestamo: Repository<PrestamoEntity>,
  ) {}

  // registrar préstamo
  async register(
    createPrestamoLibroDto: CreatePrestamoDto,
  ): Promise<PrestamoEntity> {
    const id = createPrestamoLibroDto.libro_id;
    // verifica la existencia del libro
    const existe = await this.repositoryPrestamo.findOne({ where: { id } });
    if (!existe)
      throw new ConflictException(`El libro con el id: ${id} no existe.`);

    // Registra nuevo libro
    const newPrestamo = await this.repositoryPrestamo.save({
      fecha: createPrestamoLibroDto.fecha,
      lector: createPrestamoLibroDto.lector,
      libro_id: createPrestamoLibroDto.libro_id,
    });
    console.log('dtataAAA', newPrestamo);

    return newPrestamo;
  }

  // Listar préstamo
  async findAll({ busqueda, pagina, limite }: PaginacionDto) {
    const [libros, totalreg] = await this.repositoryPrestamo.findAndCount({
      skip: (pagina - 1) * limite, //saltar paginas
      take: limite, //limite de pagina
      where: busqueda ? [{ lector: Like(`%${busqueda}%`) }] : undefined,
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

  //listar un registro por id
  async findOne(id: number) {
    const prestamo = await this.repositoryPrestamo.findOne({
      where: { id },
    });

    if (!prestamo)
      throw new ConflictException(`El préstamo con ${id} no existe.`);
    return prestamo;
  }

// Actualizar préstamo
  async update(
    id: number,
    updateColegioDto: UpdatePrestamoDto,
  ): Promise<PrestamoEntity> {
    const existe = await this.repositoryPrestamo.findOne({ where: { id } });
    if (!existe)
      throw new ConflictException(`El préstamo con ${id} no existe.`);

    const updatePrestamo = Object.assign(existe, updateColegioDto);
    return await this.repositoryPrestamo.save(updatePrestamo);
  }

  //eliminar registro
  async remove(id: number): Promise<{ message: string }> {
    const existe = await this.repositoryPrestamo.findOne({ where: { id } });
    if (!existe) throw new ConflictException(`El Colegio ${id} no existe.`);

    await this.repositoryPrestamo.delete(id);
    return { message: `Préstamo con ID ${id} eliminado correctamente.` };
  }
}
