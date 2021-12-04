import React from 'react';
import {StyleSheet, Text, View,Image} from 'react-native';
import CircularProgressBar from "./CircularProgressBar";

export default function Block(props) {
    return (
            <View style={{
                alignItems: "center",
                padding: 24,
                flexDirection:"row",
                borderRadius: 24,
                borderWidth: 1,
                borderColor: "#ECEDEF",
                width: "100%",
                height: 110,
                ...props
            }}>
                <View style={{
                    marginLeft:12,
                    flexDirection:"column",
                    flex:1,
                }}>
                    <Text style={{
                        color:"#191D30",
                        fontSize:20,
                        lineHeight:24,
                        fontWeight:"bold"
                    }}>Planın neredeyse bitti!</Text>

                    <View style={{
                        marginTop:8,
                        flexDirection:"row",
                    }}>
                        <View style={{alignItems:'center',justifyContent:'center'}}>
                            <Image source={require("../assets/UpIcon.png")}></Image>
                        </View>
                        <Text
                            style={{
                                color:"#8C8E97",
                                fontSize:16,
                                lineHeight:20,
                            }}
                        >13% than week ago</Text>
                    </View>
                </View>
                <CircularProgressBar/>
            </View>
    );
}
const style = StyleSheet.create({
});

