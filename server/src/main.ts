import Fastify from 'fastify';
import routes from './routes/index.js';
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from '@fastify/swagger-ui'
import {swaggerConfig} from "./config/swagger.js";
import db from "./lib/db.js";

const server = Fastify({
    logger: true,
});

await server.register(fastifySwagger);
await server.register(fastifySwaggerUi, swaggerConfig);
server.register(routes);

server.listen({port: 4000});
