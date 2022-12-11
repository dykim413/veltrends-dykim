import db from "../lib/db.js";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

interface AuthParams {
    username: string;
    password: string;
}

class UserService {
    private static instance: UserService;

    public static getInstance() {
        if( !UserService.instance ) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    async register({username, password}: AuthParams) {
        const exists = await db.user.findUnique({
            where: {
                username
            }
        });

        if( exists ) {
            throw new Error('User already exists');
        }

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        return await db.user.create({
            data: {
                username,
                passwordHash
            }
        });
    }

    login() {
        return 'login';
    }
}

export default UserService;
