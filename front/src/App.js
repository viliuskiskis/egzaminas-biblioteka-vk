import React, { useEffect, useReducer } from "react";
import "./index.css";
import "./App.css";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import Spinner from "./components/05ReusableComponents/Spinner";
import swal from "sweetalert";
import AuthContext from "./components/00Services/AuthContext";
import http from "./components/00Services/httpService";
import apiEndpoint from "./components/00Services/endpoint";
import NotFound from "./components/01CommonComponents/02NotFound/NotFound";
import AdminRoutes from "./components/06Routes/AdminRoutes";
import ManagerRoutes from "./components/06Routes/ManagerRoutes";
import UserRoutes from "./components/06Routes/UserRoutes";
import AnonymousRoutes from "./components/06Routes/AnonymousRoutes";

var initState = {
  isAuthenticated: null,
  username: null,
  role: null,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload.username,
        role: action.payload.role,
        error: null,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        role: null,
        error: null,
      };
    case "ERROR":
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        role: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {

    if (state.isAuthenticated === null) {
      http
        .get(`${apiEndpoint}/api/loggedUserRole`)
        .then((resp) => {
          dispatch({
            type: "LOGIN",
            payload: { role: resp.data },
          });
        })
        .catch((error) => {
          const unexpectedError = error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

          if (!unexpectedError || (error.response && error.response.status === 404)) {
            swal("Įvyko klaida, puslapis nurodytu adresu nepasiekiamas");
            dispatch({
              type: "ERROR",
            });
          }
          else dispatch({
            type: "ERROR",
            payload: error.response.status,
          });
        });
    }
  }, [state.isAuthenticated]);

  if (state.isAuthenticated) {
    switch (state.role) {
      case "ADMIN":
        return (
          <AuthContext.Provider value={{ state, dispatch }}>
            <AdminRoutes />
          </AuthContext.Provider>
        );
      case "MANAGER":
        return (
          <AuthContext.Provider value={{ state, dispatch }}>
            <ManagerRoutes />
          </AuthContext.Provider>
        );
      case "USER":
        return (
          <AuthContext.Provider value={{ state, dispatch }}>
            <UserRoutes />
          </AuthContext.Provider>
        );
      default:
        return (
          <AuthContext.Provider value={{ state, dispatch }}>
            <NotFound />
          </AuthContext.Provider>
        );
    }
  } else if (state.isAuthenticated === false) {
    return (
      <div>
        <AuthContext.Provider value={{ state, dispatch }}>
          <AnonymousRoutes />
        </AuthContext.Provider>
      </div>
    );
  }
  else return <Spinner />;
}
