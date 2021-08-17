import { func } from "prop-types";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../actios";
import { Link } from "react-router-dom";
import card from "./card";

export default function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.videogames);

  useEffect(() => {
    dispatch(getGames());
  }, []);

  function refresh(e) {
    e.preventDefault();
    dispatch(getGames());
  }

  return (
    <div>
      <Link to="/videogame">Crear personaje</Link>
      <h1>Videojuegos Henry</h1>
      <button
        onClick={(e) => {
          refresh(e);
        }}
      >
        Cargar personajes
      </button>
      <div>
        <label>
          <input type="text" />
          <button>Buscar</button>
        </label>
        <select name="alfabet" id="">
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select name="rating" id="">
          <option value="top">Rating ++</option>
          <option value="bot">Rating --</option>
        </select>
        <select name="source" id="source">
          <option value="api">Existente</option>
          <option value="db">Nuevo</option>
        </select>
        <select name="genres" id="genres">
          <option value="Action">Acción</option>
          <option value="Indie">Indie</option>
          <option value="Adventure">Aventura</option>
          <option value="RPG">Juego de rol</option>
          <option value="Strategy">Estrategia</option>
          <option value="Shooter">Disparos</option>
          <option value="Casual">Casual</option>
          <option value="Simulation">Simulación</option>
          <option value="Puzzle">Rompecabezas</option>
          <option value="Arcade">Clásico</option>
          <option value="Platformer">Plataforma</option>
          <option value="Racing">Carreras</option>
          <option value="Massively Multiplayer">Multijugador</option>
          <option value="Sports">Deportes</option>
          <option value="Fighting">Lucha</option>
          <option value="Family">Familiar</option>
          <option value="Board Games">Juegos de mesa</option>
          <option value="Educational">Educativo</option>
          <option value="Card">Cartas</option>
        </select>
        <div>
           { allGames.map((e)=>{
                <card e/>
            })}
        </div>
      </div>
    </div>
  );
}
