import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';

axios.interceptors.request.use(requestCfg => {
    console.log(requestCfg);
    // Edit request config
    return requestCfg;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(responseCfg => {
    console.log(responseCfg);
    // Edit response config
    return responseCfg;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
