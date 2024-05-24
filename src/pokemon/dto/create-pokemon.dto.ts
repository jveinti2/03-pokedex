import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreatePokemonDto {
  @IsInt()
  @IsPositive()
  no: number;

  @IsString()
  name: string;
}
