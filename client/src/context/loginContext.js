import React from "react";
import { useNavigate } from "react-router";

import serverURL from "../serverURL";

const initialState = {
  error: null,
  loading: false,
  loggedIn: false,
  token: null,
  userName: null,
  userId: null,
  email: null,
};

const loginContext = React.createContext();

const rootReducer = (state, action) => {
  switch (action.type) {
    case "BEGIN_LOGIN":
      return { ...state, loading: true, error: null };
    case "LOGIN_USER":
      return {
        ...state,
        loading: false,
        loggedIn: true,
        token: action.token,
        userId: action.userId,
        userName: action.userName,
        email: action.email,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        error: null,
        loading: false,
        loggedIn: false,
        token: null,
        userId: null,
        userName: null,
        email: null,
      };
    case "END_LOGIN":
      return { ...state, loading: false };
    case "LOGIN_ERROR":
      return { ...state, loading: false, error: action.error };
    case "LOGIN_USER_PROFILE":
      return {
        ...state,
        userName: action.userName,
        email: action.email,
      };
    case "BEGIN_UPDATE_PROFILE":
      return {
        ...state,
        loading: true,
        error: null,
      }
    case "UPDATE_USER_PROFILE":
      return {
        ...state,
        userName: action.userName,
        email: action.email,
      };
    case "CANCEL_UPDATE_PROFILE":
      return {
        ...state, 
        loading: false,
      };
    case "END_UPDATE_PROFILE":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const LoginContext = ({ children }) => {
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
        if (data.success) {
          document.cookie = `token=${data.token};`;
          document.cookie = `userName=${data.userName};`;
          document.cookie = `userId=${data.userId};`;
          document.cookie = `email=${data.email};`;
          dispatch({
            type: "LOGIN_USER",
            token: data.token,
            userId: data.userId,
            userName: data.userName,
            email: data.email,
          });
          navigate("/games");
        } else {
          dispatch({ type: "LOGIN_ERROR", error: "Login was unsuccessful" });
        }
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
    document.cookie = "userName=;expires=" + new Date(0).toUTCString();
    document.cookie = "userId=;expires=" + new Date(0).toUTCString();
    document.cookie = "email=;expires=" + new Date(0).toUTCString();
    dispatch({ type: "LOGOUT_USER" });
  };

  const updateUserProfileAction = async (newProfileData) => {
    dispatch({ type: "BEGIN_UPDATE_PROFILE" });
    const response = await fetch(`${serverURL()}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProfileData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          document.cookie = `userName=${newProfileData.userName};`;
          document.cookie = `email=${newProfileData.email};`;
          dispatch({
            type: "UPDATE_USER_PROFILE",
            userName: data.userName,
            email: data.email,
          });
          navigate("/profile");
        } else {
          dispatch({ type: "UPDATE_PROFILE_ERROR", error: data.message });
        }
      })
      .catch ((err) => {
        window.alert(err);
        dispatch({ type: "UPDATE_PROFILE_ERROR", error: "Internal server error" });
      })
      .finally(() => {
        dispatch({ type: "END_UPDATE_PROFILE" });
      })
    return response;     
  };

  const cancelUpdateProfileAction = () => {
    dispatch({ type: "CANCEL_UPDATE_PROFILE" });
    navigate("/profile");
  };

  React.useEffect(() => {
    if (document?.cookie?.match(/token=/)) {
      const cookieData = {};
      document.cookie
        .toString()
        .replaceAll(" ", "")
        .split(";")
        .map((token) => token.split("="))
        .map((arr) => (cookieData[arr[0]] = arr[1]));

      dispatch({
        type: "LOGIN_USER",
        token: cookieData.token,
        userName: cookieData.userName,
        userId: cookieData.userId,
        email: cookieData.email,
      });
    } else {
      navigate("/");
    }
  }, []);

  const actions = { loginUserAction, logOutUserAction, updateUserProfileAction, cancelUpdateProfileAction };

  const userState = {
    actions,
    error: state.error,
    loading: state.loading,
    loggedIn: state.loggedIn,
    userId: state.userId,
    userName: state.userName,
    email: state.email,
  };

  return (
    <loginContext.Provider value={userState}>{children}</loginContext.Provider>
  );
};

export const useLoginContext = () => {
  const exposedState = React.useContext(loginContext);
  return exposedState;
};
