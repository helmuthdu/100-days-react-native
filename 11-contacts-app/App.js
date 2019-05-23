import { Root } from 'native-base';
import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import Contact from './components/contact/contact';
import Contacts from './components/contacts/contacts';
import createStore from './stores';
import { stores } from './stores/modules';

const Screens = createStackNavigator(
  {
    Contacts: Contacts,
    Contact: Contact,
  },
  {
    headerMode: 'none'
  }
);

const AppNavigator = createAppContainer(
  createSwitchNavigator({
    App: Screens
  })
);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    store: createStore([...stores], () => this.setState({ isLoadingComplete: false }))
  };


  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });
  }

  render() {
    return (
      <Root>
        <Provider store={this.state.store}>
          <AppNavigator />
        </Provider>
      </Root>
    );
  }
}
