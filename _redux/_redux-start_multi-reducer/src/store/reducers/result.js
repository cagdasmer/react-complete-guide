import * as actions from '../actions';

const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.STORE_RESULT: 
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: action.value})
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