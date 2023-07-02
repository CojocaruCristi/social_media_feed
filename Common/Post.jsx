import React from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Divider } from '@react-native-material/core';
import LinkText from './LinkText';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {
  likePost,
} from '../store/postsReducer'
import { useSelector, useDispatch } from 'react-redux'


const Post = (props) => {
  const { from_user_name, profile_url, description, image_url, created_at, votes, id, navigation } = props;
  const dispatch = useDispatch();
  const likedPosts = useSelector(state => state.postsReducer.likedPosts);


  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Post', { postId: id })}>
      <View style={styles.card}>
        <View style={styles.postHeader}>
          <View style={styles.headerUser}>
            <Avatar size={40} image={{ uri: profile_url }} />
            <Text style={styles.username}>{from_user_name}</Text>
          </View>
          <Text>{new Date(created_at * 1000).toLocaleDateString('default')}</Text>
        </View>
        <View style={styles.postContent}>
          <Text style={styles.postDescription}><LinkText text={description} /></Text>
          <Image source={{ uri: image_url }} style={styles.postImage} />
        </View>
        <View style={styles.bottomButtons}>
          <FontAwesome style={styles.commentButton} onPress={() => navigation.navigate('Post', { postId: id })} name="comment-o" size={24} color="black" />
          <View style={styles.likeButtonContainer}>

            <AntDesign onPress={() => dispatch(likePost({ id }))} style={[styles.likeButton, likedPosts?.some((el) => el.id === id) && styles.likedButton]} name="like2" size={24} color="black" />
            <Text>{votes}</Text>
          </View>
        </View>

        <Divider style={{ marginTop: 20 }} />
      </View>

    </TouchableWithoutFeedback>

  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    width: '100%',
    minHeight: 400,
    padding: 5
  },
  postHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  headerUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  postDescription: {
    marginBottom: 5,
    textAlign: 'left'
  },
  postImage: {
    borderRadius: 12,
    width: 400,
    height: 350
  },
  postContent: {
    alignItems: 'center'
  },
  username: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  bottomButtons: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  likeButtonContainer: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  likeButton: {
    marginRight: 5,
  },
  likedButton: {
    color: 'red',
  },
  commentButton: {
    marginRight: 20,
  }
});

export default Post;