import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';
import Burger from './components/Burger/Burger';
import BurgerBuilder from './containers/BurgerBuilder';

const app = props => {
  return (
    <Layout>
      <BurgerBuilder />
    </Layout>
  );
}

export default app;
