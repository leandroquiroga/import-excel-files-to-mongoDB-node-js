import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { environment } from '../configuration/environment';
import { dbConnect } from '../database/db.connect';
import { router } from '../router';
import { handleNotFound, errorServer } from '../middlewares/index';

class ServerApp {
  app: Express;
  port: string;
  host: string;

  constructor() {
    this.app = express();
    this.port = environment.PORT;
    this.host = environment.HOST;

    this.middleware();
    this.connectDataBase();
    this.router();
    this.errorHandle();
  };

  middleware(): void {
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    this.app.use(bodyParser.json());
  };

  async connectDataBase(): Promise<void> {
    await dbConnect();
  }
  router(): void {
    this.app.use('/v1', router)
  };

  errorHandle(): void {
    this.app.use(handleNotFound);
    this.app.use(errorServer)
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