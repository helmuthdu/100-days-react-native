import dateFns from 'date-fns';
import { H1, Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

export default class App extends React.Component {
  state = {
    currentDate: new Date()
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({ currentDate: new Date() });
    }, 1000);
  }

  render() {
    const {currentDate} = this.state;
    return (
      <View style={styles.container}>
        <Text>Current Date and Time</Text>
        <H1>{dateFns.format(currentDate, 'MMM DD, YYYY, hh:mm:ss A')}</H1>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
