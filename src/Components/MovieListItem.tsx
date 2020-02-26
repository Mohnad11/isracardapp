
import React, {Component} from 'react';
import IMovie from "../models/Types/Movie";
import {View,Text,TouchableOpacity} from "react-native";
import {NavigationActions, NavigationInjectedProps} from "react-navigation";
import {connect} from "react-redux";

interface IProps {
    movie:IMovie
    dispatch?: any;
}
function mapStateToProps(state: any) {
    return {

    };
}
 class MovieListItem extends Component<IProps & NavigationInjectedProps>{
    moveToMovie(){
        this.props.dispatch(NavigationActions.navigate({routeName:"Movie",params:{movie:this.props.movie}}));
    }
    render():any{
        return(
            <TouchableOpacity style={{width:'90%',padding:10,marginBottom:10,height:70,backgroundColor:'#2e5fee',alignSelf:'center',alignItems:'center',justifyContent:'center'}} onPress={()=>this.moveToMovie()}>
                <Text numberOfLines={2} style={{fontSize:18,color:'#fff'}}>{this.props.movie.title}</Text>
            </TouchableOpacity>
        );
    }
}
export default connect(mapStateToProps)(MovieListItem);
