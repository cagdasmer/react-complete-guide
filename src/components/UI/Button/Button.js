import React from 'react';
import classes from './Button.module.css';

const button = props => (
    <button disabled={props.disabled}
        className={classes.controlBtn}
        onClick={props.onClick}>{props.children}</button>
);

export default button;