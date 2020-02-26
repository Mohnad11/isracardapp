
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
import {fetchMoviesAction} from "../Actions/Movie";
import IMovieState from "../models/states/Movie";
import IMovie from "../models/Types/Movie";
import MovieListItem from "../Components/MovieListItem";
const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
} = FBSDK;

interface Istate {
    page:number;
}
function mapStateToProps(state:AppState) {
    return {
        movies:state.movie,
    };
}

const mapDispatchToProps = {
    fetchMovies:fetchMoviesAction
};
interface Iprops{
    movies:IMovieState,

    fetchMovies:fetchMoviesAction
}
class Movies extends Component<NavigationInjectedProps & Istate & Iprops> {
    state:Istate={
        page:1,
    };
    componentDidMount(): void {
        //this.props.saveUser();
    }



    fetchMoreMovies(){
        let page=this.state.page;
        page=page+1;
        this.props.fetchMovies(page,null);
        this.setState({page:page})
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <View style={{flex:1,padding:10}}>

                <FlatList
                    style={{flex:0.9}}
                    refreshControl={
                        <RefreshControl refreshing={this.props.movies.fetching} onRefresh={()=>this.fetchMoreMovies()} />
                    }
                    onEndReached={()=>this.fetchMoreMovies()}
                    onEndReachedThreshold={.2}
                    data={this.props.IsFavorites?this.props.movies.favMovies:this.props.movies.movies}
                    renderItem={({ item }: { item: IMovie })=><MovieListItem movie={item}/>}
                    keyExtractor={(item:IMovie, index) => index}
                />
                <ActivityIndicator style={{flex:0.1,display:this.props.movies.fetching?'flex':'none'}}/>
            </View>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Movies);

/*

tried to get frame out of range index nan
 */
