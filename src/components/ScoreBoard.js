import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {styles} from '../styles';
import {Button} from './Button';
import {NotificationController} from './NotificationBox';
import getMessage from './Messages';

export const ScoreBoard = ({user: userInfo}) => {
  const [user, setUser] = useState({});
  const [remoteUserRef, setRemoteUserRef] = useState({});
  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(userInfo.uid)
      .onSnapshot((documentSnapshot) => {
        setUser(documentSnapshot.data());
      });
    const userRef = firestore().collection('users').doc(userInfo.uid);
    setRemoteUserRef(userRef);
    return () => subscriber();
  }, [userInfo]);

  const minusOnPress = () => {
    if (user.score - 1 >= 0) {
      remoteUserRef.set({score: user.score - 1, name: user.name});
      showMinusNotification(user);
    }
    if (user.score - 1 < 0 && !NotificationController.barVisible) {
      showBelowMinusNotification();
    }
  };
  const plusOnPress = () => {
    remoteUserRef.set({score: user.score + 1, name: user.name});
    showPlusNotification(user);
  };
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardText}>{userInfo.name}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>{user.score}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button type="substract" onPress={minusOnPress} />
        <Button type="add" onPress={plusOnPress} />
      </View>
    </View>
  );
};
function showPlusNotification(user) {
  if (!NotificationController.barVisible) {
    NotificationController.setContent(getMessage(user.name));
    NotificationController.showNofitication();
  }
}

function showBelowMinusNotification() {
  NotificationController.setContent(getMessage('minusMessages'));
  NotificationController.showNofitication();
}

function showMinusNotification(user) {
  if (!NotificationController.barVisible) {
    NotificationController.setContent(getMessage('minusMessages' + user.name));
    NotificationController.showNofitication();
  }
}
