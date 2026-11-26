import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Venta } from './venta.entity';
import { ProductoEntity } from 'src/producto/producto.entity';

@Entity({ name: 'detalle_ventas' })
export class DetalleVenta {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int' })
    cantidad!: number;

    @Column({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2 })
    precioUnitario!: number;

    @ManyToOne(() => Venta, (venta) => venta.detalles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'venta_id' })
    venta!: Venta;

    @ManyToOne(() => ProductoEntity)
    @JoinColumn({ name: 'producto_id' })
    producto!: ProductoEntity;
}