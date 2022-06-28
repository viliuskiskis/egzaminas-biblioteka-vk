import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Buttons = (props) => {
  const { isActive, currentButtonValue, onClick, onProcess, onConfirm } = props;

  if (isActive) {

    return (
      <div className="py-1">
        <button
          value='Off'
          onClick={(e) => onClick(e)}
          id="btnStopRegistration"
          className="btn btn-outline-danger btn-sm ms-2">
          Stabdyti registraciją
        </button>
      </div>
    )

  } else {

    return (
      <div className="row py-3">
        <div className="col d-flex">
          <button
            value='On'
            onClick={(e) => onClick(e)}
            id="btnStartRegistration"
            className="btn btn-outline-primary btn-sm ms-2">
            Pradėti registraciją
          </button>

          <button
            value='Process'
            onClick={() => onProcess()}
            id="btnFormQueue"
            disabled={currentButtonValue === "Process"}
            className="btn btn-primary btn-sm mx-2">
            Formuoti eiles
          </button>

          <button
            value='Confirm'
            onClick={() => onConfirm()}
            id="btnConfirmQueue"
            disabled={currentButtonValue === "Confirm"}
            className="btn btn-outline-primary btn-sm">
            <span> <FontAwesomeIcon icon={faEnvelope} />  Patvirtinti eiles</span>
          </button>
        </div>
      </div >
    )
  }
}

export default Buttons;