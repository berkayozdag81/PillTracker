import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, TouchableHighlight} from 'react-native';
import SwipeableItem, { useSwipeableItemParams } from 'react-native-swipeable-item';
import Animated, {useAnimatedStyle} from "react-native-reanimated";


function Block({Icon, Item}) {
    const [snapPointsLeft, setSnapPointsLeft] = useState([70])

    const UnderlayLeft = () => {
        const { item, percentOpen } = useSwipeableItemParams();
        const animStyle = useAnimatedStyle(
            () => ({
                opacity: percentOpen.value,
            }),
            [percentOpen]
        );

        return (
            <Animated.View
                style={[styles.row, styles.underlayLeft, animStyle]} // Fade in on open
            >
                <TouchableOpacity>
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
                        <Image source={Icon}/>
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
                        }}>Omega 3</Text>
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
                            >1 tablet after meals</Text>
                            <Text style={{
                                marginLeft:"auto",
                                color:"#8C8E97",
                                fontSize:16,
                                lineHeight:20,
                            }}>7 days</Text>
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
