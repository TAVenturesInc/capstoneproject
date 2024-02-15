import React from "react";
import { useNavigate } from "react-router";

import serverURL from "../serverURL";

const initialState = {
  loading: false,
  loggedIn: false,
  token: null,
  user: null,
};

const userContext = React.createContext();

const rootReducer = (state, action) => {
  switch (action.type) {
    case "BEGIN_LOGIN":
      return { ...state, loading: true };
    case "LOGIN_USER":
      return { ...state, loading: false, token: action.token, loggedIn: true };
    case "LOGOUT_USER":
      return {
        ...state,
        loading: false,
        loggedIn: false,
        token: null,
        user: null,
      };
    case "END_LOGIN":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const UserContext = ({ children }) => {
  const [state, dispatch] = React.useReducer(rootReducer, initialState);
  const navigate = useNavigate();

  const loginUserAction = async (form) => {
    dispatch({ type: "BEGIN_LOGIN" });
    const response = await fetch(`${serverURL()}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        document.cookie = `token=${data.token}; path=/;`;
        dispatch({ type: "LOGIN_USER", token: data.token });
        navigate("/games");
      })
      .catch((err) => {
        window.alert(err);
        navigate("/login");
      })
      .finally(() => {
        dispatch({ type: "END_LOGIN" });
      });
    return response;
  };

  const logOutUserAction = () => {
    document.cookie = "token=;expires=" + new Date(0).toUTCString();
    dispatch({ type: "LOGOUT_USER" });
    navigate("/");
  };

  const actions = { loginUserAction, logOutUserAction };

  React.useEffect(() => {
    if (document?.cookie?.match(/^token=/)) {
      const token = document.cookie.replace("token=", "");
      dispatch({
        type: "LOGIN_USER",
        token,
      });
    } else {
      navigate("/");
    }
  }, []);

  const userState = {
    loading: state.loading,
    loggedIn: state.loggedIn,
    actions,
  };

  return (
    <userContext.Provider value={userState}>{children}</userContext.Provider>
  );
};

export const useUserContext = () => {
  const exposedState = React.useContext(userContext);
  return exposedState;
};
