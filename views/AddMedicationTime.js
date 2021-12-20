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
import { StackActions } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

const medicineTypesImages = [ pill, surup, igne, astim ];

const DATA = [
    {
        id: 0,
        title: '5 dakika kala',
        minute: 5,
    },
    {
        id: 1,
        title: '10 dakika kala',
        minute: 10,
    },
    {
        id: 2,
        title: '15 dakika kala',
        minute: 15,
    },
    {
        id: 3,
        title: '20 dakika kala',
        minute: 20,
    },
    {
        id: 4,
        title: '30 dakika kala',
        minute: 30,
    },
    {
        id: 5,
        title: '35 dakika kala',
        minute: 35,
    },
];

export default function AddMedicineTime({route, navigation}) {
    const { selectedMedicineType, pillName, doseCount, beforeTimeType, dayCount } = route.params;

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [selectedId, setSelectedId] = useState(0);
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
                    <Text style={{fontSize:20, fontWeight: 'bold', color: 'gray'}}>Doz {index + 1}</Text>
                    <TouchableOpacity onPress={() => showDatePicker(index)}><Text style={{fontSize:20, fontWeight: 'bold', color: '#191D30'}}>{doseCountArray[index]}</Text></TouchableOpacity>
                </View>
            )
        })

    }

    const renderItem = ({ item,onPress, selected }) => {
        const backgroundColor = item.id === selectedId ? "black" : "#cdcdcd";
        return (
            <TouchableOpacity onPress={() => setSelectedId(item.id)} >
                <Text style={{fontSize:20, fontWeight: 'bold', color: backgroundColor, paddingVertical: 20  }}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    async function schedulePushNotification(pillName, schedule) {
        console.log(schedule);
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "🚨 İlaç Vakti 🚨",
                body: `${pillName} ilacınızı alma vakti.`,
            },
            trigger: schedule,
        });
    }

    const onFinishedPress = async () => {
        const dayArray = new Array(parseInt(dayCount)).fill(0);
        let pillDate = new Date();
        dayArray.forEach((value, index) => {
            doseCountArray.forEach((time) => {
                let timeArray = time.split(":");
                pillDate.setHours(timeArray[0], timeArray[1]);
                firestore.collection('ilaclar').add({
                    medicineName: pillName,
                    beforeTimeType,
                    medicineType: selectedMedicineType,
                    doseTime: time,
                    userId: auth.currentUser.uid,
                    date: `${pillDate.getDate()}-${pillDate.getMonth() + 1}-${pillDate.getFullYear()}`,
                    done: false,
                    dayCount
                });
                if (isEnabled){
                    const deneme = new Date(
                        pillDate.getFullYear(),
                        pillDate.getMonth(),
                        pillDate.getDate(),
                        parseInt(timeArray[0]),
                        parseInt(timeArray[1]));
                    deneme.setMinutes(deneme.getMinutes() - DATA[selectedId].minute)
                    schedulePushNotification(pillName, deneme);
                }
            });
            pillDate.setDate(pillDate.getDate() + 1);
        })
        await alert("İlaç başarılı şekilde eklendi.");
        navigation.dispatch(StackActions.popToTop());
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
                dayCount={dayCount}
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
                            ItemSeparatorComponent={() => <View style={{width: 15}}/>}
                            horizontal
                            keyExtractor={(item) => item.id}
                            extraData={selectedId}
                        />
                    </View>
                )}
            </View>


            <Button onPress={onFinishedPress} style={styles.nextButton}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Tamamla</Text>
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
        paddingVertical: 12,
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
