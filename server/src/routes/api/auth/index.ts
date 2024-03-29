import { FastifyPluginAsync, FastifyReply } from 'fastify';
import UserService from '../../../services/UserService.js';
import { loginSchema, refreshTokenSchema, registerSchema } from './schema.js';
import { AuthBody } from './type';
import AppError from '../../../lib/AppError.js';

const authRoutes: FastifyPluginAsync = async fastify => {
    const userService = UserService.getInstance();

    fastify.post<{ Body: AuthBody }>('/login', { schema: loginSchema }, async (request, reply) => {
        const authResult = await userService.login(request.body);
        setTokenCookie(reply, authResult.tokens);
        return authResult;
    });

    fastify.post<{ Body: AuthBody }>('/register', { schema: registerSchema }, async (request, reply) => {
        const authResult = await userService.register(request.body);
        setTokenCookie(reply, authResult.tokens);
        return authResult;
    });

    fastify.post<{ Body: { refreshToken?: string } }>('/refresh', { schema: refreshTokenSchema }, async (request, reply) => {
        const refreshToken = request.body.refreshToken ?? request.cookies.refresh_token ?? '';
        if (!refreshToken) {
            throw new AppError('BadRequestError');
        }
        const tokens = await userService.refreshToken(refreshToken);
        setTokenCookie(reply, tokens);
        return tokens;
    });
};

function setTokenCookie(reply: FastifyReply, tokens: { accessToken: string; refreshToken: string }) {
    reply.setCookie('access_token', tokens.accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60),
        path: '/',
    });
    reply.setCookie('refresh_token', tokens.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        path: '/',
    });
}

export default authRoutes;
