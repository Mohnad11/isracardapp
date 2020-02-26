import {AnyAction, Dispatch} from "redux";
import IUserState from "../models/states/User";

export type saveUserAction = (user:IUserState) => AnyAction;

export function saveUserAction(user:IUserState) {
    return (dispatch: Dispatch) => {

        return dispatch({
            type: 'user/saveUser',
            payload:user,
        });
    };

}

