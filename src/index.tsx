import React from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
// import SImmutable from 'seamless-immutable';

import {createLogger} from 'redux-logger';
import {dva , Model} from './utils/dva';
import Router, { routerMiddleware, routerReducer } from './router'
import thunk from "redux-thunk";
import UserModel from "./models/User";
import MovieModel from "./models/Movie";

let initState = {};

const app = dva({
    initialState: initState,
    models: [MovieModel,UserModel],
    extraReducers: { router: routerReducer },
    // models:[m],
    onError(e: any) {
        console.error('onError', e);
    },
    onAction: [createLogger({collapsed: true}), routerMiddleware,thunk],

});
// registerModels(app)
const App = app.start(<Router />);

export default App;
