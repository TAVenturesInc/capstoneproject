import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

import {
  GameContext,
  LoginContext,
  StyleContext,
  useStyleContext,
} from "./context";

// We import all the components we need in our app
import Creator from "./components/creator";
import Games from "./components/games";
import GamePlayer from "./components/gamePlayor";
import LandingPage from "./components/landingpage";
import Navbar from "./components/navbar";
import QRcode from "./components/qrcode";
import {
  Login,
  Register,
  Profile,
  EditProfile,
} from "./components/authentication";

import "./App.css";

const RoutesComponent = () => {
  const { theme = "" } = useStyleContext();

  return (
    <div id={theme} class="font2">
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/qr/:id" element={<QRcode />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <StyleContext>
    <LoginContext>
      <GameContext>
        <RoutesComponent />
      </GameContext>
    </LoginContext>
  </StyleContext>
);

export default App;
