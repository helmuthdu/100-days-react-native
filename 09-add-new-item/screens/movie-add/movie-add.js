import { Body, Button, Container, Content, Header, Icon, Input, Left, Right, Text, Title } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { actionAddMovie } from '../../stores/modules/movies';

import { styles } from './movie-add.styles';

export class MovieAdd extends Component {
  state = {
    name: ''
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent title="back" onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
              <Text>Movies</Text>
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>New Movie</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Field name="name" component={this.renderInput} />
        </Content>
      </Container>
    );
  }

  renderInput = ({ input: { onChange, ...restInput } }) => {
    return (
      <Input
        placeholder="Movie Title"
        onChangeText={onChange}
        onEndEditing={() => {
          this.props.actionAddMovie(this.props.form.values.name);
          this.props.navigation.goBack();
        }}
        {...restInput}
      />
    );
  }
}

MovieAdd.propTypes = { onSubmit: PropTypes.func, actionAddMovie: PropTypes.func };

const mapStateToProps = state => ({
  form: state.form.movie
});

const mapDispatchToProps = dispatch => bindActionCreators({ actionAddMovie }, dispatch);

const enhance = compose(
  reduxForm({ form: 'movie' }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(MovieAdd);
