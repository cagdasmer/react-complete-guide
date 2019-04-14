import {
  API_CALL_REQUEST,
  API_CALL_SUCCESS,
  API_CALL_FAILURE,
  apiCallRequest,
  apiCallSuccess,
  apiCallFailure
} from '../../actions/actions';

test('Should return an action type of api request', () => {
  expect(apiCallRequest()).toEqual({ type: API_CALL_REQUEST });
});

test('Should return an action type of api success and a url', () => {
  expect(apiCallSuccess('url')).toEqual({ type: API_CALL_SUCCESS, dog: 'url' });
});

test('Should return an action type of api success and an error text', () => {
  expect(apiCallFailure('error text')).toEqual({ type: API_CALL_FAILURE, error: 'error text' });
});
