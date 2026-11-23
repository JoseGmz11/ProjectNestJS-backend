import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Categoria } from "src/categoria/entities/categoria.entity";

@Entity({name: 'productos'})
export class ProductoEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length: 25, nullable: false, unique: true})
    nombre!: string;

    @Column({type: 'float', nullable: false})
    precio!: number;

    @Column({type: 'int', default: 0})
    stock!: number;

    @ManyToOne(() => Categoria, categoria => categoria.productos)
    @JoinColumn({name: 'categoria_id'})
    categoria!: Categoria;
}