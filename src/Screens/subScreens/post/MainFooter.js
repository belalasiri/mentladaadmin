import React, {useEffect, useState, useContext, useLayoutEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Footer = ({CommentsLength, onCommentPress, LikesLength, likeList}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <AntDesign name={'hearto'} size={22} color="grey" />
        <Text style={styles.number}>{likeList}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={onCommentPress}>
        <Feather name={'message-circle'} size={22} color="grey" />
        <Text style={styles.number}>{CommentsLength}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  number: {
    marginLeft: 5,
    textAlign: 'center',
  },
});
