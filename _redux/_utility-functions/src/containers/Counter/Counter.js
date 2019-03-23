import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {

    render () {
        return (
            <div>                     {/* comes from store */}
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 10" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 15" clicked={this.props.onSubstractCounter}  />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store REsult</button> 
                <ul>
                    {this.props.storedResults.map(result => {
                        return <li key={result.id} onClick={() => this.props.onDeleteResult(result.id)}>{result.value}</li>;
                    })}
                </ul>
            </div>
        );
    }
}

// instructions about how the state should map to the props that will be used in this component
const mapStateToProps = state => { // this state will be given by React-Redux (store)
    return {
        ctr: state.ctr.counter,
        storedResults: state.res.results
    };
};

// Which kind of actions will be dispatched in this container
const mapDispatchToProps = dispatch => {
    return{                     // right side should be an anonymous function, automatically returned
        onIncrementCounter: () => dispatch(actions.onIncrementCounter()),
                                // call to dispatch

        onDecrementCounter: () => dispatch(actions.onDecrementCounter()),
        onAddCounter: () => dispatch(actions.onAddCounter()),
        onSubstractCounter: () => dispatch(actions.onSubstractCounter()),
        onStoreResult: (resultValue) => dispatch(actions.onStoreResult(resultValue)),
        onDeleteResult: (resultId) => dispatch(actions.onDeleteResult(resultId))
    };                          
}
                        // null         // delete
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
