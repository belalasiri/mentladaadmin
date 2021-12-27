import React, {useEffect, useState} from 'react';
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
import {COLORS, FONTS, SIZES} from '../constants';

//Libraries
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {Avatar, ListItem} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const Details = ({navigation, route}) => {
  const [userData, setUserData] = useState(null);
  const [Profdata, setProfdata] = useState(null);
  const [loading, setLoading] = useState(true);

  const UresData = route.params;
  const Heder = ({onBacePress, name}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          paddingVertical: 10,
          // marginTop: 5,
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
        <View style={{marginRight: 20, tintColor: UresData.color}}>
          <Image
            source={UresData.icon}
            resizeMode="contain"
            style={{
              height: 25,
              width: 25,
              tintColor: UresData.color,
            }}
          />
        </View>
      </View>
    );
  };

  let profList = [];

  const fetchProf = async () => {
    await firestore()
      .collection('Professional')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          profList.push({
            id: doc.id,
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
          });
        });
      })
      .catch(e => {
        console.log(e);
      });
    setProfdata(profList);

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProf();
  }, []);

  const ProfilePic = ({Userimage}) => {
    return (
      <Image
        source={Userimage}
        style={{width: 80, height: 80, borderRadius: 7}}
      />
    );
  };

  const Content = ({
    professionalsName,
    professionalSpecialty,
    professionalExperience,
  }) => {
    return (
      <View style={{justifyContent: 'space-between'}}>
        <Text
          style={{color: COLORS.secondary, ...FONTS.h5, paddingVertical: 5}}>
          {professionalsName}
        </Text>

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
        onBacePress={() => navigation.goBack()}
      />
      {UresData.description == 'Professionals' ? (
        <>
          <FlatList
            data={Profdata}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({id, item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProfessionalProfile', {
                    profName: item.fname + ' ' + item.lname,
                    profEmail: item.email,
                    profAvatar: item.userImg,
                    profRole: item.role,
                    profExperience: item.Experience,
                    profAbout: item.about,
                    profLicense: item.License,
                    profSpecialty: item.Specialty,
                    specialization: item.specialization,
                    // userName: userData.fname + ' ' + userData.lname,
                    // userEmail: userData.email,
                    // userAvatar: userData.userImg,
                    // userRole: userData.role,
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
                    />
                  </View>
                  <View
                    style={{
                      // flex: 1,
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                    }}>
                    <Icon name="chevron-forward" size={26} color="#a076cd" />
                  </View>
                  {/* <Text>{Profdata ? item.fname || 'Mentlada' : 'Mentlada'}</Text>*/}
                </LinearGradient>
              </TouchableOpacity>
            )}
          />
        </>
      ) : UresData.description == 'Patients' ? (
        <>
          <FlatList
            data={Profdata}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({id, item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProfessionalProfile', {
                    profName: item.fname + ' ' + item.lname,
                    profEmail: item.email,
                    profAvatar: item.userImg,
                    profRole: item.role,
                    profExperience: item.Experience,
                    profAbout: item.about,
                    profLicense: item.License,
                    profSpecialty: item.Specialty,
                    // userName: userData.fname + ' ' + userData.lname,
                    // userEmail: userData.email,
                    // userAvatar: userData.userImg,
                    // userRole: userData.role,
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
                    />
                  </View>
                  <View
                    style={{
                      // flex: 1,
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                    }}>
                    <Icon name="chevron-forward" size={26} color="#a076cd" />
                  </View>
                  {/* <Text>{Profdata ? item.fname || 'Mentlada' : 'Mentlada'}</Text>*/}
                </LinearGradient>
              </TouchableOpacity>
            )}
          />
        </>
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
