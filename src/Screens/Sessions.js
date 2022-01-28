import React, {useState, useEffect, useLayoutEffect} from 'react';
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
import {COLORS, FONTS, SIZES, icons} from '../constants';

//Libraries
import {Avatar, Button, ListItem} from 'react-native-elements';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {BallIndicator} from 'react-native-indicators';

const Sessions = ({item}) => {
  const [loading, setLoading] = useState(true);
  const [isVerified, setVerified] = useState([null]);
  const [uploading, setUploading] = useState(false);

  const checkVerified = async () => {
    setUploading(true);

    await firestore()
      .collection('Professional')
      .doc(item.professionalId)
      .get()
      .then(result => {
        if (result.exists) {
          setVerified(result.data().Verified);
          setUploading(false);
        } else {
          setVerified('notVerified');
          setUploading(false);
        }
      })
      .catch(e => {
        console.log(e);
      });
    if (loading) {
      setLoading(false);
    }
    // console.log(item.professionalId);
  };

  useEffect(() => {
    checkVerified();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View
        style={{
          paddingTop: SIZES.padding,
          paddingHorizontal: SIZES.padding - 5,
        }}>
        <LinearGradient
          colors={[COLORS.lightpurple, COLORS.lightGreen]}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            marginVertical: 5,
            alignItems: 'center',
            borderRadius: 7,
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              top: -10,
              width: '15%',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <View style={styles.Heder}>
                <Image
                  source={{
                    uri:
                      item.patientAvatar ||
                      'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg',
                  }}
                  style={styles.Left}
                />
                <Image
                  source={{
                    uri:
                      item.professionalAvatar ||
                      'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg',
                  }}
                  style={styles.Right}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginHorizontal: 10,
            }}>
            <View style={{justifyContent: 'space-between', marginLeft: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  //   width: '95%',
                }}>
                <Text
                  style={{
                    color: COLORS.secondary,
                    ...FONTS.h6,
                    // paddingVertical: 5,
                  }}>
                  {item.patientName} and Dr.{item.professionalName}
                </Text>
                {isVerified == 'notVerified' ? null : isVerified ==
                  'Verified' ? (
                  <View style={{}}>
                    {uploading ? (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft: 8,
                          paddingTop: 6,
                        }}>
                        <BallIndicator color={COLORS.secondary} size={10} />
                      </View>
                    ) : (
                      <View style={{marginTop: 6}}>
                        <Image
                          source={icons.verifiedUser}
                          style={{
                            width: 12,
                            height: 12,
                            marginLeft: 3,
                            tintColor: COLORS.primary,
                          }}
                        />
                      </View>
                    )}
                  </View>
                ) : null}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  width: '92%',
                }}>
                {item.approved == 'approved' ? (
                  <View
                    style={{
                      backgroundColor: COLORS.lightGreen2,
                      paddingHorizontal: SIZES.padding,
                      borderRadius: SIZES.base,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text>{item.approved}</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: COLORS.lightRed,
                      paddingHorizontal: SIZES.padding,
                      borderRadius: SIZES.base,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text>{item.approved}</Text>
                  </View>
                )}
                <ListItem.Subtitle
                  style={{
                    ...FONTS.body5,
                    color: COLORS.primary,
                    paddingVertical: 5,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {moment(item.createdAt.toDate()).format('lll')}
                </ListItem.Subtitle>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default Sessions;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  Heder: {
    position: 'absolute',
    width: '100%',
  },
  Left: {
    backgroundColor: COLORS.lightyellow,
    position: 'absolute',
    width: 50,
    height: 50,
    // left: -30,
    // top: -30,
    borderRadius: 100,
  },
  Right: {
    backgroundColor: COLORS.lightpurple,
    // position: 'absolute',
    width: 50,
    height: 50,
    right: -20,
    top: 20,
    borderRadius: 100,
  },
});
