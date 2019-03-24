import React, {useContext} from 'react';
import classes from './Backdrop.module.css';
import UIContext from '../../../uiContext';

const backdrop = props => {

    const ui = useContext(UIContext);
    
    return (
        props.showSummary ? <div className={classes.Backdrop} onClick={ui.cancelOrder}></div> : null
    );
}

export default backdrop;