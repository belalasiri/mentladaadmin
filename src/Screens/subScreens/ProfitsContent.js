import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// DataBase
import firestore, {firebase} from '@react-native-firebase/firestore';

// Imports
import {COLORS, FONTS, SIZES, icons} from '../../constants';

//Libraries
import {Avatar, Button, ListItem} from 'react-native-elements';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

const ProfitsContent = ({item}) => {
  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState(null);

  const getPatient = async () => {
    setLoading(true);

    await firestore()
      .collection('users')
      .doc(item.UserID)
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
        style={{width: 80, height: 80, borderRadius: 7}}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1}}>
          <LinearGradient
            colors={[COLORS.lightpurple, COLORS.white]}
            start={{x: 0, y: 2}}
            end={{x: 0, y: 0}}
            style={{
              flexDirection: 'row',
              marginHorizontal: 15,
              marginVertical: 5,
              borderRadius: 7,
              padding: 10,
            }}>
            <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
              <ProfilePic
                Userimage={{
                  uri: patientData
                    ? patientData.userImg ||
                      'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg'
                    : 'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg',
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginHorizontal: 20,
              }}>
              <View style={{justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: COLORS.secondary,
                      ...FONTS.h5,
                      paddingVertical: 5,
                    }}>
                    {patientData
                      ? patientData.fname || 'Professional'
                      : 'Professional'}{' '}
                    {patientData ? patientData.lname || 'Profile' : 'Profile'}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: COLORS.lightpurple,
                      paddingHorizontal: SIZES.padding,
                      borderRadius: SIZES.base,
                    }}>
                    <ListItem.Subtitle
                      style={{
                        ...FONTS.h4_2,
                        color: COLORS.secondary,
                        paddingVertical: 5,
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item.planCategory}
                    </ListItem.Subtitle>
                  </View>
                  <Text> || </Text>
                  <View
                    style={{
                      backgroundColor: COLORS.white,
                      paddingHorizontal: SIZES.padding,
                      borderRadius: SIZES.base,
                    }}>
                    <ListItem.Subtitle
                      style={{
                        ...FONTS.body4,
                        color: COLORS.primary,
                        paddingVertical: 5,
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      RM{item.Price}
                    </ListItem.Subtitle>
                  </View>
                  <Text> || </Text>
                  <View
                    style={{
                      backgroundColor: COLORS.lightyellow2,
                      paddingHorizontal: SIZES.padding,
                      borderRadius: SIZES.base,
                    }}>
                    <ListItem.Subtitle
                      style={{
                        ...FONTS.body4,
                        color: COLORS.primary,
                        paddingVertical: 5,
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {moment(item.subscribedAt.toDate()).fromNow()}
                    </ListItem.Subtitle>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfitsContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
