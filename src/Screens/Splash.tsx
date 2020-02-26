import React, {Component} from 'react';
import {Dimensions, Image, View,AsyncStorage} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import { NavigationActions } from '../utils';
import {connect} from "react-redux";
interface Props {
    dispatch?: any;
}
class Splash extends Component< Props & NavigationInjectedProps> {
    async componentDidMount() {

        setTimeout(async () => {
            this.props.dispatch( NavigationActions.navigate({routeName:"Login"}));
        }, 2000);
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor: '#fff',alignItems:'center',justifyContent:'center'}}>
                <Image source={require('../assets/video.png')}/>
            </View>
        );
    }
}
function mapStateToProps(state: any) {
    return {
        ...state
    };
}
export default connect(mapStateToProps)(Splash);


