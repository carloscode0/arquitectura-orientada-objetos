import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Libro')
export class LibroEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() nombre: string;

  @Column() codigo: string;

  @Column() autor: string;

  numero: number; //enumeracion de registro en paginacion
}

@Entity('prestamo')
export class PrestamoEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'date' })
  fecha: string;

  @Column()
  lector: string;

  @Column()
  libro_id: number;
}
