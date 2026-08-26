import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoEntity } from './producto.entity';
import { Repository } from 'typeorm';
import { ProductoRepository } from './producto.repository';
import { ProductoDto } from './dto/producto.dto';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(ProductoEntity) 
        private readonly productoRepository: Repository<ProductoEntity>,
    ) {}

    async getAll(): Promise<ProductoEntity[]> {
        const list = await this.productoRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('No se encontraron productos'));
        }
        return list;
    }

    async findById(id: number): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOneBy( {id} );
        if (!producto) {
            throw new NotFoundException(new MessageDto(`No se encontró el producto con id ${id}`));
        }
        return producto;
    }

    async findByName(nombre: string): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOneBy({ nombre: nombre });
        return producto!;
    }

    async create(dto: ProductoDto): Promise<any> {
        const exists = await this.findByName(dto.nombre!);
        if (exists) throw new BadRequestException(new MessageDto(`El producto con nombre ${dto.nombre} ya existe`));
        const producto = this.productoRepository.create(dto);
        await this.productoRepository.save(producto);
        return new MessageDto(`Producto ${producto.nombre} creado exitosamente`);
        //return dto;
    }

    async update(id: number, dto: ProductoDto): Promise<any> {
        const producto = await this.findById(id);
        if(!producto) throw new BadRequestException(new MessageDto(`El producto con id ${id} no existe`));
        const exists = await this.findByName(dto.nombre!);
        if (exists && exists.id !== id) throw new BadRequestException(new MessageDto(`El producto con nombre ${dto.nombre} ya existe`));
        dto.nombre? producto.nombre = dto.nombre : producto.nombre = producto.nombre;
        dto.precio? producto.precio = dto.precio : producto.precio = producto.precio;
        await this.productoRepository.save(producto);
        return new MessageDto(`Producto ${producto.nombre} actualizado exitosamente`);
    }

    async delete(id: number): Promise<any> {
        const producto = await this.findById(id);
        await this.productoRepository.delete(id);
        return new MessageDto(`Producto ${producto.nombre} eliminado exitosamente`);
    }
}
