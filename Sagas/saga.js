import { call, takeEvery, put } from 'redux-saga/effects'
import { 
    setPosts,
    toggleLoading,
    setGlobalError
} from '../store/postsReducer'
import { sagaActions } from './sagaActions'
import PostsApi from '../Api/postsApi'
import { validateAxiosResponse } from '../Api/validators'
import axios from "axios";

export function* fetchPostsSaga() {
  try {
    yield put(toggleLoading(true));
    let result = yield call(() =>
    PostsApi.getPosts()
    )
    const data = validateAxiosResponse(result);

    yield put(setPosts(data))
    yield put(toggleLoading(false));

  } catch (error) {
    yield put(toggleLoading(false));
    yield put(setGlobalError({
      errorMessage: error.message,
      status: error.response.status
    }))
  }
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.FETCH_POSTS, fetchPostsSaga);
}