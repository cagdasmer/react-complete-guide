import React, { useContext } from 'react';

import Auth from './components/Auth';
import { AuthContext } from './context/auth-context';
import Ingredients from './components/Ingredients/Ingredients';

const App: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { isAuth } = authContext;

  return !isAuth ? <Auth /> : <Ingredients />;
};

export default App;
