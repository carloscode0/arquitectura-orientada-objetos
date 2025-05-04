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
