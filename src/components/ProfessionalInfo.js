import React from 'react';
import {Text, View, StyleSheet, Image, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, SIZES} from '../constants';
import LinearGradient from 'react-native-linear-gradient';

const ProfessionalInfo = ({
  Title1,
  Title2,
  icon,
  iconColor,
  ...rest
}) => {

  return (
   
      <View style={[styles.container]} {...rest}>
        <Icon name={icon} size={20} color={iconColor} />
        <Text style={{...FONTS.h5}}>{Title1}</Text>
        <Text style={{...FONTS.body5}}>{Title2}</Text>
      </View>
  );
};

export default ProfessionalInfo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 7,
    // padding: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
