import React from "react";

import serverURL from "../serverURL";

const GameContextProvider = React.createContext({
  currentGame: {},
  errorList: [],
  gameData: null,
  games: [],
  loaded: false,
  loading: false,
});

const initialState = {
  currentGame: null,
  errorList: [],
  gameData: null,
  games: [],
  loaded: false,
  loading: false,
};

function boardReducer(state, action) {
  switch (action.type) {
    case "SET_USER_GAME_RECORDS": {
      return {
        ...state,
        gameData: action.gameData,
      };
    }
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
      return { ...state, loading: true, loaded: false, gameData: null };
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
    case "RESET_GAME_DATA": {
      return {
        currentGame: null,
        errorList: [],
        games: [],
        loaded: false,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}

function GameContext({ children }) {
  const [{ currentGame, gameData, games, loaded, loading }, dispatch] =
    React.useReducer(boardReducer, initialState);

  const getUserGameData = async (userId) => {
    await fetch(`${serverURL()}/api/gameData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch({
            type: "SET_USER_GAME_RECORDS",
            gameData: data.gameState,
          });
        }
      });
  };

  const resetGameData = () => {
    dispatch({ type: "RESET_GAME_DATA" });
  };

  const createGameData = async (game) => {
    dispatch({ type: "START_LOADING" });

    return fetch(`${serverURL()}/api/game/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({ type: "UPDATE_COMPLETE" });
        if (res.success) {
          return getGameData(res.id);
        }
      })
      .catch((error) => {
        const message = `An error occurred: ${error.statusText}`;
        window.alert(message);
        dispatch({ type: "LOADING_ERROR", errors: [message] });
      });
  };

  const updateGameData = async (id, game) => {
    dispatch({ type: "START_LOADING" });
    return fetch(`${serverURL()}/api/games/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
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
    return fetch(`${serverURL()}/api/games/${id}`)
      .then((response) => response.json())
      .then((game) => {
        dispatch({ type: "SET_GAME_DATA", game });
        return game;
      })
      .catch((error) => {
        const message = `An error occurred: ${error.statusText}`;
        window.alert(message);
        dispatch({ type: "LOADING_ERROR", errors: [message] });
      });
  };

  const deleteGame = async (id) => {
    dispatch({ type: "START_LOADING" });

    return fetch(`${serverURL()}/api/games/${id}`, {
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
    return fetch(`${serverURL()}/api/games/`)
      .then((response) => response.json())
      .then((games) => dispatch({ type: "LOADING_COMPLETE", games }))
      .catch((error) =>
        dispatch({
          type: "LOADING_ERROR",
          errors: [`An error occurred: ${error.statusText}`],
        })
      );
  };

  const updateUserGameStatus = (gameId, userId, status) => {
    dispatch({ type: "START_LOADING" });

    return fetch(`${serverURL()}/api/game/${gameId}/user/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((response) => response.json())
      .catch((error) => {
        const message = `An error occurred: ${error.statusText}`;
        window.alert(message);
        dispatch({ type: "LOADING_ERROR", errors: [message] });
      });
  };

  const exposedState = {
    currentGame,
    gameData,
    games,
    gamesLoaded: loaded,
    gamesLoading: loading,
    actions: {
      createGameData,
      deleteGame,
      getGameData,
      getUserGameData,
      refreshGameList,
      resetGameData,
      updateGameData,
      updateUserGameStatus,
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
