import fastify, { FastifyInstance } from 'fastify';
import type { FastifyCookieOptions } from '@fastify/cookie'
import cookie from '@fastify/cookie'
const multer = require('fastify-multer') // or import multer from 'fastify-multer'
const upload = multer({ dest: 'uploads/' })

export const app: any = fastify({ logger: true });

app.register(multer.contentParser)

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
