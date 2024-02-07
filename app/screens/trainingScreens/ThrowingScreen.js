import React from 'react';
import { useState, useEffect } from 'react'
import { View, Text, Image, Button, Pressable, TextInput, StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DropShadow from "react-native-drop-shadow";
import EStyleSheet from 'react-native-extended-stylesheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

export default ThrowingScreen = ({route}) => {

    const navigation = useNavigation();

    const throws = [
        { label: "Backhand", value: 'Backhand'},
        { label: "Forehand", value: "Forehand"},
        { label: "Hammer", value: "Hammer"},
        { label: "Scoober", value: "Scoober"},
        { label: "Chicken Wing", value: "Chicken Wing"},
        { label: "Thumber", value: "Thumber"}
    ]

    const angles = [
        { label: "Flat", value: "Flat"},
        { label: "IO", value: "IO"},
        { label: "OI", value: "OI"},
    ]

    const [dataEntries, setDataEntries] = useState([])
    useEffect(() => console.log("list of entries: " + JSON.stringify(dataEntries)), [dataEntries]);

    const addNewEntry = () => {

      var newEntry = {throw: throwType, angle: angleType, reps: reps}
      setDataEntries([...dataEntries, newEntry])

    }

    const removeEntry = (id) => {
      setDataEntries(...dataEntries.slice(0, id), ...dataEntries.slice(index + 1))
    }

    const submitWork = async (type) => {
        try{
            await AsyncStorage.setItem("throwingData", JSON.stringify(dataEntries))

        } catch(err){
            console.log(err)
        }

        navigation.navigate('LogWorkout')
    }

    const [throwType, setThrowType] = useState(null);
    const [isFocusThrows, setIsFocusThrows] = useState(false);

    const [angleType, setAngleType] = useState(null);
    const [isFocusAngles, setIsFocusAngles] = useState(false);

    const [reps, setReps] = useState('');


    return (
        <SafeAreaView>
        <View>

            <View style={styles.containerInput}>
                <View style={styles.containerInputDiv}>
                    <Text style={styles.text}>Throw Type</Text> 
                    <Dropdown
                        style={[styles.dropdown, isFocusThrows && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={throws}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusThrows ? '...' : '...'}
                        searchPlaceholder="Search..."
                        value={throwType}
                        onFocus={() => setIsFocusThrows(true)}
                        onBlur={() => setIsFocusThrows(false)}
                        onChange={item => {
                            setThrowType(item.value);
                            setIsFocusThrows(false);
                        }}
                    />
                </View>
            
                <View style={styles.containerInputDiv}>
                    <Text style={styles.text}>Angle Type</Text>
                    <Dropdown
                        style={[styles.dropdown, isFocusThrows && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={angles}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusThrows ? '...' : '...'}
                        searchPlaceholder="Search..."
                        value={angleType}
                        onFocus={() => setIsFocusAngles(true)}
                        onBlur={() => setIsFocusAngles(false)}
                        onChange={item => {
                            setAngleType(item.value);
                            setIsFocusAngles(false);
                        }}
                    />
                </View>

                <View style={styles.containerInputDiv}>
                    <Text style={styles.text}>Reps</Text>
                    <TextInput style={styles.input} onChangeText={setReps} value={reps} placeholder="Reps" keyboardType="numeric"/> 
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
                        <Text style={{fontSize: 20}}>{item.reps}</Text>
                        <Text style={{fontSize: 20}}>{item.angle} </Text>
                        <Text style={{fontSize: 20}}>{item.throw}s</Text>
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
                  <Pressable style={styles.button} onPress={() => submitWork("Throwing")}>
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
    dropdown: {
        height: 50,
        width: 100,
        borderColor: 'black',
        borderWidth: 0.75,
        paddingHorizontal: 8,
        marginLeft: 2,
        marginRight: 2,
      },

      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },

    containerInput: {
        marginTop: 5,
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
      height: 50,
      width: 100,
      margin: 2,
      borderWidth: 0.5,
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