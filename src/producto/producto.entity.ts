import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'productos'})
export class ProductoEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length: 25, nullable: false, unique: true})
    nombre!: string;

    @Column({type: 'float', nullable: false})
    precio!: number;
}