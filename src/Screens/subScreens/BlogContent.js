import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from 'react-native';

//Lib
import {BallIndicator} from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';
import {ListItem, Avatar} from 'react-native-elements';
import firestore, {firebase} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

//imports
import {FONTS, SIZES, COLORS, icons} from '../../constants';

const BlogContent = ({navigation, route, onDelete}) => {
  const [loading, setLoading] = useState(true);
  const [isVerified, setVerified] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  let blogTime = (
    <Text>{moment(route.params.blogTime.toDate()).fromNow()}</Text>
  );

  const checkApproval = async () => {
    setUploading(true);

    await firestore()
      .collection('Professional')
      .doc(route.params.professionalId)
      .get()
      .then(result => {
        if (result.exists) {
          setVerified(result.data().Verified);
          // console.log(result.data().Verified);
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
  };

  useEffect(() => {
    checkApproval();
  }, [isVerified]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{flex: 1}}>
          <Image
            source={{
              uri:
                route.params.blogtImg ||
                'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg',
            }}
            resizeMode="cover"
            style={{
              width: SIZES.width,
              height: SIZES.height / 3 - 10,
            }}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            position: 'absolute',
            top: 30,
            left: 20,
            right: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 25,
              backgroundColor: 'rgba(36, 26, 46, 0.3)',
            }}>
            <Icon
              name="arrow-back"
              size={22}
              color={COLORS.lightpurple}
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              paddingHorizontal: 15,
              borderRadius: 7,
              backgroundColor: 'rgba(36, 26, 46, 0.3)',
            }}>
            <Text
              style={{
                color: COLORS.lightpurple,
                ...FONTS.h5,
                letterSpacing: 1,
              }}>
              {route.params.Category}
            </Text>
          </View>
        </View>

        {/* Author Continer */}
        <View style={{flex: 2}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Avatar
                rounded
                size={50}
                source={{
                  uri:
                    route.params.professionalAvatar ||
                    'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg',
                }}
              />
              <View
                style={{
                  paddingHorizontal: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.text}>Written by </Text>
                    <Text style={styles.nameText}>
                      {route.params.professionalName}
                    </Text>
                  </View>

                  {isVerified == 'notVerified' ? null : isVerified ==
                    'Verified' ? (
                    <View style={{}}>
                      {uploading ? (
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 8,
                          }}>
                          <BallIndicator color={COLORS.secondary} size={10} />
                        </View>
                      ) : (
                        <Image
                          source={icons.verifiedUser}
                          style={{
                            width: 16,
                            height: 16,
                            marginLeft: 5,
                            tintColor: COLORS.primary,
                          }}
                        />
                      )}
                    </View>
                  ) : null}
                </View>

                <Text style={styles.text}>Last updated {blogTime}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  source={icons.Delete}
                  style={{
                    width: 20,
                    height: 20,
                    marginLeft: 10,
                    tintColor: COLORS.primary,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Blog content */}
        <View style={{flex: 2}}>
          {/* Title */}
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <Text
              style={{
                color: COLORS.secondary,
                width: SIZES.width / 1 - 30,
                ...FONTS.h2,
              }}>
              {route.params.Blog}
            </Text>
            <Text
              style={{
                paddingVertical: 15,
                color: COLORS.secondary,
                ...FONTS.BodyContent,
                letterSpacing: 0.6,
              }}>
              {route.params.Content}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BlogContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContine: {
    flex: 0.45,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.secondary,
    ...FONTS.body13,
  },
  nameText: {
    color: COLORS.secondary,
    ...FONTS.h13,
  },
});
