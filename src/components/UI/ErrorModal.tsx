import React from 'react';
import PropTypes from 'prop-types';

import './ErrorModal.css';

interface ErrorModalProps {
  onClose(): void;
}

const ErrorModal: React.FC<ErrorModalProps> = React.memo(props => {
  return (
    <React.Fragment>
      <div className="backdrop" onClick={props.onClose} />
      <div className="error-modal">
        <h2>An Error Occurred!</h2>
        <p>{props.children}</p>
        <div className="error-modal__actions">
          <button type="button" onClick={props.onClose}>
            Okay
          </button>
        </div>
      </div>
    </React.Fragment>
  );
});

ErrorModal.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default ErrorModal;
