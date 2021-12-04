import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function MyButton() {
    return (
        <View style={{flex:1,flexDirection:'row'}}>
            <Button
                wid
                title="Learn More"
                color="#841584"
            />
            <Text>Mybutton</Text>
        </View>

    );
}



