

import React, {Component} from 'react';
import {
    TouchableOpacityProps,
    TouchableOpacity,
    Text,
    StyleSheet,
    StyleProp,
    TextProps,
    ActivityIndicator, ImageSourcePropType, Image,ImageProps,View
} from "react-native";
interface Iprops {
    text:string
    containerStyle?:StyleProp<TouchableOpacityProps>
    textStyle?:StyleProp<TextProps>
    isLoading?:boolean
    icon?:ImageSourcePropType

}
export default class AppButton extends Component<Iprops & TouchableOpacityProps>{
    render():any{
        return(
            <TouchableOpacity style={this.props.containerStyle?[this.props.containerStyle,styles.basicButtonContainer]:styles.buttonContainer} onPress={this.props.onPress}>
               <View style={{flex:1,flexDirection:'row'}}>
                   <View style={{flex:this.props.icon?0.2:0,alignItems:'center',justifyContent:'center'}}>
                       <Image source={this.props.icon} resizeMode={'contain'}/>
                   </View>
                    <View style={{flex:0.8,alignItems:'center',justifyContent:'center'}}>
                        <Text  style={[this.props.textStyle?this.props.textStyle:styles.buttonText,{display:this.props.isLoading?'none':'flex'}]}>{this.props.text}</Text>
                        <ActivityIndicator color={'white'} style={{display:this.props.isLoading?'flex':'none'}}/>
                    </View>


               </View>
            </TouchableOpacity>
        )
    }
}
const styles=StyleSheet.create({
    basicButtonContainer:{
        alignItems:'center',justifyContent:'center'
    },
    buttonContainer:{
        backgroundColor:'blue',paddingLeft:15,paddingRight:15,alignItems:'center',justifyContent:'center',width:'100%',height:35,marginBottom:10
    },
    buttonText:{
        fontSize:17,color:'#fff',fontWeight:'bold'
    }
});
