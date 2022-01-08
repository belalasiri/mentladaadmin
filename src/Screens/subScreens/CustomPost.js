import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Modal,
  View,
  ToastAndroid,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {Avatar} from 'react-native-elements';
import MainContainer from './postMainCon';
import {COLORS, SIZES} from '../../constants';

const CustomPost = ({
  item,
  onDelete,
  onPress,
  onContainerPress,
  onCommentPress,
  navigation,
}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState(false);
  const [CommentsList, setComments] = useState([]);
  const [likeList, setLikeList] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.userId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };

  useLayoutEffect(() => {
    const getComments = firestore()
      .collection('posts')
      .doc(item.id)
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
    const getLikes = firestore()
      .collection('posts')
      .doc(item.id)
      .collection('Likes')
      .orderBy('likedTime', 'asc')
      .onSnapshot(snapshot =>
        setLikeList(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
            Liked: doc.data().Liked,
            likedTime: doc.data().likedTime,
            likerId: doc.data().likerId,
          })),
        ),
      );
    return getComments, getLikes;
  }, []);

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
      .doc(item.id)
      .delete()

      .then(() => {
        ToastAndroid.showWithGravityAndOffset(
          'Comment deleted successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          200,
        );
        setDeleted(true);
      });
  };

  useEffect(() => {
    getUser();
    setDeleted(false);
  }, [deleted, item]);

  let UserName = (
    <Text>
      {userData ? userData.fname || 'Mentlada' : 'Mentlada'}{' '}
      {userData ? userData.lname || 'Patient' : 'Patient'}
    </Text>
  );
  let postTime = <Text>{moment(item.postTime.toDate()).fromNow()}</Text>;
  let PostContent = <Text>{item.post}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      {/* <ProfilePic
        size={50}
        Userimage={{
          uri: userData
            ? userData.userImg ||
              'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg'
            : 'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg',
        }}
      /> */}
      <Avatar
        size={50}
        rounded
        source={{
          uri: userData
            ? userData.userImg ||
              'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg'
            : 'https://i.ibb.co/Rhmf85Y/6104386b867b790a5e4917b5.jpg',
        }}
        onPress={onPress}
      />
      <MainContainer
        Name={UserName}
        postTime={postTime}
        // IconName="delete"
        onDelete={handleDeletePost}
        PostContent={PostContent}
        conPostImage={item.postImg}
        postImage={{uri: item.postImg}}
        CommentsLength={CommentsList.length}
        likeList={likeList.length}
        onContainerPress={onContainerPress}
        onCommentPress={onContainerPress}
      />
    </SafeAreaView>
  );
};

export default CustomPost;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.white,
  },
  zoomedImage: {
    height: SIZES.height / 1,
    width: SIZES.width / 1,
    resizeMode: 'contain',
    marginBottom: 60,
  },
  modalConiner: {
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
  },
});
