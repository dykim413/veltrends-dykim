import {FastifyPluginAsync} from "fastify";
import UserService from "../../../services/UserService.js";
import {loginSchema, registerSchema} from "./schema.js";
import {AuthBody} from "./type";

const authRoutes: FastifyPluginAsync = async (fastify) => {
    const userService = UserService.getInstance();

    fastify.post<{Body: AuthBody}>(
        '/login',
        {schema: loginSchema},
        async (request) => {
        return userService.login(request.body);
    });

    fastify.post<{Body: AuthBody}>(
        '/register',
        {schema: registerSchema},
        async (request) => {
        return await userService.register(request.body);
    });
};

export default authRoutes;
