import { Body, Button, Container, Content, Header, Left, ListItem, Right, Text, Title } from 'native-base';
import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

export default class App extends React.Component {
  state = {
    isRefreshing: false,
    list: ['Milk', 'Apples', 'Ham', 'Eggs']
  };

  render() {
    const { list } = this.state;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this._handleClick} title="edit">
              <Text>Edit</Text>
            </Button>
          </Left>
          <Body>
            <Title>Groceries</Title>
          </Body>
          <Right>
            <Button transparent onPress={this._handleClick} title="add">
              <Text>Add</Text>
            </Button>
          </Right>
        </Header>
        <Content
          refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._handleRefresh} />}>
          <FlatList
            keyExtractor={this._keyExtractor}
            data={list}
            renderItem={({ item, index }) => (
              <ListItem onPress={this._handleClick}>
                <Text>{item}</Text>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
  _keyExtractor = (item, index) => item;

  _handleClick = () => {
    console.log('CLICKED!');
  };

  _handleRefresh = () => {
    this.setState({ isRefreshing: true });
    setTimeout(() => {
      this.setState({
        isRefreshing: false,
        list: this.state.list.includes('Banana')
          ? ['Milk', 'Apples', 'Ham', 'Eggs']
          : ['Banana', 'Chocolatte', 'Milk', 'Apples', 'Ham', 'Eggs']
      });
    }, 1000);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
