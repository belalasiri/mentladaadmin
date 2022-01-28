import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// DataBase
import firestore, {firebase} from '@react-native-firebase/firestore';

// Imports
import {COLORS, FONTS, SIZES, icons} from '../../constants';

//Libraries
import {Avatar, Button, ListItem} from 'react-native-elements';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

const SessionContent = ({item}) => {
  const ProfilePic = ({Userimage}) => {
    return (
      <Image
        source={Userimage}
        style={{width: 80, height: 80, borderRadius: 7}}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <Text>aa</Text>
    </SafeAreaView>
  );
};

export default SessionContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
