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
import {COLORS, FONTS, icons, SIZES} from '../../constants';
import {Avatar, ListItem} from 'react-native-elements';

//Libraries
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const ProfReportDetails = ({navigation, route}) => {
  const [patientData, setPatientData] = useState(null);
  const [profData, setProfData] = useState(null);

  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: patientData
        ? patientData.fname + ' ' + patientData.lname || 'Professional'
        : 'Professional',
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
  }, [patientData, profData]);

  const getPatient = async () => {
    setLoading(true);
    await firestore()
      .collection('Professional')
      .doc(item.ReporterlId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setPatientData(documentSnapshot.data());
          setLoading(false);
        }
      });
  };
  const getProf = async () => {
    setLoading(true);
    await firestore()
      .collection('Professional')
      .doc(item.ReporterlId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setProfData(documentSnapshot.data());
          setLoading(false);
        }
      });
  };
  useEffect(() => {
    getPatient();
    getProf();
  }, [patientData, profData]);

  let item = route.params.item;
  return (
    <View style={styles.container}>
      <Text>
        {patientData
          ? patientData.fname + ' ' + patientData.lname || 'Professional'
          : 'Professional'}{' '}
        Screen {item.Content}
      </Text>
      <Text>
        {patientData
          ? patientData.fname + ' ' + patientData.lname || 'Professional'
          : 'Professional'}{' '}
        Screen {item.Content}
      </Text>
    </View>
  );
};

export default ProfReportDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
