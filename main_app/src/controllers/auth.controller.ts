import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getUsers(): Promise<any> {
    return this.authService.getAllUsers();
  }

  @Post('/register')
  async registerUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<any>{
    return this.authService.registerUser({name,email,password});
  }

  @Post('/login')
  async loginUser(
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<any>{
    return this.authService.loginUser({email,password});
  }

  @Post('/verifyEmail')
  async verifyEmail(
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<any>{
    return this.authService.verifyEmail({email,password});
  }

  
}