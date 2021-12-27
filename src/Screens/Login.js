import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import FormInput from '../components/FormInput';
import {COLORS, SIZES, FONTS, icons, images} from '../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <View style={styles.container}>
      <Image
        source={icons.user}
        style={{width: 40, height: 40, tintColor: COLORS.primary}}
      />
      <View style={styles.action}>
        <AntDesign name="user" color="#707070" size={20} />
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#707070"
          autoCorrect={false}
          style={styles.textInput}
        />
      </View>
      <Text style={{...FONTS.h2, marginVertical: SIZES.padding * 1}}>
        Login Screen
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
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={{...FONTS.h5, color: COLORS.white}}>SignUp Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding * 4,
    backgroundColor: COLORS.white,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderColor: '#f0e6fa',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 7,
    paddingLeft: 10,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 14,
    color: COLORS.secondary,
  },
});
