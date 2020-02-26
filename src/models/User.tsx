
import {createAction, Storage} from "../utils";
import * as authService from "../services/auth";
import {NavigationActions} from "react-navigation";
import {Model} from "../utils/dva";
import IUserState from "./states/User";

const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
} = FBSDK;

interface IUser extends Model{
    state:IUserState
}
const UserModel:IUser={
    namespace: 'user',
    state: {
       fullName :'',
        profileImageUrl:''
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *saveUser({payload},{call,put}){
            yield put(createAction('updateState')({ fullName: payload.fullName,profileImageUrl:payload.profileImageUrl }));
            yield put( NavigationActions.navigate({routeName:"Home"}));
        },
    },
    subscriptions: {
        setup({ dispatch }) {
            dispatch({ type: 'loadStorage' });
        },
    },
}
export default UserModel
