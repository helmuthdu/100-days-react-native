import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import MovieAdd from './screens/movie-add/movie-add';
import Movies from './screens/movies/movies';
import createStore from './stores';
import { stores } from './stores/modules';
import { Provider } from 'react-redux';
import { Root } from 'native-base';

const Screens = createStackNavigator(
  {
    Movies: Movies,
    MovieAdd: MovieAdd
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
