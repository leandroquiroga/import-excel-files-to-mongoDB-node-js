import express, { Express } from 'express';
import { environment } from '../configuration/environment';
import { router } from '../router';

class ServerApp {
  app: Express;
  port: string;
  host: string;

  constructor() {
    this.app = express();
    this.port = environment.PORT;
    this.host = environment.HOST;


    this.router()
  }
  router(): void {
    this.app.use('/v1', router)
  };


  listen(): void {
    this.app.listen(this.port, () => {
      (this.port) 
        ? console.log(`Server running and listening port http://${this.host}:${this.port}/v1`)
        : console.log(`Failed connection with server, please contact wiht administrator`);
    });
  };
};


export const server = new ServerApp();