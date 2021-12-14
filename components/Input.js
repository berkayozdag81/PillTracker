import React from "react";
import {StyleSheet, TextInput } from "react-native";

const Input = ({PlaceHolder}) => {
    const [text, onChangeText] = React.useState("");
    return (
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder={PlaceHolder}
            />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        width:'94%',
        borderWidth: 0.5,
        padding: 10,
        borderRadius:999,
        fontSize:15,
        fontWeight:'bold',
        color:'#C4CACF',
    },
});

export default Input;