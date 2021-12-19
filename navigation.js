import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './views/Home';
import Home from "./views/Home";
import AddMedication from "./views/AddMedication";
import AddMedicationTime from "./views/AddMedicationTime";
import {NavigationContainer} from "@react-navigation/native";
import LoginScreen from "./views/auth/SignUp";
import {auth} from "./firebase";
import {useEffect} from "react";
import SignUp from "./views/auth/SignUp";

const HomeStack = createStackNavigator();
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


function TabGroup() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                    }

                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="AddPills" component={AddPillStackGroup} />
        </Tab.Navigator>
    );
}

export default function Navigation() {

    return (
        <NavigationContainer>
            <Drawer.Navigator screenOptions={{
                headerShown: false,
            }}
          drawerContent={props => {
              return (
                  <DrawerContentScrollView {...props}>
                      <DrawerItemList {...props} />
                      <DrawerItem label="Logout" onPress={() => {
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
                <Drawer.Screen name="Auth" options={{ swipeEnabled: false }} component={SignUp} />
                <Drawer.Screen name="MyPills" component={TabGroup} />
                <Drawer.Screen name="Hakkımızda" component={AddMedication} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
