import fastify, { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { AccessTokenPayload, validateToken } from '../lib/token.js';
import jwt from 'jsonwebtoken';
import AppError from '../lib/AppError.js';

const { JsonWebTokenError } = jwt;

const authPluginAsync: FastifyPluginAsync = async fastify => {
    fastify.decorateRequest('user', null);
    fastify.decorateRequest('isExpiredToken', false);
    fastify.addHook('preHandler', async request => {
        const token = request.headers.authorization?.split('Bearer ')[1] ?? request.cookies.access_token;

        if (request.cookies.refresh_token && !token) {
            request.isExpiredToken = true;
            return;
        }

        if (!token) {
            return;
        }

        try {
            const decoded = await validateToken<AccessTokenPayload>(token);
            request.user = {
                id: decoded.userId,
                username: decoded.username,
            };
        } catch (e: any) {
            if (e instanceof JsonWebTokenError) {
                if (e.name === 'TokenExpiredError') {
                    request.isExpiredToken = true;
                }
            }
        }
    });
};

export const authPlugin = fp(authPluginAsync, {
    name: 'authPlugin',
});

declare module 'fastify' {
    interface FastifyRequest {
        user: {
            id: number;
            username: string;
        } | null;
        isExpiredToken: boolean;
    }
}
