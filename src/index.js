const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

//Exemplo de utilização do CORS em produção
// app.use(cors({
//     origin: 'http://meufrontend.com.br'
// }));

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(3333);