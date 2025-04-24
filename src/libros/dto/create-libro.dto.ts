import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLibroDto {
  @ApiProperty({
    description: 'Nombre del libro',
    example: 'Cien Años de Soledad',
    type: String,
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @ApiProperty({
    description: 'Código identificador del libro',
    example: 'LBR-001',
    type: String,
  })
  @IsString({ message: 'El código debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El código no puede estar vacío' })
  codigo: string;

  @ApiProperty({
    description: 'Autor del libro',
    example: 'Gabriel García Márquez',
    type: String,
  })
  @IsString({ message: 'El autor debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El autor no puede estar vacío' })
  autor: string;
}

export class CreatePrestamoLibroDto {
  @ApiProperty({
    description: 'Fecha del préstamo',
    example: '2025-04-23',
    type: String,
  })
  @IsString({ message: 'La fecha debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La fecha no puede estar vacía' })
  fecha: string;

  @ApiProperty({
    description: 'Nombre del lector',
    example: 'Juan Pérez',
    type: String,
  })
  @IsString({ message: 'El lector debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El lector no puede estar vacío' })
  lector: string;

  @ApiProperty({
    description: 'ID del libro prestado',
    example: 3,
    type: Number,
  })
  @IsNumber({}, { message: 'El ID del libro debe ser un número' })
  @IsNotEmpty({ message: 'El ID del libro no puede estar vacío' })
  libro_id: number;
}
