import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DetalleVenta } from './detalle-venta.entity';

@Entity({ name: 'ventas'})
export class Venta {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 30, unique: true})
    folio!: string;

    @CreateDateColumn()
    fecha!: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total!: number;

    @Column({ type: 'varchar', length: 100 })
    cajero!: string;

    @OneToMany(() => DetalleVenta, (detalle) => detalle.venta, { cascade: true })
    detalles!: DetalleVenta[];
}
