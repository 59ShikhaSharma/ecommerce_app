import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { ProductService } from "../service/product.service"
  
  @Controller('products')
  export class ProductController {
    constructor(private productService: ProductService) {}
    @Get()
    async all() {
      return this.productService.findAll();
    }
  
    @Post()
    async create(@Body('productname') productname: string, @Body('productdesc') productdesc: string) {
      return this.productService.create({
          productname,
          productdesc,
         
      });
    }
  
    @Get(':id')
    async get(@Param('id') id: number) {
      return this.productService.get(id);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body('productname') productname: string,
      @Body('productdesc') productdesc: string,
     
    ) {
      return this.productService.update(id, {
        productname,
        productdesc,
         
      });
    }
  
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
      try {
        await this.productService.delete(id);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new NotFoundException(error.message);
        }
        throw error;
      }
    }
  }