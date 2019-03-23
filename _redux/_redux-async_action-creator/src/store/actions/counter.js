import * as actionTypes from '../actions/actionTypes';

export const onDecrementCounter = () => ({
    type: actionTypes.DECREMENT
});

export const onIncrementCounter = () => ({
    type: actionTypes.INCREMENT
});

export const onAddCounter = () => ({
    type: actionTypes.ADD,
    value: 10
});

export const onSubstractCounter = () => ({
    type: actionTypes.SUBSTRACT,
    value: 15
});