import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView, Button, Pressable, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useApp, useAuth, useQuery, useRealm, useUser} from '@realm/react';
import {Workout} from '../schemas/Workout'


export default HomeScreen = ({ navigation }) => {

  const realm = useRealm();
  const user = useUser();
  const app = useApp();
  const {logOut} = useAuth();
  
  const workouts = useQuery(Workout)

  /*
  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(workouts);
    });
  }, [realm, workouts]);
  */

  useEffect(() => {
    console.log("Workouts: " + workouts)
  }, [workouts])

  
  const addWorkout = useCallback(() => {
    realm.write(() => {
      realm.create(
        'Workout',
        {
          cardio: "test",
          resistance: "test",
          plyometrics: "test",
          cardio: "test",
          resistance: "test",
          plyometrics: "test",
        }
      )
    })
  })
  
    return (
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('LogWorkout')} >
          <Text style={styles.text}>Log Workout</Text>
        </Pressable>

        <View style={{flex: 1}}>
          <FlatList data={workouts} renderItem={({item}) => <Text>{`${item.title} - ${item.description}`}</Text>}/>
          <TouchableOpacity style={styles.button} onPress={addWorkout}>
            <Text style={styles.text}>{'New Workout'}</Text>
          </TouchableOpacity>
        </View>       
        
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