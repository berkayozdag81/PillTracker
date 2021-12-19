import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList,Image,TouchableOpacity, TextInput} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import Button from "../components/Button";
import Input from "../components/Input";
import {useNavigation} from '@react-navigation/native';
import AddMedicationTime from "../views/AddMedicationTime"
import pill from '../assets/pill.png';
import astim from '../assets/astim.png';
import igne from '../assets/igne.png';
import surup from '../assets/surup.png';

const DATA = [
    {
        id: 0,
        image: pill

    },
    {
        id: 1,
        image: surup

    },
    {
        id: 2,
        image: igne

    },
    {
        id: 3,
        image: astim

    },
];

const DATA2 = [
    {
        id: 0,
        title: 'Zaman Önemi Yok',
    },
    {
        id: 1,
        title: 'Yemekten Sonra',
    },
    {
        id: 2,
        title: 'Yemekten Önce',
    },
    {
        id: 3,
        title: 'Yatmadan Önce',
    },
];

const MedicineType = ({onPress, selected, image}) => {
    return(
        <Button onPress={onPress} style={{borderRadius: 999, backgroundColor: '#F2F6F7', width: 64, height: 64}}>
            <Image style={{width: 40, height: 40}} source={image} />
            {selected && (
                <View style={{backgroundColor: "green", width: 18, height: 18,
                    borderRadius: 999, position: 'absolute', top: 0, right: 0}}>

                </View>
            )}
        </Button>
    )
};

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
);

export default function App() {
    const [selectedMedicineType, setSelectedMedicineType] = useState(null);
    const [beforeTimeType, setBeforeTimeType] = useState(null);
    const [pillName, setPillName] = useState("");
    const [doseCount, setDoseCount] = useState("1");
    const navigation = useNavigation();

    const itemSeparator = () => (
        <View
            style={{width: 24}}
        />
    );

    const renderItem = ({ item, selected }) => {
        const backgroundColor = item.id === beforeTimeType ? "#F2F6F7" : "white";
        const color = item.id === beforeTimeType ? 'black' : 'grey';
        const backgroundColor2 = selected ? 'red' : 'white';
        return (
            <Button style={{borderRadius:999,backgroundColor: '#F2F6F7', width: 119, height: 24,fontSize:20,fontWeight:'bold'}}>
                <Item
                    item={item}
                    onPress={() => setBeforeTimeType(item.id)}
                    backgroundColor={{ backgroundColor2 }}
                    textColor={{ color }}
                />
            </Button>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontWeight:'normal',fontSize:16,color:'#8C8E97'}}>1. Adım</Text>
            <Text style={{fontWeight:'bold',fontSize:30,color:'#191D30', marginTop: 14}}>İlaç Ekle</Text>
            <View style={{marginTop:50}}>
                <FlatList
                    extraData={selectedMedicineType}
                    ItemSeparatorComponent={itemSeparator}
                    horizontal
                    data={DATA}
                    renderItem={({item, index}) => (
                        <MedicineType image={item.image} selected={item.id === selectedMedicineType} onPress={() => {
                            if(item.id === selectedMedicineType){
                                setSelectedMedicineType(null);
                                return;
                            }
                                setSelectedMedicineType(index);
                          }}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
            <View style={{width:'100%',height:50,flexDirection: 'row', marginTop: 50}}>
                <TextInput style={styles.input} onChangeText={text => setPillName(text)} placeholder={'İlaç İsmi'}/>
            </View>
            <View style={{width:'100%',height:40,flexDirection: 'row',marginTop: 30}}>
                <TextInput style={styles.input} onChangeText={text => setDoseCount(text)} placeholder={'Kaç Doz'} />
            </View>
            <View style={{marginTop: 50, flex: 1}}>
                <FlatList
                    data={DATA2}
                    renderItem={renderItem}
                    horizontal
                    keyExtractor={(item) => item.id}
                    extraData={beforeTimeType}
                />
            </View>
            <Button style={styles.nextButton} onPress={() => navigation.navigate("AddMedicationTime",
                {
                    selectedMedicineType: selectedMedicineType,
                    pillName : pillName,
                    doseCount: doseCount,
                    beforeTimeType : beforeTimeType
                }
                )}>
                <Text style={{color: 'white', fontSize: 20}}>Next</Text>
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 24,
        backgroundColor: 'white',
        paddingVertical: 12,
    },
    nextButton: {
        borderRadius: 999,
        backgroundColor: '#1892FA',
        height: 48,
    },
    input: {
        height: 40,
        width:'100%',
        borderWidth: 1.5,
        padding: 10,
        borderRadius:999,
        fontSize:15,
        fontWeight:'bold',
        color:'#C4CACF',
    },
});
