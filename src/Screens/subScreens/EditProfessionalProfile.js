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
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import {COLORS, FONTS, SIZES} from '../../constants';

const EditProfessionalProfile = ({navigation, route}) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [loading, setLoading] = useState(true);
  const [Profdata, setProfdata] = useState(null);

  const getProfessional = async () => {
    setLoading(true);

    await firestore()
      .collection('Professional')
      .doc(route.params.professionalId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          // console.log('User Data', documentSnapshot.data());
          setProfdata(documentSnapshot.data());
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    getProfessional();
  }, []);

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

  const onCancel = () => {
    navigation.goBack();
    ToastAndroid.showWithGravityAndOffset(
      'Add post Canceled',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      200,
    );
  };

  const handleUpdate = () => {
    setUploading(true);

    firestore()
      .collection('Professional')
      .doc(Profdata.professionalId)
      .update({
        License: Profdata.License,
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

  return (
    <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={80}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          {uploading ? (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator size="small" color={COLORS.white} />
            </View>
          ) : (
            <Text style={styles.buttonText}>Update</Text>
          )}
        </TouchableOpacity>
      </View>
      <Text>{route.params.profEmail}</Text>
      <View style={{marginTop: SIZES.padding * 2}}>
        <View style={{alignItems: 'center'}}>
          {/* <TouchableOpacity onPress={choosePhotoFromLibrary}>
            <Text>
              {Profdata
                ? Profdata.License || 'No fname..'
                : 'No deteiles are provided..'}
            </Text>
          </TouchableOpacity> */}

          <TextInput
            placeholder="License No."
            placeholderTextColor="#707070"
            keyboardType="number-pad"
            value={Profdata ? Profdata.License : ''}
            onChangeText={txt => setProfdata({...Profdata, License: txt})}
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
      </View>
      {/* <FlatList
        data={Profdata}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({id, item}) => (
          <View key={id}>
          <Text>
          EditProfessionalProfile Screen {route.params.profLicense}
            </Text>
            <Text>{route.params.profEmail}</Text>
            <Text>{item.email}</Text>
            <Text>{Profdata.profEmail}</Text>

          </View>
        )}
        .where('email', '==', route.params.profEmail)
        
      /> */}
    </KeyboardAvoidingView>
  );
};

export default EditProfessionalProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
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
});
