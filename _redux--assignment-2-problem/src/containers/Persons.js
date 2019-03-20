import React, { Component } from 'react';
import {connect} from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

import * as actions from '../reducers/actions';

class Persons extends Component {

    render () {
        return (
            <div>
                <AddPerson personAdded={this.props.onAddPerson} />
                {this.props.people.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.onDeletePerson(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        people: state.persons
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPerson: () => dispatch({type: actions.ADD_PERSON}),
        onDeletePerson: (id) => dispatch({type: actions.DELETE_PERSON, personId: id})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);