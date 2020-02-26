import React, { PureComponent } from 'react'
import { BackHandler, Animated, Easing } from 'react-native'
import {
  NavigationActions,
  NavigationState,
} from 'react-navigation'
import {
  createReactNavigationReduxMiddleware,
  createNavigationReducer, createReduxContainer,
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'


import {AppState }from './models/states/app';

import {createStackNavigator} from 'react-navigation-stack';
import Splash from "./Screens/Splash";
import Login from "./Screens/Login";
import Home from "./Screens/Home";
import Movies from "./Screens/Movies";
import Movie from "./Screens/Movie";
import FavMovies from "./Screens/FavMovies";



const AppNavigator = createStackNavigator(
  {
    Splash: { screen: Splash },
    Login: { screen: Login },
    Home:{screen:Home},
    Movies:{screen:Movies},
    Movie:{screen:Movie},
    FavMovies:{screen:FavMovies}
  },
  {
    // headerMode: 'none',
    headerMode: 'float',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  }
);

export const routerReducer = createNavigationReducer(AppNavigator)

export const routerMiddleware = createReactNavigationReduxMiddleware<IProps>(
    (state: { router: any }) => state.router
)
const App = createReduxContainer(AppNavigator, 'root')

function getActiveRouteName(navigationState:NavigationState):any {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getActiveRouteName(route)
  }
  return route.routeName
}
interface IProps {
  app: AppState;
  router: any;
  dispatch: any;
}

class Router extends PureComponent<IProps> {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }


  backHandle = () => {
    const currentScreen = getActiveRouteName(this.props.router);
    if (currentScreen === 'Login') {
      return true;
    }
    if (currentScreen !== 'Home') {
      this.props.dispatch(NavigationActions.back());
      return true;
    }
    return false;
  }

  render() {
    const { dispatch, router, app } = this.props;


    return <App dispatch={dispatch} state={router} />
  }
}

// @connect(({ app, router }) => ({ app, router }))
function mapStateToProps(state: any) {
  return {

    router: state.router,
    app: state.app
  };
}
export default connect(mapStateToProps)(Router);
// export default Router
