import React from 'react';

const list = props => {
    console.log('Rendering the list...');

    return <ul>
    {props.todoList.map(todoItem => {
        return <li 
            key={todoItem}
            onClick={props.removeTodoHandler.bind(this, todoItem)}
        >{todoItem}</li>
    })}
</ul>
};

export default list;

