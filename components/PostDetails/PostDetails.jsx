import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Avatar, TextInput, Button, Divider } from '@react-native-material/core';
import { AntDesign } from '@expo/vector-icons';
import LinkText from './../../Common/LinkText';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { commentPost, likePost } from '../../store/postsReducer';
import { useSelector, useDispatch } from 'react-redux'
import Comment from '../../Common/Comment';

const PostDetails = ({ navigation, route }) => {

    const postId = route.params.postId;
    const dispatch = useDispatch();
    const posts = useSelector(state => state.postsReducer.posts);
    const likedPosts = useSelector(state => state.postsReducer.likedPosts);
    const [data, setData] = useState({});
    const [inputValue, setInputValue] = useState('');


    useEffect(() => {
        if (postId) {
            const postById = posts.find((el) => el.id === postId);
            setData(postById);
        }
    }, [postId, posts])

    const onReply = () => {
        if(inputValue) {
            dispatch(commentPost({id: postId, comment: inputValue}));
            setInputValue('');
        }
    }


    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={styles.postHeader}>
                <View style={styles.headerUser}>
                    <Avatar size={40} image={{ uri: data?.profile_url }} />
                    <Text style={styles.username}>{data?.from_user_name}</Text>
                </View>
                <Text>{new Date(data?.created_at * 1000).toLocaleDateString('default')}</Text>
            </View>
            <View style={styles.postContent}>
                <Text style={styles.postDescription}><LinkText text={data?.description} /></Text>
                <Image source={{ uri: data?.image_url }} style={styles.postImage} />
            </View>
            <View style={styles.bottomButtons}>
                <View style={styles.likeButtonContainer}>
                    <AntDesign 
                    onPress={() => dispatch(likePost({id: postId}))}
                    style={[styles.likeButton, likedPosts?.some((el) => el.id === data?.id) && styles.likedButton]} 
                    name="like2" 
                    size={24} 
                    color="black" 
                    />
                    <Text>{data?.votes}</Text>
                </View>
            </View>

            <Divider style={{ marginTop: 20 }} />

            <View style={styles.commentsContainer} >
                <View style={styles.commentInputContainer}>
                    <TextInput value={inputValue} onChangeText={(e) => {
                        setInputValue(e)
                    }} style={styles.commentInput} label="Write your reply" variant="standard" />
                    <Button onPress={onReply} title="Reply" trailing={props => <Icon name="send" {...props} />} />
                </View>
                
                

                {
                    Boolean(data?.comments?.length) ? (

                        data?.comments.map((comment, index) => <Comment key={`${index}-${Math.random()}`} commentText={comment} /> )

                    )
                        :
                        (
                            <Text style={{marginTop: 20}} >
                                No comments yet.
                            </Text>
                        )
                }
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        width: '100%',
        minHeight: 800,
        padding: 5
    },
    postHeader: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 5,
        marginTop: 10,
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
    },
    commentInputContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    commentInput: {
        width: '50%',
    },
    commentsContainer: {
        minHeight: 300,
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 20,
    }
});

export default PostDetails