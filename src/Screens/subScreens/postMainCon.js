import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {COLORS, FONTS, images} from '../../constants';
import ProgressiveImage from '../../config/ProgressiveImage';
import Feather from 'react-native-vector-icons/Feather';
import Footer from './post/MainFooter';
import {BallIndicator} from 'react-native-indicators';
import FooterContainer from './post/FooterContainer';

const postMainCon = ({
  Name,
  postTime,
  IconName,
  PostContent,
  conPostImage,
  postImage,
  userUid,
  itemuserId,
  onPress,
  onDelete,
  onImagePress,
  onContainerPress,
  postId,
  CommentsLength,
  likeList,
  deleted,
  onCommentPress,
}) => {
  return (
    <View style={styles.Container}>
      <Pressable onPress={onContainerPress}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.UserNameAndtimeContainer}
            onPress={onPress}>
            <Text style={styles.UserName}>{Name}</Text>
            <Text style={styles.Time}>{postTime}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onDelete}>
            {deleted ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 8,
                }}>
                <BallIndicator color={COLORS.secondary} size={10} />
              </View>
            ) : (
              <Feather name={IconName} size={25} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.Content}>{PostContent}</Text>

        <TouchableOpacity style={{marginVertical: 10}} onPress={onImagePress}>
          {conPostImage != null ? (
            <ProgressiveImage
              defaultImageSource={images.Default}
              source={postImage}
              style={{
                height: 300,
                width: '100%',
                borderRadius: 10,
                overflow: 'hidden',
              }}
              resizeMode="cover"
            />
          ) : null}
        </TouchableOpacity>
        {/* <FooterContainer
          CommentsLength={CommentsLength}
          likedCount={likeList0}
        /> */}
        <Footer
          CommentsLength={CommentsLength}
          onCommentPress={onCommentPress}
          likedCount={likeList}
        />
      </Pressable>
    </View>
  );
};

export default postMainCon;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginHorizontal: 10,
    // backgroundColor: colors.w,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  UserNameAndtimeContainer: {
    flexDirection: 'row',
  },
  UserName: {
    ...FONTS.h5,
    color: COLORS.secondary,
  },
  Time: {
    ...FONTS.body6,
    color: COLORS.secondary,
    marginHorizontal: 5,
    marginTop: 5,
  },
  Content: {
    ...FONTS.body5,
    color: COLORS.secondary,
    lineHeight: 22,
    marginTop: 5,
  },
});
