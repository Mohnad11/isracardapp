
import React, {Component} from 'react';
import {Image, View, TouchableOpacity, Text, ImageSourcePropType, ActivityIndicator, AsyncStorage} from 'react-native';
import {NavigationActions, NavigationInjectedProps} from "react-navigation";
import {GraphRequest, GraphRequestManager} from "react-native-fbsdk";
import {connect} from "react-redux";
import { saveUserAction} from "../Actions/User";
import IUserState from "../models/states/User";
import {AppState} from "../models/states/app";
import ProfileInfo from "../Components/ProfileInfo";
import {fetchFavoritesMoviesAction, fetchMoviesAction} from "../Actions/Movie";
import IMovieState from "../models/states/Movie";
import AppButton from "../Components/AppButton";
const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
} = FBSDK;

interface Istate {
    loading:boolean;
}
function mapStateToProps(state:AppState) {
    return {
        movies:state.movie,
    };
}

const mapDispatchToProps = {
    fetchMovies:fetchMoviesAction,
    fetchFavoritesMovies:fetchFavoritesMoviesAction
};
interface Iprops{
    movies:IMovieState
    fetchMovies:fetchMoviesAction
    fetchFavoritesMovies:fetchFavoritesMoviesAction
    dispatch?: any;
}
class Home extends Component<NavigationInjectedProps & Istate & Iprops> {
    state:Istate={
        loading:false
    }
    componentDidMount(): void {

        //this.props.saveUser();
    }


    getMovies(){
        this.props.fetchMovies(1,this.handleFetchMovies.bind(this));
    }
    getFavMovies(){
        this.props.fetchFavoritesMovies();
    }
    handleFetchMovies(){
       this.props.navigation.navigate('Movies')
    }
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <View style={{flex:1,padding:10}}>
                <ProfileInfo/>
                <View style={{flex:0.3,justifyContent:'center',alignItems:'center'}}>
                    <AppButton text={'all movies'} onPress={()=>this.getMovies()} isLoading={this.props.movies.fetching}/>
                    <AppButton text={'favorites'} onPress={()=>this.getFavMovies()} />
                </View>

            </View>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);

