import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import R from '../assets/R';
import {HeaderBar} from '../components/HeaderBar';
import firestore from '@react-native-firebase/firestore';
import {AddElementModal} from '../components/AddElementModal';
import {PlusIcon} from '../components/PlusIcon';
import {SubjectCard} from '../components/SubjectCard';

const DecisionScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible((x) => !x);
  const [subjects, setSubjects] = useState([]);
  const removeSubject = async (itemId) => {
    await firestore().collection('subjects').doc(itemId).delete();
  };
  const addSubject = async (subjectName) => {
    if (
      subjects === null ||
      !subjects.find((item) => item.data.name === subjectName)
    ) {
      await firestore()
        .collection('subjects')
        .add({name: subjectName, options: [], chosenOption: ''});
    } else {
      Alert.alert('Aynısı', 'Bu konu zaten vaar.');
    }
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('subjects')
      .onSnapshot((incomingSubjects) => {
        let newSubjects = incomingSubjects.docs.map((item) => ({
          id: item.id,
          data: item.data(),
        }));
        if (!newSubjects.length) {
          newSubjects = null;
        }
        setSubjects(newSubjects);
      });
    return subscriber;
  }, []);
  return (
    <View style={styles.globalContainer}>
      <HeaderBar
        toggleDrawer={navigation.toggleDrawer}
        title={'Karar versek mi artık?'}
        RightComponent={<PlusIcon toggleModal={toggleModal} />}
      />
      <View style={styles.subContainer}>
        {subjects === null ? (
          <ErrorScreen />
        ) : subjects.length ? (
          <FlatList
            contentContainerStyle={styles.flatListContainer}
            data={subjects}
            keyExtractor={(item) => item.data.name}
            renderItem={({item, index}) => (
              <SubjectCard
                key={item.id + index}
                item={item}
                navigate={navigation.navigate}
                removeItem={removeSubject}
              />
            )}
          />
        ) : (
          <LoadingScreen />
        )}
      </View>
      <AddElementModal
        modalVisible={modalVisible}
        toggleModal={toggleModal}
        onElementAddition={addSubject}
      />
    </View>
  );
};
export default DecisionScreen;

const styles = StyleSheet.create({
  flatListContainer: {margin: 4},
  globalContainer: {flex: 1},
  subContainer: {flex: 1},
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function LoadingScreen() {
  return (
    <View style={styles.centerView}>
      <ActivityIndicator size="large" color={R.colors.primary} />
    </View>
  );
}

function ErrorScreen() {
  return (
    <View style={styles.centerView}>
      <Text style={{color: R.colors.softGray}}>Konu Eklememişiz :(</Text>
    </View>
  );
}
