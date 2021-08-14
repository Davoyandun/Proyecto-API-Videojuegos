import React from "react";
import { Link } from "react-router-dom";

export default function landingPage() {
  return (
    <div>
      <h1>VideoGames Word</h1>
      <p>Todo acerca de tus juegos favoritos</p>
      <Link to= '/home'>
        <button>ingresar</button>
      </Link>
    </div>
  );
}
