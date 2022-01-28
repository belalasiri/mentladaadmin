import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {COLORS, SIZES, FONTS, icons, images} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import {Avatar} from 'react-native-elements';
import EditHeaderText from './subScreens/EditHeaderText';
import HeaderText from './subScreens/HeaderText';

const Home = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPost] = useState(null);
  const [session, setSession] = useState([]);
  const [userData, setUserData] = useState([]);
  const [professionalData, setProfessionalData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [Blogs, setBlogs] = useState([]);
  const [Header, setHeader] = useState([]);
  const [packages, setPackages] = useState([]);
  const [studentPackages, setStudentPackages] = useState([]);
  const [ProfessionalReports, setProfessionalReports] = useState([]);
  const [patientReports, setPatientReports] = useState([]);
  const [profitTotal, setProfitTotal] = useState(0);

  const checkProfits = async () => {
    await firestore()
      .collection('packages')
      .get()
      .then(querySnapshot => {
        let packageCostTotal = 0;
        querySnapshot.forEach(doc => {
          setProfitTotal(
            (packageCostTotal = packageCostTotal + parseInt(doc.data().Price)),
          );
        });
      });
  };
  useEffect(() => {
    checkProfits();
  }, []);

  const featuresData = [
    {
      id: 1,
      icon: icons.Professional,
      color: COLORS.green,
      backgroundColor: COLORS.lightGreen,
      description: 'Professionals',
      height: 50,
      width: 20,
    },
    {
      id: 2,
      icon: icons.patient,
      color: COLORS.primary,
      backgroundColor: COLORS.lightpurple,
      description: 'Patients',
      height: 50,
      width: 20,
    },
    {
      id: 3,
      icon: icons.post,
      color: COLORS.yellow,
      backgroundColor: COLORS.lightyellow2,
      description: 'Post',
      height: 50,
      width: 25,
    },

    {
      id: 4,
      icon: icons.blog,
      color: COLORS.lime,
      backgroundColor: COLORS.emerald,
      description: 'Blog',
      height: 50,
      width: 20,
    },
    {
      id: 5,
      icon: icons.profits,
      backgroundColor: COLORS.lightyellow2,
      description: 'Profits',
      height: 50,
      width: 30,
    },
    {
      id: 6,
      icon: icons.subscription2,
      color: COLORS.lime,
      backgroundColor: COLORS.emerald,
      description: 'Plans',
      height: 50,
      width: 30,
    },
    {
      id: 7,
      icon: icons.Chat,
      // color: COLORS.primary,
      backgroundColor: COLORS.lightpurple,
      description: 'Sessions',
      height: 50,
      width: 30,
    },
    {
      id: 8,
      icon: icons.money,
      // color: COLORS.primary,
      backgroundColor: COLORS.lightGreen,
      description: 'Packages',
      height: 50,
      width: 30,
    },
  ];

  const MentladaData = [
    {
      id: 1,
      img: icons.Data_6,
      title: 'Professionals',
      color: COLORS.emerald,
      tintColor: COLORS.primary,
    },
    {
      id: 2,
      img: icons.Data_7,
      title: 'Patients',
      color: COLORS.lightpurple,
      tintColor: COLORS.secondary,
    },

    {
      id: 3,
      img: icons.Data_1,
      title: 'Post',
      color: COLORS.lightyellow2,
      tintColor: COLORS.yellow,
    },
    {
      id: 4,
      img: icons.Data_2,
      title: 'Blogs',
      color: COLORS.lightGreen,
      tintColor: COLORS.green,
    },
    {
      id: 5,
      img: icons.Chat,
      title: 'Sessions',
      color: COLORS.lightpurple,
      tintColor: COLORS.green,
    },
    {
      id: 6,
      img: icons.subscription,
      title: 'Active Packages',
      color: COLORS.emerald,
      tintColor: COLORS.primary,
    },
    {
      id: 7,
      img: icons.profits,
      title: 'Mentlada profits',
      color: COLORS.lightGreen,
      tintColor: COLORS.primary,
    },
    {
      id: 8,
      img: icons.subscription,
      title: 'Students Packages',
      color: COLORS.emerald,
      tintColor: COLORS.primary,
    },
  ];

  useLayoutEffect(() => {
    const FETCH_PROFESSIONAL = firestore()
      .collection('Professional')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot =>
        setProfessionalData(
          snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})),
        ),
      );
    const FETCH_PATIENTS_REPORTS = firestore()
      .collection('PatientReports')
      .orderBy('ReportTime', 'desc')
      .onSnapshot(snapshot =>
        setPatientReports(
          snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})),
        ),
      );
    const FETCH_PROFESSIONAL_REPORTS = firestore()
      .collection('ProfessionalReports')
      .orderBy('ReportTime', 'desc')
      .onSnapshot(snapshot =>
        setProfessionalReports(
          snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})),
        ),
      );

    const FETCH_BLOGS = firestore()
      .collection('Blogs')
      .orderBy('blogTime', 'desc')
      .onSnapshot(snapshot =>
        setBlogs(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()}))),
      );
    const FETCH_POSTS = firestore()
      .collection('posts')
      .orderBy('postTime', 'desc')
      .onSnapshot(snapshot =>
        setPosts(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()}))),
      );
    const FETCH_PATIENTS = firestore()
      .collection('users')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot =>
        setUserData(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()}))),
      );
    const FETCH_SESSIONS = firestore()
      .collection('session')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot =>
        setSession(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()}))),
      );
    const FETCH_HEADER = firestore()
      .collection('Header')
      .orderBy('lastUpdated', 'desc')
      .onSnapshot(snapshot =>
        setHeader(
          snapshot.docs.map(doc => ({
            id: doc.id,
            HeaderText: doc.data().HeaderText,
          })),
        ),
      );
    const FETCH_PACKAGES = firestore()
      .collection('packages')
      .orderBy('subscribedAt', 'desc')
      .onSnapshot(snapshot =>
        setPackages(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()}))),
      );
    const FETCH_STUDENTS_PACKAGES = firestore()
      .collection('packages')
      .where('approved', '==', 'approved')
      .where('planCategory', '==', 'Student')
      .onSnapshot(snapshot =>
        setStudentPackages(
          snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})),
        ),
      );

    return (
      FETCH_PROFESSIONAL,
      FETCH_BLOGS,
      FETCH_POSTS,
      FETCH_PATIENTS,
      FETCH_SESSIONS,
      FETCH_HEADER,
      FETCH_PACKAGES,
      FETCH_STUDENTS_PACKAGES,
      FETCH_PATIENTS_REPORTS,
      FETCH_PROFESSIONAL_REPORTS
    );
  }, [navigation]);

  // setPatientReports
  // setProfessionalReports
  let Reports = ProfessionalReports.length + patientReports.length || 0;

  const [features] = React.useState(featuresData);
  const [allMentladaData] = React.useState(MentladaData);

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingTop: SIZES.padding * 4,
          paddingBottom: SIZES.padding * 2,
        }}>
        <View style={{flex: 1}}>
          <Text style={{...FONTS.h1, color: COLORS.secondary}}>Hello!</Text>
          <Text style={{...FONTS.body2}}>Dear Admin</Text>
        </View>
      </View>
    );
  }

  function renderReports() {
    return (
      <TouchableOpacity
        style={{
          marginBottom: SIZES.padding * 2,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Report')}
        activeOpacity={0.7}>
        <LinearGradient
          colors={[COLORS.lightpurple, COLORS.lightGreen]}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          style={{
            flexDirection: 'row',
            flex: 1,
            marginVertical: 5,
            borderRadius: 7,
            alignItems: 'center',
            padding: 10,
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}>
            <Image
              source={icons.caution}
              style={{width: 25, height: 25, tintColor: COLORS.primary}}
            />
            <Text style={{...FONTS.h4_2, paddingLeft: 15}}>{Reports}</Text>
            <Text style={{...FONTS.body4, paddingLeft: 10}}>
              Active Reports!
            </Text>
          </View>
          <Icon
            name="chevron-forward-outline"
            size={20}
            color={COLORS.primary}
          />
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function renderBanner() {
    return (
      <LinearGradient
        colors={[COLORS.lightpurple, COLORS.lightGreen]}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={{
          flexDirection: 'row',

          marginVertical: 5,
          alignItems: 'center',
          borderRadius: 7,
          padding: 10,
          paddingVertical: 20,
        }}>
        <Icon name="trophy-outline" size={35} color={COLORS.primary} />
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginHorizontal: SIZES.padding,
          }}>
          {Header.map(item => (
            <HeaderText
              key={item.id}
              item={item}
              onEditPress={() =>
                navigation.navigate('EditHeaderText', {
                  id: item.id,
                  HeaderText: item.HeaderText,
                })
              }
            />
          ))}
        </View>
      </LinearGradient>
    );
  }

  function renderFeatures() {
    const Header = () => (
      <View style={{marginBottom: SIZES.padding * 2}}>
        <Text style={{...FONTS.h3}}>Features</Text>
      </View>
    );

    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{
          marginBottom: SIZES.padding * 2,
          width: 75,
          alignItems: 'center',
        }}
        onPress={() =>
          navigation.navigate('Details', {
            description: item.description,
            icon: item.icon,
            color: item.color,
            backgroundColor: item.backgroundColor,
          })
        }>
        <View
          style={{
            height: 50,
            width: 75,
            marginBottom: 5,
            borderRadius: 7,
            backgroundColor: item.backgroundColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={item.icon}
            resizeMode="contain"
            style={{
              height: item.height,
              width: item.width,
              tintColor: item.color,
            }}
          />
        </View>
        <Text style={{textAlign: 'center', flexWrap: 'wrap', ...FONTS.h7}}>
          {item.description}
        </Text>
      </TouchableOpacity>
    );

    return (
      <FlatList
        ListHeaderComponent={Header}
        data={features}
        numColumns={4}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        style={{marginTop: SIZES.padding * 2}}
      />
    );
  }

  function renderMentladaData() {
    const HeaderComponent = () => (
      <View>
        {renderHeader()}
        {renderBanner()}
        {renderFeatures()}
        {renderReports()}
        {renderDataHeader()}
      </View>
    );

    const renderDataHeader = () => (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: SIZES.padding,
        }}>
        <View style={{flex: 1}}>
          <Text style={{...FONTS.h3}}>Mentlada Data</Text>
        </View>
      </View>
    );

    const renderItem = ({item}) => (
      <View
        style={{
          marginVertical: SIZES.base,
          width: SIZES.width / 2.5,
        }}>
        <View
          style={{
            height: 100,
            borderTopLeftRadius: 100,
            borderTopRightRadius: 100,
            justifyContent: 'flex-end',
            paddingBottom: 5,
            alignItems: 'center',
            backgroundColor: item.color,
          }}>
          <Image
            source={item.img}
            resizeMode="cover"
            style={{
              width: 70,
              height: 70,
              alignItems: 'center',
            }}
          />
        </View>
        <View
          style={{
            // padding: SIZES.padding / 2,
            borderBottomLeftRadius: 7,
            borderBottomRightRadius: 7,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {item.title == 'Professionals' ? (
            <>
              <Text style={{...FONTS.h2, color: COLORS.secondary}}>
                {professionalData.length || '0'}
              </Text>
            </>
          ) : item.title == 'Post' ? (
            <>
              <Text style={{...FONTS.h2, color: COLORS.secondary}}>
                {posts.length || '0'}
              </Text>
            </>
          ) : item.title == 'Patients' ? (
            <>
              <Text style={{...FONTS.h2, color: COLORS.secondary}}>
                {userData.length || '0'}
              </Text>
            </>
          ) : item.title == 'Blogs' ? (
            <>
              <Text style={{...FONTS.h2, color: COLORS.secondary}}>
                {Blogs.length || '0'}
              </Text>
            </>
          ) : item.title == 'Sessions' ? (
            <>
              <Text style={{...FONTS.h2, color: COLORS.secondary}}>
                {session.length || '0'}
              </Text>
            </>
          ) : item.title == 'Active Packages' ? (
            <>
              <Text style={{...FONTS.h2, color: COLORS.secondary}}>
                {packages.length || '0'}
              </Text>
            </>
          ) : item.title == 'Mentlada profits' ? (
            <>
              <Text style={{...FONTS.h2, color: COLORS.secondary}}>
                RM{profitTotal > 0 ? profitTotal : 0}
              </Text>
            </>
          ) : item.title == 'Students Packages' ? (
            <>
              <Text style={{...FONTS.h2, color: COLORS.secondary}}>
                {studentPackages.length || '0'}
              </Text>
            </>
          ) : null}
          <Text style={{...FONTS.body4}}>{item.title}</Text>
          {/* <Text style={{...FONTS.body4}}>{item.description}</Text> */}
        </View>
      </View>
    );

    return (
      <FlatList
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={{paddingHorizontal: SIZES.padding * 3}}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={allMentladaData}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{marginBottom: 80}}></View>}
      />
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {renderMentladaData()}
    </SafeAreaView>
  );
};

export default Home;
