import React, { /*Component*/ useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';

// traditional style
/* class App extends Component {
  state = {
    persons: [
      {name: "hollow", age: 22},
      {name: "hollow", age: 23},
      {name: "hollow", age: 24}
    ],
    otherState: "All lies",

    hobbies:["","Wasting opportunities",""]
  } 
  switchNameHandler = () =>{
    // DON'T! this.state.persons[0].name = "asdasd";
    this.setState({
      persons: [
        {name: "alive", age: 22},
        {name: "alive", age: 23},
        {name: "alive", age: 24}
      ],
      hobbies:["","Living life to not regret a moment",""]
    });
    console.log(this.state.otherState)
  } */
  
  // hook style
  const app = (props) => {
    const [ personsState, setPersonsState ] = useState({
      persons: [
        {name: "hollow", age: 22},
        {name: "hollow", age: 23},
        {name: "hollow", age: 24}
      ],
      otherState: "All lies"
    });

    const [ hobbiesState, setHobbiesState ] = useState({
      hobbies: ["","Wasting opportunities",""]
    })

    const switchNameHandler = () =>{
      // DON'T! this.state.persons[0].name = "asdasd";
      setPersonsState({
        persons: [
          {name: "alive", age: 22},
          {name: "alive", age: 23},
          {name: "alive", age: 24}
        ]
      });
      setHobbiesState({
        hobbies: ["","Living life to not regret a moment",""]
      })
      console.log(personsState.otherState)
    } 
  
    return (
      // This isn't actually HTML, it's JSX
          // className instead of class because this still is a JS file
      <div className="App">
        <h1>Hi, I'm Anan React App</h1>
        <button onClick={/*this.*/switchNameHandler} >Switch Life</button>
        <Person name={/*this.state.*/ personsState.persons[0].name} age= {/*this.state.*/ personsState.persons[0].age} />
        <Person name={/*this.state.*/ personsState.persons[1].name} age= {/*this.state.*/ personsState.persons[1].age} > Hobby: {/*this.state.*/ hobbiesState.hobbies[1]} </Person>
        <Person name={/*this.state.*/ personsState.persons[2].name} age= {/*this.state.*/ personsState.persons[2].age} />
      </div>
    );
    // The above code block will converted to the line below
                            // type    props              // content
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi I\'m Anan React App'));
}

// When you import this whole class, you import this class
// export default app;
