import { IsInt, IsPositive, Min, IsString, MinLength } from 'class-validator';

export class CreatePokemonDto {

    @IsInt()
    @IsPositive()
    @Min(1)
    pokeNumber: number;

    @IsString()
    @MinLength(1)
    name: string;
}
