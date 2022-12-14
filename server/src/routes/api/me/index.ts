import fastify, {FastifyPluginAsync} from "fastify";
import {getMeSchema} from "./schema.js";
import AppError from "../../../lib/AppError.js";

const meRoute: FastifyPluginAsync = async (fastify) => {
    fastify.get('/', {schema: getMeSchema}, async (request) => {
        if( !request.user ) {
            throw new AppError('UnauthorizedError');
        }
        return request.user;
    });
}

export default meRoute;
