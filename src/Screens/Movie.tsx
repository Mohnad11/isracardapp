
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
import {
    addToFavoritesAction,
    checkIfMovieIsOnFavoritesAction,
    fetchMoviesAction,
    removeFromFavoritesAction
} from "../Actions/Movie";
import IMovieState from "../models/states/Movie";
import IMovie from "../models/Types/Movie";
import MovieListItem from "../Components/MovieListItem";
const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
} = FBSDK;

interface Istate {
    movie:IMovie;
    isOnFav:boolean
}
function mapStateToProps(state:AppState) {
    return {

    };
}

const mapDispatchToProps = {
    addToFavorites:addToFavoritesAction,
    removeFromFavorites:removeFromFavoritesAction,
    checkIfMovieIsOnFavorites:checkIfMovieIsOnFavoritesAction

};
interface Iprops{
    movies:IMovieState
    addToFavorites:addToFavoritesAction
    removeFromFavorites:removeFromFavoritesAction
    checkIfMovieIsOnFavorites:checkIfMovieIsOnFavoritesAction
}
const URL="https://image.tmdb.org/t/p/w500";
class Movie extends Component<NavigationInjectedProps & Istate & Iprops> {
    state:Istate={
        movie:this.props.navigation.getParam('movie'),
        isOnFav:false
    }
    componentDidMount(): void {
        this.props.checkIfMovieIsOnFavorites(this.state.movie,this.checkFavoritesCallBack.bind(this))
    }
    checkFavoritesCallBack(isFounded:boolean){
        this.setState({isOnFav:isFounded})
    }
    saveToStore(){
        this.props.addToFavorites(this.state.movie);
        this.setState({isOnFav:true})
    }
    remove(){
        this.props.removeFromFavorites(this.state.movie);
        this.setState({isOnFav:false})
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <View style={{flex:1,padding:10,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:20}}>{this.state.movie.title}</Text>
                <Image source={{uri:URL+this.state.movie.poster_path}} style={{width:300,height:300}}/>
                <Text>{this.state.movie.vote_average}</Text>
                <Text>{this.state.movie.overview}</Text>
                <TouchableOpacity style={{width:'70%',height:40,backgroundColor:'red',alignItems:'center',justifyContent:'center',display:this.state.isOnFav?'none':'flex'}} onPress={()=>this.saveToStore()}>
                    <Text style={{fontSize:18}}>add to favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'70%',height:40,backgroundColor:'red',alignItems:'center',justifyContent:'center',display:this.state.isOnFav?'flex':'none'}} onPress={()=>this.remove()}>
                    <Text style={{fontSize:18}}>remove from favorites</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Movie);

/*

tried to get frame out of range index nan
 */
