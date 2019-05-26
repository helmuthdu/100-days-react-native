import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { styles } from './gallery.styles';

export const Gallery = ({ captures = [] }) => (
  <ScrollView horizontal={true} style={styles.container}>
    {captures.map(({ uri }) => (
      <View style={styles.canvas} key={uri}>
        <Image source={{ uri }} style={styles.image} />
      </View>
    ))}
  </ScrollView>
);
