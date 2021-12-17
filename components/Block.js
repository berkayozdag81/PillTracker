import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, TouchableHighlight} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';


function Block({
    Icon,
    marginTop,
})
{
    const [listData, setListData] = useState(
        Array(1).fill('').map((_, i) => ({ key: `${i}`, text: `Item ${++i}` }))
    );
    const [isShow,setIsShow]=useState(false);

    const closeItem = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const onItemOpen = rowKey => {
    };

    const renderItem = data => (
        <TouchableHighlight
            style={style.rowFront}
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
    );



    const renderHiddenItem = (data, rowMap) => (
        isShow ? (
            <View style={style.rowBack}>
                <TouchableOpacity
                    style={[style.actionButton, style.closeBtn]}
                    onPress={() => closeItem(rowMap, data.item.key)}
                >
                    <Image source={require('../assets/tickVector.png')}/>
                </TouchableOpacity>
            </View>
        ):(
            <View></View>
        )
    );


    return (
        <View>
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={()=>{setIsShow(true)}}
                onRowDidClose={()=>{setIsShow(false)}}
            />
        </View>
    );
}
export default Block;


const style = StyleSheet.create({
    rowFront: {
        alignItems: "center",
        padding: 24,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#ECEDEF",
        width: "100%",
        height: 110,
    },
    rowBack: {
        alignItems: "center",
        padding: 24,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "white",
        width: "100%",
        height: 110,
        left: 75
    },
    actionButton: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: '25%',
    },
    closeBtn: {
        backgroundColor: '#ECEDEF',
        right: 75,
        borderRadius:24
    },
});

