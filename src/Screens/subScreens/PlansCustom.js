import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, icons, images, SIZES} from '../../constants';

//DataBase
import storage from '@react-native-firebase/storage';
import firestore, {firebase} from '@react-native-firebase/firestore';

import {Button} from 'react-native-elements';
import {BallIndicator} from 'react-native-indicators';

const PlansCustom = ({item, navigation, handleNavigation}) => {
  const [plans, setPlans] = useState([]);
  const [isUpdating, setUpdating] = useState(false);
  const [dialog, setDialog] = useState(false);

  const Content = ({HederText, Body, Body2, Price, priceInfo, onPress}) => {
    return (
      <>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingLeft: 15,
            }}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.secondary,
                fontSize: 15,
              }}>
              {HederText}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'DINNextLTArabic-Regular',
                lineHeight: 25,
                color: COLORS.secondary,
                textAlign: 'left',
                width: SIZES.width / 2,
              }}>
              {Body}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                ...FONTS.body4,
                color: COLORS.secondary,
                fontSize: 13,
              }}>
              {Body2}
            </Text>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.secondary,
                textAlign: 'center',
                fontSize: 20,
              }}>
              RM{Price}
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                textAlign: 'center',
                fontSize: 11,
              }}>
              {priceInfo}
            </Text>
          </View>
        </View>
      </>
    );
  };

  useLayoutEffect(() => {
    const FETCH_PLANS = firestore()
      .collection('Plans')
      .onSnapshot(snapshot =>
        setPlans(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
            planPrice: doc.data().planPrice,
            planType: doc.data().planType,
            planFeatures: doc.data().planFeatures,
          })),
        ),
      );
    return FETCH_PLANS;
  }, []);

  const onDelete = () => {
    setUpdating(true);
    firebase
      .firestore()
      .collection('Plans')
      .doc(item.id)
      .delete()
      .then(() => {
        setUpdating(false);
        console.log('This plan is no longer active!');
        Alert.alert('Successfully!', 'This plan is no longer active');
      });
  };

  const handleDelete = planID => {
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
          onPress: () => onDelete(planID),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={[COLORS.white, COLORS.lightpurple]}
        start={{x: 0, y: 0.2}}
        end={{x: 0, y: 1}}
        style={{
          flexDirection: 'row',
          marginHorizontal: 15,
          marginVertical: 5,
          alignItems: 'center',
          borderRadius: 7,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginHorizontal: 5,
          }}>
          {/* <Text>{item.planCategory}</Text> */}
          {item.planType == 'Premium' ? (
            <View
              style={{
                backgroundColor: COLORS.primary,
                width: SIZES.width / 2 - 20,
                borderBottomRightRadius: 30,
                borderTopRightRadius: 30,
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: COLORS.lightpurple,
                  paddingLeft: 20,
                  ...FONTS.h4_2,
                }}>
                Best value
              </Text>
            </View>
          ) : null}

          <View style={{padding: 10}}>
            <Content
              HederText={item.planType}
              Body={item.planFeatures}
              Price={item.planPrice}
              priceInfo="* VAT & local taxes is applied"
            />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 10,
              }}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.lightGreen]}
                start={{x: 0.2, y: 6}}
                end={{x: 0, y: 0}}
                style={{
                  alignItems: 'center',
                  borderRadius: 7,
                  marginHorizontal: 2,
                }}>
                <Button
                  onPress={handleNavigation}
                  title="Edit"
                  titleStyle={{...FONTS.h6, color: COLORS.secondary}}
                  buttonStyle={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    borderWidth: 0,
                  }}
                  containerStyle={{
                    width: SIZES.width / 3 + 20,
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}
                />
              </LinearGradient>
              <LinearGradient
                colors={[COLORS.primary, COLORS.lightpurple]}
                start={{x: 0.4, y: 5}}
                end={{x: 0.4, y: 0}}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 7,
                  marginHorizontal: 5,
                }}>
                {isUpdating ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: SIZES.width / 3 + 20,
                    }}>
                    <BallIndicator color={COLORS.secondary} size={13} />
                  </View>
                ) : (
                  <Button
                    onPress={handleDelete}
                    title="Delete"
                    titleStyle={{...FONTS.h6, color: COLORS.primary}}
                    buttonStyle={{
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                      borderWidth: 0,
                    }}
                    containerStyle={{
                      width: SIZES.width / 3 + 20,
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                  />
                )}
              </LinearGradient>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* <FlatList
        initialNumToRender={7}
        data={plans}
        keyExtractor={item => item.id}
        renderItem={({id, item}) => (
          <View>
            <Text>s</Text>
          </View>
        )}
      /> */}
    </View>
  );
};

export default PlansCustom;
