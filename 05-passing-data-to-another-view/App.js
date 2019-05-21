import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { BlankPage } from './components/blank-page/blank-page';
import { HomePage } from './components/home-page/home-page';

const HomeStack = createStackNavigator(
  {
    Home: HomePage,
    BlankPage: BlankPage
  },
  {
    headerMode: 'none'
  }
);

const AppNavigator = createAppContainer(
  createSwitchNavigator({
    App: HomeStack
  })
);

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}
