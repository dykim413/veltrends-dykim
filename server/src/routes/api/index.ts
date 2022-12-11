import {FastifyPluginAsync} from "fastify";
import authRoutes from "./auth/index.js";

const api: FastifyPluginAsync = async (fastify) => {
    fastify.register(authRoutes, {prefix: '/auth'});
}

export default api;
