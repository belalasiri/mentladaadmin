import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  ToastAndroid,
  SafeAreaView,
  Alert,
} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../../constants';
import firestore, {firebase} from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import NameContainer from './post/NameContainer';
import BodyContainer from './post/BodyContainer';
import FooterContainer from './post/FooterContainer';
import CustomComments from './post/CommentsList';
import {BallIndicator} from 'react-native-indicators';

const FullPost = ({navigation, route}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');
  const [CommentsList, setComments] = useState([]);
  const [likePost, setLikePost] = useState([]);
  const [commenting, setCommenting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const post = route.params;

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(post.userId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
    setLoading(false);
  };

  useLayoutEffect(() => {
    const getComments = firestore()
      .collection('posts')
      .doc(post.id)
      .collection('Comments')
      .orderBy('CommentTime', 'asc')
      .onSnapshot(snapshot =>
        setComments(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
            Comment: doc.data().Comment,
            CommentTime: doc.data().CommentTime,
            CommenterId: doc.data().CommenterId,
          })),
        ),
      );
    return getComments;
  }, [navigation]);

  useLayoutEffect(() => {
    const getLikes = firestore()
      .collection('posts')
      .doc(post.id)
      .collection('Likes')
      .orderBy('likedTime', 'asc')
      .onSnapshot(snapshot =>
        setLikePost(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
            Liked: doc.data().Liked,
            likedTime: doc.data().likedTime,
            likerId: doc.data().likerId,
          })),
        ),
      );
    return getLikes;
  }, [navigation, likePost]);

  const onDelete = item => {
    setDeleting(true);
    firebase
      .firestore()
      .collection('posts')
      .doc(post.id)
      .collection('Comments')
      .doc(item.id)
      .delete()

      .then(() => {
        setDeleting(false);
        ToastAndroid.showWithGravityAndOffset(
          'Comment deleted successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          200,
        );
      });
  };

  const handleDeletePost = () => {
    Alert.alert(
      'Delete this post',
      'Are you sure you want to delete this post from Mentlada?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm deleting',
          onPress: () => onDeletePost(),
        },
      ],
      {cancelable: false},
    );
  };

  const onDeletePost = () => {
    setDeleting(true);
    firebase
      .firestore()
      .collection('posts')
      .doc(post.id)
      .delete()

      .then(() => {
        navigation.goBack();
        setDeleting(false);
        ToastAndroid.showWithGravityAndOffset(
          'Comment deleted successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          200,
        );
      });
  };

  useEffect(() => {
    getUser();
  }, []);
  let userName = (
    <Text>
      {userData ? userData.fname || 'Mentlada' : 'Mentlada'}{' '}
      {userData ? userData.lname || 'Patient' : 'Patient'}
    </Text>
  );

  let postTime = moment(post.postTime.toDate()).fromNow();

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingVertical: SIZES.padding * 4}}>
        <View style={{marginBottom: SIZES.padding * 4, flex: 1}}>
          <NameContainer
            userName={userName}
            userImg={{
              uri: userData
                ? userData.userImg ||
                  'https://gcdn.pbrd.co/images/in5sUpqlUHfV.png?o=1'
                : 'https://gcdn.pbrd.co/images/in5sUpqlUHfV.png?o=1',
            }}
            postTime={postTime}
            onBack={() => navigation.goBack()}
            loading={loading}
          />
          <BodyContainer
            postContent={post.post}
            conPostImage={post.postImg}
            postImage={{uri: post.postImg}}
          />
          <FooterContainer
            CommentsLength={CommentsList.length}
            likedCount={likePost.length || 0}
          />
          {CommentsList?.[0] ? (
            <View style={{flex: 1}}>
              {CommentsList.map(item => (
                <CustomComments
                  key={item.id}
                  item={item}
                  onDelete={() => onDelete(item)}
                  deleting={deleting}
                />
              ))}
            </View>
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: SIZES.padding * 2 - 5,
              }}>
              <Image
                source={icons.comment}
                style={{
                  width: 80,
                  height: 80,
                }}
              />
              <Text
                style={{
                  ...FONTS.h6,
                  color: COLORS.secondary,
                  marginVertical: SIZES.padding,
                }}>
                This post has no comments
              </Text>
            </View>
          )}

          {/* <View
            style={{
              padding: SIZES.padding * 2 - 5,
              paddingVertical: SIZES.padding * 2 - 5,
            }}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.lightGreen]}
              start={{x: 0, y: 2.5}}
              end={{x: 0, y: 0}}
              style={{
                borderRadius: 7,
                padding: 10,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={handleDeletePost}>
                {deleting ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <BallIndicator color={COLORS.secondary} size={15} />
                  </View>
                ) : (
                  <Text style={{...FONTS.h5, color: COLORS.secondary}}>
                    Delete this post
                  </Text>
                )}
              </TouchableOpacity>
            </LinearGradient>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FullPost;

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    paddingHorizontal: SIZES.padding * 2 - 5,
  },
  textInput: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    marginRight: 15,
    textAlign: 'left',
    backgroundColor: COLORS.lightpurple,
    color: COLORS.secondary,
    overflow: 'hidden',
    flexWrap: 'wrap',
  },
});
