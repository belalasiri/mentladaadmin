import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const DeleteReview = ({onDelete}) => {
  return (
    <TouchableOpacity
      style={{}}
      activeOpacity={0.8}
      onPress={onDelete}></TouchableOpacity>
  );
};

export default DeleteReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
