import { useReducer, Reducer } from 'react';

type HttpAction =
  | { type: 'SEND' }
  | { type: 'RESPONSE'; data: string | null }
  | { type: 'ERROR'; errorMessage: string }
  | { type: 'CLEAR' };

interface HttpState {
  isLoading: boolean;
  error: string | null;
  data: string | null;
}

interface HttpHookResponse {
  isLoading: boolean;
  error: string | null;
  data: string | null;
  sendRequest(url: string, method: string, body: string | null): void;
}

type HttpReducer = Reducer<HttpState, HttpAction>;

const httpReducer = (curHttpState: HttpState, action: HttpAction): HttpState => {
  switch (action.type) {
    case 'SEND':
      return { ...curHttpState, isLoading: true, error: null };
    case 'RESPONSE':
      return { ...curHttpState, isLoading: false, data: action.data };
    case 'ERROR':
      return { ...curHttpState, isLoading: false, error: action.errorMessage };
    case 'CLEAR':
      return { ...curHttpState, error: null };
    default:
      throw new Error('Should not be reached!');
  }
};

const useHttp = (): HttpHookResponse => {
  const [httpState, dispatchHttp] = useReducer<HttpReducer>(httpReducer, {
    isLoading: false,
    error: null,
    data: null
  });

  const sendRequest = (url: string, method: string, body: string | null): void => {
    dispatchHttp({ type: 'SEND' });
    fetch(url, {
      method: method,
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatchHttp({ type: 'RESPONSE', data });
      })
      .catch(e => {
        dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' });
        console.log(e);
      });
  };

  return {
    isLoading: httpState.isLoading,
    data: httpState.data,
    error: httpState.error,
    sendRequest
  };
};

export default useHttp;
