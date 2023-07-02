import { createSlice } from '@reduxjs/toolkit'

export const postsSlice = createSlice({
  name: 'postsReducer',
  initialState: {
    posts: [],
    likedPosts: [],
    isDataLoading: true,
    copyPosts: [],
    globalError: {
      errorMessage: '',
      status: null,
    }
  },
  reducers: {
    setPosts: (state, action) => {

      const preparedPosts = action.payload.rows.map((post) => {
        return {
          ...post,
          comments: [],
        }
      })

      state.posts = preparedPosts;
      state.copyPosts = preparedPosts;
    },
    toggleLoading: (state, action) => {
      state.isDataLoading = action.payload
    },
    likePost: (state, action) => {
      const id = action.payload.id;
      const isLiked = state.likedPosts.find((el) => el.id === id);
      if(!isLiked?.id) {
        state.posts.forEach((post) => {
          if(post.id === id) {
            post.votes += 1;
            state.likedPosts.push(post);
          }
        })
      }else {
        const likedPostIndex = state.likedPosts.findIndex((el) => el.id === id);
        state.likedPosts.splice(likedPostIndex, 1);
        state.posts.forEach((post) => {
          if(post.id === id) {
            post.votes -= 1;
          }
        })
      }
    },
    commentPost: (state, action) => {
      const postId = action.payload.id;
      const comment = action.payload.comment;

      state.posts.forEach((post) => {
        if(post.id === postId) {
          post.comments = [comment, ...post.comments]
        }
      })
    },
    searchPost: (state, action) => {
        const searchedData = state.copyPosts.filter((post) => 
          post.description.toLowerCase().includes(action.payload.toLowerCase())
          );
        state.posts = searchedData;
    },
    setGlobalError: (state, action) => {
      state.globalError = action.payload;
  },
  }
})

// Action creators are generated for each case reducer function
export const { setPosts, likePost, toggleLoading, commentPost, searchPost, setGlobalError } = postsSlice.actions

export default postsSlice.reducer