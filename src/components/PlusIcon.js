import React from 'react';
import {TouchableOpacity} from 'react-native';
import AddIcon from '../assets/icons/addIcon';

export function PlusIcon({toggleModal}) {
  return (
    <TouchableOpacity onPress={toggleModal}>
      <AddIcon color="white" height={32} width={32} />
    </TouchableOpacity>
  );
}
