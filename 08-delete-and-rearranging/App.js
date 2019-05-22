import { Body, Button, Container, Content, Header, Icon, Left, Right, SwipeRow, Text, Title, View } from 'native-base';
import React from 'react';
import { TouchableOpacity, RefreshControl, StyleSheet, Dimensions } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

const deviceDimensions = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    isMoving: false,
    isRefreshing: false,
    data: ['Milk', 'Apples', 'Ham', 'Eggs']
  };

  render() {
    const { data, isMoving } = this.state;

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
          bounces={!isMoving}
          refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._handleRefresh} />}>
          <DraggableFlatList
            stickyHeaderIndices={[0]}
            keyExtractor={this._keyExtractor}
            data={data}
            scrollPercent={5}
            onMoveBegin={() => this.setState({ isMoving: true })}
            onMoveEnd={({ data }) => this.setState({ data, isMoving: false })}
            renderItem={this.renderItem}
          />
        </Content>
      </Container>
    );
  }
  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    const { data } = this.state;
    return (
      <SwipeRow
        leftOpenValue={75}
        rightOpenValue={-75}
        left={
          <Button success title="add" onPress={() => alert(item)}>
            <Icon active name="add" />
          </Button>
        }
        body={
          <TouchableOpacity
            style={styles.item}
            onLongPress={move}
            onPressOut={moveEnd}>
            <Text style={{width: deviceDimensions.width}}>{item}</Text>
          </TouchableOpacity>
        }
        right={
          <Button danger title="remove" onPress={() => this.setState({ data: data.filter((v, i) => i !== index) })}>
            <Icon active name="trash" />
          </Button>
        }
      />
    );
  };

  _keyExtractor = (item, index) => item;

  _handleClick = () => {
    console.log('CLICKED!');
  };

  _handleRefresh = () => {
    this.setState({ isRefreshing: true });
    setTimeout(() => {
      this.setState({
        isRefreshing: false,
        data: this.state.data.includes('Banana')
          ? ['Milk', 'Apples', 'Ham', 'Eggs']
          : ['Banana', 'Chocolate', 'Milk', 'Apples', 'Ham', 'Eggs']
      });
    }, 1000);
  };
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    height: 50,
    justifyContent: 'center'
  }
});
