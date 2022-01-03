import React, {useEffect, useContext, useState} from 'react';
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
} from 'react-native';

// DataBase
import firestore, {firebase} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import {COLORS, FONTS, SIZES} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const EditPatientsProfile = ({navigation, route}) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState(null);

  const getPatient = async () => {
    setLoading(true);

    await firestore()
      .collection('users')
      .doc(route.params.userId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          //   console.log('User Data', documentSnapshot.data());
          setPatientData(documentSnapshot.data());
          setLoading(false);
        }
      });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        console.log(image);
        const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
        setImage(imageUri);
      })
      .catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          // here the solution
          return false;
        }
      });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const path = image;
    let filename = path.substring(path.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(path);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();
      setUploading(false);

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const handleUpdate = async () => {
    setUploading(true);
    let imgUrl = await uploadImage();
    let about = patientData.about;

    if (imgUrl == null && patientData.userImg) {
      imgUrl = patientData.userImg;
    }
    if (about == null) {
      about = patientData.about;
    }
    firestore()
      .collection('users')
      .doc(patientData.userId)
      .update({
        userImg: imgUrl,
        fname: patientData.fname,
        lname: patientData.lname,
        about: patientData.about,
        phone: patientData.phone,
        country: patientData.country,
        city: patientData.city,
      })
      .then(() => {
        setUploading(false);
        navigation.goBack();
        console.log('User Updated!');
        Alert.alert(
          'Profile Updated!',
          'Your profile has been updated successfully.',
        );
      });
  };

  const onCancel = () => {
    navigation.goBack();
    ToastAndroid.showWithGravityAndOffset(
      'Edit professional canceled',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      200,
    );
  };

  useEffect(() => {
    getPatient();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={80}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{padding: SIZES.padding * 2}}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight: SIZES.padding,
              }}
              onPress={onCancel}>
              {uploading ? (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <ActivityIndicator size="small" color={COLORS.white} />
                </View>
              ) : (
                <Icon name="person-remove" size={20} color={COLORS.secondary} />
              )}
            </TouchableOpacity>
          </View>

          <View style={{marginTop: SIZES.padding * 2}}>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={choosePhotoFromLibrary}>
                {loading ? (
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                  </View>
                ) : (
                  <View
                    style={{
                      height: 100,
                      width: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <ImageBackground
                      source={{
                        uri: image
                          ? image
                          : patientData
                          ? patientData.userImg ||
                            'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg'
                          : 'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg',
                      }}
                      style={{height: 100, width: 100}}
                      blurRadius={2}
                      imageStyle={{borderRadius: 70}}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <MaterialCommunityIcons
                          name="camera"
                          size={35}
                          color="#fff"
                          style={{
                            opacity: 0.7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: '#fff',
                            borderRadius: 10,
                          }}
                        />
                      </View>
                    </ImageBackground>
                  </View>
                )}
              </TouchableOpacity>

              <View
                style={{
                  paddingTop: SIZES.padding,
                  paddingBottom: 10,
                  alignItems: 'center',
                }}>
                <Text style={{...FONTS.h4, color: COLORS.secondary}}>
                  {patientData ? patientData.fname : ''}{' '}
                  {patientData ? patientData.lname : ''}
                </Text>
                <Text style={{...FONTS.body4, color: COLORS.primary}}>
                  {patientData ? patientData.email : ''}
                </Text>
              </View>

              <View style={{flex: 1, width: SIZES.width - 40}}>
                <View style={styles.action}>
                  <AntDesign name="user" color="#707070" size={20} />
                  <TextInput
                    placeholder="First Name"
                    placeholderTextColor="#707070"
                    autoCorrect={false}
                    value={patientData ? patientData.fname : ''}
                    onChangeText={txt =>
                      setPatientData({...patientData, fname: txt})
                    }
                    style={styles.textInput}
                  />
                </View>

                <View style={styles.action}>
                  <AntDesign name="user" color="#707070" size={20} />
                  <TextInput
                    placeholder="First Name"
                    placeholderTextColor="#707070"
                    autoCorrect={false}
                    value={patientData ? patientData.lname : ''}
                    onChangeText={txt =>
                      setPatientData({...patientData, lname: txt})
                    }
                    style={styles.textInput}
                  />
                </View>

                <View style={styles.action}>
                  <Feather name="phone" color="#333333" size={19} />
                  <TextInput
                    placeholder="Phone number"
                    placeholderTextColor="#707070"
                    value={patientData ? patientData.phone : ''}
                    onChangeText={txt =>
                      setPatientData({...patientData, phone: txt})
                    }
                    autoCorrect={false}
                    style={styles.textInput}
                  />
                </View>

                <View style={styles.action}>
                  <Icon name="globe-outline" color="#333333" size={20} />
                  <TextInput
                    placeholder="Country"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    value={patientData ? patientData.country : ''}
                    onChangeText={txt =>
                      setUserData({...patientData, country: txt})
                    }
                    style={styles.textInput}
                  />
                </View>

                <View style={styles.action}>
                  <MaterialCommunityIcons
                    name="map-marker-outline"
                    color="#333333"
                    size={20}
                  />
                  <TextInput
                    placeholder="City"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    value={patientData ? patientData.city : ''}
                    onChangeText={txt =>
                      setUserData({...patientData, city: txt})
                    }
                    style={styles.textInput}
                  />
                </View>

                <View style={styles.action}>
                  <View style={{paddingTop: 15, alignSelf: 'flex-start'}}>
                    <AntDesign name="infocirlceo" color="#707070" size={20} />
                  </View>
                  <TextInput
                    multiline
                    placeholder="Bio"
                    placeholderTextColor="#707070"
                    value={patientData ? patientData.about : ''}
                    onChangeText={txt =>
                      setPatientData({...patientData, about: txt})
                    }
                    autoCorrect={false}
                    style={styles.textInput}
                  />
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              paddingTop: SIZES.padding,
              width: SIZES.width - 40,
            }}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.lightGreen]}
              start={{x: 0, y: 2.5}}
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
                onPress={handleUpdate}>
                {uploading ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <ActivityIndicator size="small" color={COLORS.primary} />
                  </View>
                ) : (
                  <Text style={{...FONTS.h5}}>Update</Text>
                )}
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditPatientsProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  cancelText: {
    paddingVertical: 5,
    color: COLORS.secondary,
    ...FONTS.h5,
    paddingBottom: 7,
  },
  buttonText: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    color: COLORS.lightpurple,
    ...FONTS.h5,
    paddingBottom: 7,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    width: SIZES.width / 3 - 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    borderRadius: 40,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderColor: COLORS.lightpurple,
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 7,
    paddingLeft: 10,
  },

  textInput: {
    flex: 1,
    ...FONTS.body4,
    paddingLeft: SIZES.padding,
    color: COLORS.secondary,
  },
  biotextInput: {
    flex: 2,
    ...FONTS.body3,
    paddingLeft: SIZES.padding,
    paddingRight: SIZES.padding,
    textAlignVertical: 'top',
    color: COLORS.secondary,
  },
  bioAction: {
    flexDirection: 'row',
    marginTop: 10,
    borderColor: COLORS.lightpurple,
    borderWidth: 2,
    borderRadius: 7,
    paddingLeft: 10,
    alignContent: 'center',
  },
  newPostContainer: {
    flex: 1,
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
    ...FONTS.body3,
    textAlign: 'left',
    color: COLORS.secondary,
  },
});
