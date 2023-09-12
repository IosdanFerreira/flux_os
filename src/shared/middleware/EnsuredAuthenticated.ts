import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';


type TEnsuredAuthenticated = () => RequestHandler;

export const ensuredAuthenticated: TEnsuredAuthenticated = () => async (request, response, next) =>{

    const authToken = request.headers.authorization;

    if(!authToken) {
        return response.status(StatusCodes.UNAUTHORIZED).json({
            errors:{
                message: 'Não autorizado'
            }
        });
    }

    const [, token] = authToken.split(' ');

    try {
        verify(token, String(process.env.SECRET_KEY_ROUTES));
        return next();
    } catch (error) {
        console.log(error);

        return response.status(StatusCodes.UNAUTHORIZED).json({
            errors:{
                message: 'Token Inválido'
            }
        });
    }

};