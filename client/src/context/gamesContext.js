import React from "react";

import serverURL from "../serverURL";

const GameContextProvider = React.createContext({
  currentGame: {},
  errorList: [],
  games: [],
  loaded: false,
  loading: false,
});

const initialState = {
  currentGame: null,
  errorList: [],
  games: [],
  loaded: false,
  loading: false,
};

function boardReducer(state, action) {
  switch (action.type) {
    case "UPDATE_COMPLETE": {
      return { ...state, loading: false, loaded: true };
    }
    case "SET_GAME_DATA": {
      return {
        ...state,
        loading: false,
        loaded: true,
        currentGame: action.game,
      };
    }
    case "START_LOADING": {
      return { ...state, loading: true, loaded: false };
    }
    case "LOADING_ERROR": {
      return {
        ...state,
        loading: false,
        loaded: false,
        errorList: action.errors,
      };
    }
    case "LOADING_COMPLETE": {
      return {
        ...state,
        loading: false,
        loaded: true,
        games: action.games,
      };
    }
    default: {
      return state;
    }
  }
}

function GameContext({ children }) {
  const [{ currentGame, games, loaded, loading }, dispatch] = React.useReducer(
    boardReducer,
    initialState
  );

  const createGameData = async (data) => {
    dispatch({ type: "START_LOADING" });
    fetch(`${serverURL()}/api/games/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => dispatch({ type: "UPDATE_COMPLETE" }))
      .catch((error) => {
        const message = `An error occurred: ${error.statusText}`;
        window.alert(message);
        dispatch({ type: "LOADING_ERROR", errors: [message] });
      });
  };

  const updateGameData = async (id, data) => {
    dispatch({ type: "START_LOADING" });
    fetch(`${serverURL()}/api/games/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((game) => {
        dispatch({ type: "UPDATE_COMPLETE" });
      })
      .catch((error) => {
        const message = `An error occurred: ${error.statusText}`;
        window.alert(message);
        dispatch({ type: "LOADING_ERROR", errors: [message] });
      });
  };

  const getGameData = async (id) => {
    dispatch({ type: "START_LOADING" });
    fetch(`${serverURL()}/api/games/${id}`)
      .then((response) => response.json())
      .then((game) => dispatch({ type: "SET_GAME_DATA", game }))
      .catch((error) => {
        const message = `An error occurred: ${error.statusText}`;
        window.alert(message);
        dispatch({ type: "LOADING_ERROR", errors: [message] });
      });
  };

  const deleteGame = async (id) => {
    dispatch({ type: "START_LOADING" });

    fetch(`${serverURL()}/api/games/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const newGames = [...games].filter((el) => el._id !== id);
        dispatch({ type: "LOADING_COMPLETE", games: newGames });
      })
      .catch((error) => {
        const message = `An error occurred: ${error.statusText}`;
        window.alert(message);
        dispatch({ type: "LOADING_ERROR", errors: [message] });
      });
  };

  const refreshGameList = async () => {
    dispatch({ type: "START_LOADING" });
    fetch(`${serverURL()}/api/games/`)
      .then((response) => response.json())
      .then((games) => dispatch({ type: "LOADING_COMPLETE", games }))
      .catch((error) => {
        console.log({ error });
        const message = `An error occurred: ${error.statusText}`;
        dispatch({ type: "LOADING_ERROR", errors: [message] });
      });
  };

  const exposedState = {
    currentGame,
    games,
    gamesLoading: loading,
    gamesLoaded: loaded,
    actions: {
      createGameData,
      deleteGame,
      getGameData,
      refreshGameList,
      updateGameData,
    },
  };

  return (
    <GameContextProvider.Provider value={exposedState}>
      {children}
    </GameContextProvider.Provider>
  );
}

const useGameContext = () => {
  const exposedState = React.useContext(GameContextProvider);
  return exposedState;
};

export { GameContext, useGameContext };
