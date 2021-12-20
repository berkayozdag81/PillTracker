import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, TouchableHighlight} from 'react-native';
import SwipeableItem, { useSwipeableItemParams } from 'react-native-swipeable-item';
import Animated, {useAnimatedStyle} from "react-native-reanimated";
import {beforeTimeTypes, pillTypes} from "../consts";
import {firestore} from "../firebase";


function Block({Item}) {
    const [snapPointsLeft, setSnapPointsLeft] = useState([70])

    const UnderlayLeft = () => {
        const { item, percentOpen } = useSwipeableItemParams();
        const animStyle = useAnimatedStyle(
            () => ({
                opacity: percentOpen.value,
            }),
            [percentOpen]
        );

        const onDonePress = () => {
            firestore
                .collection('ilaclar')
                .doc(Item.id).delete()
                .then(() => {
                    console.log(`${Item.id} updated!'`);
                });
        }

        return (
            <Animated.View
                style={[styles.row, styles.underlayLeft, animStyle]}
            >
                <TouchableOpacity onPress={onDonePress}>
                    <Image source={require('../assets/tickVector.png')}/>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <SwipeableItem
            item={Item}
            overSwipe={20}
            snapPointsLeft={snapPointsLeft}
            renderUnderlayLeft={() => <UnderlayLeft />}
            onChange={({ open }) => {
            console.log('on change!!!', open)

            }}>
            <TouchableHighlight
                style={styles.rowFront}
            >
                <View style={{
                    flexDirection:'row'
                }}>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 54,
                        height: 54,
                    }}>
                        <Image style={{width: 40, height: 40}} source={pillTypes[Item.medicineType]}/>
                    </View>
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
                        }}>{Item.medicineName}</Text>
                        <View style={{
                            marginTop:8,
                            flexDirection:"row",
                        }}>
                            <Text
                                style={{
                                    color:"#8C8E97",
                                    fontSize:16,
                                    lineHeight:20,
                                }}
                            >1 Doz - {beforeTimeTypes[Item.beforeTimeType]}</Text>
                            <Text style={{
                                marginLeft:"auto",
                                color:"#8C8E97",
                                fontSize:16,
                                lineHeight:20,
                            }}>{Item.dayCount} gün</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        </SwipeableItem>
    );
}
export default Block;


const styles = StyleSheet.create({
    rowFront: {
        alignItems: "center",
        padding: 24,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#ECEDEF",
        height: 110,
    },
    row: {
        flexDirection: 'row',
        height: 110,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
    },
    text: {
        fontWeight: 'bold',
        color: 'blue',
        fontSize: 32,
    },
    underlayLeft: {
        height: 110,
        justifyContent: 'flex-end',
    },
});
