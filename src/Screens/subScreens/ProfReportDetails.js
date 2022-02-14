import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  Alert,
  ImageBackground,
  Modal,
} from 'react-native';
import firestore, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {COLORS, FONTS, icons, SIZES} from '../../constants';
import {Avatar, ListItem} from 'react-native-elements';

//Libraries
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {BallIndicator} from 'react-native-indicators';
import ReadMore from 'react-native-read-more-text';

const ProfReportDetails = ({navigation, route}) => {
  const [profData, setProfData] = useState(null);

  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: profData
        ? profData.fname + ' ' + profData.lname || 'Professional'
        : 'Professional',
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
  }, [profData]);

  const getProf = async () => {
    setLoading(true);
    await firestore()
      .collection('Professional')
      .doc(item.ReporterlId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setProfData(documentSnapshot.data());
          setLoading(false);
        }
      });
  };
  useEffect(() => {
    getProf();
  }, []);

  let item = route.params.item;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.Hedercontainer}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            {loading ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.lightpurple,
                  borderRadius: 70,
                  width: 80,
                  height: 80,
                }}>
                <BallIndicator color={COLORS.secondary} size={20} />
              </View>
            ) : (
              <Avatar
                size={80}
                rounded
                source={{
                  uri: profData
                    ? profData.userImg ||
                      'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg'
                    : 'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg',
                }}
                containerStyle={{backgroundColor: COLORS.primary}}
              />
            )}
          </View>
          {/* Profile name and Specialty */}
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  paddingTop: 10,
                  color: COLORS.secondary,
                }}>
                {profData ? profData.fname || 'Patient' : 'Patient'}{' '}
                {profData ? profData.lname || 'Profile' : 'Profile'}
              </Text>
            </View>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.primary,
              }}>
              {profData ? profData.email || 'no' : 'email'}
            </Text>
          </View>
        </View>

        <View style={styles.Body}>
          <Text
            style={{...FONTS.h5, color: COLORS.secondary, marginBottom: 10}}>
            Report Description:
          </Text>
          <Text
            style={{...FONTS.body4, color: COLORS.secondary, marginBottom: 20}}>
            {item.Content}
          </Text>
          {item.ReportImg != null ? (
            <View
              style={{
                backgroundColor: COLORS.lightpurple,
                width: SIZES.width - 40,
                height: SIZES.height / 4 + 40,
                borderRadius: 7,
                justifyContent: 'center',
                marginBottom: 20,
              }}>
              <View
                style={{
                  width: SIZES.width - 60,
                  alignSelf: 'center',
                  height: SIZES.height / 4 + 20,
                  borderRadius: 7,
                }}>
                <Image
                  source={{uri: item.ReportImg}}
                  style={{
                    width: SIZES.width - 60,
                    height: SIZES.height / 4 + 20,
                    borderRadius: 7,
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </View>
          ) : null}

          <Text
            style={{...FONTS.h5, color: COLORS.secondary, marginBottom: 10}}>
            Problem Signature:
          </Text>
          <Text
            style={{...FONTS.body4, color: COLORS.secondary, marginBottom: 10}}>
            Application Timestamp:{'  '}
            {moment(item.ReportTime.toDate()).format('lll')}
          </Text>
          <Text
            style={{...FONTS.body4, color: COLORS.secondary, marginBottom: 10}}>
            Application ID:{'  '}
            {item.id}
          </Text>
          <Text
            style={{...FONTS.body4, color: COLORS.secondary, marginBottom: 10}}>
            Reporter ID:{'  '}
            {profData ? profData.professionalId || 'Reporter' : 'ID'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfReportDetails;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 7,
    paddingTop: 10,
    paddingBottom: 10,
  },
  Heder: {
    position: 'absolute',
    width: '100%',
    top: -50,
    zIndex: -100,
  },
  Left: {
    backgroundColor: COLORS.lightyellow,
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    left: -30,
    top: -30,
  },
  Right: {
    backgroundColor: COLORS.lightpurple,
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    right: -100,
    top: -200,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingLeft: 20,
  },

  Hedercontainer: {
    alignItems: 'center',
    paddingTop: 20,
  },

  Body: {
    padding: 20,
  },
});
