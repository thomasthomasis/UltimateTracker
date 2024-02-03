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

  const resistanceTrainingOptions = [
    {
        id: '0',
        name: 'Neck'
    },
    {
        id: '1',
        name: 'Traps'
    },
    {
        id: '2',
        name: 'Rhomboids'
    },
    {
        id: '3',
        name: 'Lats'
    },
    {
        id: '4',
        name: 'Rear Delts'
    },
    {
        id: '5',
        name: 'Side Delts'
    },
    {
        id: '6',
        name: 'Front Delts'
    },
    {
        id: '7',
        name: 'Lats'
    },
    {
        id: '8',
        name: 'Biceps'
    },
    {
        id: '9',
        name: 'Triceps'
    },
    {
        id: '10',
        name: 'Forearms'
    },
    {
        id: '11',
        name: 'Lower Back'
    },
    {
        id: '12',
        name: 'Abs'
    },
    {
        id: '13',
        name: 'Obliques'
    },
    {
        id: '14',
        name: 'Pecs'
    },
    {
        id: '15',
        name: 'Hip Flexors'
    },
    {
        id: '16',
        name: 'Quads'
    },
    {
        id: '17',
        name: 'Gastrocnemius'
    },
    {
        id: '18',
        name: 'Soleus'
    },
    {
        id: '19',
        name: 'Tibialis'
    },
    {
        id: '20',
        name: 'Glutes'
    },
    {
        id: '21',
        name: 'Hamstrings'
    },
    {
        id: '22',
        name: 'Hip Adductors'
    },
    {
        id: '23',
        name: 'Hip Abductors'
    },
    {
      id: '24',
      name: 'Strength'
    },
    {
        id: '25',
        name: 'Hypertrophy'
    },
    {
        id: '26',
        name: 'Endurance'
    },
    {
        id: '27',
        name: 'Power'
    },{
        id: '28',
        name: 'Injury Prevention'
    },
    {
        id: '29',
        name: 'Rehab'
    },
]

  const getData = async () => {
    try{
      console.log("run get data")
      let strData = await AsyncStorage.getItem("data")
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
        let dataString = data.split(",")
        let dataArray = []
        for(var i = 0; i < dataString.length; i++)
        {
          let json = resistanceTrainingOptions[dataString[i]]
          dataArray.push(json)
        }
        
        console.log(dataArray)
        setResistanceData(dataArray)
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


            { resistanceData.length > 0 && 
              
              <View >
                <Text style={styles.title}>RESISTANCE</Text>
                <Text style={styles.underline}>Muscles Worked</Text>
                {
                  resistanceData.map((item, i) => {
                    return (
                      <View key={i} style={styles.container}>
                      { item.id < 24 &&
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
                      { item.id >= 24 &&
                        <Text style={{fontSize: 20, marginRight: 10, textAlign: 'center'}}>{item.name}</Text>
                      }
                      
                        
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

    underline: {
      textDecorationLine: 'underline',
      fontSize: 20,
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
      flexDirection: 'column',
      justifyContent: 'center'
    }
  });