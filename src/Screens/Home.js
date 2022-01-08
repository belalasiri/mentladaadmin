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

const Home = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPost] = useState(null);
  const [session, setSession] = useState([]);
  const [userData, setUserData] = useState([]);
  const [professionalData, setProfessionalData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [Blogs, setBlogs] = useState([]);

  const featuresData = [
    {
      id: 1,
      icon: icons.Professional,
      color: COLORS.primary,
      backgroundColor: COLORS.lightGreen,
      description: 'Professionals',
    },
    {
      id: 2,
      icon: icons.patient,
      color: COLORS.purple,
      backgroundColor: COLORS.lightpurple,
      description: 'Patients',
    },
    {
      id: 3,
      icon: icons.post,
      color: COLORS.yellow,
      backgroundColor: COLORS.lightyellow,

      description: 'Post',
    },

    {
      id: 4,
      icon: icons.blog,
      color: COLORS.lime,
      backgroundColor: COLORS.emerald,
      description: 'Blog',
    },
    {
      id: 5,
      icon: icons.blog,
      color: COLORS.primary,
      backgroundColor: COLORS.lightpurple,
      description: 'Plans',
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
      color: COLORS.lightyellow,
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

    return (
      FETCH_PROFESSIONAL,
      FETCH_BLOGS,
      FETCH_POSTS,
      FETCH_PATIENTS,
      FETCH_SESSIONS
    );
  }, [navigation]);

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

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.lightGray,
            }}>
            <Image
              source={icons.bell}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.secondary,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                height: 10,
                width: 10,
                backgroundColor: COLORS.red,
                borderRadius: 5,
              }}></View>
          </TouchableOpacity>
        </View>
      </View>
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
          <View>
            <Text
              style={{
                ...FONTS.body3,
              }}>
              If it's out of your hands, it deserves freedom from your mind too.
            </Text>
          </View>
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
          width: 60,
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
            width: 70,
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
              height: 20,
              width: 20,
              tintColor: item.color,
            }}
          />
        </View>
        <Text style={{textAlign: 'center', flexWrap: 'wrap', ...FONTS.body4}}>
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
      <TouchableOpacity
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
          ) : null}
          <Text style={{...FONTS.body4}}>{item.title}</Text>
          {/* <Text style={{...FONTS.body4}}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
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
