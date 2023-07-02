import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './../store/postsReducer';
import saga from '../Sagas/saga';
import createSagaMiddleware from 'redux-saga'

let sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

export default configureStore({
  reducer: {
    postsReducer: postsReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middleware);
 }
})

sagaMiddleware.run(saga)