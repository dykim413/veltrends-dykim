import {FastifyPluginAsync} from "fastify";
import UserService from "../../../services/UserService.js";
import {loginSchema, registerSchema} from "./schema.js";
import {AuthBody} from "./type";

const authRoutes: FastifyPluginAsync = async (fastify) => {
    const userService = UserService.getInstance();

    fastify.post('/login', {schema: loginSchema}, async () => {
        return userService.login();
    });

    fastify.post<{Body: AuthBody}>('/register', {schema: registerSchema}, async (fastify) => {
        return await userService.register(fastify.body);
    })
};

export default authRoutes;
