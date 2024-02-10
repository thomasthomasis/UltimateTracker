import * as React from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {schemas} from './schemas/index'

import HomeScreen from './screens/HomeScreen';
import LogWorkoutScreen from './screens/LogWorkoutScreen';
import TrainingScreen from './screens/TrainingScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={options}/>
          <Stack.Screen name="LogWorkout" component={LogWorkoutScreen} options={options} />
          <Stack.Screen name="Training" component={TrainingScreen} options={options}/>
          <Stack.Screen name="Login" component={LoginScreen} option={options}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#622fd0',
    color: 'white',
    
  },

  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

const options = {
  title: 'Ultimate Tracker', 
  headerStyle: styles.header,
  headerTintColor: 'white',
  headerTitleStyle: styles.headerText,
}

export default App;

