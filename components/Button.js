import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function Button(props) {
    const { onPress } = props;
    return (
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.text}>+</Text>
            </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 24,
        elevation: 3,
        backgroundColor: '#1892FA',
        width:48,
        height:48,
    },
    text:{
        color:'white',
        width: 24,
        height: 24,
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
    }

});