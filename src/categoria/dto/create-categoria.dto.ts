import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoriaDto {
    @IsNotEmpty({ message: 'El nombre de la categoría es obligatorio'})
    @IsString()
    @MaxLength(50)
    nombre!: string;
}
