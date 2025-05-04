import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export class Prestamo {}
@Entity('prestamo')
export class PrestamoEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'date' })
  fecha: string;

  @Column()
  lector: string;

  @Column()
  libro_id: number;

  numero: number; //enumeracion de registro en paginacion
}
