import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductoEntity } from "src/producto/producto.entity";

@Entity({ name: 'categorias'})

export class Categoria {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 50, unique:true })
    nombre!: string;

    @OneToMany(() => ProductoEntity, producto => producto.categoria)
    productos!: ProductoEntity[];
}
