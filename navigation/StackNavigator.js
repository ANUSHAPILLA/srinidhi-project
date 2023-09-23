import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import BioDataScreen from "../screens/BioDataScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tab"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tab" component={TabNavigator} />
      <Stack.Screen
        name="BioDataScreen"
        component={(props) => <BioDataScreen {...props} />}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
