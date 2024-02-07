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
  const [{ loading, loaded, games }, dispatch] = React.useReducer(
    boardReducer,
    initialState
  );

  const getGameData = async (id) => {
    dispatch({ type: "START_LOADING" });

    const response = await fetch(`${serverURL}/api/games/${id}`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      dispatch({ type: "LOADING_ERROR", errors: [message] });
      return;
    } else {
      const game = await response.json();
      dispatch({ type: "SET_GAME_DATA", game });
    }
  };

  const deleteGame = async (id) => {
    dispatch({ type: "START_LOADING" });

    // await fetch(`http://localhost:5000/${id}`, {
    await fetch(`${serverURL}/${id}`, {
      method: "DELETE",
    });

    const newGames = [...games].filter((el) => el._id !== id);
    dispatch({ type: "LOADING_COMPLETE", games: newGames });
  };

  const refreshGameList = async () => {
    dispatch({ type: "START_LOADING" });

    const response = await fetch(`${serverURL()}/api/games/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      dispatch({ type: "LOADING_ERROR", errors: [message] });
      return;
    } else {
      const games = await response.json();
      dispatch({ type: "LOADING_COMPLETE", games });
    }
  };

  const exposedState = {
    games,
    gamesLoading: loading,
    gamesLoaded: loaded,
    actions: { deleteGame, getGameData, refreshGameList },
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
