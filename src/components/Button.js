import React from 'react';
import {TouchableOpacity} from 'react-native';
import AddIcon from '../assets/icons/addIcon';
import RemoveIcon from '../assets/icons/removeIcon';
import {styles, minUnit} from '../styles';

export const Button = ({onPress, type}) => {
  const Icon = type === 'add' ? AddIcon : RemoveIcon;
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
      <Icon color="#656565" height={minUnit * 1.7} width={minUnit * 1.7} />
    </TouchableOpacity>
  );
};
