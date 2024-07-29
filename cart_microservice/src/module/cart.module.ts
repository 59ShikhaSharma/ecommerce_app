import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from '../controller/cart.controller';
import { Cart } from '../entity/cart.entity';
import { CartService } from '../service/cart.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([Cart]),
       
    ],
    controllers:[CartController],
    providers:[CartService]

})

export class CartModule {}