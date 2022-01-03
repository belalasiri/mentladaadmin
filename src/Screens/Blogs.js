import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ToastAndroid,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import Feather from 'react-native-vector-icons/Feather';

import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import {Avatar} from 'react-native-elements';
import BlogContent from './subScreens/BlogContent';
import BlogCustom from './subScreens/BlogCustom';

const Blogs = ({navigation, route}) => {
  const [profData, setProfData] = useState(null);
  const [allPosts, setAllPost] = useState(null);
  const [requests, setRequests] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [Blogs, setBlogs] = useState(null);

  const Categories = [
    {
      id: 1,
      name: 'GENERAL',
      source: images.General,
    },
    {
      id: 2,
      name: 'BIPOLAR DISORDER',
      source: images.Biolar_Disorder,
    },
    {
      id: 3,
      name: 'STRESS',
      source: images.STRESS,
    },
    {
      id: 4,
      name: 'DEMENTIA',
      source: images.DEMENTIA,
    },
    {
      id: 5,
      name: 'INSOMNIA',
      source: images.INSOMNIA,
    },
    {
      id: 6,
      name: 'ANXIETY',
      source: images.ANXIETY,
    },
    {
      id: 7,
      name: 'SCHIZOPHRENIA',
      source: images.SCHIZOPHRENIA,
    },
  ];

  const Card = ({Categories}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Details', Categories)}
        style={styles.boxContainer}
        activeOpacity={0.8}>
        <LinearGradient
          colors={['#f0e6fa', '#fff', '#f7f3fc']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={styles.boxGred}>
          <Image
            source={Categories.source}
            style={{width: '100%', height: '80%', resizeMode: 'contain'}}
          />

          <View style={styles.cardDetails}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.Title}>{Categories.name}</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  useLayoutEffect(() => {
    const fetcBlogs = firestore()
      .collection('Blogs')
      .orderBy('blogTime', 'desc')
      .onSnapshot(snapshot =>
        setBlogs(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
            professionalId: doc.data().professionalId,
            professionalAvatar: doc.data().professionalAvatar,
            professionalName: doc.data().professionalName,
            Blog: doc.data().Blog,
            Content: doc.data().Content,
            blogtImg: doc.data().blogtImg,
            Category: doc.data().Category,
            blogTime: doc.data().blogTime,
          })),
        ),
      );

    return fetcBlogs;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={Blogs}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({id, item}) => (
          <BlogCustom
            item={item}
            onPress={() =>
              navigation.navigate('BlogContent', {
                id: item.id,
                data: item.data,
                Blog: item.Blog,
                Content: item.Content,
                blogtImg: item.blogtImg,
                professionalAvatar: item.professionalAvatar,
                professionalName: item.professionalName,
                Category: item.Category,
                blogTime: item.blogTime,
                professionalId: item.professionalId,
              })
            }
          />
        )}
      />
    </View>
  );
};

export default Blogs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
