import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./views/Home";
import AddMedication from "./views/AddMedication"
import AddMedicationTime from "./views/AddMedicationTime";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }} initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="AddMedication" component={AddMedication} />
                <Stack.Screen name="AddMedicationTime" component={AddMedicationTime} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;
