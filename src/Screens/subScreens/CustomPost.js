import React, {useEffect, useState, useLayoutEffect} from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {Avatar} from 'react-native-elements';
import MainContainer from './postMainCon';
import {COLORS, SIZES} from '../../constants';
import storage from '@react-native-firebase/storage';

const CustomPost = ({item, onPress, onContainerPress, onDeleteThePost}) => {
  const [userData, setUserData] = useState(null);
  const [CommentsList, setComments] = useState([]);
  const [likeList, setLikeList] = useState([]);
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
        IconName="delete"
        onDelete={() => onDeleteThePost(item.id)}
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
    paddingHorizontal: 15,
    paddingVertical: 5,
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
