import apiInstance from './configureApi';

const PostsApi = {
    getPosts() {
        return apiInstance.get('/content?campaign=louboutin');
    },
}

export default PostsApi;