import {FastifyPluginAsync} from "fastify";
import authRoutes from "./auth/index.js";
import meRoute from "./me/index.js";

const api: FastifyPluginAsync = async (fastify) => {
    fastify.register(authRoutes, {prefix: '/auth'});
    fastify.register(meRoute, {prefix: '/me'});
};

export default api;
