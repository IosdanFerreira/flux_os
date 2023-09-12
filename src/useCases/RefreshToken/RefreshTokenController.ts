import { Request, Response } from 'express';
import { validation } from '../../shared/middleware/Validation';
import * as yup from 'yup';
import { refreshTokenUseCase } from './RefreshTokenUseCase';
import { StatusCodes } from 'http-status-codes';

interface IBody {
    refresh_token: number
}

export const refreshTokenValidation = validation((getSchema) => ({
    body: getSchema<IBody>(yup.object().shape({
        refresh_token: yup.number().required()
    }))
}));

export const refreshToken = async (request: Request<{},{}, IBody>, response: Response) => {

    const { refresh_token } = request.body;

    const token = await refreshTokenUseCase(refresh_token);

    if(token instanceof Error) {
        return response.status(StatusCodes.UNAUTHORIZED).json({
            errors:{
                message: token.message
            }
        });
    }

    return response.status(StatusCodes.OK).json(token);

};