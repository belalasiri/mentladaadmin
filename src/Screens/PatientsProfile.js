import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const PatientsProfile = () => {
  return (
    <View style={styles.container}>
      <Text>PatientsProfile Screen </Text>
    </View>
  );
};

export default PatientsProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
