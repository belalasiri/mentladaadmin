import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const EditBlog = () => {
  return (
    <View style={styles.container}>
      <Text>EditBlog Screen </Text>
    </View>
  );
};

export default EditBlog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
