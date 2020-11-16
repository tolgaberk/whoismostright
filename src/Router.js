import HomeScreen from './screens/HomeScreen';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DecisionsScreen from './screens/DecisionsScreen';
import DecisionScreen from './screens/DecisionScreen';
import R from './assets/R';
import DateLogScreen from './screens/DateLogScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeBackgroundColor: R.colors.accent,
          activeTintColor: R.colors.white,
          contentContainerStyle: {
            backgroundColor: R.colors.background,
            flex: 1,
          },
          inactiveBackgroundColor: R.colors.white,
          itemStyle: {borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)'},
        }}>
        <Drawer.Screen name="Haklı mısın?" component={HomeScreen} />
        <Drawer.Screen name="Nerelere gittik?" component={DateLogScreen} />
        <Drawer.Screen
          name="Karar versek mi artık?"
          component={DecisionStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
const DecisionStack = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="decicionsScreen" component={DecisionsScreen} />
    <Stack.Screen name="decisionScreen" component={DecisionScreen} />
  </Stack.Navigator>
);
