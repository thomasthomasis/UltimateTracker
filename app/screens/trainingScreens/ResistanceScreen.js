import React from 'react';
import { useState, useEffect } from 'react'
import { View, Text, Image, Button, Pressable, TextInput, StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DropShadow from "react-native-drop-shadow";
import EStyleSheet from 'react-native-extended-stylesheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default CardioScreen = ({route}) => {

    const navigation = useNavigation();

    const muslces = [
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
    ]

    const trainingTypes = [
        {
            id: '0',
            name: 'Strength'
        },
        {
            id: '1',
            name: 'Hypertrophy'
        },
        {
            id: '2',
            name: 'Endurance'
        },
        {
            id: '3',
            name: 'Power'
        },{
            id: '4',
            name: 'Injury Prevention'
        },
        {
            id: '5',
            name: 'Rehab'
        },
    ]

    const [selectedMuscles, onChangeSelectedMuscles] = useState([]);
    const [selectedTrainingTypes, onChangeSelectedTrainingTypes] = useState([]);

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

    useEffect(() => console.log("selected muscles: " + selectedMuscles), [selectedMuscles]);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <SectionedMultiSelect
                items={muslces}
                IconRenderer={Icon}
                uniqueKey="id"
                subKey="children"
                selectText="Choose muscles worked..."
                showDropDowns={true}
                onSelectedItemsChange={onChangeSelectedMuscles}
                selectedItems={selectedMuscles}
                styles={styles.multiList}
                />

                <SectionedMultiSelect
                items={trainingTypes}
                IconRenderer={Icon}
                uniqueKey="id"
                subKey="children"
                selectText="Choose training types..."
                showDropDowns={true}
                onSelectedItemsChange={onChangeSelectedTrainingTypes}
                selectedItems={selectedTrainingTypes}
                styles={styles.multiList}
                />
            </View>
            {
              (selectedMuscles.length >= 1 && selectedTrainingTypes.length >= 1) &&
                <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
                  <Pressable style={styles.button} onPress={() => submitWork("Resistance")}>
                    <Text style={styles.buttonText}>Submit</Text>
                  </Pressable>
                </View>
            }
        </SafeAreaView>
      
    );

}

const styles = StyleSheet.create({

    container: {
        display: 'flex',
        width: '100%'
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

    buttonText: {
    color: 'white',
    fontSize: 20
    },
});