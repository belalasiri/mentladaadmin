import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {COLORS, SIZES, FONTS, icons, images} from '../constants';

const SignUp = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={icons.user}
        style={{width: 40, height: 40, tintColor: COLORS.primary}}
      />
      <Text style={{...FONTS.h2, marginVertical: SIZES.padding * 1}}>
        SignUp Screen
      </Text>

      <TouchableOpacity
        style={{
          height: 40,
          width: '70%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.primary,
          borderRadius: SIZES.base,
        }}
        onPress={() => navigation.navigate('Login')}>
        <Text style={{...FONTS.h5, color: COLORS.white}}>Login Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
