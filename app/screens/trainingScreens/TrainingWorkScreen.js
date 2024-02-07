import React from 'react';
import { useState, useEffect } from 'react'
import { View, Text, Image, Button, Pressable, TextInput, TextArea, StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DropShadow from "react-native-drop-shadow";
import EStyleSheet from 'react-native-extended-stylesheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default TrainingWorkScreen = ({route}) => {

    const navigation = useNavigation();

    const [summary, setSummary] = useState('');

    const submitWork = async (type) => {

        let json = {summary: summary}

        try{
          await AsyncStorage.setItem("trainingData", JSON.stringify(json))
  
        } catch(err){
          console.log(err)
        }
  
        navigation.navigate('LogWorkout')
      }


    return (
        <SafeAreaView>
        <View>
            <View style={styles.containerInput}>
                <Text style={styles.text}>Summary</Text>
                <TextInput style={styles.input} multiline={true} numberOfLines={20} onChangeText={setSummary} value={summary} placeholder="" keyboardType="default"/> 
            </View>

            <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <Pressable style={styles.button} onPress={() => submitWork("Training")}>
                <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
            </View>

        </View>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    containerInput: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },

    input: {
      height: 300,
      width: '90%',
      margin: 5,
      borderWidth: 1,
      paddingLeft: 5,
      paddingTop: 5,
      textAlignVertical: "top"
    },

    containerData: {
      width: '100%',
    },

    containerAddSet: {
      width: '100%',
      height: 70,
      alignItems: 'center',
    },

    item: {
      width: 250,
      height: 50,
      marginTop: 10,
      overflow: 'visible',
      marginRight: 'auto',
      marginLeft: 'auto',
      padding: 10,

      backgroundColor: '#FBFEEE',
      borderRadius: 5,

    },

    itemData: {
      width: '100%',

      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    },

    button: {
      width: 150,
      height: 50,
      backgroundColor: '#622fd0',
      margin: 10,
      borderRadius: 5,

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    text: {
      color: 'black',
      fontSize: 17
    },

    buttonText: {
      color: 'white',
      fontSize: 20
    },

    shadow: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 6},
      shadowOpacity: 0.4,
      shadowRadius: 5,
      overflow: 'visible'
    },

    closeItem: {
      borderRadius: 30,
    }


  });