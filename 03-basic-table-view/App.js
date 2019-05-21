import { Body, Button, Container, Content, Header, Icon, Left, Right, Title, View } from 'native-base';
import React from 'react';
import { SuperHeroList } from './components/super-hero-list/super-hero-list';

export default class App extends React.Component {
  state = {
    list: ['Iron Man', 'Spider Man', 'Batman']
  };

  render() {
    const { list } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this._handleClick} title="edit">
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View>
            <SuperHeroList list={list} onClick={this._handleClick} />
          </View>
        </Content>
      </Container>
    );
  }

  _handleClick = () => {
    console.log('CLICKED!');
  };
}
