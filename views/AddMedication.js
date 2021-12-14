import React,{useState} from 'react';
import { StyleSheet, Text, View, FlatList,Image,TouchableOpacity} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import Button from "../components/Button";
import Input from "../components/Input";
import {NavigationActions as navigation} from "react-navigation";

const DATA = [
    {
        id: 0,
        title: 'First Item',
    },
    {
        id: 1,
        title: 'Second Item',
    },
    {
        id: 2,
        title: 'Third Item',
    },
    {
        id: 3,
        title: 'Fourth Item',
    },
];
const DATA2 = [
    {
        id: 0,
        title: 'Never Mind',
    },
    {
        id: 1,
        title: 'After meal',
    },
    {
        id: 2,
        title: 'Before Meal',
    },
    {
        id: 3,
        title: 'Before Night',
    },
];

const MedicineType = ({onPress, selected}) => {
    return(
        <Button onPress={onPress} style={{borderRadius: 999, backgroundColor: '#F2F6F7', width: 64, height: 64}}>
            {selected && (
                <View style={{backgroundColor: "green", width: 18, height: 18,
                    borderRadius: 999, position: 'absolute', top: 0, right: 0}}>

                </View>
            )}
        </Button>
    )
};

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
);

export default function App() {
    const [selectedMedicineType, setSelectedMedicineType] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    const itemSeparator = () => (
        <View
            style={{width: 24}}
        />
    );

    const renderItem = ({ item,onPress, selected }) => {
        const backgroundColor = item.id === selectedId ? "#F2F6F7" : "white";
        const color = item.id === selectedId ? 'black' : 'grey';
        const backgroundColor2 = selected ? 'red' : 'white';
        return (
            <Button style={{borderRadius:999,backgroundColor: '#F2F6F7', width: 119, height: 24,fontSize:20,fontWeight:'bold'}}>
                <Item
                    item={item}
                    onPress={() => setSelectedId(item.id)}
                    backgroundColor={{ backgroundColor2 }}
                    textColor={{ color }}
                />
            </Button>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center',width:'95%',height:44}}>
                <View>
                    <Button>
                        <Image source={require('../assets/back_vector.png')}/>
                    </Button>
                </View>
                <View>
                    <TouchableOpacity>
                        <Image source={require('../assets/Vector.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={{fontWeight:'normal',fontSize:16,color:'#8C8E97',top:12}}>1. Adım</Text>
            <Text style={{fontWeight:'bold',fontSize:30,color:'#191D30',top:44}}>Add medication</Text>
            <View style={{top:70}}>
                <FlatList
                    extraData={selectedMedicineType}
                    ItemSeparatorComponent={itemSeparator}
                    horizontal
                    data={DATA}
                    renderItem={({item, index}) => (
                        <MedicineType selected={item.id === selectedMedicineType} onPress={() => {
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
            <View style={{width:'100%',height:40,flexDirection: 'row',top:140,}}>
                <Input PlaceHolder={'İlaç İsmi'}/>
            </View>
            <View style={{width:'100%',height:40,flexDirection: 'row',top:185,}}>
                <Input PlaceHolder={'Kaç Doz'}/>
            </View>
            <View style={{top:225}}>
                <FlatList
                    data={DATA2}
                    renderItem={renderItem}
                    horizontal
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
                />
            </View>
            <Button style={styles.nextButton}>
                <Text style={{color: 'white', fontSize: 25}}>Next</Text>
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 24,
        backgroundColor: 'white'
    },
    nextButton: {
        position: 'absolute',
        top:700,
        borderRadius: 999,
        backgroundColor: '#1892FA',
        width: '94%',
        left:24,
        height: 48,
    }
});
