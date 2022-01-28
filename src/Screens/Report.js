import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import firestore, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {Avatar, ListItem} from 'react-native-elements';

//Libraries
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import Swich from './subScreens/Swich';

const Report = ({navigation}) => {
  const [patientReport, setPatientReports] = useState(null);
  const [professionalReport, setProfessionalReports] = useState(null);
  const [requests, setRequests] = useState(true);

  useLayoutEffect(() => {
    const fetcPatientReports = firestore()
      .collection('PatientReports')
      .orderBy('ReportTime', 'desc')
      .onSnapshot(snapshot =>
        setPatientReports(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
            Content: doc.data().Content,
            ReportImg: doc.data().ReportImg,
            ReporterlId: doc.data().ReporterlId,
            ReportTime: doc.data().ReportTime,
          })),
        ),
      );
    const fetcProfessionalReports = firestore()
      .collection('ProfessionalReports')
      .orderBy('ReportTime', 'desc')
      .onSnapshot(snapshot =>
        setProfessionalReports(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
            Content: doc.data().Content,
            ReportImg: doc.data().ReportImg,
            ReporterlId: doc.data().ReporterlId,
            ReportTime: doc.data().ReportTime,
          })),
        ),
      );
    return fetcPatientReports, fetcProfessionalReports;
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Proplem Reports',
      headerStyle: {elevation: 0, backgroundColor: '#F0E6FA'},
      headerTitleStyle: {color: COLORS.secondary, ...FONTS.h5},
      headerTitleAlign: 'center',
      headerTintColor: COLORS.secondary,

      headerLeft: () => (
        <View style={{marginLeft: 10}}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="chevron-back" size={25} color={COLORS.secondary} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);
  const onSelectSwitch = value => {
    setRequests(value);
  };
  return (
    <View style={styles.container}>
      <Swich
        selectionMode={1}
        option1="Patients"
        option2="Professionals"
        onSelectSwitch={onSelectSwitch}
      />
      {requests == 1 && (
        <FlatList
          data={patientReport}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({id, item}) => (
            <ListItem
              key={id}
              onPress={() =>
                navigation.navigate('ReportDetails', {item: item})
              }>
              <View
                style={{
                  width: SIZES.width / 1 - 40,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <LinearGradient
                  colors={['#f0e6fa', '#fff', '#f7f3fc']}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
                  style={{
                    flexDirection: 'row',
                    borderRadius: 7,
                  }}>
                  <View style={{width: 100}}>
                    <Image
                      source={{
                        uri:
                          item.ReportImg ||
                          'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg',
                      }}
                      style={{
                        width: 100,
                        height: 150,
                        borderTopLeftRadius: 7,
                        borderBottomLeftRadius: 7,
                      }}
                    />
                  </View>
                  <ListItem.Content
                    style={{
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      marginLeft: 20,
                      paddingRight: 3,
                      paddingVertical: 10,
                    }}>
                    <ListItem.Title
                      style={{
                        color: COLORS.secondary,
                        ...FONTS.h5,
                      }}>
                      {moment(item.ReportTime.toDate()).format('lll')}
                    </ListItem.Title>
                    <ListItem.Subtitle
                      style={{
                        color: COLORS.secondary,
                        paddingRight: 5,
                        paddingVertical: 7,
                        ...FONTS.b5,
                      }}
                      numberOfLines={3}
                      ellipsizeMode="tail">
                      {item.Content}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron
                    color={COLORS.primary}
                    size={20}
                    style={{marginRight: 10}}
                  />
                </LinearGradient>
              </View>
            </ListItem>
          )}
        />
      )}
      {requests == 2 && (
        <FlatList
          data={professionalReport}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({id, item}) => (
            <ListItem
              key={id}
              onPress={() =>
                navigation.navigate('ProfReportDetails', {item: item})
              }>
              <View
                style={{
                  width: SIZES.width / 1 - 40,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <LinearGradient
                  colors={['#f0e6fa', '#fff', '#f7f3fc']}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
                  style={{
                    flexDirection: 'row',
                    borderRadius: 7,
                  }}>
                  <View style={{width: 100}}>
                    <Image
                      source={{
                        uri:
                          item.ReportImg ||
                          'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg',
                      }}
                      style={{
                        width: 100,
                        height: 150,
                        borderTopLeftRadius: 7,
                        borderBottomLeftRadius: 7,
                      }}
                    />
                  </View>
                  <ListItem.Content
                    style={{
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      marginLeft: 20,
                      paddingRight: 3,
                      paddingVertical: 10,
                    }}>
                    <ListItem.Title
                      style={{
                        color: COLORS.secondary,
                        ...FONTS.h5,
                      }}>
                      {moment(item.ReportTime.toDate()).format('lll')}
                    </ListItem.Title>
                    <ListItem.Subtitle
                      style={{
                        color: COLORS.secondary,
                        paddingRight: 5,
                        paddingVertical: 7,
                        ...FONTS.b5,
                      }}
                      numberOfLines={3}
                      ellipsizeMode="tail">
                      {item.Content}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron
                    color={COLORS.primary}
                    size={20}
                    style={{marginRight: 10}}
                  />
                </LinearGradient>
              </View>
            </ListItem>
          )}
        />
      )}
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
