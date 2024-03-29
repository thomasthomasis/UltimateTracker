import React from 'react';
import { useState, useEffect } from 'react'
import { View, Text, Image, Button, Pressable, TextInput, StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DropShadow from "react-native-drop-shadow";
import EStyleSheet from 'react-native-extended-stylesheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default PlyometricScreen = ({route}) => {

    const navigation = useNavigation();

    const [name, setName] = useState('')
    const [sets, setSet] = useState('')
    const [reps, setRep] = useState('')

    const [dataEntries, setDataEntries] = useState([])
    useEffect(() => console.log("list of entries: " + JSON.stringify(dataEntries)), [dataEntries]);

    const addNewEntry = () => {

      var newEntry = {name: name, sets: sets, reps: reps}
      setDataEntries([...dataEntries, newEntry])

    }

    const removeEntry = (id) => {
      setDataEntries(...dataEntries.slice(0, id), ...dataEntries.slice(index + 1))
    }

    const submitWork = async (type) => {
        try{
          await AsyncStorage.setItem("plyometricData", JSON.stringify(dataEntries))
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
              <Text style={styles.text}>Name</Text>
              <TextInput style={styles.input} onChangeText={setName} value={name} placeholder="name" keyboardType="default"/>
            </View>
            <View style={styles.containerInputDiv}>
              <Text style={styles.text}>Sets</Text>
              <TextInput style={styles.input} onChangeText={setSet} value={sets} placeholder="sets" keyboardType="numeric"/> 
            </View>
            <View style={styles.containerInputDiv}>
              <Text style={styles.text}>Reps</Text>
              <TextInput style={styles.input} onChangeText={setRep} value={reps} placeholder="reps" keyboardType="numeric"/> 
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
                        <Text style={{fontSize: 20}}>{item.name}</Text>
                        <Text style={{fontSize: 20}}>{item.sets}</Text>
                        <Text style={{fontSize: 20}}>X</Text>
                        <Text style={{fontSize: 20}}>{item.reps}</Text>
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
                  <Pressable style={styles.button} onPress={() => submitWork("Plyometrics")}>
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