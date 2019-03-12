import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Person/Person.css';
import Radium from 'radium'
import Person from './Person/Person';

// traditional style
 class App extends Component {
  state = {
    persons: [
      {id:'1', name: "hollow", age: 22},
      {id:'2', name: "hollow", age: 23},
      {id:'3', name: "hollow", age: 24}
    ],
    otherState: "All lies",
    showPersons: false,
    hobbies:["","Wasting opportunities",""]
  } 
  switchNameHandler = (newName) => {
    // DON'T! this.state.persons[0].name = "asdasd";
    this.setState({
      persons: [
        {name: newName, age: 22},
        {name: newName, age: 23},
        {name: newName, age: 24}
      ],
      hobbies:["","Living life to not regret a moment",""]
    });
    console.log(this.state.otherState)
  } 

  nameChangedHandler = (event, id) => {
    const personIdx = this.state.persons.findIndex((p => {
      return p.id === id
    }));

    const person = {...this.state.persons[personIdx]};

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIdx] = person;

    this.setState({persons: persons});
  }

  deletePersonHandler = (idx) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    
    persons.splice(idx, 1);
    this.setState({persons:persons})
  }

  togglePersonHandler = () => {
    this.setState({
      showPersons : !this.state.showPersons
    })
  }
  
  render(){
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid magenta',
      padding: '8px',
      cursor: 'pointer',
      backgroundColor: 'green',
      color:'white',
      ':hover':{
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;

    if(this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, idx) => {
            return(<Person 
              click={() => this.deletePersonHandler(idx)/* or this.deletePersonHandler.bind(this, idx)*/}
              name={person.name} 
              age={person.age}
              key={person.id} 
              changed={(event) => this.nameChangedHandler(event, person.id)}/> ) 
          })}
        </div>
      );
      style.backgroundColor="red";
      style[':hover'] = {
          backgroundColor: 'lightred',
          color: 'black'
      }
    }

    const classes = [];
    if(this.state.persons.length <= 2){
      classes.push("red");
    }
    if(this.state.persons.length <= 1){
      classes.push("bold")
    }

    return (
      // This isn't actually HTML, it's JSX
          // className instead of class because this still is a JS file
      <div className="App">
        <h1>Hi, I'm Anan React App</h1>
        <p className = {classes.join(" ")}>So close!</p>
        <button
            key="key1"
            style = {style} 
            onClick={/*() => this.switchNameHandler()*/ this.switchNameHandler.bind(this, "alive")} >Switch Life</button>
        <button
            key="key2"
            style = {style} 
            onClick={this.togglePersonHandler} >Hide/Show</button>
        {persons}
      </div>
    );
    // The above code block will converted to the line below
                            // type    props              // content
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi I\'m Anan React App'));
  }
}

// When you import this whole class, you import this class
export default Radium(App);
