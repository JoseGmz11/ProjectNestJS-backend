import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, Min, ValidateNested } from 'class-validator';

export class DetalleVentaDto{
    @IsInt()
    @Min(1)
    productoId!: number;

    @IsInt()
    @Min(1, { message: 'La cantidad mínima por producto es 1' })
    cantidad!: number;
}

export class CreateVentaDto {
    @IsArray()
    @ArrayMinSize(1, { message: 'El carrito debe contener al menos un producto' })
    @ValidateNested({ each: true })
    @Type(() => DetalleVentaDto)
    detalles!: DetalleVentaDto[];
}
