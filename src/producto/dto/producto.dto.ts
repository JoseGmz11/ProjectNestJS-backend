import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class ProductoDto {

    @IsNotBlank({ message: 'El nombre no puede estar en blanco' })
    nombre?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(10, {message: 'El precio debe ser de almenos 10'})
    precio?: number;
    
}