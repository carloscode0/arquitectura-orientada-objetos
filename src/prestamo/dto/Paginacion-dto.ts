import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, Min } from 'class-validator';

export class PaginacionDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    description: 'Cantidad de elementos por página (Cantidad minima 1)',
    example: 10,
    required: false,
    minimum: 1,
  })
  limite: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    description: 'Número de la página actual a consultar (Cantidad minima 1)',
    example: 1,
    required: false,
    minimum: 1,
  })
  pagina: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description:
      'Texto para filtrar resultados mediante coincidencia(el campo pagina debe estar en 1 para recibir resultado)',
    example: '',
    required: false,
  })
  busqueda: string;
}
