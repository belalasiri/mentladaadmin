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
  const [userData, setUserData] = useState(null);
  const [professionalData, setProfessionalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPost] = useState(null);
  const [posts, setPosts] = useState(null);

  const getProfessional = async () => {
    setLoading(true);

    await firestore()
      .collection('Professional')
      .doc(route.params.professionalId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setProfessionalData(documentSnapshot.data());
          setLoading(false);
        }
      });
  };

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
  ];

  const specialPromoData = [
    {
      id: 1,
      img: images.promoBanner,
      title: 'Bonus Cashback1',
      description: "Don't miss it. Grab it now!",
    },
    {
      id: 2,
      img: images.promoBanner,
      title: 'Bonus Cashback2',
      description: "Don't miss it. Grab it now!",
    },
    {
      id: 3,
      img: images.promoBanner,
      title: 'Bonus Cashback3',
      description: "Don't miss it. Grab it now!",
    },
    {
      id: 4,
      img: images.promoBanner,
      title: 'Bonus Cashback4',
      description: "Don't miss it. Grab it now!",
    },
  ];

  const [features, setFeatures] = React.useState(featuresData);
  const [specialPromos, setSpecialPromos] = React.useState(specialPromoData);

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
  // function renderProf() {
  //   return (
  //     <FlatList
  //       horizontal
  //       data={posts}
  //       keyExtractor={item => item.id}
  //       showsHorizontalScrollIndicator={false}
  //       renderItem={({item}) => (
  //         <View>
  //           <Avatar rounded source={images.wallieLogo} />
  //           <Text>{item.post}</Text>
  //         </View>
  //       )}
  //     />
  //   );
  // }

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

  function renderPromos() {
    const HeaderComponent = () => (
      <View>
        {renderHeader()}
        {renderBanner()}
        {/* {renderProf()} */}
        {renderFeatures()}
        {renderPromoHeader()}
      </View>
    );

    const renderPromoHeader = () => (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: SIZES.padding,
        }}>
        <View style={{flex: 1}}>
          <Text style={{...FONTS.h3}}>Special Promos</Text>
        </View>
        <TouchableOpacity onPress={() => console.log('View All')}>
          <Text style={{color: COLORS.gray, ...FONTS.body4}}>View All</Text>
        </TouchableOpacity>
      </View>
    );

    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{
          marginVertical: SIZES.base,
          width: SIZES.width / 2.5,
        }}
        onPress={() => console.log(item.title)}>
        <View
          style={{
            height: 80,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.primary,
          }}>
          <Image
            source={images.promoBanner}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        </View>

        <View
          style={{
            padding: SIZES.padding,
            backgroundColor: COLORS.lightGray,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <Text style={{...FONTS.h4}}>{item.title}</Text>
          <Text style={{...FONTS.body4}}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={{paddingHorizontal: SIZES.padding * 3}}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={specialPromos}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{marginBottom: 80}}></View>}
      />
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {renderPromos()}
    </SafeAreaView>
  );
};

export default Home;
