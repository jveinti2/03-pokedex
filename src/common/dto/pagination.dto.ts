import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsPositive()
  offset?: number; // el ? es paras decirle a typescrit dentro del codigo que el dato es opcional, el decorador es para la validacion en medio de la peticion
}
