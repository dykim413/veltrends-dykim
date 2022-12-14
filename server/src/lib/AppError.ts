type ErrorName = 'UserExistsError' | 'AuthenticationError' | 'UnknownError';
type ErrorInfo = {
    statusCode: number;
    message: string;
}
const statusCodeMap: Record<ErrorName, ErrorInfo> = {
    UserExistsError: {
        message: 'User Exists Error',
        statusCode: 409,
    },
    AuthenticationError: {
        message: 'Authentication Error',
        statusCode: 401,
    },
    UnknownError: {
        message: 'Unknown Error',
        statusCode: 500,
    },
}

class AppError extends Error {
    public statusCode: number;
    constructor(public name: ErrorName) {
        const info = statusCodeMap[name];
        super(info.message);
        this.statusCode = info.statusCode;
    }
}

export const appErrorSchema = {
    type: 'object',
    properties: {
        name: {type: 'string'},
        message: {type: 'string'},
        statusCode: {type: 'number'},
    }
}

export default AppError;
