import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('autor')
export class AutorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => LibroEntity, (libro1) => libro1.relAutor) // Relación de un autor a muchos libros
  relLibro: LibroEntity[]; // Lista de libros del autor
}

@Entity('Libro')
export class LibroEntity {
  numero: number; // Enumeración de registro en paginación (no persistente)

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  codigo: string;

  @Column()
  autor: string;

  @Column()
  autor_id: number;

  @ManyToOne(() => AutorEntity, (autor) => autor.relLibro) // Relación de muchos libros a un autor
  @JoinColumn({ name: 'autor_id' }) // Establece la columna de la clave foránea
  relAutor: AutorEntity;
}
