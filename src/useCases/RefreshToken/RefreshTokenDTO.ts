import { IRefreshToken } from '../../entities/RefreshToken';


export interface IRefreshTokenRequestDTO extends Omit<IRefreshToken, 'id'>{}