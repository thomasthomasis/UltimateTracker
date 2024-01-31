import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView, Button, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default HomeScreen = ({ navigation }) => {

    return (
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('LogWorkout')} >
          <Text style={styles.text}>Log Workout</Text>
        </Pressable>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    button: {
      marginTop: 10,
      width: 150,
      height: 50,
      backgroundColor: '#622fd0',
      margin: 3,
      borderRadius: 5,

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    text: {
      color: 'white',
      fontSize: 20
    },
    

  });