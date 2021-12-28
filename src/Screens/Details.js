import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {COLORS, FONTS, icons, SIZES} from '../constants';

//Libraries
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import BlogSwitch from '../components/BlogSwitch';

const Details = ({navigation, route}) => {
  const [Profdata, setProfdata] = useState(null);
  const [ProfVarData, setProfVarData] = useState(null);
  const [unVarProfs, setunVarProfs] = useState(null);
  const [requests, setRequests] = useState(true);
  const [loading, setLoading] = useState(true);

  const UresData = route.params;

  const Heder = ({onBacePress, name, icon, iconColor}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          paddingTop: 10,
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

        {/* Profile */}
        {/* 
        <View style={{marginRight: 20, tintColor: route.params.color}}>
          <Image
            // source={route.params.icon}
            source={icon}
            resizeMode="contain"
            style={{
              height: 25,
              width: 25,
              // tintColor: route.params.color,
              tintColor: {iconColor},
            }}
          />
        </View>
        */}
        <View style={{marginRight: 20, tintColor: UresData.color}}>
          <Image
            // source={UresData.icon}
            source={icon}
            resizeMode="contain"
            style={{
              height: 25,
              width: 25,
              // tintColor: UresData.color,
              tintColor: iconColor,
            }}
          />
        </View>
      </View>
    );
  };

  useLayoutEffect(() => {
    const fetchProfs = firestore()
      .collection('Professional')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot =>
        setProfdata(
          snapshot.docs.map(doc => ({
            id: doc.id,
            professionalId: doc.data().professionalId,
            fname: doc.data().fname,
            lname: doc.data().lname,
            email: doc.data().email,
            about: doc.data().about,
            Experience: doc.data().Experience,
            License: doc.data().License,
            Specialty: doc.data().Specialty,
            userImg: doc.data().userImg,
            role: doc.data().role,
            specialization: doc.data().specialization,
            Verified: doc.data().Verified,
          })),
        ),
      );
    const fetchOwnProfs = firestore()
      .collection('Professional')
      .where('Verified', '==', 'Verified')
      .onSnapshot(snapshot =>
        setProfVarData(
          snapshot.docs.map(doc => ({
            id: doc.id,
            professionalId: doc.data().professionalId,
            fname: doc.data().fname,
            lname: doc.data().lname,
            email: doc.data().email,
            about: doc.data().about,
            Experience: doc.data().Experience,
            License: doc.data().License,
            Specialty: doc.data().Specialty,
            userImg: doc.data().userImg,
            role: doc.data().role,
            specialization: doc.data().specialization,
            Verified: doc.data().Verified,
          })),
        ),
      );
    const fetchUnVarProfs = firestore()
      .collection('Professional')
      .where('Verified', '!=', 'Verified')
      .onSnapshot(snapshot =>
        setunVarProfs(
          snapshot.docs.map(doc => ({
            id: doc.id,
            professionalId: doc.data().professionalId,
            fname: doc.data().fname,
            lname: doc.data().lname,
            email: doc.data().email,
            about: doc.data().about,
            Experience: doc.data().Experience,
            License: doc.data().License,
            Specialty: doc.data().Specialty,
            userImg: doc.data().userImg,
            role: doc.data().role,
            specialization: doc.data().specialization,
            Verified: doc.data().Verified,
          })),
        ),
      );

    return fetchProfs, fetchOwnProfs, fetchUnVarProfs;
  }, [navigation]);

  const ProfilePic = ({Userimage}) => {
    return (
      <Image
        source={Userimage}
        style={{width: 80, height: 80, borderRadius: 7}}
      />
    );
  };

  const onSelectSwitch = value => {
    setRequests(value);
  };

  const Content = ({
    professionalsName,
    professionalSpecialty,
    professionalExperience,
    isVerified,
  }) => {
    return (
      <View style={{justifyContent: 'space-between'}}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={{color: COLORS.secondary, ...FONTS.h5, paddingVertical: 5}}>
            {professionalsName}
          </Text>
          {isVerified == 'notVerified' ? null : isVerified == 'Verified' ? (
            <View
              style={{
                paddingTop: 9,
              }}>
              <Image
                source={icons.verifiedUser}
                style={{
                  width: 15,
                  height: 17,
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
            color: COLORS.secondary,
            paddingVertical: 5,
          }}>
          {professionalSpecialty}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: SIZES.padding * 2,
      }}>
      <Heder
        name={UresData.description}
        icon={UresData.icon}
        iconColor={UresData.color}
        onBacePress={() => navigation.goBack()}
      />

      {UresData.description == 'Professionals' ? (
        <>
          <BlogSwitch
            selectionMode={1}
            option1="All"
            option2="Verified"
            option3="Unverified"
            onSelectSwitch={onSelectSwitch}
          />
          {requests == 1 && (
            <View style={{flex: 1}}>
              <FlatList
                data={Profdata}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({id, item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ProfessionalProfile', {
                        professionalId: item.professionalId,
                        fname: item.fname,
                        lname: item.lname,
                        profName: item.fname + ' ' + item.lname,
                        profEmail: item.email,
                        profAvatar: item.userImg,
                        profRole: item.role,
                        profExperience: item.Experience,
                        profAbout: item.about,
                        profLicense: item.License,
                        profSpecialty: item.Specialty,
                        specialization: item.specialization,
                        professionalId: item.professionalId,
                      })
                    }>
                    <LinearGradient
                      colors={['#f7f3fc', '#fff']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 15,
                        marginVertical: 5,
                        alignItems: 'center',
                        borderRadius: 7,
                        padding: 10,
                      }}>
                      <View
                        style={{
                          // flex: 1,
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                        }}>
                        <ProfilePic
                          Userimage={{
                            uri:
                              item.userImg ||
                              'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg',
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
                        <Content
                          professionalsName={item.fname + ' ' + item.lname}
                          professionalExperience={item.Experience}
                          professionalSpecialty={item.Specialty}
                          isVerified={item.Verified}
                        />
                      </View>
                      <View
                        style={{
                          // flex: 1,
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                        }}>
                        <Icon
                          name="chevron-forward"
                          size={26}
                          color="#a076cd"
                        />
                      </View>

                      {/* <Text>{Profdata ? item.fname || 'Mentlada' : 'Mentlada'}</Text>*/}
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
          {requests == 2 && (
            <View style={{flex: 1}}>
              <FlatList
                data={ProfVarData}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({id, item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ProfessionalProfile', {
                        professionalId: item.professionalId,
                        fname: item.fname,
                        lname: item.lname,
                        profName: item.fname + ' ' + item.lname,
                        profEmail: item.email,
                        profAvatar: item.userImg,
                        profRole: item.role,
                        profExperience: item.Experience,
                        profAbout: item.about,
                        profLicense: item.License,
                        profSpecialty: item.Specialty,
                        specialization: item.specialization,
                        professionalId: item.professionalId,
                      })
                    }>
                    <LinearGradient
                      colors={['#f7f3fc', '#fff']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 15,
                        marginVertical: 5,
                        alignItems: 'center',
                        borderRadius: 7,
                        padding: 10,
                      }}>
                      <View
                        style={{
                          // flex: 1,
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                        }}>
                        <ProfilePic
                          Userimage={{
                            uri:
                              item.userImg ||
                              'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg',
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
                        <Content
                          professionalsName={item.fname + ' ' + item.lname}
                          professionalExperience={item.Experience}
                          professionalSpecialty={item.Specialty}
                          isVerified={item.Verified}
                        />
                      </View>
                      <View
                        style={{
                          // flex: 1,
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                        }}>
                        <Icon
                          name="chevron-forward"
                          size={26}
                          color="#a076cd"
                        />
                      </View>

                      {/* <Text>{Profdata ? item.fname || 'Mentlada' : 'Mentlada'}</Text>*/}
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
          {requests == 3 && (
            <View style={{flex: 1}}>
              <FlatList
                data={unVarProfs}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({id, item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ProfessionalProfile', {
                        professionalId: item.professionalId,
                        fname: item.fname,
                        lname: item.lname,
                        profName: item.fname + ' ' + item.lname,
                        profEmail: item.email,
                        profAvatar: item.userImg,
                        profRole: item.role,
                        profExperience: item.Experience,
                        profAbout: item.about,
                        profLicense: item.License,
                        profSpecialty: item.Specialty,
                        specialization: item.specialization,
                        professionalId: item.professionalId,
                      })
                    }>
                    <LinearGradient
                      colors={['#f7f3fc', '#fff']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 15,
                        marginVertical: 5,
                        alignItems: 'center',
                        borderRadius: 7,
                        padding: 10,
                      }}>
                      <View
                        style={{
                          // flex: 1,
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                        }}>
                        <ProfilePic
                          Userimage={{
                            uri:
                              item.userImg ||
                              'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg',
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
                        <Content
                          professionalsName={item.fname + ' ' + item.lname}
                          professionalExperience={item.Experience}
                          professionalSpecialty={item.Specialty}
                          isVerified={item.Verified}
                        />
                      </View>
                      <View
                        style={{
                          // flex: 1,
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                        }}>
                        <Icon
                          name="chevron-forward"
                          size={26}
                          color="#a076cd"
                        />
                      </View>

                      {/* <Text>{Profdata ? item.fname || 'Mentlada' : 'Mentlada'}</Text>*/}
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </>
      ) : UresData.description == 'Patients' ? (
        <View>
          <Text>ddddddd</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
