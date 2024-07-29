import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()

export class Product {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    productname:string;

    @Column()
    productdesc:string

    
}