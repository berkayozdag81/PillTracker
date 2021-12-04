import 'react-native-gesture-handler';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from './views/Home';
const HomeStack = createStackNavigator();

function HomeGroup() {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <HomeStack.Screen name={'Home'} component={HomeScreen} />
        </HomeStack.Navigator>
    );
}
