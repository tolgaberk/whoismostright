/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/Router';
import {name as appName} from './app.json';
import codePush from 'react-native-code-push';

const codePushOptions = {
  /*updateDialog: {
       title: '',
       appendReleaseDescription: true,
       descriptionPrefix: '',
       mandatoryUpdateMessage: '',
       mandatoryContinueButtonLabel: '',
       optionalIgnoreButtonLabel: '',
       optionalInstallButtonLabel: ',
       optionalUpdateMessage: ''
    },*/
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
};
const RootComponent = __DEV__ ? App : codePush(codePushOptions)(App);

AppRegistry.registerComponent(appName, () => RootComponent);
