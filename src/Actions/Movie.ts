import IUserState from "../models/states/User";
import {AnyAction, Dispatch} from "redux";
import IMovie from "../models/Types/Movie";

export type fetchMoviesAction = (page:number,callBack:Function | null) => AnyAction;

export function fetchMoviesAction(page:number,callBack:Function| null) {
    return (dispatch: Dispatch) => {
        return dispatch({
            type: 'movie/fetch',
            payload:{
                page:page,
                callBack:callBack
            }
        });
    };

}
export type fetchFavoritesMoviesAction = () => AnyAction;

export function fetchFavoritesMoviesAction() {
    return (dispatch: Dispatch) => {
        return dispatch({
            type: 'movie/fetchFavorites',
        });
    };

}


export type addToFavoritesAction = (movie:IMovie) => AnyAction;

export function addToFavoritesAction(movie:IMovie) {
    return (dispatch: Dispatch) => {
        return dispatch({
            type: 'movie/addToFavorites',
            payload:{
                movie:movie,
            }
        });
    };

}
export type removeFromFavoritesAction = (movie:IMovie) => AnyAction;

export function removeFromFavoritesAction(movie:IMovie) {
    return (dispatch: Dispatch) => {
        return dispatch({
            type: 'movie/removeFromFavorites',
            payload:{
                movie:movie,
            }
        });
    };

}
export type checkIfMovieIsOnFavoritesAction = (movie:IMovie,callBack:Function) => AnyAction;

export function checkIfMovieIsOnFavoritesAction(movie:IMovie,callBack:Function) {
    return (dispatch: Dispatch) => {
        return dispatch({
            type: 'movie/checkIfMovieIsOnFavorites',
            payload:{
                movie:movie,
                callBack:callBack
            }
        });
    };

}
export type clearFavoritesAction = () => AnyAction;

export function clearFavoritesAction() {
    return (dispatch: Dispatch) => {
        return dispatch({
            type: 'movie/clearFavorites',
        });
    };

}
