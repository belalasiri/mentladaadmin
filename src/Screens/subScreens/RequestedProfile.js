import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

// DataBase
import firestore, {firebase} from '@react-native-firebase/firestore';

// Imports
import {COLORS, FONTS, SIZES, icons} from '../../constants';

//Libraries
import {Avatar, Button, ListItem} from 'react-native-elements';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RequestedProfile = ({route, navigation}) => {
  let req = route.params.item;

  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState(null);
  const [name, setName] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);
  const [university, setUniversity] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmitRequest = () => {
    setSubmitting(true);
    firebase
      .firestore()
      .collection('packages')
      .doc(req.UserID)
      .update({
        // StartsAt: firestore.Timestamp.fromDate(new Date()),
        seconds: 86400,
        approved: 'approved',
      })
      .then(() => {
        setSubmitting(false);
        navigation.goBack();
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Request Free Session',
      headerStyle: {elevation: 0, backgroundColor: '#F0E6FA'},
      headerTitleStyle: {color: COLORS.secondary, ...FONTS.h5},
      headerTitleAlign: 'center',
      headerTintColor: COLORS.secondary,

      headerLeft: () => (
        <View style={{marginLeft: 10}}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="chevron-back" size={25} color={COLORS.secondary} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);
  const getPatient = async () => {
    setLoading(true);

    await firestore()
      .collection('users')
      .doc(req.UserID)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setPatientData(documentSnapshot.data());
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    getPatient();
  }, []);
  const ProfilePic = ({Userimage}) => {
    return (
      <Image
        source={Userimage}
        style={{width: 100, height: 100, borderRadius: 90}}
      />
    );
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 10}}>
      <View style={{flex: 1}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <ProfilePic
            Userimage={{
              uri: patientData
                ? patientData.userImg ||
                  'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg'
                : 'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg',
            }}
          />

          <Text
            style={{
              color: COLORS.secondary,
              ...FONTS.h5,
              paddingVertical: 5,
            }}>
            {patientData ? patientData.fname || 'Professional' : 'Professional'}{' '}
            {patientData ? patientData.lname || 'Profile' : 'Profile'}{' '}
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.lightpurple,
              width: '95%',
              alignSelf: 'center',
              marginVertical: 7,
            }}
          />
        </View>

        <View style={{paddingHorizontal: 10, paddingVertical: 0}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: SIZES.base - 2,
            }}>
            <Icon name="mail-outline" size={15} color={COLORS.secondary} />

            <Text
              style={{
                ...FONTS.body5,
                marginLeft: 10,
                color: COLORS.secondary,
              }}>
              {patientData ? patientData.email || 'No email added.' : ''}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: SIZES.base - 2,
            }}>
            <Icon name="call-outline" size={15} color={COLORS.secondary} />

            <Text
              style={{
                ...FONTS.body5,
                color: COLORS.secondary,
                marginLeft: 10,
              }}>
              {patientData ? patientData.phone || 'No phone no. added.' : ''}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: SIZES.base - 2,
            }}>
            <MaterialCommunityIcons
              name="map-marker-outline"
              color={COLORS.secondary}
              size={15}
            />

            <Text
              style={{...FONTS.body5, marginLeft: 10, color: COLORS.secondary}}>
              {patientData ? patientData.country || 'No details added.' : ''}
              {' _ '}
              {patientData ? patientData.city || 'No details added.' : ''}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: SIZES.base - 2,
            }}>
            <AntDesign name="infocirlceo" size={13} color={COLORS.secondary} />

            <Text
              style={{...FONTS.body5, marginLeft: 10, color: COLORS.secondary}}>
              {patientData ? patientData.about || 'No details added.' : ''}
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          <Text
            style={{...FONTS.h5, color: COLORS.secondary, marginVertical: 5}}>
            Details have been submitted:
          </Text>
          <View style={styles.action}>
            <AntDesign name="user" color="#707070" size={20} />
            <Text style={styles.textInput}>{req.name}</Text>
          </View>
          <View style={styles.action}>
            <MaterialCommunityIcons
              name="smart-card-outline"
              color="#707070"
              size={20}
            />
            <Text style={styles.textInput}>{req.planCategory}</Text>
          </View>
          <View style={styles.action}>
            <FontAwesome5 name="university" color="#707070" size={20} />
            <Text style={styles.textInput}>{req.university}</Text>
          </View>
          <View style={styles.action}>
            <FontAwesome5 name="address-card" color="#707070" size={18} />
            <Text style={styles.textInput}>{req.MatricNumber}</Text>
          </View>
        </View>
      </View>
      {req.approved == 'pending' ? (
        <View
          style={{
            paddingVertical: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding - 5,
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
              onPress={onSubmitRequest}>
              {submitting ? (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <ActivityIndicator size="small" color={COLORS.primary} />
                </View>
              ) : (
                <Text style={{...FONTS.h5}}>
                  Give this person a free session
                </Text>
              )}
            </TouchableOpacity>
          </LinearGradient>
        </View>
      ) : (
        <Text>ss</Text>
      )}
      {/* <Text>{req.approved}</Text> */}
    </SafeAreaView>
  );
};

export default RequestedProfile;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingBottom: 10,
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
    paddingLeft: 10,
    ...FONTS.body4,
    color: COLORS.secondary,
    paddingVertical: 10,
  },
});
