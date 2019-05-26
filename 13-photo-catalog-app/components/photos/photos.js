import { Body, Container, Header, Icon, Left, ListItem, Right, Text, Thumbnail, Title } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import PhotoGrid from 'react-native-image-grid';
import { actionGetAllPhotos, photosList, photosListHeadersIndex } from '../../stores/modules/photos';

class Photos extends React.Component {
  componentWillMount() {
    this.props.actionGetAllPhotos();
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#2196F3' }} iosBarStyle="light-content">
          <Body>
            <Title style={{ color: 'white' }}>Photos</Title>
          </Body>
        </Header>
        <PhotoGrid
          data={this.props.photos}
          itemsPerRow={3}
          //You can decide the item per row
          itemMargin={1}
          itemPaddingHorizontal={1}
          renderItem={this._renderItem}
        />
      </Container>
    );
  }

  _renderItem = (item, itemSize, itemPaddingHorizontal) => {
    //Single item of Grid
    return (
      <TouchableOpacity
        key={item.id}
        style={{
          width: itemSize,
          height: itemSize,
          paddingHorizontal: itemPaddingHorizontal
        }}
        onPress={() => {
          this._handleClick(item);
        }}>
        <Image resizeMode="cover" style={{ flex: 1 }} source={{ uri: item.image }} />
      </TouchableOpacity>
    );
  };

  _handleClick = photo => {
    this.props.navigation.navigate('Photo', {
      photo
    });
  };
}

Photos.propTypes = { photos: PropTypes.array, stickyHeadersIndex: PropTypes.array };

const mapStateToProps = state => ({ photos: state.photos, stickyHeadersIndex: photosListHeadersIndex(state) });

const mapDispatchToProps = dispatch => bindActionCreators({ actionGetAllPhotos }, dispatch);

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(Photos);
