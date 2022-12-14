import {FastifySchema} from "fastify";
import {userSchema} from "../../../schema/userSchema.js";
import {appErrorSchema, createAppErrorSchema} from "../../../lib/AppError.js";

export const getMeSchema: FastifySchema = {
    response: {
        200: userSchema,
        401: createAppErrorSchema({
            name: 'UnauthorizedError',
            message: 'Unauthorized',
            statusCode: 401,
        }),
    },
}
