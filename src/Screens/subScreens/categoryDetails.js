import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from 'react-native';

// DataBase
import firestore, {firebase} from '@react-native-firebase/firestore';

//My Imports (in this case my files)
import {COLORS, FONTS} from '../../constants';
import BlogCustom from './BlogCustom';

//Libraries
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {ListItem} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const Heder = ({onBacePress, onAddPress, name}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
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
        <Text style={{color: COLORS.secondary, ...FONTS.h6}}>{name}</Text>
      </View>

      {/* Profile */}
      <View style={{marginRight: 20}}>
        <TouchableOpacity activeOpacity={0.5} onPress={onAddPress}>
          <Feather name="plus-square" size={25} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const categoryDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={{}}> categoryDetails Screen </Text>
    </View>
  );
};

export default categoryDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
