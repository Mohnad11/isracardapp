import {createAction, Storage} from "../utils";
import {NavigationActions} from "react-navigation";
import {Model} from "../utils/dva";

import IMovieState from "./states/Movie";
import fetchMovies from "../services/Movie";
import {AppState} from "./states/app";
import {AsyncStorage} from "react-native";
import IMovie from "./Types/Movie";
import {clearFavoritesAction} from "../Actions/Movie";



interface IMovieModel extends Model{
    state:IMovieState
}
const movies1 = (state:AppState) => state.movie.movies;
const MovieModel:IMovieModel={
    namespace: 'movie',
    state: {
        fetching:false,
        movies:[],
        favMovies:[]
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *fetch({payload},{call,put,select}){
            try{
                yield put(createAction('updateState')({ fetching: true }));
                const result = yield call(fetchMovies,{page:payload.page});
                const state = yield select(movies1);
                let movies=[...state,...result.data.results];
                yield put(createAction('updateState')({ movies: movies }));
                if(payload.callBack){
                    payload.callBack();
                }
            }catch (e) {
                alert(e.message)
            }finally {
                yield put(createAction('updateState')({ fetching: false }));
            }

        },
        *addToFavorites({payload},{call,put,select}){

            let moviesJson=yield call(AsyncStorage.getItem, 'movies', );
            let movies:IMovie[];
            if(moviesJson==null || moviesJson==""){
                movies=[];
            }else{
                movies=JSON.parse(moviesJson);
            }
            movies.push(payload.movie);
            yield call(AsyncStorage.setItem,'movies',JSON.stringify(movies))
            alert("added to Favorites")
        },
        *removeFromFavorites({payload},{call,put,select}){
            let moviesJson=yield call(AsyncStorage.getItem, 'movies' );
            let movies:IMovie[];
            movies=JSON.parse(moviesJson);
            movies=movies.filter(m=>m.id!=payload.movie.id);
            yield call(AsyncStorage.setItem,'movies',JSON.stringify(movies))
        },
        *fetchFavorites(_,{call,put,select}){
            let moviesJson=yield call(AsyncStorage.getItem, 'movies' );
            let movies:IMovie=JSON.parse(moviesJson)
            yield put(createAction('updateState')({ favMovies: movies }));
            yield put( NavigationActions.navigate({routeName:"FavMovies"}));
        },
        *checkIfMovieIsOnFavorites({payload},{call,put,select}){
            let moviesJson=yield call(AsyncStorage.getItem, 'movies' );
            let movies:IMovie[];
            movies=JSON.parse(moviesJson);
            if(movies==null ){
                payload.callBack(false)
                return ;
            }

            let isFounded=movies.find(m=>m.id==payload.movie.id);
            if(isFounded)
                payload.callBack(true);
            else
                payload.callBack(false);
        },
        *clearFavorites(_,{call,put}){
            yield call(AsyncStorage.setItem,'movies',"")
            yield put(createAction('updateState')({ favMovies: [] }));
        }
    },
    subscriptions: {
        setup({ dispatch }) {
            dispatch({ type: 'loadStorage' });
        },
    },
}
export default MovieModel
