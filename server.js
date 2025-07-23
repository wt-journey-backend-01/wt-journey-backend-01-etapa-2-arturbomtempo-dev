import express from 'express';
import dotenv from 'dotenv';
import swagger from './docs/swagger.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

import casosRouter from './routes/casosRoutes.js';
import agentesRouter from './routes/agentesRoutes.js';
import errorHandler from './utils/errorHandler.js';

app.use(express.json());
app.use(casosRouter);
app.use(agentesRouter);

swagger(app);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando na porta:${PORT}`);
});
