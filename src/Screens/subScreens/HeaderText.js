import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {FONTS} from '../../constants';

const HeaderText = ({item, onEditPress}) => {
  return (
    <Pressable onPress={onEditPress}>
      <Text
        style={{
          ...FONTS.body3,
        }}>
        {item.HeaderText}
      </Text>
    </Pressable>
  );
};

export default HeaderText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
