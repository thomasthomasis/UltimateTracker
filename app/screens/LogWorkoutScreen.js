import React from 'react';
import { useState, useEffect } from 'react'
import { View, Text, Image, Pressable, Button, StyleSheet, FlatList, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

import Realm from "realm";
import {RealmProvider} from '@realm/react'


export default LogWorkout = async ({ route, navigation, props }) => {

  const [cardioData, setCardioData] = useState([])
  const [resistanceData, setResistanceData] = useState([])
  const [throwingData, setThrowingData] = useState([])
  const [plyometricData, setPlyometricData] = useState([])
  const [trainingData, setTrainingData] = useState([])
  const [fieldData, setFieldData] = useState([])

  const [showOptions, setShowOptions] = useState(false)

  const isFocused = useIsFocused();

  const getData = async () => {
    try{
      let strCardioData = await AsyncStorage.getItem("cardioData")
      let cardioData = JSON.parse(strCardioData)
      if(cardioData != null)
      {
        setCardioData(cardioData)
      }
      
      
      let strResistanceData = await AsyncStorage.getItem("resistanceData")
      let resistanceData = JSON.parse(strResistanceData)
      if(resistanceData != null)
      {
        setResistanceData(resistanceData)
      }

      let strPlyometricData = await AsyncStorage.getItem("plyometricData")
      let plyometricData = JSON.parse(strPlyometricData)
      if(plyometricData != null)
      {
        setPlyometricData(plyometricData)
      }
      
      let strThrowingData = await AsyncStorage.getItem("throwingData")
      let throwingData = JSON.parse(strThrowingData)
      if(throwingData != null)
      {
        setThrowingData(throwingData)
      }

      let strFieldData = await AsyncStorage.getItem("fieldData")
      let fieldData = JSON.parse(strFieldData)
      if(fieldData != null)
      {
        setFieldData(fieldData)
      }
      
      let strTrainingData = await AsyncStorage.getItem("trainingData")
      let trainingData = JSON.parse(strTrainingData)
      if(trainingData != null)
      {
        setTrainingData(trainingData)
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

  const openTrainingOptions = () => {
    if(showOptions) setShowOptions(false)
    else if (!showOptions) setShowOptions(true)

    console.log("hello")
  }

  const submitWorkout = () => {

  }

  useEffect(() => console.log("Plyometric Data", [plyometricData]));
  useEffect(() => console.log("Cardio Data", [cardioData]));
  useEffect(() => console.log("Resistance Data", [resistanceData]));
  useEffect(() => console.log("Throwing Data", [throwingData] ))
  useEffect(() => console.log("Field Data", [fieldData]));
  useEffect(() => console.log("Training Data", [trainingData]));

  const checkIfDataIsNull = (data, type) => {
    let conditionalContent;

    if(data.length != 0)
    {
      if(data.summary.length > 0)
      {
        conditionalContent = 
        
        <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
          <Text style={styles.title}>{type.toUpperCase()}</Text>
            <View style={styles.container}>
              <Text style={{fontSize: 20}}>{data.summary}</Text>
            </View>
        </View>
      }
      else if(data.summary.length == 0)
      {
        conditionalContent = 

        <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
          <Text style={styles.title}>{type.toUpperCase()}</Text>
            <View style={styles.container}>
              <Text style={{fontSize: 20}}>One {type} Session</Text>
            </View>
        </View>
      }

      return conditionalContent;
    }
    else
    {
      return null;
    }
  }

  const TaskSchema = {
    name: "Task",
    properties: {
      _id: "int",
      name: "string",
      status: "string?"
    },
    primaryKey: "_id",
  }
  
  (async () => {
    const realm = await Realm.open({
      path: "myrealm",
      schema: [TaskSchema]
    })

    realm.write(() => {
      task1 = realm.create("Task", {
        _id: 1,
        name: "go grocery shopping",
        status: "Open",
      });
      console.log("created a task")
    })
  })



    return (
      <View>
      
        <ScrollView style={styles.containerSummary}>
          
            { 
              cardioData.length > 0 &&

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


            { resistanceData.length > 0 && 
              
              <View >
                <Text style={styles.title}>RESISTANCE</Text>
                <Text style={styles.underline}>Muscles Worked</Text>
                {
                  resistanceData.map((item, i) => {
                    return (
                      <View key={i} style={styles.container}>
                      { item.muscle == true &&
                        <Text style={{fontSize: 20, marginRight: 10, textAlign: 'center'}}>{item.name}</Text>
                      } 
                      </View> 
                    )
                  })
                }

                <Text></Text>
                <Text style={styles.underline}>Training Type</Text>
                {
                  resistanceData.map((item, i) => {
                    return (
                      <View key={i} style={styles.container}>
                      { item.muscle == false &&
                        <Text key={i} style={{fontSize: 20, marginRight: 10, textAlign: 'center'}}>{item.name}</Text>
                      }
                        
                      </View> 
                    )
                  })
                }
              </View>
                
            }

            { plyometricData.length > 0 &&

              <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <Text style={styles.title}>PLYOMETRICS</Text>
                {
                  plyometricData.map((item, i) => {
                    return (
                      <View key={i} style={styles.container}>
                        <Text style={{fontSize: 20, marginRight: 10}}>{item.name}</Text>
                        <Text style={{fontSize: 20}}>{item.sets}</Text>
                        <Text style={{fontSize: 20}}> X </Text>
                        <Text style={{fontSize: 20}}>{item.reps}</Text>
                      </View> 
                    )
                  })
                }
              </View>

            }

            { throwingData.length > 0 &&

            <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <Text style={styles.title}>THROWING</Text>
                {
                  throwingData.map((item, i) => {
                    return (
                      <View key={i} style={styles.container}>
                        <Text style={{fontSize: 20, marginRight: 10}}>{item.reps}</Text>
                        <Text style={{fontSize: 20}}>{item.angle} </Text>
                        <Text style={{fontSize: 20}}>{item.throw}s</Text>
                      </View> 
                    )
                  })
                }
              </View>
            }

            { checkIfDataIsNull(fieldData, "Field") }
            { checkIfDataIsNull(trainingData, "Training")}
          
        </ScrollView>
        
        { showOptions && 
          <View style={styles.containerButton}>
          <Pressable style={styles.circleButton} onPress={() => navigation.navigate('Training', {title: "Cardio"})}>
            <Text style={styles.text}>c</Text>
          </Pressable>
          <Pressable style={styles.circleButton} onPress={() => navigation.navigate('Training', {title: "Resistance"})}>
            <Text style={styles.text}>r</Text>
          </Pressable>
          <Pressable style={styles.circleButton} onPress={() => navigation.navigate('Training', {title: "Plyometrics"})}>
            <Text style={styles.text}>p</Text>
          </Pressable>
          <Pressable style={styles.circleButton} onPress={() => navigation.navigate('Training', {title: "Throwing"})}>
            <Text style={styles.text}>t</Text>
          </Pressable>
          <Pressable style={styles.circleButton} onPress={() => navigation.navigate('Training', {title: "Field"})}>
            <Text style={styles.text}>f</Text>
          </Pressable>
          <Pressable style={styles.circleButton} onPress={() => navigation.navigate('Training', {title: "Training"})}>
            <Text style={styles.text}>tr</Text>
          </Pressable>

        </View>
        }
        

        <View style={styles.containerOptionSelect}>
          <Pressable style={styles.circleButton} onPress={() => openTrainingOptions()}>
              <Text style={styles.text}></Text>
            </Pressable>
        </View>

        
       
      </View>
      
      
    );
  }

  const styles = StyleSheet.create({
    button: {
      width: 40,
      height: 40,
      backgroundColor: '#622fd0',
      margin: 3,
      borderRadius: 5,

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    circleButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      width: 50,
      height: 50,
      backgroundColor: '#622fd0',
      borderRadius: 50,
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

    underline: {
      textDecorationLine: 'underline',
      fontSize: 20,
      textAlign: 'center'
    },

    containerSummary: {
      width: '100%',
      height: '90%'
    },

    containerButton: {
      position: 'absolute',
      bottom: 55,

      display: 'flex',
      flexDirection: 'row',

      margin: 'auto'
    },

    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },

    containerOptionSelect: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      position: 'fixed',
      bottom: 0

      
    }
  });