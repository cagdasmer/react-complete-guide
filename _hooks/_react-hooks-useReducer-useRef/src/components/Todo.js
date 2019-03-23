import React, { useEffect, useReducer, useRef } from 'react';
import axios from 'axios';

const todo = props => {

    // const [taskName, setTodoItem] = useState(''); // using useRef instead
     const todoInputRef = useRef();

    const todoListReducer = (state, action) => {
        switch (action.type){
            case 'ADD':
                return state.concat(action.payload);
            case 'SET':
                return action.payload;
            case 'REMOVE':
                return state.filter( (todo) => todo !== action.payload.taskName);
            default:
                return state;
        }
    }
    const [todoList, dispatch] = useReducer(todoListReducer, []) // useReducer

    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/todos').then(result => {
            const todos = result.data;
            const userOneTodos = todos.filter((todo => todo.userId === 1));
            const appList = [];
            userOneTodos.map(todoItem => {
                appList.push(todoItem.title);
            });
            dispatch({type: 'SET', payload: appList}) // useReducer
        })
    }, []); // look for change in value for any of the array elements

    const mouseMoveHandler = event => {
    //    console.log(event.clientX, event.clientY);
    };

    useEffect(()=>{
        document.addEventListener('mousemove', mouseMoveHandler);
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
        }
    }, []); // componentDidUnmount
/* 
    useEffect(()=>{
        if(submittedTodo){
            dispatch({type: 'ADD', payload: submittedTodo})
        }
    },[submittedTodo]) */
        
    /* const inputChangedHandler = (event) => {
        setTodoItem(event.target.value); // Seperate States
        //setState({userInput: event.target.value, todoList: state.todoList}); // Merged state
    } */

    const addTodoHandler = () => {
        //setState({userInput: state.userInput, todoList: state.todoList.concat(state.userInput)}) // Merged state

        const taskName = todoInputRef.current.value;

        axios.post('https://jsonplaceholder.typicode.com/todos', {userId: 15, title: taskName, completed: false})
            .then(res => {
                setTimeout(() => {
                    const todoItem = taskName;
                    console.log(todoItem);
                    dispatch({type: 'ADD', payload: todoItem})
                }, 3000);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const removeTodoHandler = (todoItem) => {
        dispatch({type:'REMOVE', payload:{taskName: todoItem}})
    }
    
    return <React.Fragment>                                                {/* Seperate States */}  {/* Merged State */}  
        <input type="text" 
            placeholder="Todo"
            ref = {todoInputRef}/>
            {/* onChange={inputChangedHandler} 
            value={taskName} */} 
            
        <button onClick={addTodoHandler} type="button">Add</button>
        <ul>
            {todoList.map(todoItem => {
                return <li 
                    key={todoItem}
                    onClick={removeTodoHandler.bind(this, todoItem)}
                >{todoItem}</li>
            })}
        </ul>
    </React.Fragment>
};

export default todo;
