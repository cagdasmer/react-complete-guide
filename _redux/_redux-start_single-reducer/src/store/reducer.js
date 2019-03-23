import * as actions from './actions';

const initialState = {
    counter: 0,
    results: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.INCREMENT: 
            return {
                ...state,
                counter: state.counter + 1
            }
       
        case actions.DECREMENT: 
            return {
                ...state,
                counter: state.counter - 1
            }

       case actions.ADD: 
            return {
                ...state,
                counter: state.counter + action.value
            }

        case actions.SUBSTRACT: 
            return {
                ...state,
                counter: state.counter - action.value
            }
        case actions.STORE_RESULT: 
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: state.counter})
            }
        case actions.DELETE_RESULT: 
            /* const newArray = {...state.results};
            newArray.splice(action.id, 1); */

            const updatedArray = state.results.filter((element => element.id !== action.id)); // filter creates a new array

            return {
                ...state,
                results: updatedArray
            }
    }

    return state;
}

export default reducer;