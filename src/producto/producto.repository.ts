import {Injectable} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductoEntity } from './producto.entity';

@Injectable()
export class ProductoRepository extends Repository<ProductoEntity> { }