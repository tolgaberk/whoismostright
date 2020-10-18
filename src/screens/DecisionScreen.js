import React, {useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RemoveIcon from '../assets/icons/removeIcon';
import R from '../assets/R';
import {AddElementModal} from '../components/AddElementModal';
import {HeaderBar} from '../components/HeaderBar';
import {PlusIcon} from '../components/PlusIcon';
import firestore from '@react-native-firebase/firestore';
import * as Animatable from 'react-native-animatable';

let setResultAlertContent;

const DecisionScreen = ({navigation, route}) => {
  const {subject} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible((x) => !x);
  const [choices, setChoices] = useState(subject.data.options);

  const removeChoice = (itemName) => {
    const newChoices = [...choices].filter((item) => item !== itemName);
    setChoices(newChoices);
    saveToFirestore(newChoices);
  };

  const onChoiceAdd = (choice) => {
    if (!choices.find((item) => item === choice)) {
      const newChoices = [...choices];
      newChoices.push(choice);
      setChoices(newChoices);
      saveToFirestore(newChoices);
    } else {
      Alert.alert(
        'Aynısı var',
        'Bu seçenek zaten var ya.\n\nAa az bişey bakın be.',
      );
    }
  };

  const saveToFirestore = async (newChoices) => {
    await firestore()
      .collection('subjects')
      .doc(subject.id)
      .set({...subject.data, options: newChoices});
  };

  const selectChoice = async () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    await firestore()
      .collection('subjects')
      .doc(subject.id)
      .set({...subject.data, chosenOption: choices[randomIndex]});
    setResultAlertContent(choices[randomIndex]);
  };
  return (
    <View style={styles.container}>
      <HeaderBar
        leftIsBack
        toggleDrawer={navigation.goBack}
        title={subject.data.name}
        RightComponent={<PlusIcon toggleModal={toggleModal} />}
      />
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={choices}
        renderItem={({item, index}) => (
          <DecisionCard
            item={item}
            removeItem={removeChoice}
            delay={50 * index + 1}
          />
        )}
        keyExtractor={(item) => item}
      />
      <AddElementModal
        choice
        modalVisible={modalVisible}
        toggleModal={toggleModal}
        onElementAddition={onChoiceAdd}
      />
      <TouchableOpacity onPress={selectChoice} style={styles.selectButton}>
        <Text style={styles.selectButtonText}>Karar Ver!</Text>
      </TouchableOpacity>
      <ResultAlert />
    </View>
  );
};

function ResultAlert() {
  const [result, setResult] = useState(null);
  setResultAlertContent = setResult;
  const resultViewRef = useRef();
  const closeResult = async () => {
    await resultViewRef.current?.fadeOutDown(300);
    setResult(null);
  };
  return result ? (
    <Animatable.View
      style={styles.resultContainer}
      animation="fadeInUp"
      ref={resultViewRef}
      duration={300}>
      <TouchableOpacity onPress={closeResult} style={styles.resultSubContainer}>
        <Text style={styles.resultLightText}>Kararımız</Text>
        <Text style={styles.resultBoldText}>{result}</Text>
        <TouchableOpacity onPress={closeResult} style={styles.resultOkButton}>
          <Text style={styles.resultOkButtonText}>Peki</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animatable.View>
  ) : null;
}
const DecisionCard = ({item, removeItem, delay}) => {
  const viewRef = useRef();
  const removeSubject = async () => {
    await viewRef.current?.fadeOutRight(300);
    removeItem(item);
  };
  return (
    <Animatable.View
      style={styles.subjectCardContainer}
      animation="fadeInLeft"
      duration={300}
      delay={delay}
      ref={viewRef}>
      <Text style={styles.decisionCardText}>{item}</Text>
      <TouchableOpacity
        onPress={removeSubject}
        style={styles.subjectCardRemoveIcon}>
        <RemoveIcon color={R.colors.white} width={32} height={32} />
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  resultBoldText: {
    color: R.colors.accent,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 22,
  },
  resultLightText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Montserrat-Light',
  },
  decisionCardText: {flex: 1, paddingRight: 8},
  resultOkButtonText: {color: R.colors.white, fontSize: 18},
  resultOkButton: {
    backgroundColor: R.colors.primary,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 16,
  },
  resultSubContainer: {
    backgroundColor: R.colors.background,
    width: '70%',
    padding: 16,
    borderRadius: 5,
  },
  resultContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButtonText: {color: R.colors.white, fontSize: 24},
  container: {flex: 1},
  subjectCardRemoveIcon: {backgroundColor: R.colors.primary, borderRadius: 24},
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
  selectButton: {
    backgroundColor: R.colors.primary,
    margin: 16,
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListContainer: {margin: 4},
});

export default DecisionScreen;
