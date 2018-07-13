import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import router from './router';
import { sequelize } from './db';
import { sync } from './db/sync';
import * as dotenv from 'dotenv';

export class Server {
  private app: express.Application;
  private database;
  constructor () {
    dotenv.config();
    this.app = express();
    this.middleware();
    this.setRoute();
  }

  private async middleware (): Promise<void> {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
    sequelize.authenticate().then(() => {
      sync();
    });
  }

  private setRoute (): void {
    this.app.use('/', router);
  }

  get getApp (): express.Application {
    return this.app;
  }
}
