import { Body, Button, Container, Content, Header, Text, Input, Left, Right, Title } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export class HomePage extends Component {
  state = {
    query: ''
  };

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent onPress={this._handleClick} title="edit">
              <Text>Done</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <View>
            <Input placeholder="Search" onChangeText={query => this.setState({ query })} />
          </View>
        </Content>
      </Container>
    );
  }

  _handleClick = () => {
    this.props.navigation.navigate('BlankPage', {
      query: this.state.query
    });
  };
}

HomePage.propTypes = { onPress: PropTypes.func };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
