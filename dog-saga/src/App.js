import React from 'react';
import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.css';

import { apiCallRequest } from './actions/actions';

const App = props => {
  const { fetching, dog, onRequestDog, error } = props;

  return (
    <div className="App">
      <header className="App-header">
        <img src={dog || logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to Dog Saga</h1>
      </header>

      {dog ? (
        <p className="App-intro">Keep clicking for new dogs</p>
      ) : (
        <p className="App-intro">Replace the React icon with a dog!</p>
      )}

      {fetching ? (
        <button type="button" disabled>
          Fetching...
        </button>
      ) : (
        <button type="submit" onClick={onRequestDog}>
          Request a Dog
        </button>
      )}

      {error && <p style={{ color: 'red' }}>Uh oh - something went wrong!</p>}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    dog: state.dog,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestDog: () => dispatch(apiCallRequest())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
