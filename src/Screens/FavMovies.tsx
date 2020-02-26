
import React, {Component} from 'react';
import {
    Image,
    View,
    TouchableOpacity,
    Text,
    ImageSourcePropType,
    ActivityIndicator,
    FlatList,
    RefreshControl
} from 'react-native';
import {NavigationInjectedProps} from "react-navigation";
import {GraphRequest, GraphRequestManager} from "react-native-fbsdk";
import {connect} from "react-redux";
import { saveUserAction} from "../Actions/User";
import IUserState from "../models/states/User";
import {AppState} from "../models/states/app";
import ProfileInfo from "../Components/ProfileInfo";
import {clearFavoritesAction, fetchMoviesAction} from "../Actions/Movie";
import IMovieState from "../models/states/Movie";
import IMovie from "../models/Types/Movie";
import MovieListItem from "../Components/MovieListItem";
import AppButton from "../Components/AppButton";
const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
} = FBSDK;

interface Istate {

}
function mapStateToProps(state:AppState) {
    return {
        movies:state.movie,
    };
}

const mapDispatchToProps = {
    clearFavorites:clearFavoritesAction
};
interface Iprops{
    movies:IMovieState,
    clearFavorites:clearFavoritesAction
}
class FavMovies extends Component<NavigationInjectedProps & Istate & Iprops> {

    componentDidMount(): void {
        //this.props.saveUser();
    }




    clear(){
        this.props.clearFavorites();
    }
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <View style={{flex:1,padding:10}}>
                <AppButton text={'clear'} onPress={()=>this.clear()}/>
                <FlatList
                    style={{flex:0.9}}
                    data={this.props.movies.favMovies}
                    renderItem={({ item }: { item: IMovie })=><MovieListItem movie={item} navigation={this.props.navigation}/>}
                    keyExtractor={(item:IMovie, index) => index}
                />

            </View>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FavMovies);

/*

tried to get frame out of range index nan
 */
