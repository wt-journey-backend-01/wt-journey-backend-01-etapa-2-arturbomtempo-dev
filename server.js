const express = require('express');
const app = express();
const PORT = 3000;

const agentesRoutes = require('./routes/agentesRoutes.js');
const casosRoutes = require('./routes/casosRoutes.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(agentesRoutes);
app.use(casosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em localhost:${PORT}`);
});
