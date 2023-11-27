import fastify from 'fastify';
import type { FastifyCookieOptions } from '@fastify/cookie'
import cookie from '@fastify/cookie'

const app = fastify({ logger: true });

app.register(cookie, {
  secret: "easypass.ofc@gmail.com", 
  parseOptions: {}
} as FastifyCookieOptions)

app.register(require('fastify-autoroutes'), {
  dir: '../routes',
})

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
