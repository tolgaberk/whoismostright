import React, {useEffect, useRef, useState} from 'react';
import {Text} from 'react-native';
import {styles} from '../styles';
import * as Animatable from 'react-native-animatable';

let timeoutId;
export const NotificationBox = () => {
  const [barShown, setbarShown] = useState(false);
  const viewRef = useRef();
  const [notificationText, setNotificationText] = useState({});
  useEffect(() => {
    NotificationController.showNofitication = () => setbarShown(true);
    NotificationController.setContent = (param) => setNotificationText(param);
  }, []);
  useEffect(() => {
    NotificationController.barVisible = barShown;
    timeoutId = setTimeout(() => {
      barShown &&
        viewRef?.current?.fadeOutDown().then(() => setbarShown(false));
    }, 5000);
  }, [barShown]);

  const onNotificationTouch = () => {
    clearTimeout(timeoutId);
    viewRef.current?.fadeOutDown().then(() => setbarShown(false));
  };
  return (
    barShown && (
      <Animatable.View
        ref={viewRef}
        onTouchEnd={onNotificationTouch}
        animation={'fadeInUp'}
        style={styles.notificationBox}>
        <Text style={styles.notificationTextHeader}>
          {notificationText?.title}
        </Text>
        {notificationText.text && (
          <Text style={styles.notificationText}>{notificationText.text}</Text>
        )}
      </Animatable.View>
    )
  );
};

export class NotificationController {
  static showNofitication;
  static setContent;
  static barVisible;
}
