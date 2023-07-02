import { View, StyleSheet, ScrollView, SafeAreaView, TextInput } from "react-native"
import { ActivityIndicator } from '@react-native-material/core';
import Post from "../../Common/Post";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { sagaActions } from "../../Sagas/sagaActions";
import { searchPost, setGlobalError } from "../../store/postsReducer";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";

const Feed = ({ navigation }) => {

    const posts = useSelector(state => state.postsReducer.posts);
    const searchedPosts = useSelector(state => state.postsReducer.searchedPosts);
    const isDataLoading = useSelector(state => state.postsReducer.isDataLoading);
    const globalError = useSelector(state => state.postsReducer.globalError);
    const delayRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: sagaActions.FETCH_POSTS });
    }, [])

    useEffect(() => {
        if (!!globalError.errorMessage) {
            showMessage({
                message: `${globalError.errorMessage}, please try again later or reload the app.`,
                type: "danger",
                autoHide: false,
                onPress: () => {
                    dispatch(setGlobalError({}));
                }
            });
        }
    }, [globalError])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <TextInput
                placeholder="search"
                placeholderTextColor='gray'
                style={{
                    width: '95%',
                    borderColor: 'white',
                }}
                onChangeText={(event) => {
                    clearTimeout(delayRef.current);
                    delayRef.current = setTimeout(() => {
                        if(event) {
                            dispatch(searchPost(event))
                        }else {
                            dispatch({ type: sagaActions.FETCH_POSTS });
                        }
                    }, 1000)

                }}
            />
        });
    }, [navigation]);



    return (
        <SafeAreaView>
            {
                isDataLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" />
                    </View>
                )
                    : (
                        <ScrollView contentInsetAdjustmentBehavior="automatic">
                            { Boolean(posts.length) && posts?.map((post) => <Post key={post.id} {...post} navigation={navigation} />)}
                        </ScrollView>
                    )
            }
            <FlashMessage position="top" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    feedContainer: {
        width: '100%',
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textField: {
        width: 200,
    },
    loadingContainer: {
        height: 500,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default Feed;