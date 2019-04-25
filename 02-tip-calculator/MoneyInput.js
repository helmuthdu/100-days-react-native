import React, { Component } from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';

export class MoneyInput extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
    maskType: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    currencySymbol: PropTypes.string,
    currencySeparator: PropTypes.string
  };

  state = {
    value: this.props.value ? this.props.value : ''
  };

  _onChangeText(value) {
    value = value.split(this.props.currencySymbol).join('');

    if (value !== '') {
      if (this.props.maskType === 'money') {
        value = value.replace(/\D/g, '');

        value =
          this.props.currencySymbol +
          value.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1' + this.props.currencySeparator);
      }

      if (this.props.maskType === 'phone') {
        if (value.length < 15) {
          value = value.replace(/\D/g, '');
          value = value.replace(/^(\d\d)(\d)/g, '($1) $2');
          value = value.replace(/(\d{4})(\d)/, '$1-$2');
          1;
        } else if (value.length === 15) {
          value = value.replace(/\D/g, '');
          value = value.replace(/^(\d\d)(\d)/g, '($1) $2');
          value = value.replace(/(\d{5})(\d)/, '$1-$2');
        } else {
          value = value.substring(0, value.length - 1);
        }
      }
      if (this.props.onChangeValue) {
        this.props.onChangeValue(value);
      }
    }

    this.setState({ value: value });
  }

  render() {
    const defaultStyles = {
      padding: 10
    };

    return (
      <TextInput
        {...this.props}
        value={this.state.value}
        style={this.props.style ? this.props.style : defaultStyles}
        onChangeText={value => {
          this.props.onChangeText((value.match(/\d/g) || []).join(''));
          this._onChangeText(value);
        }}
      />
    );
  }
}
