import React, {useContext} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button';

import modalClasses from './Modal.module.css';
import controlClasses from '../../controls/BuildControls.module.css';

import UIContext from '../../../uiContext';

const modal = (props) => {

    const ui = useContext(UIContext);
    
    return(
      <React.Fragment>
        <Backdrop showSummary={props.showSummary} />
        <div
            style ={{
                transform: props.showSummary ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.showSummary ? '1' : '0'
            }}
            className={modalClasses.Modal}>
            {props.children}
            <Button onClick={ui.giveOrder}>CONTINUE</Button>
            <Button onClick={ui.cancelOrder}>Cancel</Button>
        </div>
      </React.Fragment>
    );
}

export default modal;