import React,{useState} from 'react';
import {StyleSheet, Text, View, Switch, Image, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import Button from "../components/Button";
import Block from "../components/Block";
import Pill from '../assets/pill.png';
import {useNavigation} from '@react-navigation/native';

const DATA = [
    {
        id: 0,
        title: 'in 5 m',
    },
    {
        id: 1,
        title: '10 m',
    },
    {
        id: 2,
        title: '15 m',
    },
    {
        id: 3,
        title: '20 m',
    },
    {
        id: 4,
        title: '30 m',
    },
    {
        id: 5,
        title: '35 m',
    },
];

const Item = ({ item, onPress, backgroundColor, textColor,textSize,textWeight }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor,textSize,textWeight]}>{item.title}</Text>
    </TouchableOpacity>
);


export default function AddMedicineTime() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        if(isEnabled == false){
            setIsEnabled(previousState => !previousState);
            setIsShow(true);
        }
        else{
            setIsEnabled(previousState => !previousState);
            setIsShow(false);
        }
    }
    const [isShow, setIsShow] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const navigation = useNavigation();



    const renderItem = ({ item,onPress, selected }) => {
        const backgroundColor = item.id === selectedId ? "#FFFFFF" : "white";
        const color = item.id === selectedId ? 'black' : 'grey';
        const backgroundColor2 = selected ? 'red' : 'white';
        return (
            <Button style={{borderRadius:999,backgroundColor: 'white', width: 119, height: 24}}>
                <Item
                    item={item}
                    onPress={() => setSelectedId(item.id)}
                    backgroundColor={{ backgroundColor2 }}
                    textColor={{ color }}
                    textSize={20}
                    textWeight={'bold'}
                />
            </Button>
        );
    };

    if(isShow == false)
    {return (
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center',width:'95%',height:44}}>
                <View>
                    <Button onPress={() => navigation.navigate("AddMedication")} >
                        <Image source={require('../assets/back_vector.png')}/>
                    </Button>
                </View>
                <View>
                    <TouchableOpacity>
                        <Image source={require('../assets/Vector.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={{fontWeight:'normal',fontSize:16,color:'#8C8E97',top:12}}>2. Adım</Text>
            <Text style={{fontWeight:'bold',fontSize:30,color:'#191D30',top:44}}>Takvim</Text>
            <View style={{top:70}}>
                <Block Icon={Pill}/>
            </View>
            <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center',width:'65%',height:44,top:88}}>
                <Text>Dose1</Text>
                <Text>08:00</Text>
            </View>
            <Button style={styles.addDose}>
                <Text style={{color: 'black', fontSize: 25}}>+</Text>
            </Button>
            <Button style={styles.nextButton}>
                <Text style={{color: 'white', fontSize: 25}}>İlaç Saati Ekle</Text>
            </Button>
            <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center',width:'95%',height:44,top:132}}>
                <Text style={{fontWeight:'bold',fontSize:24,color:'#191D30',}}>
                    Hatırlatıcı
                </Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </SafeAreaView>
    );}
    else{
        return(
            <SafeAreaView style={styles.container}>
                <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center',width:'95%',height:44}}>
                    <View>
                        <Button onPress={() => navigation.navigate("AddMedication")}>
                            <Image source={require('../assets/back_vector.png')}/>
                        </Button>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Image source={require('../assets/Vector.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{fontWeight:'normal',fontSize:16,color:'#8C8E97',top:12}}>2. Adım</Text>
                <Text style={{fontWeight:'bold',fontSize:30,color:'#191D30',top:44}}>Takvim</Text>
                <View style={{top:70}}>
                    <Block Icon={Pill}/>
                </View>
                <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center',width:'65%',height:44,top:88}}>
                    <Text>Dose1</Text>
                    <Text>08:00</Text>
                </View>
                <Button style={styles.addDose}>
                    <Text style={{color: 'black', fontSize: 25}}>+</Text>
                </Button>
                <Button style={styles.nextButton}>
                    <Text style={{color: 'white', fontSize: 25}}>İlaç Saati Ekle</Text>
                </Button>
                <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center',width:'95%',height:44,top:132}}>
                    <Text style={{fontWeight:'bold',fontSize:24,color:'#191D30',}}>
                        Hatırlatıcı
                    </Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={{top: 160}}>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        horizontal
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 24,
        backgroundColor: 'white'
    },
    nextButton: {
        position: 'absolute',
        top:700,
        borderRadius: 999,
        backgroundColor: '#1892FA',
        width: '94%',
        left:24,
        height: 48,
    },
    addDose: {
        top:116,
        borderRadius: 999,
        backgroundColor: '#F2F6F7',
        width: 48,
        height: 48
    }
});
