import { Controller} from '@nestjs/common';
import { CartService } from 'src/service/cart.service';


@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  
}
