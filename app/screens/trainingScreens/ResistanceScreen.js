import React from 'react';
import { useState, useEffect } from 'react'
import { View, Text, Image, Button, Pressable, TextInput, StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DropShadow from "react-native-drop-shadow";
import EStyleSheet from 'react-native-extended-stylesheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default CardioScreen = ({route}) => {

    const navigation = useNavigation();

    return (
        <View>
            <Text>Resistance</Text>
        </View>
    )

}