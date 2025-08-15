const express = require('express');
const swagger = require('./docs/swagger');
const agentesRouter = require('./routes/agentesRoutes');
const casosRouter = require('./routes/casosRoutes');
const { errorHandler } = require('./utils/errorHandler');
const agentesRoutes = require('./routes/agentesRoutes.js');
const casosRoutes = require('./routes/casosRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/agentes', agentesRouter);
app.use('/casos', casosRouter);

swagger(app);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando na porta:${PORT}`);
});
