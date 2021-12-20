import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './views/Home';
import Home from "./views/Home";
import AddMedication from "./views/AddMedication";
import AddMedicationTime from "./views/AddMedicationTime";
import {NavigationContainer} from "@react-navigation/native";
import LoginScreen from "./views/auth/SignUp";
import {auth} from "./firebase";
import {useEffect} from "react";
import SignUp from "./views/auth/SignUp";
import SignInScreen from "./views/auth/SignIn";
import SignUpScreen from "./views/auth/SignUp";

const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
const AddPillStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


function AddPillStackGroup(){
    return (
        <AddPillStack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <AddPillStack.Screen name="AddMedication" component={AddMedication} />
            <AddPillStack.Screen name="AddMedicationTime" component={AddMedicationTime} />
        </AddPillStack.Navigator>
    );
}

function AuthGroup(){
    return (
        <AuthStack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <AuthStack.Screen name="SignIn" component={SignInScreen} />
            <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        </AuthStack.Navigator>
    );
}


function TabGroup() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => (
                {
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName  = "medkit-outline";
                    } else if (route.name === 'AddPills') {
                        iconName = "add-circle-outline";
                    }

                    return (<Ionicons name={iconName} size={32} color={focused ? 'green': 'gray'} />)
                },
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'gray',
                    keyboardHidesTabBar: true,
                })}
        >
            <Tab.Screen name="Home" options={{title: 'İlaçlarım'}} component={HomeScreen} />
            <Tab.Screen name="AddPills" options={{title: 'İlaç Ekle'}} component={AddPillStackGroup} />
        </Tab.Navigator>
    );
}

export default function Navigation() {

    return (
        <NavigationContainer independent={true}>
            <Drawer.Navigator screenOptions={{
                headerShown: false,
            }}
          drawerContent={props => {
              return (
                  <DrawerContentScrollView {...props}>
                      <DrawerItem label="Hakkımızda" onPress={() => {
                          props.navigation.navigate("Hakkımızda");
                      }} />
                      <DrawerItem label="Çıkış Yap" onPress={() => {
                          auth.signOut().then(() => {
                              props.navigation.navigate("Auth");
                          }).catch(() => {
                              console.log("ÇIKIŞ YAPMA SORUNU");
                          })
                      }} />
                  </DrawerContentScrollView>
              )
          }}

            >
                <Drawer.Screen name="Auth" options={{ swipeEnabled: false }} component={AuthGroup} />
                <Drawer.Screen name="MyPills" component={TabGroup} />
                <Drawer.Screen name="Hakkımızda" component={AddMedication} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
