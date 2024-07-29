// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   NotFoundException,
//   Param,
//   Post,
//   Put,
// } from '@nestjs/common';
// import { UserService } from 'src/service/user.service';

// @Controller('users')
// export class UserController {
//   constructor(private userService: UserService) {}
//   @Get()
//   async all() {
//     return this.userService.all();
//   }

//   @Post()
//   async create(@Body('username') username: string, @Body('password') password: string, @Body('emailid') emailid:string) {
//     return this.userService.create({
//         username,
//         password,
//         emailid,
//     });
//   }

//   @Get(':id')
//   async get(@Param('id') id: number) {
//     return this.userService.get(id);
//   }

//   @Put(':id')
//   async update(
//     @Param('id') id: number,
//     @Body('username') username: string,
//     @Body('password') password: string,
//     @Body('emailid') emailid: string,
//   ) {
//     return this.userService.update(id, {
//         username,
//       password,
//        emailid,
//     });
//   }

//   @Delete(':id')
//   async delete(@Param('id') id: number): Promise<void> {
//     try {
//       await this.userService.delete(id);
//     } catch (error) {
//       if (error instanceof NotFoundException) {
//         throw new NotFoundException(error.message);
//       }
//       throw error;
//     }
//   }
// }


import {
  Controller,
  Get,
  Param,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../entity/user.entity';
import { MessagePattern } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  generateToken(payload: any): string {
    return jwt.sign(payload, "user", {
      expiresIn: "1d",
    });
  }

  @MessagePattern({ cmd: 'allUsers' })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @MessagePattern({ cmd: 'registerUser' })
   async registerUser({
     name,
     email,
     password,
  }: {
     name: string;
     email: string;
     password: string;
   }): Promise<User> {
    try {
      if ([name, email, password].some((field) => field?.trim() === '')) {
        throw new BadRequestException('All fields are required');
      }

      const existingUser = await this.userService.findByEmail(email);


      if (existingUser) {
        throw new BadRequestException('User Already Exists');
      }
      password = await bcrypt.hash(password, 10);
      const result = await this.userService.create({ name, email, password });
      // delete result.password;
      const token = this.generateToken({
        id: result.id,
      });
      result.password = token;
      await this.userService.sendVerificationMail(result);
      return result;

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @MessagePattern({ cmd: 'login' })
  async login({ email, password }: { email: string; password: string }) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException("User doesn't exists !!");
    }

    if(!user.isActive){
      throw new BadRequestException("User is not verified !!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password !!');
    }

    const token = this.generateToken({
      id: user.id,
    });

    return {message: "success", token};
  }


  @Get('verify/:token')
  async get(@Param('token') token: string) {

    let response = await jwt.verify(token, "user");
    const user = await this.userService.create(response.id);


    if (!user) {
      throw new BadRequestException('Invalid User !!');
  }
    user.isActive = true;
    return this.userService.update(response.id, user);
  }

}
