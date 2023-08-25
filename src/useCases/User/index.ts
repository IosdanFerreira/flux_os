import * as signIn from './Login/FindByEmailController';
import * as signUp from './CreateUser/CreateController';


export const usersUseCase = {
    ...signIn,
    ...signUp
};