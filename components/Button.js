import React from 'react';
import {StyleSheet,TouchableOpacity } from 'react-native';

export default function Button({onPress, style, children}) {
    return (
            <TouchableOpacity style={[style, styles.button]} onPress={onPress}>
                {children}
            </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
    }

});