const API_CALL_REQUEST = 'API_CALL_REQUEST';
const API_CALL_SUCCESS = 'API_CALL_SUCCESS';
const API_CALL_FAILURE = 'API_CALL_FAILURE';

const apiCallRequest = () => ({
  type: API_CALL_REQUEST
});

const apiCallSuccess = dog => ({
  type: API_CALL_SUCCESS,
  dog
});

const apiCallFailure = error => ({
  type: API_CALL_FAILURE,
  error
});

export {
  API_CALL_REQUEST,
  API_CALL_SUCCESS,
  API_CALL_FAILURE,
  apiCallRequest,
  apiCallSuccess,
  apiCallFailure
};
