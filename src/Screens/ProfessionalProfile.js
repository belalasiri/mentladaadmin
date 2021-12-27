import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {COLORS, FONTS, SIZES} from '../constants';

//Libraries
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {Avatar, ListItem} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const ProfessionalProfile = ({navigation, route}) => {
  const UresData = route.params;
  const Heder = ({onBacePress, name}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: SIZES.padding,
          paddingTop: SIZES.padding * 2,
          // marginTop: 5,
          alignItems: 'center',
        }}>
        {/* GoBack */}
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onBacePress}>
          <Icon name="chevron-back" size={25} color={COLORS.secondary} />
        </TouchableOpacity>

        {/* Title */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: COLORS.secondary,
              ...FONTS.h4,
            }}>
            {name}
          </Text>
        </View>

        {/* Profile */}
        <View style={{marginRight: 20, tintColor: UresData.color}}>
          <Image
            source={UresData.icon}
            resizeMode="contain"
            style={{
              height: 25,
              width: 25,
              tintColor: UresData.color,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      {/* Profile pic and name with Specialty */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Heder
          name={route.params.profName}
          onBacePress={() => navigation.goBack()}
        />
        <View style={styles.Heder}>
          <View style={styles.Left} />
          <View style={styles.Right} />
        </View>

        <View style={{paddingHorizontal: 15}}>
          <View style={styles.Hedercontainer}>
            <Pressable onPress={() => {}}>
              <Avatar
                size={80}
                rounded
                source={{
                  uri:
                    route.params.profAvatar ||
                    'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg',
                }}
                containerStyle={{backgroundColor: COLORS.primary}}>
                <Avatar.Accessory
                  size={25}
                  color={COLORS.white}
                  iconStyle={(ic = 20)}
                  style={{backgroundColor: COLORS.primary}}
                />
              </Avatar>
            </Pressable>
            {/* Profile name and Specialty */}
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  ...FONTS.h3,
                  paddingTop: 10,
                  color: COLORS.secondary,
                }}>
                {route.params.profName}
              </Text>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.primary,
                  width: SIZES.width / 2 + 30,
                  textAlign: 'center',
                }}>
                {route.params.specialization}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfessionalProfile;

const styles = StyleSheet.create({
  Heder: {
    position: 'absolute',
    width: '100%',
    top: -50,
    zIndex: -100,
  },
  Left: {
    backgroundColor: COLORS.lightyellow,
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    left: -30,
    top: -30,
  },
  Right: {
    backgroundColor: COLORS.lightpurple,
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    right: -100,
    top: -200,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingLeft: 20,
  },

  Hedercontainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
});
