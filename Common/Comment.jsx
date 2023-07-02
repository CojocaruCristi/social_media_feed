import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Divider } from '@react-native-material/core';

const Comment = ({ username = 'Kent Dodds', avatarUrl, commentText }) => {
    return (
        <View style={{ width: '100%' }}>
            <View style={styles.container}>
                <Avatar size={30} label="Kent Dodds" autoColor image={{ uri: avatarUrl }} />
                <View style={styles.commentContainer}>
                    <Text style={styles.username}>{username}</Text>
                    <Text>{commentText}</Text>
                </View>
            </View>
            <Divider />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    commentContainer: {
        flex: 1,
        padding: 12,
    },
    username: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
});

export default Comment;