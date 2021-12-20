import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList,Image,TouchableOpacity, TextInput} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import Button from "../components/Button";
import Input from "../components/Input";
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

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

export default function App() {
    const [selectedMedicineType, setSelectedMedicineType] = useState(0);
    const [beforeTimeType, setBeforeTimeType] = useState(0);
    const [dayCount, setDayCount] = useState(1);
    const [pillName, setPillName] = useState("");
    const [doseCount, setDoseCount] = useState(1);
    const [selectedLanguage, setSelectedLanguage] = useState();

    const navigation = useNavigation();

    const itemSeparator = () => (
        <View
            style={{width: 24}}
        />
    );

    const renderItem = ({ item, selected }) => {
        const backgroundColor = item.id === beforeTimeType ? "black" : "#cdcdcd";
        return (
            <TouchableOpacity onPress={() => setBeforeTimeType(item.id)} >
                <Text style={{fontSize:20, fontWeight: 'bold', color: backgroundColor, paddingVertical: 20  }}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontWeight:'normal',fontSize:16,color:'#8C8E97'}}>1. Adım</Text>
            <Text style={{fontWeight:'bold',fontSize:30, color:'#191D30', marginTop: 14}}>İlaç Ekle</Text>
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
            <View style={{width:'100%',flexDirection: 'row', marginTop: 50}}>
                <TextInput style={styles.input} onChangeText={text => setPillName(text)} placeholder={'İlaç İsmi'}/>
            </View>
            <View style={{marginTop: 25,flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize:20, fontWeight: 'bold', color: '#cdcdcd'}}>Kaç Doz</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => doseCount > 1 && setDoseCount(doseCount - 1)} style={{width: 30, height: 30, borderRadius: 999, backgroundColor: '#191D30', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize:20, fontWeight: 'bold'}}> - </Text>
                    </TouchableOpacity>
                    <Text style={{marginHorizontal: 10, fontSize:20, fontWeight: 'bold'}}>{doseCount}</Text>
                    <TouchableOpacity onPress={() => setDoseCount(doseCount + 1)} style={{width: 30, height: 30, borderRadius: 999, backgroundColor: '#191D30', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize:20, fontWeight: 'bold'}}> + </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{marginTop: 25,flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize:20, fontWeight: 'bold', color: '#cdcdcd'}}>Kaç Gün</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => dayCount > 1 && setDayCount(dayCount - 1)} style={{width: 30, height: 30, borderRadius: 999, backgroundColor: '#191D30', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize:20, fontWeight: 'bold'}}> - </Text>
                    </TouchableOpacity>
                    <Text style={{marginHorizontal: 10, fontSize:20, fontWeight: 'bold'}}>{dayCount}</Text>
                    <TouchableOpacity onPress={() => setDayCount(dayCount + 1)} style={{width: 30, height: 30, borderRadius: 999, backgroundColor: '#191D30', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize:20, fontWeight: 'bold'}}> + </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{marginTop: 20}}>
                <FlatList
                    data={DATA2}
                    renderItem={renderItem}
                    horizontal
                    ItemSeparatorComponent={() => <View style={{width: 15}}/>}
                    keyExtractor={(item) => item.id}
                    extraData={beforeTimeType}
                />
            </View>
            <View style={{flex: 1}} />
            <Button style={styles.nextButton} onPress={() => navigation.navigate("AddMedicationTime",
                {
                    selectedMedicineType: selectedMedicineType,
                    pillName : pillName,
                    doseCount: doseCount,
                    beforeTimeType : beforeTimeType,
                    dayCount
                }
                )}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Sonraki Adım</Text>
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
        width:'100%',
        fontSize:20,
        fontWeight:'bold',
        color:'#191D30',
    },
});
