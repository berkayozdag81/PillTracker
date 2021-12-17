import React,{useState} from 'react';
import { StyleSheet, Text, View ,SafeAreaView,Image,TouchableOpacity,TouchableHighlight,Picker} from 'react-native';
import Block from "../components/Block";
import Analytics from "../components/Analytics";
import Button from "../components/Button";
import {useNavigation} from '@react-navigation/native';
import Omega from '../assets/omega.png';
import Pill from '../assets/pill.png';


export default function Home() {
    const [selectedValue,setSelectedValue] =  useState("Cuma");
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbar}>
                <View style={{width: 283,height:20}}>
                    <Text style={{fontSize:16,lineHeight:20,fontStyle:"normal",color:"#8C8E97"}}>Selam Berkay,</Text>
                </View>
                <View style={{height:20}}>
                    <TouchableOpacity>
                        <Image source={require('../assets/icon.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.picker}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150,fontsize:34,fontStyle:"normal",fontWeight:"bold",lineHeight:38,color:"#191D30"}}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Pazartesi" value="Pazartesi" />
                    <Picker.Item label="Salı" value="Salı" />
                    <Picker.Item label="Çarşamba" value="Çarşamba" />
                    <Picker.Item label="Perşembe" value="Perşembe" />
                    <Picker.Item label="Cuma" value="Cuma" />
                    <Picker.Item label="Cumartesi" value="Cumartesi" />
                    <Picker.Item label="Pazar" value="Pazar" />
                </Picker>
            </View>
            <Analytics marginTop={16}/>
            <View style={{marginTop:15}}>
                <Text style={{color:"#191D30",
                    fontSize:20,
                    lineHeight:24,
                    fontWeight:"bold"}} >
                    08:00
                </Text>
            </View>
            <Block Icon={Omega} marginTop={16}/>
            <View style={{marginTop:15}}>
                <Text style={{color:"#191D30",
                    fontSize:20,
                    lineHeight:24,
                   fontWeight:"bold"}} >
                    16:30
                </Text>
            </View>
            <Block Icon={Pill} marginTop={16}/>
            <Button onPress={() => navigation.navigate('AddMedication')}  style={styles.addButton}>
              <Text style={{color: 'white', fontSize: 25}}>+</Text>
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:26,
        backgroundColor: 'white',
    },
    navbar:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        left:0,
        right:0,
        top:10,
        bottom:"90%",
        height:44,
    },
    picker:{
        width:"100%",
        height:38,
        display:"flex",
    },
    addButton: {
        position: 'absolute',
        bottom: 32,
        right: 16,
        borderRadius: 999,
        backgroundColor: '#1892FA',
        width: 48,
        height: 48
    },
});
