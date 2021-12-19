import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, SectionList,} from 'react-native';
import Block from "../components/Block";
import Analytics from "../components/Analytics";
import Button from "../components/Button";
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Omega from '../assets/omega.png';
import {SafeAreaView} from "react-native-safe-area-context";
import {auth, firestore} from "../firebase";

const groupBy = (arr, key) => {
    const initialValue = {};
    return arr.reduce((acc, cval) => {
        const myAttribute = cval[key];
        acc[myAttribute] = [...(acc[myAttribute] || []), cval]
        return acc;
    }, initialValue);
};

const DATA = [
    {
        title: "Main dishes",
        data: ["Pizza", "Burger", "Risotto"]
    },
    {
        title: "Sides",
        data: ["French Fries", "Onion Rings", "Fried Shrimps"]
    },
    {
        title: "Drinks",
        data: ["Water", "Coke", "Beer"]
    },
    {
        title: "Desserts",
        data: ["Cheese Cake", "Ice Cream"]
    }
];


const renderPill = ({item, index}) => {
    return <Block Icon={Omega} Item={item} marginTop={16}/>;
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

    useEffect(() => {

        firestore.collection('ilaclar').where('userId', '==', auth.currentUser.uid).get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                homeData.push(...documentSnapshot.data());
                setHomeData(homeData);
                //console.log('İlaç: ', documentSnapshot.data());
            });
        });
        console.log(homeData);
    }, []);

    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbar}>
                <View style={{width: 283,height:20}}>
                    <Text style={{fontSize:16,lineHeight:20,fontStyle:"normal",color:"#8C8E97"}}>Selam Berkay,</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <View style={{height:40, width: 40, backgroundColor: '#67B779', borderRadius: 999, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize:24}}>B</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <SectionList
                style={{marginTop: 30}}
                ListHeaderComponent={() => <Analytics />}
                sections={DATA}
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
        paddingBottom: 0,
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
