import * as actionTypes from '../actions/actionTypes';

export const saveResult = resultValue => {
    return {
        type: actionTypes.STORE_RESULT,
        value: resultValue
    };
}

export const onStoreResult = resultValue => {
    return dispatch => {
        setTimeout(() => {
            dispatch(saveResult(resultValue)) //storeResult => infinite loop
        }, 2000)   
    }
};

export const onDeleteResult = resultId => ({
    type: actionTypes.DELETE_RESULT,
    id: resultId
});