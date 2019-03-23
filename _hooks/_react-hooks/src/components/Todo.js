import React, { useState, useEffect } from 'react';
import axios from 'axios';

const todo = props => {
    // /* 
    // Seperate states into multiple hooks in order to manage individual states
    const [taskName, setTodoItem] = useState('');
    const [submittedTodo, setSubmittedTodo] = useState(null);
    const [todoList, setTodoList] = useState([]);
    // */

    // const [state, setState] = useState({userInput: '', todoList: []}) // Merged State

    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/todos').then(result => {
            const todos = result.data;
            const userOneTodos = todos.filter((todo => todo.userId === 1));
            const appList = [];
            userOneTodos.map(todoItem => {
                appList.push(todoItem.title);
            });
            setTodoList(appList);
        })
    }, []); // look for change in value for any of the array elements

    const mouseMoveHandler = event => {
        console.log(event.clientX, event.clientY);
    };

    useEffect(()=>{
        document.addEventListener('mousemove', mouseMoveHandler);
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
        }
    }, []); // componentDidUnmount

    useEffect(()=>{
        if(submittedTodo){
            setTodoList(todoList.concat(submittedTodo));
        }
    },[submittedTodo])
        
    const inputChangedHandler = (event) => {
        setTodoItem(event.target.value); // Seperate States
        //setState({userInput: event.target.value, todoList: state.todoList}); // Merged state
    }

    const addTodoHandler = () => {
        //setState({userInput: state.userInput, todoList: state.todoList.concat(state.userInput)}) // Merged state

        axios.post('https://jsonplaceholder.typicode.com/todos', {userId: 15, title: taskName, completed: false})
            .then(res => {
                setTimeout(() => {
                    const todoItem = taskName;
                    setSubmittedTodo(todoItem); // Seperate States
                }, 3000);
            })
            .catch(err => {
                console.log(err);
            });
    };
    
    return <React.Fragment>                                                {/* Seperate States */}  {/* Merged State */}  
        <input type="text" placeholder="Todo" onChange={inputChangedHandler} value={taskName}  /*value={state.userInput}*//>
        <button onClick={addTodoHandler} type="button">Add</button>
        <ul>
            {todoList.map(todoItem => {
                return <li key={todoItem}>{todoItem}</li>
            })}
        </ul>
    </React.Fragment>
};

export default todo;
