import React, {useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import R from '../assets/R';
import RemoveIcon from '../assets/icons/removeIcon';
import * as Animatable from 'react-native-animatable';
export const SubjectCard = ({item, navigate, removeItem}) => {
  const cardRef = useRef();
  const navigateToSubject = () => {
    navigate('Karar versek mi artık?', {
      screen: 'decisionScreen',
      params: {subject: item},
    });
  };
  const removeSubject = async () => {
    await cardRef.current?.fadeOutRight(300);
    removeItem(item.id);
  };
  const {name, chosenOption} = item.data;
  return (
    <Animatable.View animation="fadeInLeft" duration={300} ref={cardRef}>
      <TouchableOpacity
        onPress={navigateToSubject}
        style={styles.subjectCardContainer}>
        <View style={styles.subjectTextContainer}>
          <Text style={styles.subjectNameText}>{name}</Text>
          {chosenOption !== '' && (
            <Text style={styles.chosenOption}>
              Kararımız <Text>{chosenOption}</Text>
            </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={removeSubject}
          style={styles.subjectCardRemoveIcon}>
          <RemoveIcon color={R.colors.white} width={32} height={32} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  subjectTextContainer: {flex: 1, marginRight: 8},
  subjectNameText: {flex: 1},
  subjectCardRemoveIcon: {backgroundColor: R.colors.primary, borderRadius: 24},
  chosenOption: {color: R.colors.softGray, flex: 1},
  subjectCardContainer: {
    backgroundColor: R.colors.white,
    borderRadius: 5,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 8,
    marginVertical: 4,
    padding: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
});
