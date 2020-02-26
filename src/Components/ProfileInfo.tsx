import React, {Component} from 'react';
import {AppState} from "../models/states/app";
import IUserState from "../models/states/User";
import {Image, ImageSourcePropType, Text, View} from "react-native";
import {connect} from "react-redux";

function mapStateToProps(state:AppState) {
    return {
        user:state.user
    };
}
interface Iprops{
    user: IUserState,
}
class ProfileInfo extends Component<Iprops>{
    getProfilePic():ImageSourcePropType{
        if(!this.props.user.profileImageUrl){
            return require('../assets/user.png');
        }
        console.log(this.props.user.profileImageUrl)
        return {uri:this.props.user.profileImageUrl}
    }
    render():any{
        return(
            <View style={{flex:0.7,justifyContent:'center',alignItems:'center'}}>

                <Text style={{marginBottom:10,fontSize:20}}>{this.props.user.fullName}</Text>
                <Image source={this.getProfilePic()} style={{width:200,height:200,borderRadius:200}}/>

            </View>
        )
    }
}
export default connect(mapStateToProps)(ProfileInfo);
