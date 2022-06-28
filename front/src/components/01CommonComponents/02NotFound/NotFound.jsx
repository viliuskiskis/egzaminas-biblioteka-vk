import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import apiEndpoint from '../../00Services/endpoint';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="container-fluid px-0">
      <div className="container pt-5">
        <p className="ms-2">Puslapis adresu: {apiEndpoint}{location.pathname} nerastas</p>
        <Link to="/home" className="btn btn-primary ms-2">Pradinis</Link>
      </div>
    </div>
  );
}

export default NotFound;