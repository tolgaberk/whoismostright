import React, {useEffect, useRef, useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import R from '../assets/R';

export const AddElementModal = ({
  modalVisible,
  toggleModal,
  onElementAddition,
  choice,
}) => {
  const [text, setText] = useState('');
  const addElement = () => {
    onElementAddition(text);
    toggleModal();
    setText('');
  };
  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        textInputRef.current?.focus();
      }, 50);
    }
  }, [modalVisible]);
  const textInputRef = useRef();
  return (
    <Modal visible={modalVisible} animationType="fade" transparent>
      <TouchableOpacity onPress={toggleModal} style={styles.backdropStyle}>
        <View
          style={styles.modalContainer}
          onStartShouldSetResponder={() => true}>
          <Text style={styles.titleStyle}>
            {choice ? 'Seçeneklerimiz neler?' : 'Karar verilecek konu?'}
          </Text>
          <TextInput
            ref={textInputRef}
            autoFocus
            onChangeText={setText}
            value={text}
            style={styles.textInputStyle}
          />
          <TouchableOpacity style={styles.ekleButton} onPress={addElement}>
            <Text style={{color: R.colors.white}}>Ekle</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    padding: 16,
    width: '80%',
    backgroundColor: R.colors.background,
    borderRadius: 5,
  },
  ekleButton: {
    backgroundColor: R.colors.accent,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  titleStyle: {borderRadius: 8, textAlign: 'center'},
  textInputStyle: {
    marginVertical: 16,
    backgroundColor: R.colors.white,
    borderRadius: 5,
    paddingHorizontal: 16,
  },
  backdropStyle: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
