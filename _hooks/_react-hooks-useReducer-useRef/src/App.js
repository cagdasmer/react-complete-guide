import React, {useState} from 'react';
import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';
import AuthContext from './auth-context';

// use useState to switch between the todo and the auth state decide on which component to show

const app = props => {

    const [showTodo, setPage] = useState(false);
    const [authStatus, setAuthStatus] = useState(false);

    const switchPage = (showTodo) =>{
      setPage(showTodo);
    }

    const login = () => {
      setAuthStatus(true);
    };

    return (
      <div className="App">   
      <AuthContext.Provider value={{status: authStatus, login: login}}>
        <Header 
          onLoadTodos={switchPage.bind(this, true)} 
          onLoadAuth={switchPage.bind(this, false)}
        />
        <hr />
        {showTodo ? <Todo /> : <Auth /> }
        </AuthContext.Provider>
      </div>
    );
}

export default app;