import { Body, Container, Header, Icon, Left, ListItem, Right, Text, Thumbnail, Title } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { actionGetAllUsers, usersList, usersListHeadersIndex } from '../../stores/modules/users';

class Contacts extends React.Component {
  componentWillMount() {
    this.props.actionGetAllUsers();
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#2196F3' }} iosBarStyle="light-content">
          <Body>
            <Title style={{ color: 'white' }}>Contacts</Title>
          </Body>
        </Header>
        <FlatList
          data={this.props.users}
          renderItem={this._renderItem}
          keyExtractor={item => item.id}
          stickyHeaderIndices={this.props.stickyHeadersIndex}
        />
      </Container>
    );
  }

  _renderItem = ({ item }) => {
    if (item.header) {
      return (
        <ListItem itemDivider>
          <Left />
          <Body style={{ marginRight: 40 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
          </Body>
          <Right />
        </ListItem>
      );
    } else if (!item.header) {
      return (
        <ListItem avatar onPress={() => this._handleClick(item)}>
          <Left>
            <Thumbnail source={{ uri: item.avatar }} />
          </Left>
          <Body>
            <Text>{item.name}</Text>
            <Text note numberOfLines={1} />
          </Body>
          <Right style={{ justifyContent: 'center', marginBottom: 8 }}>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      );
    }
  };

  _handleClick = user => {
    this.props.navigation.navigate('Contact', {
      user
    });
  };
}

Contacts.propTypes = { users: PropTypes.array, stickyHeadersIndex: PropTypes.array };

const mapStateToProps = state => ({ users: usersList(state), stickyHeadersIndex: usersListHeadersIndex(state) });

const mapDispatchToProps = dispatch => bindActionCreators({ actionGetAllUsers }, dispatch);

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(Contacts);
