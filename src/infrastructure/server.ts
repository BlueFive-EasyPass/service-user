import fastify from 'fastify';

// Cria uma instância do Fastify
const app = fastify({ logger: true });// Rota simples

app.register(require('fastify-autoroutes'), {
  dir: '../routes', 
})
// Inicia o servidor
const start = async () => {
  try {
    await app.listen({ port: 3000 });
    app.log.info(`Servidor rodando em ${app.server.address()}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
