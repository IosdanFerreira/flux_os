import { sign } from 'jsonwebtoken';
import { IRefreshToken } from '../../entities/RefreshToken';
import { prismaClient } from '../../shared/services/PrismaClient';
import { generateTokenProvider } from '../../shared/services/GenerateTokenProvider';
import dayjs from 'dayjs';
import { generateRefreshToken } from '../../shared/services/GenerateRefreshToken';


const checkRefreshTokenValidate = async (refresh_token_id:number): Promise<IRefreshToken | null> => {
    
    const refreshToken = await prismaClient.refrehToken.findUnique({
        where:{
            id: refresh_token_id
        }
    });

    return refreshToken;

};

export const refreshTokenUseCase = async (refresh_token_id:number) => {
    
    const refreshTokenValid = await checkRefreshTokenValidate(refresh_token_id);

    if(!refreshTokenValid) {
        return new Error('Token inválido');
    }

    if (!refreshTokenValid.user_id) {
        return new Error('Refresh Token não possui user_id');
    }

    const token  = await generateTokenProvider(refreshTokenValid.user_id);

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshTokenValid.expires_in));

    if(refreshTokenExpired) {

        await prismaClient.refrehToken.deleteMany({
            where:{
                user_id: refreshTokenValid.user_id
            }
        });

        const newRefreshToken = await generateRefreshToken(refreshTokenValid.user_id);

        return {token, newRefreshToken};
    }


    return {token};
};