import { Body, Button, Container, Content, Header, Icon, Left, Right, SwipeRow, Text, Title, View } from 'native-base';
import React from 'react';
import { TouchableOpacity, RefreshControl, StyleSheet, Dimensions } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

const deviceDimensions = Dimensions.get('window');

const dataset = {
  set1: [
    { id: 1, name: 'Milk' },
    { id: 2, name: 'Apples' },
    { id: 3, name: 'Strawberry' },
    { id: 4, name: 'Eggs' },
    { id: 5, name: 'Milkshake' }
  ],
  set2: [
    { id: 6, name: 'Banana' },
    { id: 7, name: 'Chocolate' },
    { id: 8, name: 'Juice' },
    { id: 9, name: 'Pear' },
    { id: 10, name: 'Orange' },
    { id: 11, name: 'Chicken' }
  ]
};

export default class App extends React.Component {
  state = {
    isMoving: false,
    isRefreshing: false,
    data: dataset.set1
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
            scrollPercent={1}
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
          <Button success title="add" onPress={() => alert(item.name)}>
            <Icon active name="add" />
          </Button>
        }
        body={
          <TouchableOpacity style={styles.item} onLongPress={move} onPressOut={moveEnd}>
            <Text style={{ width: deviceDimensions.width }}>{item.name}</Text>
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

  _keyExtractor = (item, index) => String(item.id);

  _handleClick = () => {
    console.log('CLICKED!');
  };

  _handleRefresh = () => {
    this.setState({ isRefreshing: true });
    setTimeout(() => {
      this.setState({
        isRefreshing: false,
        data: this.state.data.map(i => i.name).includes('Banana') ? dataset.set1 : dataset.set2
      });
    }, 1000);
  };
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 15,
    height: 28,
    justifyContent: 'center'
  }
});
