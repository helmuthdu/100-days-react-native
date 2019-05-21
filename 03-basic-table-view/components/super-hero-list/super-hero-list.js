import { List, ListItem, Text } from 'native-base';
import React from 'react';
import PropTypes from 'prop-types';

export function SuperHeroList(props) {
  return (
    <List>
      {props.list.map((item, index) => (
        <ListItem key={index} onPress={props.onClick}>
          <Text>{item}</Text>
        </ListItem>
      ))}
    </List>
  );
}

SuperHeroList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired
};
