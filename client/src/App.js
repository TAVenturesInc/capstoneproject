import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

import { GameContext, LoginContext } from "./context";
// We import all the components we need in our app
import Creator from "./components/creator";
import Games from "./components/games";
import GamePlayer from "./components/gamePlayor";
import LandingPage from "./components/landingpage";
import Navbar from "./components/navbar";
import QRcode from "./components/qrcode";
import { Login, Register } from "./components/authentication";

import "./style/mainSass.css"

const App = () => (
  <div>
    <LoginContext>
      <GameContext>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/edit/:id" element={<Creator />} />
          <Route path="/games/new/" element={<Creator />} />
          <Route path="/game/:id" element={<GamePlayer />} />
          <Route path="/game/:id/:pageId" element={<GamePlayer />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/qr/:id" element={<QRcode />} />
        </Routes>
      </GameContext>
    </LoginContext>
  </div>
);

export default App;
