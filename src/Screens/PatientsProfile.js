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
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar, Button, ListItem} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {BallIndicator} from 'react-native-indicators';
import CustomPost from './subScreens/CustomPost';

const PatientsProfile = ({route, navigation}) => {
  const item = route.params;
  const [patientData, setPatientData] = useState(null);
  const [profData, setProfData] = useState(null);
  const [profPationts, setprofPationts] = useState();
  const [loading, setLoading] = useState(true);
  const [isVerified, setVerified] = useState(null);
  const [isUpdating, setUpdating] = useState(false);
  const [posts, setPosts] = useState([]);
  const [session, setSession] = useState([]);
  const [packageData, setPackageData] = useState(0);
  const [ApprovedChats, setApprovedChats] = useState([]);

  const getPatient = async () => {
    setLoading(true);

    await firestore()
      .collection('users')
      .doc(route.params.patientId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setPatientData(documentSnapshot.data());
          setLoading(false);
        }
      });
  };

  const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .where('userId', '==', route.params.patientId)
        .orderBy('postTime', 'desc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {userId, post, postImg, postTime, likes, comments} =
              doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: 'Mentlada Patient',
              userImg: 'https://gcdn.pbrd.co/images/in5sUpqlUHfV.png?o=1',
              postTime: postTime,
              post,
              postImg,
              liked: false,
              likes,
              comments,
            });
          });
        });

      setPosts(list);
      if (loading) {
        setLoading(false);
      }
      // console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    firestore()
      .collection('packages')
      .doc(route.params.patientId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setPackageData(documentSnapshot.data().seconds);
          console.log(packageData);
        } else return 0;
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

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

  useEffect(() => {
    getPatient();
    fetchPosts();

    const APPROVED = firestore()
      .collection('session')
      .where('patientEmail', '==', route.params.patientEmail)
      .where('approved', '==', 'approved')
      .onSnapshot(snapshot =>
        setApprovedChats(
          snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})),
        ),
      );
    return APPROVED;
  }, [patientData, posts, navigation]);

  const formatted = moment
    .utc(packageData * 1000)
    .format('DD [d,]HH [h,]mm [m]');

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            paddingTop: SIZES.padding * 2,
          }}>
          <Heder
            name={
              patientData
                ? patientData.fname + ' ' + patientData.lname || 'Professional'
                : 'Professional'
            }
            onBacePress={() => navigation.goBack()}
            // onRemoveUser={handleDelete}
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
                  uri: patientData
                    ? patientData.userImg ||
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
                  {patientData ? patientData.fname || 'Mentlada' : 'Mentlada'}{' '}
                  {patientData ? patientData.lname || 'Patient' : 'Patient'}
                </Text>
              </View>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.primary,
                  width: SIZES.width / 2 + 30,
                  textAlign: 'center',
                }}>
                {patientData ? patientData.email || 'Patient' : 'email'}
              </Text>
            </View>
          </View>

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
              <View
                style={{
                  alignItems: 'center',
                  borderRadius: 7,
                  paddingTop: 10,
                  paddingBottom: 10,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.h4,
                    width: 100,
                    textAlign: 'center',
                    marginTop: 5,
                  }}>
                  {ApprovedChats.length}
                </Text>
                <Text style={{...FONTS.body5}}>Professionals</Text>
              </View>
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
              <View
                style={{
                  alignItems: 'center',
                  borderRadius: 7,
                  paddingTop: 10,
                  paddingBottom: 10,
                  justifyContent: 'center',
                }}>
                {packageData ? (
                  <Text
                    style={{
                      ...FONTS.h6,
                      width: 100,
                      textAlign: 'center',
                      marginTop: 5,
                    }}>
                    {formatted}
                  </Text>
                ) : (
                  <Text
                    style={{
                      ...FONTS.h6,
                      width: 100,
                      textAlign: 'center',
                      marginTop: 5,
                    }}>
                    No Plan
                  </Text>
                )}
                <Text style={{...FONTS.body5}}>Mentlada Plan</Text>
              </View>
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
              <View
                style={{
                  alignItems: 'center',
                  borderRadius: 7,
                  paddingTop: 10,
                  paddingBottom: 10,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.h4,
                    width: 100,
                    textAlign: 'center',
                    marginTop: 5,
                  }}>
                  {posts.length}
                </Text>
                <Text style={{...FONTS.body5}}>Posts</Text>
              </View>
            </LinearGradient>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.lightpurple,
              width: '100%',
              alignSelf: 'center',
              marginTop: 15,
            }}
          />

          <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: SIZES.base,
              }}>
              <Icon name="mail-outline" size={15} color={COLORS.secondary} />

              <Text
                style={{
                  ...FONTS.h7,
                  marginLeft: 10,
                }}>
                {patientData ? patientData.email || 'No email added.' : ''}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: SIZES.base,
              }}>
              <Icon name="call-outline" size={15} color={COLORS.secondary} />

              <Text
                style={{
                  ...FONTS.h7,
                  marginLeft: 10,
                }}>
                {patientData ? patientData.phone || 'No phone no. added.' : ''}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: SIZES.base,
              }}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                color={COLORS.secondary}
                size={15}
              />

              <Text style={{...FONTS.h7, marginLeft: 10}}>
                {patientData ? patientData.country || 'No details added.' : ''}
                {' _ '}
                {patientData ? patientData.city || 'No details added.' : ''}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: SIZES.base,
              }}>
              <AntDesign
                name="infocirlceo"
                size={13}
                color={COLORS.secondary}
              />

              <Text style={{...FONTS.h7, marginLeft: 10}}>
                {patientData ? patientData.about || 'No details added.' : ''}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.lightpurple,
              width: '100%',
              alignSelf: 'center',
              marginTop: 5,
            }}
          />
          <View
            style={{
              marginBottom: 10,
              marginHorizontal: 5,
              marginTop: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: -9,
                  marginLeft: 20,
                }}>
                <Icon name="apps" size={20} color={COLORS.secondary} />
                <Text
                  style={{
                    ...FONTS.h5,
                    marginHorizontal: 10,
                    paddingBottom: 1,
                    color: COLORS.secondary,
                  }}>
                  {patientData ? patientData.fname || 'Mentlada' : 'Mentlada'}'s
                  posts
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: -9,
                  marginRight: 20,
                }}>
                <Text
                  style={{
                    color: COLORS.secondary,
                    ...FONTS.h4,
                    paddingHorizontal: 10,
                  }}>
                  {posts.length}
                </Text>
                {posts.length == 1 ? (
                  <Text style={{color: COLORS.secondary, ...FONTS.h5}}>
                    Post
                  </Text>
                ) : (
                  <Text style={{color: COLORS.secondary, ...FONTS.h5}}>
                    Posts
                  </Text>
                )}
              </View>
            </View>
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                marginTop: 30,
              }}
            />
          </View>

          {posts?.[0] ? (
            <View style={{flex: 1}}>
              {posts.map(item => (
                <CustomPost
                  key={item.id}
                  item={item}
                  onDelete={() => onDelete(item)}
                  onContainerPress={() =>
                    navigation.navigate('FullPost', {
                      userId: item.userId,
                      post: item.post,
                      postTime: item.postTime,
                      postImg: item.postImg,
                      id: item.id,
                    })
                  }
                />
              ))}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20,
                marginBottom: 50,
              }}>
              <Image
                source={icons.postEmpty}
                style={{
                  height: SIZES.height / 10,
                  width: SIZES.width / 6,
                }}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    ...FONTS.h5,
                    color: COLORS.secondary,
                  }}>
                  {patientData
                    ? patientData.fname + ' ' + patientData.lname || 'Mentlada'
                    : 'Mentlada'}{' '}
                  post's list
                </Text>
                <Text
                  style={{
                    ...FONTS.body6,
                    color: COLORS.secondary,
                    textAlign: 'center',
                    width: SIZES.width - 120,
                  }}>
                  When{' '}
                  {patientData
                    ? patientData.fname + ' ' + patientData.lname || 'Mentlada'
                    : 'Mentlada'}{' '}
                  post anything, the post will appear here.
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingHorizontal: 10,
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
              navigation.navigate('EditPatientsProfile', {
                userId: item.patientId,
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
              <BallIndicator color={COLORS.secondary} size={10} />
            </View>
          ) : (
            <Button
              // onPress={handleDelete}
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
    </SafeAreaView>
  );
};

export default PatientsProfile;

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
});
