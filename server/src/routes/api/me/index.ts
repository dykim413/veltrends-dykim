import fastify, {FastifyPluginAsync} from "fastify";
import {getMeSchema} from "./schema.js";
import requireAuthPlugin from "../../../plugins/requireAuthPlugin.js";

const meRoute: FastifyPluginAsync = async (fastify) => {
    fastify.register(requireAuthPlugin);
    fastify.get('/', {schema: getMeSchema}, async (request) => {
       return request.user;
    });
}

export default meRoute;
