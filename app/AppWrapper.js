import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import React from 'react';

import {APP_ID} from '@env'
import { SafeAreaView } from "react-native";
import LoginScreen from "./screens/LoginScreen";

import { Workout } from './schemas/Workout'

import App from './App'

function AppWrapper() {
    return (
    <AppProvider id={APP_ID}>
        <UserProvider fallback={<LoginScreen />}>
            <RealmProvider schema={[Workout]}>
                <App />
            </RealmProvider>
        </UserProvider>
    </AppProvider>
    )
}

export default AppWrapper;