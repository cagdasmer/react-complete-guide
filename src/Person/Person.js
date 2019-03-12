import React from 'react';


const person = (props) =>{
    return (
        <div className="Person">
            <p onClick={props.click}>I'm {props.name} for {props.age} years! </p>
            <p>{props.children}</p>
            <input type = "text" onChange={props.changed} value = {props.name}/>
        </div>
    )
};

export default person;