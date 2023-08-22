import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
    res.status(201).send('Rotas funcionando!');
});

export {routes};