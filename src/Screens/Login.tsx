
import React, {Component} from 'react';
import {Image, View, TouchableOpacity, Text, ImageSourcePropType, ActivityIndicator} from 'react-native';
import {NavigationInjectedProps} from "react-navigation";
import {GraphRequest, GraphRequestManager} from "react-native-fbsdk";
import {connect} from "react-redux";
import { saveUserAction} from "../Actions/User";
import IUserState from "../models/states/User";
import {AppState} from "../models/states/app";
import ProfileInfo from "../Components/ProfileInfo";
import AppButton from "../Components/AppButton";
const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
} = FBSDK;
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
interface Istate {
    fbLoading:boolean;
    googleLoading:boolean;
}
function mapStateToProps(state:AppState) {
    return {
        user:state.user,
        movie:state.movie
    };
}

const mapDispatchToProps = {
    saveUser:saveUserAction,
};
interface Iprops{
    user: IUserState,
    saveUser:saveUserAction
}
class Login extends Component<NavigationInjectedProps & Istate & Iprops> {
    state:Istate={
        fbLoading:false,
        googleLoading:false
    }
    componentDidMount(): void {
        //this.props.saveUser();
    }
    saveUser(user:IUserState){
        this.props.saveUser(user);
    }

    faceBookLogin(){
        let login=this;
        this.setState({fbLoading:true});
        LoginManager.logInWithPermissions(['public_profile']).then(
            function(result:any) {
                if (result.isCancelled) {
                    alert('Login was cancelled');
                    login.setState({fbLoading:false});
                } else {
                    const infoRequest = new GraphRequest(
                        '/me',
                        null,
                        (error, result1:any) =>{
                                if (error) {
                                    alert('Error fetching data: ' + error.toString());
                                    login.setState({fbLoading:false});
                                } else {
                                    let userId=result1.id;
                                    let picUrl="http://graph.facebook.com/"+userId+"/picture?type=large";
                                    let user:IUserState={
                                        fullName:result1.name,
                                        profileImageUrl:picUrl,
                                    }
                                    login.saveUser(user);
                                    login.setState({fbLoading:false});

                                }
                        });

                    new GraphRequestManager().addRequest(infoRequest).start();
                }
            },
            function(error:any) {
                alert('Login failed with error: ' + error);
            }
        );
    }
    async googleLogin(){
        GoogleSignin.configure();
        this.setState({googleLoading:true});
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            let user:IUserState={
                fullName:userInfo.user.name,
                profileImageUrl:userInfo.user.photo,
            }
            this.saveUser(user);

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                alert("play")
            } else {
                alert("error")
                // some other error happened
            }
        }finally {
            this.setState({googleLoading:false});
        }
    }
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <View style={{flex:1,padding:10}}>
                <ProfileInfo/>
                <View style={{flex:0.3,justifyContent:'center',alignItems:'center'}}>
                    <View style={{flexDirection:'row',width:'100%',flex:0.15,justifyContent:'space-between'}}>
                        <AppButton text={'facebook'} icon={require('../assets/facebook.png')} onPress={()=>this.faceBookLogin()} containerStyle={{flex:0.5,backgroundColor:'blue'}} isLoading={this.state.fbLoading}/>
                        <AppButton text={'google'} icon={require('../assets/google.png')} containerStyle={{flex:0.4,backgroundColor:'#ef4046'}} onPress={()=>this.googleLogin()} isLoading={this.state.googleLoading}/>
                    </View>

                </View>

            </View>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
/*
 <TouchableOpacity style={{flex:0.5,backgroundColor:'red'}} onPress={()=>this.faceBookLogin()}>
                            <ActivityIndicator style={{marginTop:10,display:this.state.loading?'flex':'none'}}/>
                        </TouchableOpacity>
Error: Actions must be plain objects. Use custom middleware for async actions.

This error is located at:
    in Login (created by ConnectFunction)
    in ConnectFunction (at SceneView.js:9)
    in SceneView (at StackViewLayout.tsx:900)
    in RCTView (at createAnimatedComponent.js:151)
    in AnimatedComponent (at StackViewCard.tsx:106)
    in RCTView (at createAnimatedComponent.js:151)
    in AnimatedComponent (at screens.native.js:101)
    in Screen (at StackViewCard.tsx:93)
    in Card (at createPointerEventsContainer.tsx:95)
    in Container (at StackViewLayout.tsx:975)
    in RCTView (at screens.native.js:132)
    in ScreenContainer (at StackViewLayout.tsx:384)
    in RCTView (at createAnimatedComponent.js:151)
    in AnimatedComponent (at StackViewLayout.tsx:374)
    in PanGestureHandler (at StackViewLayout.tsx:367)
    in StackViewLayout (at withOrientation.js:30)
    in withOrientation (at StackView.tsx:104)
    in RCTView (at Transitioner.tsx:267)
    in Transitioner (at StackView.tsx:41)
    in StackView (at createNavigator.js:80)
    in Navigator (at createKeyboardAwareNavigator.js:12)
    in KeyboardAwareNavigator (at create-redux-container.js:93)
    in NavigatorReduxWrapper (at router.tsx:110)
    in Router (created by ConnectFunction)
    in ConnectFunction (at src/index.tsx:24)
    in Provider (at dva.tsx:24)
    in Unknown (at renderApplication.js:40)
    in RCTView (at AppContainer.js:101)
    in RCTView (at AppContainer.js:119)
    in AppContainer (at renderApplication.js:39)

dispatch
    redux.js:206:22
<anonymous>
    middleware.js:39:24
<anonymous>
    redux-logger.js:1:7808
<anonymous>
    middleware.js:72:26
componentDidMount
    Login.tsx:33:8
commitRootImpl
    [native code]:0
commitRoot
    [native code]:0
runRootCallback
    [native code]:0
batch$argument_0
    Subscription.js:25:12
notifyNestedSubs
    Subscription.js:98:4
handleChangeWrapper
    Subscription.js:103:6
handleChangeWrapper
    [native code]:0
dispatch
    redux.js:228:14
<anonymous>
    middleware.js:39:24
<anonymous>
    redux-logger.js:1:7808
<anonymous>
    middleware.js:72:26
setTimeout$argument_0
    Splash.tsx:15:33
tryCatch
    runtime.js:45:44
invoke
    runtime.js:271:30
tryCatch
    runtime.js:45:44
invoke
    runtime.js:135:28
Promise$argument_0
    runtime.js:170:17
tryCallTwo
    core.js:45:7
doResolve
    core.js:200:23
Promise
    core.js:66:12
Promise$argument_0
    runtime.js:169:27
enqueue
    runtime.js:192:38
exports.async
    runtime.js:216:8
setTimeout$argument_0
    Splash.tsx:14:19
callFunctionReturnFlushedQueue
    [native code]:0

 */
