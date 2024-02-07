import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

import { GameContext } from "./context";
// We import all the components we need in our app
import Creator from "./components/creator";
import Navbar from "./components/navbar";
import Games from "./components/games";
import LandingPage from "./components/landingpage";
import { Login, Register } from "./components/authentication";

const App = () => (
  <div>
    <GameContext>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/edit/:id" element={<Creator />} />
        <Route path="/games/new/" element={<Creator />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </GameContext>
  </div>
);

export default App;
