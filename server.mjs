import express from 'express';

import authentication from './controllers/auth/authentication.mjs';

import operatorRoutes from './routes/operatorRoutes.mjs';
import sessionRoutes from './routes/sessionRoutes.mjs';

const server = express();

server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));

server.use(authentication);

server.use('/api', sessionRoutes);
server.use('/api', operatorRoutes);

export default server;
