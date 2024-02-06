import React from 'react';
import { useState, useEffect } from 'react'
import { View, Text, Image, Button, Pressable, TextInput, StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DropShadow from "react-native-drop-shadow";
import EStyleSheet from 'react-native-extended-stylesheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CardioScreen from './trainingScreens/CardioScreen';
import ResistanceScreen from './trainingScreens/ResistanceScreen';
import PlyometricScreen from './trainingScreens/PlyometricScreen';
import ThrowingScreen from './trainingScreens/ThrowingScreen';


export default Training = ({route, navigation}) => {
    
    if(route.params.title == "Cardio")
    {
      return (
        <CardioScreen></CardioScreen>
      );
    } 

    else if(route.params.title == "Resistance")
    {
      return (
        <ResistanceScreen></ResistanceScreen>
      )
    }

    else if(route.params.title == "Plyometrics")
    {
      return (
        <PlyometricScreen></PlyometricScreen>
      )
    }

    else if(route.params.title == "Throwing")
    {
      return (
        <ThrowingScreen></ThrowingScreen>
      )
    }
  }
  
  