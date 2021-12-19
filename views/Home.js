import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, SectionList,} from 'react-native';
import Block from "../components/Block";
import Analytics from "../components/Analytics";
import {DrawerActions, useNavigation, useFocusEffect} from '@react-navigation/native';
import {SafeAreaView} from "react-native-safe-area-context";
import {auth, firestore} from "../firebase";

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

    useFocusEffect(
        React.useCallback( () => {
            let tempArr = [];

            const fetchPills = async () => {
                try {
                    const pills = await firestore.collection('ilaclar').where('userId', '==', auth.currentUser.uid).where("done", "==", false);

                    pills.onSnapshot((querySnapshot)=>{
                        querySnapshot.forEach(documentSnapshot => {
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
                        console.log(res);
                    });

                } catch (e) {
                    // Handle error
                }
            };

            fetchPills();

            return () => {
                tempArr = [];
            };
        }, [])
    );

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
