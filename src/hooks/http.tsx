import { useReducer, useCallback, Reducer } from 'react';
import { Ingredient } from '../types/types';

type HttpData = any;
type HttpExtra = Ingredient | string | null | undefined;
type HttpAction =
  | { type: 'SEND'; identifier: string | null }
  | { type: 'RESPONSE'; data: HttpData; extra?: HttpExtra }
  | { type: 'ERROR'; errorMessage: string }
  | { type: 'CLEAR' };

interface HttpState {
  isLoading: boolean;
  error: string | null;
  data: HttpData;
  identifier: string | null;
  extra?: HttpExtra;
}

interface HttpHookResponse {
  isLoading: boolean;
  error: string | null;
  data: HttpData;
  identifier: string | null;
  extra?: HttpExtra;
  sendRequest(
    url: string,
    method: string,
    body: string | null,
    identifier: string | null,
    extra?: HttpExtra
  ): void;
  clear(): void;
}

type HttpReducer = Reducer<HttpState, HttpAction>;

const initialState = {
  isLoading: false,
  error: null,
  data: null,
  identifier: null,
  extra: null
};

const httpReducer = (curHttpState: HttpState, action: HttpAction): HttpState => {
  switch (action.type) {
    case 'SEND':
      return { ...curHttpState, isLoading: true, error: null, identifier: action.identifier };
    case 'RESPONSE':
      return {
        ...curHttpState,
        isLoading: false,
        data: action.data,
        extra: action.extra
      };
    case 'ERROR':
      return { ...curHttpState, isLoading: false, error: action.errorMessage };
    case 'CLEAR':
      return initialState;
    default:
      throw new Error('Should not be reached!');
  }
};

const useHttp = (): HttpHookResponse => {
  const [httpState, dispatchHttp] = useReducer<HttpReducer>(httpReducer, initialState);

  const clear = useCallback((): void => {
    dispatchHttp({ type: 'CLEAR' });
  }, []);

  const sendRequest = useCallback(
    (
      url: string,
      method: string,
      body: string | null,
      identifier: string | null,
      extra?: HttpExtra
    ): void => {
      dispatchHttp({ type: 'SEND', identifier });
      fetch(url, {
        method: method,
        body: body,
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          if (res.status !== 200) {
            throw new Error();
          }
          res.json();
        })
        .then(data => {
          dispatchHttp({ type: 'RESPONSE', data, extra });
        })
        .catch(e => {
          dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' });
        });
    },
    []
  );

  return {
    isLoading: httpState.isLoading,
    data: httpState.data,
    error: httpState.error,
    identifier: httpState.identifier,
    extra: httpState.extra,
    sendRequest,
    clear
  };
};

export default useHttp;
