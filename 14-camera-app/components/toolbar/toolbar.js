import React from 'react';
import { Camera } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { styles } from './toolbar.styles';

const { FlashMode, Type: CameraType } = Camera.Constants;

export const Toolbar = ({
  cameraType = CameraType.back,
  capturing = false,
  flashMode = FlashMode.off,
  onCaptureIn,
  onCaptureOut,
  onLongCapture,
  onShortCapture,
  setCameraType,
  setFlashMode
}) => (
  <Grid style={styles.container}>
    <Row>
      <Col style={styles.alignCenter}>
        <TouchableOpacity
          onPress={() => setFlashMode(flashMode === FlashMode.on ? FlashMode.off : FlashMode.on)}>
          <Ionicons name={flashMode === FlashMode.on ? 'md-flash' : 'md-flash-off'} color="white" size={32} />
        </TouchableOpacity>
      </Col>
      <Col style={styles.alignCenter}>
        <TouchableWithoutFeedback
          onPress={onShortCapture}
          onPressIn={onCaptureIn}
          onPressOut={onCaptureOut}
          onLongPress={onLongCapture}>
          <View style={[styles.button, capturing && styles.buttonActive]}>
            {capturing && <View style={styles.buttonActiveIndicator} />}
          </View>
        </TouchableWithoutFeedback>
      </Col>
      <Col style={styles.alignCenter}>
        <TouchableOpacity
          onPress={() => setCameraType(cameraType === CameraType.back ? CameraType.front : CameraType.back)}>
          <Ionicons name="md-reverse-camera" color="white" size={32} />
        </TouchableOpacity>
      </Col>
    </Row>
  </Grid>
);
