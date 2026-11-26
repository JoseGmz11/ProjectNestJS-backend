import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Venta } from './entities/venta.entity';
import { DetalleVenta } from './entities/detalle-venta.entity';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { ProductoEntity } from 'src/producto/producto.entity';

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createVentaDto: CreateVentaDto, cajeroEmail: string): Promise<Venta> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let totalVenta = 0;
      const detallesEntidad: DetalleVenta[] = [];

      //Primero validamos el stock, descontar inventario y preparar detalles
      for (const item of createVentaDto.detalles) {
        const producto = await queryRunner.manager.findOne(ProductoEntity, {
          where: { id: item.productoId },
        });

        if (!producto) {
          throw new NotFoundException(`El producto con ID ${item.productoId} no existe`);
        }

        if (producto.stock < item.cantidad) {
          throw new BadRequestException(
            `Stock insuficiente para "${producto.nombre}". Disponible: ${producto.stock}, solicitado: ${item.cantidad}`,
          );
        }

        producto.stock -= item.cantidad;
        await queryRunner.manager.save(producto);

        const precioUnitario = Number(producto.precio);
        const subtotal = precioUnitario * item.cantidad;
        totalVenta += subtotal;

        const detalle = queryRunner.manager.create(DetalleVenta, {
          producto,
          cantidad: item.cantidad,
          precioUnitario,
          subtotal,
        });

        detallesEntidad.push(detalle);
      }

      const folio = `VTA-${Date.now()}`;
      const nuevaVenta = queryRunner.manager.create(Venta, {
        folio,
        total: totalVenta,
        cajero: cajeroEmail,
        detalles: detallesEntidad,
      });

      const ventaGuardada = await queryRunner.manager.save(nuevaVenta);

      await queryRunner.commitTransaction();
      return ventaGuardada;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Venta[]> {
    return await this.ventaRepository.find({
      relations: {
        detalles: {
          producto: true,
        },
      },
      order: {
        fecha: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventaRepository.findOne({
      where: { id },
      relations: {
        detalles: {
          producto: true,
        },
      },
    });
    if (!venta) {
      throw new NotFoundException(`La venta con ID ${id} no existe`);
    }
    return venta;
  }

  update(id: number, updateVentaDto: UpdateVentaDto) {
    return `This action updates a #${id} venta`;
  }

  remove(id: number) {
    return `This action removes a #${id} venta`;
  }
}
