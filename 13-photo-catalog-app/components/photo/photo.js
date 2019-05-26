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
  Left,
  Right,
  Text,
  Title,
  View
} from 'native-base';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo';
import React, { Component } from 'react';
import { ActionSheetIOS, Animated, Easing, Image, StyleSheet } from 'react-native';

class Photo extends Component {
  state = {
    opacity: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      easing: Easing.back(),
      useNativeDriver: true
    }).start();
  };

  render() {
    const { photo } = this.props.navigation.state.params;
    const { opacity } = this.state;

    return (
      <Container>
        <Header style={{ backgroundColor: '#2196F3' }} iosBarStyle="light-content">
          <Left>
            <Button
              transparent
              title="back"
              light
              onPress={() => this.props.navigation.goBack()}
              style={{ paddingLeft: 10 }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: 'white' }}>{photo.name}</Title>
          </Body>
          <Right>
            <Button transparent title="back" light onPress={this._handleAction}>
              <Icon name="more" />
            </Button>
          </Right>
        </Header>
        <Content bounces={false} style={styles.content}>
          <Animated.View
            style={[{ opacity }, { flex: 1 }]}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: photo.image }} />
            </View>
            <LinearGradient
              colors={['transparent', 'transparent', 'rgba(255,255,255,1)']}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: 415
              }}
            />
          </Animated.View>
          <Form>
            <Item first style={styles.item}>
              <Text style={styles.header}>
                <Icon style={styles.icon} name="heart" /> {photo.likes} likes
              </Text>
            </Item>
            <Item stackedLabel style={styles.item}>
              <Input multiline readonly value={photo.description} />
            </Item>
            <Item style={styles.item}>
              {photo.tags.map(tag => (
                <Text key={tag} style={styles.tags}>
                  #{tag}
                </Text>
              ))}
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }

  _handleAction = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Remove', 'Report', 'Share', 'Save Image', 'Copy Link'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          /* destructive action */
        }
      }
    );
  };
}

Photo.propTypes = { photo: PropTypes.array };

const styles = StyleSheet.create({
  content: {},
  item: {
    borderBottomWidth: 0,
    marginBottom: 16
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    marginBottom: 16
  },
  image: {
    aspectRatio: 600 / 600,
    width: '100%',
    height: '100%',
    maxWidth: 600,
    maxHeight: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode: 'cover'
  },
  icon: {
    fontSize: 16,
    color: '#2196F3'
  },
  header: {
    color: '#2196F3'
  },
  tags: {
    color: '#2196F3',
    padding: 5
  }
});

export default Photo;
