import React from 'react';
import { useState, useEffect } from 'react'
import { View, Text, Image, Button, Pressable, TextInput, StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DropShadow from "react-native-drop-shadow";
import EStyleSheet from 'react-native-extended-stylesheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default ThrowingScreen = ({route}) => {

    const navigation = useNavigation();

    const [numberTime, onChangeNumberTime] = useState('');
    const [numberDistance, onChangeNumberDistance] = useState('');

    const [dataEntries, setDataEntries] = useState([])
    useEffect(() => console.log("list of entries: " + JSON.stringify(dataEntries)), [dataEntries]);

    const addNewEntry = () => {

      var newEntry = {time: numberTime, distance: numberDistance}
      setDataEntries([...dataEntries, newEntry])

    }

    const removeEntry = (id) => {
      setDataEntries(...dataEntries.slice(0, id), ...dataEntries.slice(index + 1))
    }

    const submitWork = async (type) => {
        try{
          await AsyncStorage.removeItem("data")
          await AsyncStorage.setItem("data", JSON.stringify(dataEntries))
  
          await AsyncStorage.setItem("dataType", type)
  
        } catch(err){
          console.log(err)
        }
  
        navigation.navigate('LogWorkout')
      }


    return (
        <SafeAreaView>
        <View>
          <View style={styles.containerInput}>
            <View style={styles.containerInputDiv}>
              <Text style={styles.text}>Time (MIN)</Text>
              <TextInput style={styles.input} onChangeText={onChangeNumberTime} value={numberTime} placeholder="time" keyboardType="numeric"/> 
            </View>
            <View style={styles.containerInputDiv}>
              <Text style={styles.text}>Distance (KM)</Text>
              <TextInput style={styles.input} onChangeText={onChangeNumberDistance} value={numberDistance} placeholder="distance" keyboardType="numeric"/> 
            </View>
              
          </View>

            
          <View style={styles.containerAddSet}>
            <Pressable style={styles.button} onPress={() => addNewEntry()}>
              <Text style={styles.buttonText}>Add Work Done</Text>
            </Pressable>
          </View>

          <ScrollView>
            {
              dataEntries.map((item, i) => {
                return (
                  <View key={i}>
                  <DropShadow style={styles.shadow}>
                    <View style={styles.item}>
                      <View style={styles.itemData}>
                        <Text style={{fontSize: 20}}>{item.time} Minutes</Text>
                        <Text style={{fontSize: 20}}>{item.distance} KM</Text>
                      </View>
                    </View>
                  </DropShadow>
                  <Pressable style={styles.closeItem} onPress={() => removeEntry()}>
                    <Text style={styles.buttonText}>X</Text>
                  </Pressable>
                  </View>
                )
              })
            }

            {
              dataEntries.length >= 1 &&
                <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
                  <Pressable style={styles.button} onPress={() => submitWork("Cardio")}>
                    <Text style={styles.buttonText}>Submit</Text>
                  </Pressable>
                </View>
            }
            
            
              

          </ScrollView>
        </View>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    containerInput: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

    containerInputDiv: {
      display: 'flex',
      alignItems: 'center'
    },

    input: {
      height: 40,
      width: 100,
      margin: 5,
      borderWidth: 1,
      paddingLeft: 5,
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