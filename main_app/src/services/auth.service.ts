import { Body, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3001,
      },
    });
  }

  async getAllUsers(): Promise<any> {
    const pattern = { cmd: 'allUsers' };
    return this.client.send(pattern,{}).toPromise();
  }

  async registerUser(data: {}): Promise<any>{
    const pattern = {cmd: 'registerUser'};
    return this.client.send(pattern,data).toPromise();
  }

  async loginUser(data: {}): Promise<any>{
    const pattern = {cmd: 'login'};
    return this.client.send(pattern,data).toPromise();
  }

  async verifyEmail(data:{}): Promise<any>{
    const pattern = {cmd: 'verifyEmail'};
    return this.client.send(pattern,data).toPromise
  }
  

  
  


}