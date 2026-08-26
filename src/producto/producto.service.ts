import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoEntity } from './producto.entity';
import { Repository } from 'typeorm';
import { ProductoRepository } from './producto.repository';
import { ProductoDto } from './dto/producto.dto';

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(ProductoEntity) 
        private readonly productoRepository: Repository<ProductoEntity>,
    ) {}

    async getAll(): Promise<ProductoEntity[]> {
        const list = await this.productoRepository.find();
        if (!list.length) {
            throw new NotFoundException('No se encontraron productos');
        }
        return list;
    }

    async findById(id: number): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOneBy( {id} );
        if (!producto) {
            throw new NotFoundException(`No se encontró el producto con id ${id}`);
        }
        return producto;
    }

    async findByName(nombre: string): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOneBy({ nombre: nombre });
        if (!producto) {
            throw new NotFoundException(`No se encontró el producto con nombre ${nombre}`);
        }
        return producto;
    }

    async create(dto: ProductoDto): Promise<any> {
        const producto = this.productoRepository.create(dto);
        await this.productoRepository.save(producto);
        return {message: 'Producto creado exitosamente', producto};
    }

    async update(id: number, dto: ProductoDto): Promise<any> {
        const producto = await this.findById(id);
        dto.nombre? producto.nombre = dto.nombre : producto.nombre = producto.nombre;
        dto.precio? producto.precio = dto.precio : producto.precio = producto.precio;
        await this.productoRepository.save(producto);
        return {message: 'Producto actualizado exitosamente', producto};
    }

    async delete(id: number): Promise<any> {
        const producto = await this.findById(id);
        await this.productoRepository.delete(id);
        return {message: 'Producto eliminado exitosamente', producto};
    }
}
