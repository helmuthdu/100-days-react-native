import { Body, Container, Header, Title } from 'native-base';
import React from 'react';
import StickyList from './components/sticky-list/sticky-list';

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Things</Title>
          </Body>
        </Header>
        <StickyList />
      </Container>
    );
  }
}
