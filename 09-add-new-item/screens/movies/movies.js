import { Body, Button, Container, Content, Header, Icon, Left, ListItem, Right, Text, Title } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

export class Movies extends Component {
  render() {
    const { movies } = this.props;
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Movies</Title>
          </Body>
          <Right>
            <Button transparent onPress={this._handleAdd} title="add">
              <Icon name="add" />
            </Button>
          </Right>
        </Header>
        <Content bounces={false}>
          <FlatList
            bounces={false}
            keyExtractor={this._keyExtractor}
            data={movies}
            renderItem={({ item, index }) => (
              <ListItem onPress={this._handleClick}>
                <Text>{item}</Text>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
  _keyExtractor = (item, index) => item;

  _handleAdd = () => {
    this.props.navigation.navigate('MovieAdd');
  };

  _handleClick = () => {
    console.log('CLICKED');
  };
}

Movies.propTypes = { onPress: PropTypes.func };

const mapStateToProps = state => ({ movies: state.movies });

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(Movies);
