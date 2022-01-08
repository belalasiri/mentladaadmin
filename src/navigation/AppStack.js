import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import SignUp from '../Screens/SignUp';
import Details from '../Screens/Details';
import ProfessionalProfile from '../Screens/ProfessionalProfile';
import EditProfessionalProfile from '../Screens/subScreens/EditProfessionalProfile';
import PatientsProfile from '../Screens/PatientsProfile';
import EditPatientsProfile from '../Screens/subScreens/EditPatientsProfile';
import FullPost from '../Screens/subScreens/FullPost';
import BlogContent from '../Screens/subScreens/BlogContent';
import categoryDetails from '../Screens/subScreens/categoryDetails';
import AddPlan from '../Screens/subScreens/AddPlan';
import EditPlan from '../Screens/subScreens/EditPlan';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Tab.Navigator
      initialRouteName="Homes"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';

            color = '#67D8AF';
            // size = 30;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            color = '#c9a8ec';
          } else if (route.name === 'SignUp') {
            iconName = focused ? 'person' : 'person-outline';
            color = '#c9a8ec';
          }
          return <Icon name={iconName} size={27} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 65,
          backgroundColor: '#fff',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={() => ({
          headerShown: false,
        })}
      />

      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen
        name="SignUp"
        component={SignUp}
        options={() => ({
          headerShown: false,
        })}
      />
    </Tab.Navigator>
  );
}

export default function AppStack() {
  return (
    <SafeAreaProvider>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Homes" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen
          name="ProfessionalProfile"
          component={ProfessionalProfile}
        />
        <Stack.Screen
          name="EditProfessionalProfile"
          component={EditProfessionalProfile}
        />
        <Stack.Screen name="PatientsProfile" component={PatientsProfile} />
        <Stack.Screen
          name="EditPatientsProfile"
          component={EditPatientsProfile}
        />
        <Stack.Screen name="FullPost" component={FullPost} />
        <Stack.Screen name="BlogContent" component={BlogContent} />
        <Stack.Screen name="categoryDetails" component={categoryDetails} />
        <Stack.Screen name="AddPlan" component={AddPlan} />
        <Stack.Screen name="EditPlan" component={EditPlan} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
