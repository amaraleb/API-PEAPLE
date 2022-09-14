const app = require('./src/app');
const PORT = process.env.PORT; //busca a porta do .env

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));