import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, SectionList, LogBox,} from 'react-native';
import Block from "../components/Block";
import Analytics from "../components/Analytics";
import {DrawerActions, useNavigation, useFocusEffect} from '@react-navigation/native';
import {SafeAreaView} from "react-native-safe-area-context";
import {auth, firestore} from "../firebase";
import {Picker} from '@react-native-picker/picker';

function dates() {
    const today = new Date();
    let week= new Array();
    // Starting Monday not Sunday
    today.setDate((today.getDate() - today.getDay() +1));
    for (let i = 0; i < 7; i++) {
        let day = new Date(today);
        week.push(
            `${day.getDate()}-${day.getMonth() + 1}-${day.getFullYear()}`
        );
        today.setDate(today.getDate() +1);
    }
    return week;
}

const DATES = dates();
const DAYS = ["pazar","pazartesi","sali","carsamba","persembe","cuma","cumartesi"];

const renderPill = ({item}) => {
    return <Block Item={item} marginTop={16}/>;
}

const RenderTime = ({title}) => {
    return (
        <Text style={{color:"#191D30",
            marginVertical: 25,
            fontSize:20,
            lineHeight:24,
            fontWeight:"bold"}} >{title}</Text>
    )
}

export default function Home() {
    const [homeData, setHomeData] = useState([]);
    const [date, setDate] = useState(DATES[0]);
    const dateParts = DATES[0].split("-");
    const [day, setDay] = useState(DAYS[new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]).getDay()]);

    LogBox.ignoreLogs(['Setting a timer']);

    useFocusEffect(
        React.useCallback( () => {
            let tempArr = [];
            console.log(DATES);
            const fetchPills = async () => {
                try {
                    const pills = await firestore.collection('ilaclar').where('userId', '==', auth.currentUser.uid).where("date", "==", date).get();

                    pills.forEach(documentSnapshot => {
                        tempArr.push({id:documentSnapshot.id, ...documentSnapshot.data()});
                    });
                    let res = tempArr.reduce((re, o) => {
                        let existObj = re.find(
                            obj => obj.title === o.doseTime
                        )

                        if (existObj) {
                            existObj.data.push(o)
                        } else {
                            re.push({
                                title: o.doseTime,
                                data: [o]
                            })
                        }
                        return re
                    }, [])
                    setHomeData(res);

                } catch (e) {
                    // Handle error
                }
            };

            fetchPills();

            return () => {
                tempArr = [];
            };
        }, [date])
    );

    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbar}>
                <View>
                    <Text style={{fontSize:16,lineHeight:20,fontStyle:"normal",color:"#8C8E97"}}>Selam {auth.currentUser.displayName},</Text>
                    <Picker
                        selectedValue={day}
                        onValueChange={(itemValue, itemIndex) => {
                            setDay(itemValue);
                            const newDateIndex = DATES.findIndex((DATE) => {
                                const dateParts = DATE.split("-");
                                return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]).getDay() === itemIndex;
                            });
                            setDate(DATES[newDateIndex])
                        }}>
                        <Picker.Item label="Pazar" value="pazar" />
                        <Picker.Item label="Pazartesi" value="pazartesi" />
                        <Picker.Item label="Salı" value="sali" />
                        <Picker.Item label="Çarşamba" value="carsamba" />
                        <Picker.Item label="Perşembe" value="persembe" />
                        <Picker.Item label="Cuma" value="cuma" />
                        <Picker.Item label="Cumartesi" value="cumartesi" />
                    </Picker>
                </View>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <View style={{height:40, width: 40, backgroundColor: '#67B779', borderRadius: 999, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize:24}}>{auth.currentUser.displayName[0]}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <SectionList
                style={{marginTop: 30}}
                ListHeaderComponent={() => <Analytics />}
                sections={homeData}
                renderItem={renderPill}
                ItemSeparatorComponent={() => <View style={{height: 20}}/>}
                renderSectionHeader={({ section: { title } }) => (
                    <RenderTime title={title} />
                )}
                keyExtractor={(item, index) => item + index}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:26,
        paddingBottom: 20,
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
