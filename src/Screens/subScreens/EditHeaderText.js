import React, {useEffect, useContext, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  StatusBar,
  ToastAndroid,
  FlatList,
  SafeAreaView,
} from 'react-native';

// DataBase
import firestore, {firebase} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import {COLORS, FONTS, icons, SIZES} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
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
          source={icons.Header}
          resizeMode="contain"
          style={{
            height: 20,
            width: 20,
            tintColor: iconColor,
          }}
        />
      </View>
    </View>
  );
};

const EditHeaderText = ({navigation, route}) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [loading, setLoading] = useState(true);
  const [headers, setHeader] = useState(null);

  const FETCH_HEADER = async () => {
    setLoading(true);
    await firestore()
      .collection('Header')
      .doc(route.params.id)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setHeader(documentSnapshot.data());
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    FETCH_HEADER();
  }, []);
  const updateHeader = async () => {
    setLoading(true);
    firestore()
      .collection('Header')
      .doc(route.params.id)
      .update({
        HeaderText: headers.HeaderText,
        lastUpdated: firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        navigation.goBack();
        ToastAndroid.showWithGravityAndOffset(
          'Header edited successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          200,
        );
        setLoading(false);
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
        // justifyContent: 'space-between',
      }}>
      <Header
        name={`Edit Header`}
        iconColor={COLORS.primary}
        onBacePress={() => navigation.goBack()}
      />
      <View
        style={{
          paddingHorizontal: SIZES.padding * 2,
        }}>
        <View style={styles.newPostContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Plan features list"
              multiline
              value={headers ? headers.HeaderText : ''}
              onChangeText={text => setHeader({...headers, HeaderText: text})}
              style={styles.postInput}
            />
          </View>
        </View>
        <View
          style={{
            paddingVertical: SIZES.padding * 2,
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
              onPress={updateHeader}
              disabled={loading}>
              {loading ? (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                  }}>
                  <BallIndicator color={COLORS.secondary} size={15} />
                </View>
              ) : (
                <Text style={{...FONTS.h5}}>Save the header</Text>
              )}
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditHeaderText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerStyles: {
    width: '100%',
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
