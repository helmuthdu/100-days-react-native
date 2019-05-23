import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Right,
  Thumbnail,
  Title,
  View
} from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';

function Contact(props) {
  const { user } = props.navigation.state.params;
  return (
    <Container>
      <Header style={{ backgroundColor: '#2196F3' }} iosBarStyle="light-content">
        <Left>
          <Button transparent title="back" light onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={{ color: 'white' }}>{user.name}</Title>
        </Body>
        <Right />
      </Header>
      <Content bounces={false} style={styles.content}>
        <View style={styles.thumbnail}>
          <Thumbnail large source={{ uri: user.avatar }} />
        </View>
        <Form>
          <Item stackedLabel first style={styles.item}>
            <Label style={styles.fontBlue}>Name</Label>
            <Input readonly value={user.name} />
          </Item>
          <Item stackedLabel style={styles.item}>
            <Label style={styles.fontBlue}>Mobile</Label>
            <Input readonly value={user.phoneNumber} />
          </Item>
          <Item stackedLabel style={styles.item}>
            <Label style={styles.fontBlue}>Email</Label>
            <Input readonly value={user.email} />
          </Item>
          <Item stackedLabel style={styles.item}>
            <Label style={styles.fontBlue}>Notes</Label>
            <Input multiline readonly value={user.notes} />
          </Item>
        </Form>
      </Content>
    </Container>
  );
}

Contact.propTypes = { user: PropTypes.array };

const styles = StyleSheet.create({
  content: {
    paddingLeft: 8,
    paddingVertical: 10
  },
  item: {
    borderBottomWidth: 0
  },
  thumbnail: {
    padding: 10
  },
  fontBlue: {
    color: '#2196F3'
  }
});

export default Contact;
