import React,{useState} from 'react';
import { StyleSheet, Text, View ,SafeAreaView,Image,TouchableOpacity,Picker} from 'react-native';
// import Block from "/components/Block";
 import Analytics from "/components/Analytics";

export default function Home() {
    const [selectedValue,setSelectedValue] =  useState("Cuma");
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbar}>
                <View style={{width: 283,height:20}}>
                    <Text style={{fontsize:16,lineHeight:20,fontStyle:"normal",color:"#8C8E97"}}>Selam Berkay,</Text>
                </View>
                {/*<View style={{height:20}}>*/}
                {/*    <TouchableOpacity>*/}
                {/*        <Image source={require('../swn/assets/icon.png')}/>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
            </View>
            <View style={styles.picker}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150,fontsize:34,fontStyle:"normal",fontWeight:"bold",lineHeight:38,color:"#191D30"}}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Pazartesi" value="Pazartesi" />
                    <Picker.Item label="Salı" value="Salı" />
                    <Picker.Item label="Çarşamba" value="Çarşamba" />
                    <Picker.Item label="Perşembe" value="Perşembe" />
                    <Picker.Item label="Cuma" value="Cuma" />
                    <Picker.Item label="Cumartesi" value="Cumartesi" />
                    <Picker.Item label="Pazar" value="Pazar" />
                </Picker>
            </View>
            {/*<Analytics marginTop={16}/>*/}
            <View style={{marginTop:15}}>
                <Text style={{color:"#191D30",
                    fontSize:20,
                    lineHeight:24,
                    fontWeight:"bold"}} >08:00</Text>
            </View>
            {/*<Block marginTop={16}*/}
            />
            <View style={{marginTop:15}}>
                <Text style={{color:"#191D30",
                    fontSize:20,
                    lineHeight:24,
                    fontWeight:"bold"}} >16:30</Text>
            </View>
            {/*<Block marginTop={16}/>*/}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:26,
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
    }
});
