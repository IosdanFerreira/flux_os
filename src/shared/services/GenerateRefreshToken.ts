import dayjs from 'dayjs';
import { prismaClient } from './PrismaClient';


export const generateRefreshToken = async (user_id:number) => {

    const expiresIn = dayjs().add(1, 'hour').unix();

    const refreshToken = await prismaClient.refrehToken.create({
        data:{
            user_id,
            expires_in: expiresIn
        }
    });

    return refreshToken;

};