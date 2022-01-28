import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  ToastAndroid,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import storage from '@react-native-firebase/storage';

//Libraries
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import BlogSwitch from '../components/BlogSwitch';
import CustomPost from './subScreens/CustomPost';
import BlogScreen from './Blogs';
import BlogCustom from './subScreens/BlogCustom';
import {ListItem} from 'react-native-elements';
import PlansCustom from './subScreens/PlansCustom';
import PackagesContent from './subScreens/PackagesContent';
import Sessions from './Sessions';
import ProfitsContent from './subScreens/ProfitsContent';
import TwoSwichs from '../components/TwoSwichs';
import StudentPackage from './subScreens/StudentPackage';
import StudentPackageList from './subScreens/StudentPackageList';

const Details = ({navigation, route}) => {
  const [Profdata, setProfdata] = useState(null);
  const [ProfVarData, setProfVarData] = useState(null);
  const [unVarProfs, setunVarProfs] = useState(null);
  const [PatientsData, setPatientsData] = useState(null);
  const [plansData, setPlansData] = useState([]);
  const [packages, setPackages] = useState([]);
  const [studentPackages, setStudentPackages] = useState([]);
  const [studentPackagesPending, setStudentPackagesPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState(true);
  const [posts, setPosts] = useState(null);
  const [Blogs, setBlogs] = useState(null);
  const [session, setSession] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [profitTotal, setProfitTotal] = useState(0);
  const [profitsPatients, setProfitsPatients] = useState(null);

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
    const fetchVarProfs = firestore()
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

    const fetcBlogs = firestore()
      .collection('Blogs')
      .orderBy('blogTime', 'desc')
      .onSnapshot(snapshot =>
        setBlogs(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
            professionalId: doc.data().professionalId,
            professionalAvatar: doc.data().professionalAvatar,
            professionalName: doc.data().professionalName,
            Blog: doc.data().Blog,
            Content: doc.data().Content,
            blogtImg: doc.data().blogtImg,
            Category: doc.data().Category,
            blogTime: doc.data().blogTime,
          })),
        ),
      );
    const fetchPatients = firestore()
      .collection('users')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot =>
        setPatientsData(
          snapshot.docs.map(doc => ({
            id: doc.id,
            userId: doc.data().userId,
            fname: doc.data().fname,
            lname: doc.data().lname,
            email: doc.data().email,
            about: doc.data().about,
            userImg: doc.data().userImg,
            role: doc.data().role,
            userId: doc.data().userId,
            phone: doc.data().phone,
            createdAt: doc.data().createdAt,
            city: doc.data().city,
            country: doc.data().country,
          })),
        ),
      );

    const FETCH_PACKAGES = firestore()
      .collection('packages')
      .orderBy('subscribedAt', 'desc')
      .onSnapshot(snapshot =>
        setPackages(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
            CVC: doc.data().CVC,
            CardExpiryDate: doc.data().CardExpiryDate,
            NameOnCard: doc.data().NameOnCard,
            Price: doc.data().Price,
            UserID: doc.data().UserID,
            cardNumber: doc.data().cardNumber,
            planCategory: doc.data().planCategory,
            seconds: doc.data().seconds,
            subscribedAt: doc.data().subscribedAt,
          })),
        ),
      );
    const FETCH_STUDENT_PACKAGES_PENDING = firestore()
      .collection('packages')
      .where('approved', '!=', 'approved')
      .onSnapshot(snapshot =>
        setStudentPackagesPending(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
            name: doc.data().name,
            Price: doc.data().Price,
            UserID: doc.data().UserID,
            planCategory: doc.data().planCategory,
            seconds: doc.data().seconds,
            MatricNumber: doc.data().MatricNumber,
            university: doc.data().university,
            RequestTime: doc.data().RequestTime,
            approved: doc.data().approved,
          })),
        ),
      );
    const FETCH_STUDENT_PACKAGES = firestore()
      .collection('packages')
      .orderBy('RequestTime', 'desc')
      .onSnapshot(snapshot =>
        setStudentPackages(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
            name: doc.data().name,
            Price: doc.data().Price,
            UserID: doc.data().UserID,
            planCategory: doc.data().planCategory,
            seconds: doc.data().seconds,
            MatricNumber: doc.data().MatricNumber,
            university: doc.data().university,
            RequestTime: doc.data().RequestTime,
            approved: doc.data().approved,
          })),
        ),
      );
    const FETCH_PLANS = firestore()
      .collection('Plans')
      .orderBy('lastUpdated', 'desc')
      .onSnapshot(snapshot =>
        setPlansData(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
            planPrice: doc.data().planPrice,
            planType: doc.data().planType,
            planFeatures: doc.data().planFeatures,
          })),
        ),
      );
    const FETCH_SESSIONS = firestore()
      .collection('session')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot =>
        setSession(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
            approved: doc.data().approved,
            createdAt: doc.data().createdAt,
            isRequested: doc.data().isRequested,
            patientName: doc.data().patientName,
            patientEmail: doc.data().patientEmail,
            patientAvatar: doc.data().patientAvatar,
            professionalName: doc.data().professionalName,
            profEmail: doc.data().profEmail,
            professionalAvatar: doc.data().professionalAvatar,
            professionalId: doc.data().professionalId,
          })),
        ),
      );

    return (
      fetchProfs,
      fetchVarProfs,
      fetchUnVarProfs,
      fetcBlogs,
      fetchPatients,
      FETCH_PLANS,
      FETCH_PACKAGES,
      FETCH_SESSIONS,
      FETCH_STUDENT_PACKAGES,
      FETCH_STUDENT_PACKAGES_PENDING
    );
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
        <ListItem.Subtitle
          style={{...FONTS.body4, color: COLORS.secondary, paddingVertical: 5}}
          numberOfLines={1}
          ellipsizeMode="tail">
          {/* {lastMessages?.[0]?.displayName}:
          {lastMessages?.[0]?.message || 'Need an approval first!'} */}
          {professionalSpecialty}
        </ListItem.Subtitle>
        <Text
          style={{
            ...FONTS.body4,
            color: COLORS.secondary,
            paddingVertical: 5,
          }}></Text>
      </View>
    );
  };

  const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
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

  const checkProfits = async () => {
    await firestore()
      .collection('packages')
      .get()
      .then(querySnapshot => {
        let packageCostTotal = 0;
        querySnapshot.forEach(doc => {
          // console.log(doc);
          setProfitTotal(
            (packageCostTotal = packageCostTotal + parseInt(doc.data().Price)),
          );
        });
      });
  };

  const deletePost = postId => {
    console.log('Current Post Id: ', postId);
    setDeleting(true);

    firestore()
      .collection('Blogs')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();

          if (postImg != null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                // console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreData(postId);
              })
              .catch(e => {
                console.log('Error while deleting the image. ', e);
              });
            //  If the post image is not available
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const handleDelete = postId => {
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
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const deleteFirestoreData = postId => {
    firestore()
      .collection('Blogs')
      .doc(postId)
      .delete()
      .then(() => {
        setDeleting(false);
        ToastAndroid.showWithGravityAndOffset(
          'Your post has been deleted successfully!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          200,
        );
        setDeleted(true);
      })
      .catch(e => console.log('Error deleting posst.', e));
  };

  // -----------------------------------------------------------------------------------------------

  const deletePostz = postId => {
    console.log('Current Post Id: ', postId);
    setDeleting(true);

    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();

          if (postImg != null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                // console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreDataz(postId);
              })
              .catch(e => {
                console.log('Error while deleting the image. ', e);
              });
            //  If the post image is not available
          } else {
            deleteFirestoreDataz(postId);
          }
        }
      });
  };

  const handleDeletez = postId => {
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
          onPress: () => deletePostz(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const deleteFirestoreDataz = postId => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        setDeleting(false);
        ToastAndroid.showWithGravityAndOffset(
          'Your post has been deleted successfully!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          200,
        );
        setDeleted(true);
      })
      .catch(e => console.log('Error deleting posst.', e));
  };

  useEffect(() => {
    fetchPosts();
    checkProfits();
  }, [deleted]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: SIZES.padding * 2,
      }}>
      <Heder
        name={UresData.description || 'Mentlada'}
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
        <>
          <View style={{flex: 1}}>
            <FlatList
              data={PatientsData}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({id, item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('PatientsProfile', {
                      patientId: item.userId,
                      fname: item.fname,
                      lname: item.lname,
                      patientName: item.fname + ' ' + item.lname,
                      patientEmail: item.email,
                      patientAvatar: item.userImg,
                      patientRole: item.role,
                      patientAbout: item.about,
                      phone: item.phone,
                      createdAt: item.createdAt,
                      country: item.country,
                      city: item.city,
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
                      // alignItems: 'center',
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
                        professionalExperience={item.email}
                        professionalSpecialty={item.about}
                        isVerified={item.Verified}
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
          </View>
        </>
      ) : UresData.description == 'Post' ? (
        <>
          <View style={{flex: 1}}>
            <FlatList
              data={posts}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({id, item}) => (
                <CustomPost
                  key={item.id}
                  item={item}
                  // handleDeletePost={handleDelete}
                  onDeleteThePost={handleDeletez}
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
              )}
            />
          </View>
        </>
      ) : UresData.description == 'Blog' ? (
        <>
          <FlatList
            data={Blogs}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({id, item}) => (
              <BlogCustom
                item={item}
                onPress={() =>
                  navigation.navigate('BlogContent', {
                    id: item.id,
                    data: item.data,
                    Blog: item.Blog,
                    Content: item.Content,
                    blogtImg: item.blogtImg,
                    professionalAvatar: item.professionalAvatar,
                    professionalName: item.professionalName,
                    Category: item.Category,
                    blogTime: item.blogTime,
                    professionalId: item.professionalId,
                  })
                }
                onDelete={handleDelete}
              />
            )}
          />
        </>
      ) : UresData.description == 'Plans' ? (
        <>
          <FlatList
            data={plansData}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({id, item}) => (
              <PlansCustom
                item={item}
                handleNavigation={() =>
                  navigation.navigate('EditPlan', {id: item.id})
                }
              />
            )}
          />

          <View
            style={{
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.padding * 2,
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
                onPress={() => navigation.navigate('AddPlan')}>
                <Text style={{...FONTS.h5}}>Add plan</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </>
      ) : UresData.description == 'Profits' ? (
        <>
          <FlatList
            data={packages}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({id, item}) => (
              <ProfitsContent key={item.id} item={item} />
            )}
          />

          <View
            style={{
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.padding * 2,
            }}>
            <LinearGradient
              colors={[COLORS.lightpurple, COLORS.lightGreen]}
              start={{x: 0, y: 1}}
              end={{x: 0, y: 0}}
              style={{borderRadius: 7, padding: 10}}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <View style={{paddingBottom: 10}}>
                  <Image
                    source={icons.profits}
                    resizeMode="cover"
                    style={{width: 40, height: 40, alignItems: 'center'}}
                  />
                </View>
                <Text style={{...FONTS.h3, color: COLORS.secondary}}>
                  RM{profitTotal > 0 ? profitTotal : 0}
                </Text>
                <Text style={{...FONTS.body4}}>Mentlada profits</Text>
              </View>
            </LinearGradient>
          </View>
        </>
      ) : UresData.description == 'Sessions' ? (
        <>
          <FlatList
            data={session}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({id, item}) => <Sessions key={item.id} item={item} />}
          />
        </>
      ) : UresData.description == 'Packages' ? (
        <>
          <TwoSwichs
            selectionMode={1}
            option1="Users"
            option2="Students"
            option3="Requested"
            onSelectSwitch={onSelectSwitch}
          />
          {requests == 1 && (
            <View style={{flex: 1}}>
              <FlatList
                data={packages}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({id, item}) => (
                  <PackagesContent key={item.id} item={item} />
                )}
              />
            </View>
          )}
          {requests == 2 && (
            <View style={{flex: 1}}>
              {studentPackages?.[0] ? (
                <FlatList
                  data={studentPackages}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={({id, item}) => (
                    <StudentPackageList key={item.id} item={item} />
                  )}
                />
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
                    source={icons.Data_6}
                    style={{
                      height: 100,
                      width: 100,
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
                      Students packages requests
                    </Text>
                    <Text
                      style={{
                        ...FONTS.body6,
                        color: COLORS.secondary,
                        textAlign: 'center',
                        width: SIZES.width - 40,
                        marginTop: 10,
                      }}>
                      When any student requests a free session, the request will
                      be shown here for you to accept or deny.
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
          {requests == 3 && (
            <View style={{flex: 1}}>
              {studentPackagesPending?.[0] ? (
                <FlatList
                  data={studentPackagesPending}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={({id, item}) => (
                    <StudentPackage
                      key={item.id}
                      item={item}
                      onRequestedProfilePress={() =>
                        navigation.navigate('RequestedProfile', {item: item})
                      }
                    />
                  )}
                />
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
                    source={icons.Data_6}
                    style={{
                      height: 100,
                      width: 100,
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
                      Students packages requests
                    </Text>
                    <Text
                      style={{
                        ...FONTS.body6,
                        color: COLORS.secondary,
                        textAlign: 'center',
                        width: SIZES.width - 40,
                        marginTop: 10,
                      }}>
                      When any student requests a free session, the request will
                      be shown here for you to accept or deny.
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </>
      ) : null}
    </SafeAreaView>
  );
};

export default Details;
