import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  state = {
    counter: 0,
    autoIncrease: undefined
  };

  handleLongPress = () =>
    this.setState({ autoIncrease: setInterval(() => this.setState({ counter: this.state.counter + 1 }), 100) });

  handleLongPressOut = () => {
    clearInterval(this.state.autoIncrease);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <View style={styles.action}>
            <TouchableOpacity title="Reset" onPress={() => this.setState({ counter: 0 })}>
              <Text style={styles.actionButton}>Reset</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>Counter</Text>
          </View>
          <View style={styles.action} />
        </View>
        <View style={styles.content}>
          <Text style={styles.counter}>{this.state.counter}</Text>
          <TouchableOpacity
            title="TAP OR HOLD"
            onPress={() => this.setState({ counter: this.state.counter + 1 })}
            onLongPress={this.handleLongPress}
            onPressOut={this.handleLongPressOut}>
            <Text style={styles.actionButton}> TAP OR HOLD</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    flexWrap: 'wrap'
  },
  navbar: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  action: {
    flex: 1
  },
  actionButton: {
    color: '#2196F3'
  },
  header: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: '700'
  },
  content: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 0,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  counter: {
    fontSize: 72
  },
  footer: {
    flex: 1
  }
});
