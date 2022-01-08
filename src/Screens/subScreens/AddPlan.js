import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  StatusBar,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';

//Libraries
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';

//Imports
import {COLORS, FONTS, icons, images, SIZES} from '../../constants';

//DataBase
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const Header = ({onBacePress, name, icon, iconColor}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding * 2,
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

      <View style={{marginRight: 20}}>
        <Image
          source={icons.wallet}
          resizeMode="contain"
          style={{
            height: 25,
            width: 25,
            tintColor: iconColor,
          }}
        />
      </View>
    </View>
  );
};
const AddPlan = ({navigation}) => {
  const [pickerFocused, setPickerFocused] = useState(false);
  const [planType, setPlanType] = useState();
  const [planFeatures, setPlanFeatures] = useState(null);
  const [planPrice, setPlanPrice] = useState(null);
  const [seconds, setSeconds] = useState(null);

  const handleValueChange = itemValue => setPlanType(itemValue);

  const submitBlog = async () => {
    firestore()
      .collection('Plans')
      .add({
        planPrice: planPrice,
        planType: planType,
        planFeatures: planFeatures,
        lastUpdated: firestore.Timestamp.fromDate(new Date()),
        seconds: seconds,
      })
      .then(() => {
        navigation.goBack();
        ToastAndroid.showWithGravity(
          'Your post has been published Successfully',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        // setBlog(null);
      })
      .catch(error => {
        console.log(
          'Something went wrong with added post to firestore.',
          error,
        );
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'space-between',
      }}>
      <Header
        name="Add plan"
        iconColor={COLORS.primary}
        onBacePress={() => navigation.goBack()}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          marginBottom: 20,
          alignItems: 'center',
          paddingTop: 10,
        }}>
        <Text
          style={{
            color: COLORS.secondary,
            ...FONTS.h4,
          }}>
          All Mentlada plans
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding * 2,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            borderColor: COLORS.lightpurple,
            alignItems: 'center',
            borderWidth: 2,
            borderRadius: 7,
            paddingLeft: 10,
          }}>
          <Picker
            mode={'dialog'}
            dropdownIconColor={COLORS.secondary}
            style={[
              styles.pickerStylesTest,
              {color: planType ? COLORS.secondary : '#c19ce9'},
            ]}
            selectedValue={planType}
            onValueChange={handleValueChange}
            onFocus={() => setPickerFocused(true)}
            onBlur={() => setPickerFocused(false)}>
            <Picker.Item
              value=""
              label="Choose the plan type"
              enabled={!pickerFocused}
            />
            <Picker.Item
              label="Premium"
              value="Premium"
              style={{...FONTS.h4_2, color: COLORS.primary}}
            />
            <Picker.Item
              label="Basic"
              value="Basic"
              style={{...FONTS.h5, color: COLORS.secondary}}
            />
          </Picker>
        </View>
        <View style={styles.newPostContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Plan features list"
              multiline
              value={planFeatures}
              onChangeText={text => setPlanFeatures(text)}
              style={styles.postInput}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            borderColor: COLORS.lightpurple,
            alignItems: 'center',
            borderWidth: 2,
            borderRadius: 7,
            paddingLeft: 10,
          }}>
          <Image
            source={icons.wallet}
            style={{width: 20, height: 20, tintColor: COLORS.primary}}
          />
          <TextInput
            placeholder="Price"
            autoCorrect={false}
            keyboardType="number-pad"
            value={planPrice}
            onChangeText={txt => setPlanPrice(txt)}
            style={{
              flex: 1,
              ...FONTS.body4,
              paddingLeft: SIZES.padding,
              color: COLORS.secondary,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            borderColor: COLORS.lightpurple,
            alignItems: 'center',
            borderWidth: 2,
            borderRadius: 7,
            paddingLeft: 10,
          }}>
          <Image
            source={icons.time}
            style={{width: 20, height: 20, tintColor: COLORS.primary}}
          />
          <TextInput
            placeholder="Seconds"
            autoCorrect={false}
            keyboardType="number-pad"
            value={seconds}
            onChangeText={txt => setSeconds(txt)}
            style={{
              flex: 1,
              ...FONTS.body4,
              paddingLeft: SIZES.padding,
              color: COLORS.secondary,
            }}
          />
        </View>
      </View>

      <View
        style={{
          padding: SIZES.padding * 2,
        }}>
        <LinearGradient
          colors={[COLORS.lightpurple, COLORS.lightGreen]}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          style={{
            borderRadius: 7,
            padding: 10,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={submitBlog}>
            <Text style={{...FONTS.h5}}>Add the plan</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default AddPlan;
const styles = StyleSheet.create({
  pickerStyles: {
    width: '100%',
    // flex: 1,
    // color: colors.subtext,
    //   {color: planType ? COLORS.secondary : '#c19ce9'},
  },
  pickerStylesTest: {
    width: '100%',
    flex: 1,
  },
  newPostContainer: {
    // flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 7,
    borderColor: COLORS.lightpurple,
    alignContent: 'center',
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  postInput: {
    ...FONTS.body4,
    paddingLeft: SIZES.padding,
    color: COLORS.secondary,
  },
});
