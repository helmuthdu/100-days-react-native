import React, { Component, Fragment } from 'react';
import { Text, View } from 'react-native';
import { Camera, Permissions } from 'expo';
import { styles } from './camera.styles';
import { Toolbar } from '../toolbar/toolbar';
import { Gallery } from '../gallery/gallery';

export default class extends Component {
  camera = null;

  state = {
    cameraType: Camera.Constants.Type.back,
    captures: [],
    capturing: null,
    flashMode: Camera.Constants.FlashMode.off,
    hasAllPermissions: null
  };

  async componentWillMount() {
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const gallery = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    const granted = 'granted';
    const hasAllPermissions = audio.status === granted && camera.status === granted && gallery.status === granted;

    this.setState({ hasAllPermissions });
  }

  render() {
    const { hasAllPermissions, flashMode, cameraType, capturing, captures } = this.state;

    if (hasAllPermissions === null) {
      return <View />;
    } else if (hasAllPermissions === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <Fragment>
        <View>
          <Camera style={styles.preview} ref={camera => (this.camera = camera)} />
        </View>
        {captures.length > 0 && <Gallery captures={captures} />}
        <Toolbar
          cameraType={cameraType}
          capturing={capturing}
          flashMode={flashMode}
          onCaptureIn={this.handleCaptureIn}
          onCaptureOut={this.handleCaptureOut}
          onLongCapture={this.handleLongCapture}
          onShortCapture={this.handleShortCapture}
          setCameraType={this.handleSetCameraType}
          setFlashMode={this.handleSetFlashMode}
        />
      </Fragment>
    );
  }

  handleCaptureIn = () => this.setState({ capturing: true });

  handleCaptureOut = () => {
    if (this.state.capturing) this.camera.stopRecording();
  };

  handleShortCapture = async () => {
    this.setState({ capturing: false, captures: [await this.camera.takePictureAsync(), ...this.state.captures] });
  };

  handleLongCapture = async () => {
    this.setState({ capturing: false, captures: [await this.camera.recordAsync(), ...this.state.captures] });
  };

  handleSetCameraType = cameraType => this.setState({ cameraType });

  handleSetFlashMode = flashMode => this.setState({ flashMode });
}
