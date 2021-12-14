import React from 'react';
import { Text, Image, StyleSheet,TouchableOpacity } from 'react-native';

 function SelectingType({left}) {
    return (
        <TouchableOpacity style={styles.button}>
            {/*<Image source={require('../assets/omega.png')}/>*/}
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 24,
        backgroundColor: 'grey',
        width:64,
        height:64,
    },
});
export default SelectingType;