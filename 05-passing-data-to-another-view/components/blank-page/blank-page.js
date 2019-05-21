import { Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title } from 'native-base';
import React from 'react';

import { styles } from './blank-page.style';

export const BlankPage = (props) => {
  const param = props.navigation.state.params;
  return (
    <Container style={styles.container}>
      <Header>
        <Left>
          <Button transparent title="back" onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ flex: 3 }}>
          <Title>{param ? param.query : 'Blank Page'}</Title>
        </Body>
        <Right />
      </Header>

      <Content padder>
        <Text>{param !== undefined ? param.query : 'Create Something Awesome . . .'}</Text>
      </Content>
    </Container>
  );
};
