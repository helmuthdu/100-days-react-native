import { ImagePicker, Permissions } from 'expo';
import { Body, Button, Container, Content, Header, Icon, Textarea, Left, Right, Title, View } from 'native-base';
import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';

const deviceDimensions = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    query: '',
    image: null
  };

  async componentDidMount() {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== 'granted') {
      console.log('granted');
    } else {
      console.log('not granted');
    }
  }

  render() {
    let { image } = this.state;
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Photo Roll</Title>
          </Body>
          <Right>
            <Button transparent onPress={this._pickImage} title="photo">
              <Icon name="camera" />
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={styles.message}>
            <Textarea placeholder="Search" onChangeText={query => this.setState({ query })} />
          </View>
          <View style={styles.responsiveContainer}>
            {image && (
              <Image source={{ uri: image.uri }} style={styles.responsiveImg} resizeMode="cover" />
            )}
          </View>
        </Content>
      </Container>
    );
  }

  _pickImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!image.cancelled) {
      this.setState({ image });
    }
  };
}

const styles = StyleSheet.create({
  message: {
    padding: 20
  },
  responsiveContainer: {
    flex: 1,
    // arbitrary width that shall not be exceeded
    width: '100%',
  },
  responsiveImg: {
    // Image dimensions are known: 600, 330
    aspectRatio: 600 / 330,
    // Make sure the image stretches and shrinks
    width: '100%',
    height: '100%',
    // Make sure the image doesn't exceed it's original size
    // If you want it to exceed it's original size, then
    // don't use maxWidth / maxHeight or set their
    // value to null
    maxWidth: 600,
    maxHeight: 330,
    // center horizontally
    marginLeft: 'auto',
    marginRight: 'auto',
    // make sure, the image is resized properly:
    resizeMode: 'contain',
  }
});
