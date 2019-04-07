
    
import { takeLatest, put, delay } from 'redux-saga/effects'

// takeEvery : observe every action that dispatches
// takeLatest : take the latest action

function* ageUpAsync() {
    yield delay(4000);
    yield put({type: 'AGE_UP_ASYNC', value: 1}); // does the same thing as a dispatch
}

export function* watchAgeUp(){
    yield takeLatest('AGE_UP', ageUpAsync); 
}

