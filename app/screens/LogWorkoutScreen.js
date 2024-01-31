import React from 'react';
import { useState, useEffect } from 'react'
import { View, Text, Image, Pressable, Button, StyleSheet, FlatList, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";


export default LogWorkout = ({ route, navigation, props }) => {

  const [cardioData, setCardioData] = useState([])
  const [resistanceData, setResistanceData] = useState([])
  const [throwingData, setThrowingData] = useState([])
  const [plyometricsData, setPlyometricsData] = useState([])
  const [trainingData, setTrainingData] = useState([])
  const [fieldData, setFieldData] = useState([])

  const isFocused = useIsFocused();

  const getData = async () => {
    try{
      console.log("run get data")
      let strData = await AsyncStorage.getItem("data")
      let data = JSON.parse(strData)

      console.log(data)

      let dataType = await AsyncStorage.getItem("dataType")

      if(dataType == "Cardio")
      {
        console.log("yes")
        setCardioData(data)
      }

    }
    catch(err){
      console.log("Error: " + err)
    }
  }

  useEffect(() => {

    if(isFocused){ 
      getData()
    }
  }, [isFocused]);

    return (
      <View>
      
        <View style={styles.containerSummary}>
          
            { cardioData.length > 0 &&

              <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <Text style={styles.title}>CARDIO</Text>
                {
                  cardioData.map((item, i) => {
                    return (
                      <View key={i} style={styles.container}>
                        <Text style={{fontSize: 20, marginRight: 10}}>{item.time} Minutes</Text>
                        <Text style={{fontSize: 20}}>{item.distance} KM</Text>
                      </View> 
                    )
                  })
                }
              </View>
            }
          
        </View>

        <View style={styles.containerButton}>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Training', {title: "Cardio"})}>
            <Text style={styles.text}>Cardio</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Training', {title: "Resistance"})}>
            <Text style={styles.text}>Resistance</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Training', {title: "Plyometrics"})}>
            <Text style={styles.text}>Plyometrics</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Training', {title: "Throwing"})}>
            <Text style={styles.text}>Throwing</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Training', {title: "Field"})}>
            <Text style={styles.text}>Field</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Training', {title: "Training"})}>
            <Text style={styles.text}>Training</Text>
          </Pressable>
        </View>
       
      </View>
      
      
    );
  }

  const styles = StyleSheet.create({
    button: {
      width: 100,
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

    title: {
      fontSize: 25,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      textAlign: 'center'
    },

    containerSummary: {
      width: '100%',
      height: '50%',
      
    },

    containerButton: {
      display: 'flex',
      alignItems: 'center',
    },

    container: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
    }
  });