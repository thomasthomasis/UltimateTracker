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

  const [showOptions, setShowOptions] = useState(false)

  const isFocused = useIsFocused();

  const getData = async () => {
    try{
      console.log("run get data")
      let strData = await AsyncStorage.getItem("data")

      console.log(strData)
      let data = JSON.parse(strData)

      console.log("Data received from previous page: " + data)

      if(data == null)
      {
        return;
      }

      let dataType = await AsyncStorage.getItem("dataType")

      if(dataType == "Cardio")
      {
        setCardioData(data)
      }

      else if(dataType == "Resistance")
      {
        setResistanceData(data)
      }

      else if(dataType == "Plyometrics")
      {
        setPlyometricsData(data)
      }

      else if(dataType == "Throwing")
      {
        setThrowingData(data)
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

  useEffect(() => console.log("Plyometric Data", [plyometricsData]));
  useEffect(() => console.log("Cardio Data", [cardioData]));
  useEffect(() => console.log("Resistance Data", [resistanceData]));
  useEffect(() => console.log("Throwing Data", [throwingData] ))


    return (
      <View>
      
        <ScrollView style={styles.containerSummary}>
          
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

            { plyometricsData.length > 0 &&

              <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <Text style={styles.title}>PLYOMETRICS</Text>
                {
                  plyometricsData.map((item, i) => {
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