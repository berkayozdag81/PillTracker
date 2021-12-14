import React from 'react';
import {StyleSheet, Text, View,TouchableOpacity,Image} from 'react-native';

function Block({
    Icon,
    marginTop
})
{
    return (
        //touchableOpacity arasına aldım çünkü sağa doğru kaydırdığımızda ilacın içildiğine dair tik gelicek.
        <TouchableOpacity>
         <View style={{
             alignItems: "center",
             padding: 24,
             flexDirection:"row",
             borderRadius: 24,
             borderWidth: 1,
             borderColor: "#ECEDEF",
             width: "100%",
             height: 100,
             marginTop:marginTop,
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
        </TouchableOpacity>
    );
}
export default Block;


const style = StyleSheet.create({
});

