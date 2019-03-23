// will be executed in Node JS, so Node import syntax
const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0
}

// Reducer    //current State
const rootReducer = (state = initialState, action) => {
    if(action.type === 'INC_COUNTER'){
        return {
            ...state,
            counter: state.counter + 1
        }
    }
    if(action.type === 'ADD_COUNTER'){
        return {
            ...state,
            counter: state.counter + 10
        }
    }
    return state;
};

// Store - A store needs to be initialized with a reducer
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription - in order not to manually call getState after each update
store.subscribe(() => { // is executed whenever an action reaches the reducer
    console.log("[Subscription] ", store.getState()); //This time getState is a subscription functionality
});

// Dispatch Action
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());
