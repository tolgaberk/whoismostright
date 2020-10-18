import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import getMessage from './Messages';
import {NotificationController} from './NotificationBox';
import {styles} from '../styles';
import MenuIcon from '../assets/icons/menuIcon';
import R from '../assets/R';
import BackIcon from '../assets/icons/arrowBack';

export const HeaderBar = ({
  toggleDrawer,
  title,
  RightComponent,
  leftIsBack,
}) => {
  const titleOnPress = () => showNotification('can');
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={toggleDrawer} style={styles.headerMenuButton}>
        {!leftIsBack ? (
          <MenuIcon color={R.colors.white} />
        ) : (
          <BackIcon color={R.colors.white} />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={titleOnPress} style={styles.headerTitle}>
        <Text adjustsFontSizeToFit style={styles.headerText}>
          {title}
        </Text>
      </TouchableOpacity>
      <View style={styles.headerSpacer}>{RightComponent}</View>
    </View>
  );
};

function showNotification(param) {
  NotificationController.setContent(getMessage(param));
  NotificationController.showNofitication();
}
