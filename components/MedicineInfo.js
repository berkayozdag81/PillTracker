import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {beforeTimeTypes} from "../consts";

function MedicineInfo({Icon, PillName, DoseCount, beforeTimeType, dayCount}) {
    return (
        <View
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
                    <Image style={{width: 40, height: 40}} source={Icon}/>
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
                    }}>{PillName}</Text>
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
                        >{DoseCount} doz - {beforeTimeTypes[beforeTimeType]}</Text>
                        <Text style={{
                            marginLeft:"auto",
                            color:"#8C8E97",
                            fontSize:16,
                            lineHeight:20,
                        }}>{dayCount} gün</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
export default MedicineInfo;


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
