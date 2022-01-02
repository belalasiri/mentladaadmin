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
} from 'react-native';

import firestore, {firebase} from '@react-native-firebase/firestore';
import {COLORS, FONTS, SIZES, icons} from '../constants';

//Libraries
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar, Button, ListItem} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import ProfessionalInfo from '../components/ProfessionalInfo';

const ProfessionalProfile = ({navigation, route}) => {
  const [profData, setProfData] = useState(null);
  const [profPationts, setprofPationts] = useState();
  const [loading, setLoading] = useState(true);
  const [isVerified, setVerified] = useState(null);
  const [isUpdating, setUpdating] = useState(false);

  const getProfessional = async () => {
    setLoading(true);

    await firestore()
      .collection('Professional')
      .doc(route.params.professionalId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setProfData(documentSnapshot.data());
          setLoading(false);
        }
      });
  };

  const checkApproval = async () => {
    await firestore()
      .collection('Professional')
      .doc(route.params.professionalId)
      .get()
      .then(result => {
        if (result.exists) {
          setVerified(result.data().Verified);
          // console.log(result.data().Verified);
        } else {
          setVerified('notVerified');
        }
      })
      .catch(e => {
        console.log(e);
      });
    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkApproval();
    getProfessional();
  }, [profData, isVerified]);

  useLayoutEffect(() => {
    const fetchPosts = firestore()
      .collection('session')
      .where('approved', '==', 'approved')
      .where('profEmail', '==', route.params.profEmail)

      .onSnapshot(snapshot =>
        setprofPationts(
          snapshot.docs.map(doc => ({
            id: doc.id,
            isRequested: doc.id,
          })),
        ),
      );
    if (loading) {
      setLoading(false);
    }
    return fetchPosts;
  }, [navigation]);

  const onVerified = () => {
    setUpdating(true);
    firebase
      .firestore()
      .collection('Professional')
      .doc(route.params.professionalId)
      .update({
        Verified: 'Verified',
        verifiedAt: firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        setUpdating(false);
        console.log('Profissinal varified successfully!');
        Alert.alert(
          'Profissinal varified!',
          'This profissinal varified successfully! Thank you',
        );
      });
  };

  const onUnVerified = () => {
    setUpdating(true);
    firebase
      .firestore()
      .collection('Professional')
      .doc(route.params.professionalId)
      .update({
        Verified: 'notVerified',
      })
      .then(() => {
        setUpdating(false);
        console.log('This profissional is no longer verified!');
        Alert.alert('Successfully!', 'This profissional is no longer verified');
      });
  };
  const onDelete = () => {
    setUpdating(true);
    firebase
      .firestore()
      .collection('Professional')
      .doc(route.params.professionalId)
      .delete()
      .then(() => {
        navigation.goBack();
        setUpdating(false);
        console.log('This profissional is no longer active!');
        Alert.alert('Successfully!', 'This profissional is no longer active');
      });
  };

  const handleDelete = profID => {
    Alert.alert(
      'Delete post',
      'Are you sure you want to delete this post?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => onDelete(profID),
        },
      ],
      {cancelable: false},
    );
  };

  const Heder = ({onBacePress, name, onRemoveUser, icon, iconColor}) => {
    return (
      <View
        style={{
          flexDirection: 'row',

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
              ...FONTS.body4,
            }}>
            {name}
          </Text>
        </View>

        {/* Profile */}
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: SIZES.padding,
          }}
          onPress={onRemoveUser}>
          <Icon name="person-remove" size={20} color={COLORS.secondary} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      {/* Profile pic and name with Specialty */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            paddingTop: SIZES.padding * 2,
          }}>
          <Heder
            name={
              profData
                ? profData.fname + ' ' + profData.lname || 'Professional'
                : 'Professional'
            }
            onBacePress={() => navigation.goBack()}
            onRemoveUser={handleDelete}
          />
        </View>
        <View style={styles.Heder}>
          <View style={styles.Left} />
          <View style={styles.Right} />
        </View>

        <View style={{paddingHorizontal: 15}}>
          <View style={styles.Hedercontainer}>
            <Pressable onPress={() => {}}>
              <Avatar
                size={80}
                rounded
                source={{
                  uri: profData
                    ? profData.userImg ||
                      'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg'
                    : 'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg',
                }}
                containerStyle={{backgroundColor: COLORS.primary}}>
                <Avatar.Accessory
                  size={25}
                  color={COLORS.white}
                  style={{backgroundColor: COLORS.primary}}
                />
              </Avatar>
            </Pressable>
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
                  {profData ? profData.fname || 'Professional' : 'Professional'}{' '}
                  {profData ? profData.lname || 'Profile' : 'Profile'}
                </Text>
                {isVerified == 'notVerified' ? null : isVerified ==
                  'Verified' ? (
                  <View
                    style={{
                      paddingTop: 8,
                    }}>
                    <Image
                      source={icons.verifiedUser}
                      style={{
                        width: 20,
                        height: 20,
                        marginLeft: 5,
                        tintColor: COLORS.primary,
                      }}
                    />
                  </View>
                ) : null}
              </View>

              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.primary,
                  width: SIZES.width / 2 + 30,
                  textAlign: 'center',
                }}>
                {profData
                  ? profData.specialization || 'Professional'
                  : 'specialization'}
              </Text>
            </View>
          </View>

          {isVerified == 'notVerified' ? (
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
                  borderRadius: 7,
                  padding: 10,
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={onVerified}>
                  {isUpdating ? (
                    <View
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      <ActivityIndicator size="small" color={COLORS.primary} />
                    </View>
                  ) : (
                    <>
                      <Text style={{...FONTS.h5}}>
                        Verify this professional
                      </Text>
                      <Image
                        source={icons.verifiedUser}
                        style={{
                          width: 20,
                          height: 20,
                          marginLeft: 10,
                          tintColor: COLORS.primary,
                        }}
                      />
                    </>
                  )}
                </TouchableOpacity>
              </LinearGradient>
            </View>
          ) : isVerified == 'Verified' ? (
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
                  borderRadius: 7,
                  padding: 10,
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={onUnVerified}>
                  {isUpdating ? (
                    <View
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      <ActivityIndicator size="small" color={COLORS.primary} />
                    </View>
                  ) : (
                    <Text style={{...FONTS.h5}}>
                      Remove the verification icon
                    </Text>
                  )}
                </TouchableOpacity>
              </LinearGradient>
            </View>
          ) : null}

          <View style={{flexDirection: 'row', paddingTop: SIZES.padding}}>
            <LinearGradient
              colors={[COLORS.lightpurple, COLORS.lightyellow]}
              start={{x: 0.5, y: 2.0}}
              end={{x: 0.0, y: 0.25}}
              style={{
                marginVertical: 5,
                alignItems: 'center',
                borderRadius: 7,
                flex: 1,
                margin: 5,
              }}>
              <ProfessionalInfo
                icon="star"
                iconColor={COLORS.yellow}
                Title1="4.98"
                Title2="Reviews"
              />
            </LinearGradient>

            <LinearGradient
              colors={[COLORS.lightpurple, COLORS.lightGreen]}
              start={{x: 0.5, y: 2.0}}
              end={{x: 0.0, y: 0.25}}
              style={{
                marginVertical: 5,
                alignItems: 'center',
                borderRadius: 7,
                margin: 5,
                flex: 1,
              }}>
              <ProfessionalInfo
                icon="person"
                iconColor="#67d8af"
                Title1={profPationts ? profPationts.length || '0' : null}
                Title2="Patients"
              />
            </LinearGradient>

            <LinearGradient
              colors={[COLORS.lightpurple, COLORS.emerald]}
              start={{x: 0.5, y: 2.0}}
              end={{x: 0.0, y: 0.25}}
              style={{
                marginVertical: 5,
                alignItems: 'center',
                borderRadius: 7,
                margin: 5,
                flex: 1,
              }}>
              <ProfessionalInfo
                icon="checkmark-done-circle"
                iconColor="#61edea"
                Title1={profData ? profData.Experience || 'New' : 'Spacialist'}
                Title2="Experience"
              />
            </LinearGradient>
          </View>

          <View style={{paddingTop: 15}}>
            <Text
              style={{
                ...FONTS.h4,
                paddingTop: SIZES.padding,
                width: SIZES.width / 2 + 30,
                color: COLORS.secondary,
              }}>
              About the professional
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                paddingTop: 5,
              }}>
              {profData
                ? profData.about || 'No deteiles are provided..'
                : 'No deteiles are provided..'}
            </Text>
          </View>
          <LinearGradient
            colors={[COLORS.lightpurple, COLORS.lightGreen]}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            style={{
              marginVertical: 5,
              alignItems: 'center',
              borderRadius: 7,
              marginTop: 15,
              padding: 10,
            }}>
            <View style={{margin: SIZES.padding, alignItems: 'center'}}>
              <Icon name="document-text" size={25} color="#6D768E" />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{...FONTS.h5, color: COLORS.secondary}}>LPC </Text>
                <Text style={{...FONTS.h5, color: COLORS.primary}}>
                  {profData
                    ? profData.License || 'This Professional has No License'
                    : 'This Professional has No License'}
                  {/* {profData ? profData.Experience || 'New' : 'Spacialist'} */}
                </Text>
              </View>
              <Text style={{...FONTS.body4, color: COLORS.secondary}}>
                License
              </Text>
            </View>
          </LinearGradient>
          <Text
            style={{
              ...FONTS.h4,
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 7,
              color: COLORS.secondary,
            }}>
            Specialities
          </Text>
          <View style={{flexDirection: 'row'}}>
            <ScrollView horizontal>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 5,
                }}>
                <Text
                  style={{
                    ...FONTS.body4,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 7,
                    backgroundColor: COLORS.lightpurple,
                  }}>
                  {profData ? profData.Specialty || ' ' : ' '}
                </Text>
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 10,
              marginBottom: 20,
            }}>
            <LinearGradient
              colors={[COLORS.yellow, COLORS.lightGreen]}
              start={{x: 0.5, y: 3.0}}
              end={{x: 0.25, y: 0}}
              style={{
                alignItems: 'center',
                borderRadius: 7,
                margin: 5,
              }}>
              <Button
                onPress={() => {
                  navigation.navigate('EditProfessionalProfile', {
                    professionalId: route.params.professionalId,
                  });
                }}
                title="Edit this profile"
                titleStyle={{...FONTS.h6, color: COLORS.secondary}}
                buttonStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 7,
                }}
                containerStyle={{
                  width: SIZES.width / 3 + 35,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
              />
            </LinearGradient>
            <LinearGradient
              colors={[COLORS.primary, COLORS.emerald]}
              start={{x: 0.5, y: 6.0}}
              end={{x: 0.0, y: 0.25}}
              style={{
                alignItems: 'center',
                borderRadius: 7,
                margin: 5,
                flex: 1,
              }}>
              {isUpdating ? (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator size="small" color={COLORS.primary} />
                </View>
              ) : (
                <Button
                  onPress={handleDelete}
                  title="Delete this account"
                  titleStyle={{...FONTS.h6, color: COLORS.primary}}
                  buttonStyle={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    borderWidth: 0,
                  }}
                  containerStyle={{
                    width: SIZES.width / 3 + 35,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    flex: 1.3,
                  }}
                />
              )}
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfessionalProfile;

const styles = StyleSheet.create({
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
});

// {
//   profData ? (
//     profData.Verify ? null : (
//       <View
//         style={{
//           paddingTop: 8,
//         }}>
//         <Image
//           source={icons.verifiedUser}
//           style={{
//             width: 20,
//             height: 20,
//             marginLeft: 5,
//             tintColor: COLORS.primary,
//           }}
//         />
//       </View>
//     )
//   ) : null;
// }
