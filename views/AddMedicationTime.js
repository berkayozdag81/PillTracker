import React,{useState} from 'react';
import {StyleSheet, Text, View, Switch, Image, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import Button from "../components/Button";
import {auth, firestore} from "../firebase";
import MedicineInfo from "../components/MedicineInfo";
import pill from "../assets/pill.png";
import surup from "../assets/surup.png";
import igne from "../assets/igne.png";
import astim from "../assets/astim.png";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const medicineTypesImages = [ pill, surup, igne, astim ];

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


export default function AddMedicineTime({route, navigation}) {
    const { selectedMedicineType, pillName, doseCount, beforeTimeType } = route.params;

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [doseCountArray, setDoseCountArray] = useState(new Array(parseInt(doseCount)).fill("00:00"));

    const showDatePicker = (index) => {
        setDatePickerVisibility(true);
        setSelectedIndex(index);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        let newArray = [...doseCountArray];
        newArray[selectedIndex] = `${date.getHours()}:${date.getMinutes()}`;
        setDoseCountArray(newArray);
        hideDatePicker();
    };

    const renderDoseHours = () => {
        return doseCountArray.map((item, index) => {
            return (
                <View key={index} style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center', marginVertical: 20}}>
                    <Text>Doz {index + 1}</Text>
                    <TouchableOpacity onPress={() => showDatePicker(index)}><Text>{doseCountArray[index]}</Text></TouchableOpacity>
                </View>
            )
        })

    }

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

    const onFinishedPress = () => {
        doseCountArray.forEach((time) => {
            firestore.collection('ilaclar').add({
                medicineName: pillName,
                beforeTimeType,
                medicineType: selectedMedicineType,
                doseTime: time,
                userId: auth.currentUser.uid,
                done: false,
            });
        });

        navigation.navigate("Home");
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center', marginVertical: 20}}>
                <View>
                    <Button onPress={() => navigation.navigate("AddMedication")}>
                        <Image source={require('../assets/back_vector.png')}/>
                    </Button>
                </View>
            </View>
            <Text style={{fontWeight:'normal',fontSize:16,color:'#8C8E97', marginVertical: 10}}>2. Adım</Text>
            <Text style={{fontWeight:'bold',fontSize:30,color:'#191D30',  marginBottom: 20}}>Özet</Text>

            <MedicineInfo
                PillName={pillName}
                DoseCount={doseCount}
                beforeTimeType={beforeTimeType}
                Icon={medicineTypesImages[selectedMedicineType]}
            />

            {renderDoseHours()}

            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={{fontWeight:'bold',fontSize:24,color:'#191D30',}}>
                        Hatırlatıcı
                    </Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setIsEnabled(!isEnabled)}
                        value={isEnabled}
                    />
                </View>
                {isEnabled && (
                    <View style={{marginTop: 20}}>
                        <FlatList
                            data={DATA}
                            renderItem={renderItem}
                            horizontal
                            keyExtractor={(item) => item.id}
                            extraData={selectedId}
                        />
                    </View>
                )}
            </View>


            <Button onPress={onFinishedPress} style={styles.nextButton}>
                <Text style={{color: 'white', fontSize: 20}}>Tamamla</Text>
            </Button>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 0,
        paddingHorizontal: 24,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    nextButton: {
        borderRadius: 999,
        backgroundColor: '#1892FA',
        height: 48,
    },
});
