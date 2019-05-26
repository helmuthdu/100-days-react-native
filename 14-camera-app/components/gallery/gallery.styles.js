import { StyleSheet, Dimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    width: winWidth,
    position: 'absolute',
    height: 100,
    bottom: 100
  },
  canvas: {
    width: 75,
    height: 75,
    marginRight: 5
  },
  image: {
    width: 75,
    height: 75
  }
});
