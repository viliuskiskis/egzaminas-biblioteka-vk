import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../images/logo.png';
import Logout from '../../05ReusableComponents/Logout';

export default function ManagerNavBar(props) {
  const navButton = useRef(null);
  const linksContainerRef = useRef(null);

  function collapseNav() {
    navButton.current.classList.add("collapsed");
    linksContainerRef.current.classList.remove("show");
  }

  return (
    <div className="pb-4" >
      <nav className="navbar navbar-expand-xl py-4 navbar-light bg-light">
        <div className="container">

          <NavLink
            className="navbar-brand"
            to={"/home"}
            onClick={collapseNav}
          >
            <img
              className="nav-img"
              src={logo}
              alt="logotipas"
            // loading="lazy"
            />
          </NavLink>
          <button
            ref={navButton}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            ref={linksContainerRef}
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto align-items-center">

              <li className="nav-item me-1">
                <NavLink
                  onClick={collapseNav}
                  className="nav-link"
                  id="navManagerKindergartenList"
                  to={"/darzeliai"}
                >Darželių sąrašas
                </NavLink>
              </li>

              <li className="nav-item me-1">
                <NavLink
                  onClick={collapseNav}
                  className="nav-link"
                  id="navManagerApplicationQueue"
                  to={"/eile"}
                >Registracijų prašymai
                </NavLink>
              </li>

              <li className="nav-item me-1">
                <NavLink
                  onClick={collapseNav}
                  className="nav-link"
                  id="navManagerCompensationQueue"
                  to={"/kompensacijos"}
                >Kompensacijų prašymai
                </NavLink>
              </li>

              <li className="nav-item me-1">
                <NavLink
                  onClick={collapseNav}
                  className="nav-link"
                  id="navManagerMap"
                  to={"/zemelapis"}
                >Darželių žemėlapis
                </NavLink>
              </li>

              <li className="nav-item me-1">
                <NavLink
                  onClick={collapseNav}
                  className="nav-link"
                  id="navManagerApplicationStats"
                  to={"/statistika"}
                >Registracijų statistika
                </NavLink>
              </li>

              <li className="nav-item me-1">
                <NavLink
                  onClick={collapseNav}
                  className="nav-link"
                  id="navManagerDocuments"
                  to={"/pazymos"}
                >Prašymų pažymos
                </NavLink>
              </li>

              <li className="nav-item me-1">
                <NavLink
                  onClick={collapseNav}
                  className="nav-link"
                  id="navManagerMyAccount"
                  to={"/profilis/atnaujinti"}
                >Mano paskyra
                </NavLink>
              </li>

              <li className="nav-item nav-item me-1 my-2" id="navManagerLogout">
                <Logout />
              </li>

            </ul>

          </div>
        </div>
      </nav>
      <div>{props.children}</div>
    </div >
  );
}