import {FastifySwaggerUiOptions} from "@fastify/swagger-ui";

export const swaggerConfig: FastifySwaggerUiOptions = {
    routePrefix: '/documentation',
    initOAuth: { },
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    uiHooks: {
        onRequest: function (request, reply, next) { next() },
        preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header
};
