import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {COLORS, SIZES, FONTS, icons, images} from '../constants';

const FormInput = ({labelValue, placeholderText, iconType, ...rest}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={24} color="#353948" />
      </View>
      <TextInput
        value={labelValue}
        style={[styles.input, {...FONTS.body3}]}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#707070"
        {...rest}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: SIZES.height / 15,
    borderColor: 'rgba(158, 150, 150, .5)',
    borderRadius: 7,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f3fc',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: 'rgba(158, 150, 150, .5)',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    paddingLeft: 10,
    // paddingBottom: 10,
    flex: 1,
    fontSize: 16,
    color: '#353948',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
