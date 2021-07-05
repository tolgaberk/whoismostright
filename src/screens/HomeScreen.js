import React, {useReducer} from 'react';
import {View, StatusBar} from 'react-native';
import {styles} from '../styles';
import {HeaderBar} from '../components/HeaderBar';
import {ScoreBoard} from '../components/ScoreBoard';
import {NotificationBox} from '../components/NotificationBox';

const users = [
  {name: 'User1', uid: 'Lh8SUuITJDs7dQRFraIz'},
  {name: 'User2', uid: 'nLGImWCDkIKnHzGc8wh6'},
];

function HomeScreen({navigation}) {
  StatusBar.setBarStyle('light-content');
  return (
    <View style={styles.globalContainer}>
      <HeaderBar
        toggleDrawer={navigation.toggleDrawer}
        title={'Öyle mi gerçekten?'}
      />
      <View style={styles.subContainer}>
        {users.map((item) => (
          <ScoreBoard key={item.uid} user={item} />
        ))}
      </View>
      <NotificationBox />
    </View>
  );
}

export default HomeScreen;
