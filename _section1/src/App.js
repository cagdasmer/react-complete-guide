import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Person/Person.css';
import Person from './Person/Person';

// traditional style
 class App extends Component {
  state = {
    persons: [
      {name: "hollow", age: 22},
      {name: "hollow", age: 23},
      {name: "hollow", age: 24}
    ],
    otherState: "All lies",

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

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        {name: "Tactical Joker", age: 22},
        {name: event.target.value, age: 23},
        {name: "lolz", age: 24}
      ],
      hobbies:["","Living life to not regret a moment",""]
    });
  }
  
  render(){
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid magenta',
      padding: '8px',
      cursor: 'pointer'
    } 

    return (
      // This isn't actually HTML, it's JSX
          // className instead of class because this still is a JS file
      <div className="App">
        <h1>Hi, I'm Anan React App</h1>
    <button
      style = {style} 
      onClick={/*() => this.switchNameHandler()*/ this.switchNameHandler.bind(this, "alive")} >Switch Life</button>
        <Person 
          name={this.state.persons[0].name} 
          age= {this.state.persons[0].age} />
        <Person 
          name={this.state.persons[1].name} 
          age= {this.state.persons[1].age} 
          click = {this.switchNameHandler.bind(this, "I want those fucking figures!")} 
          changed = {this.nameChangedHandler} > Hobby: {/*this.state.*/ this.state.hobbies[1]} </Person>
        <Person 
          name={this.state.persons[2].name} 
          age= {this.state.persons[2].age} />
      </div>
    );
    // The above code block will converted to the line below
                            // type    props              // content
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi I\'m Anan React App'));
  }
}

// When you import this whole class, you import this class
export default App;
