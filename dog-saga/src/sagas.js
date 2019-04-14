import { takeLatest, call, put } from 'redux-saga/effects';
// import axios from 'axios';

import { API_CALL_REQUEST, apiCallSuccess, apiCallFailure } from './actions/actions';

// function that makes the api request and returns a Promise for response
function fetchDog() {
  //  return axios.get("https://dog.ceo/api/breeds/image/random");
  return fetch('https://dog.ceo/api/breeds/image/random').then(response => response.json());
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  try {
    const response = yield call(fetchDog);
    // const dog = response.data.message; // axios
    const dog = response.message; // fetch

    // dispatch a success action to the store with the new dog
    yield put(apiCallSuccess(dog));
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put(apiCallFailure(error));
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
function* watcherSaga() {
  yield takeLatest(API_CALL_REQUEST, workerSaga);
}

export default watcherSaga;
