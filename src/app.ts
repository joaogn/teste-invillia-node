import express from 'express';
import cors from 'cors';
import routes from './routes';

class App {
  server: express.Express;

  constructor() {
    this.server = express();
    this.middlerware();
    this.routes();
  }

  middlerware(): void {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes(): void {
    this.server.use(routes);
  }
}

export default new App().server;
