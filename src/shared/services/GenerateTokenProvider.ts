import { sign } from 'jsonwebtoken';

export const generateTokenProvider = async (user_id: number): Promise<string> =>{

    const token = sign({}, String(process.env.SECRET_KEY_ROUTES),{
        subject: String(user_id),
        expiresIn: '2min', 
    });

    return token;
};