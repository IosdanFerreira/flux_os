import express from 'express';
import './shared/services/YupTranslate';
import 'dotenv/config';
import { routes } from './routes';

const server = express();

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

server.use(express.json());
server.use(routes);

export {server};