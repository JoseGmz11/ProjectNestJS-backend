import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { DetalleVenta } from './entities/detalle-venta.entity';
import { Venta } from './entities/venta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Venta, DetalleVenta])],
  controllers: [VentaController],
  providers: [VentaService],
})
export class VentaModule {}
