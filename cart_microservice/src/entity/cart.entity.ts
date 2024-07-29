import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()

export class Cart {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    productname:string;

    @Column()
    productdesc:string;

    @Column()
    productquantity:number;

    
}