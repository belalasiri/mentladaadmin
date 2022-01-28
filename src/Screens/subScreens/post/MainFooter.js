import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS, icons, SIZES} from '../../../constants';

const Footer = ({
  CommentsLength,
  disLikeThePost,
  likeThePost,
  isLiked,
  likedCount,
  likerID,

  authUser,
  docUser,
}) => {
  return (
    <View style={{}}>
      <View style={styles.container}>
        <Pressable style={styles.iconContainer} onPress={likeThePost}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.secondary,
              paddingHorizontal: SIZES.padding,
            }}>
            {likedCount}
          </Text>
          <Text style={{...FONTS.body5, color: COLORS.secondary}}>Likes</Text>
        </Pressable>

        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <Image
          source={icons.commentIcon}
          style={{width: 22, height: 22, marginRight: SIZES.padding}}
        /> */}
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.secondary,
              paddingHorizontal: SIZES.padding,
            }}>
            {CommentsLength}
          </Text>
          <Text style={{...FONTS.body5, color: COLORS.secondary}}>
            comments
          </Text>
        </Pressable>
      </View>
      {/* <Divider /> */}
      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.lightpurple,
          margin: SIZES.padding,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
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
