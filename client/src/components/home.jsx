import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../actios";
import { Link } from "react-router-dom";
import Card from "./Card";



export default function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.videogames);

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  function handleRefresh(e) {
    e.preventDefault();
    dispatch(getGames());
  }
  return (
    <div>
      <h1>Videojuegos Henry</h1>
      <Link to="/videogame">
        <button>
           Crear personaje
        </button>
        </Link>
      <br></br>
      <button
        onClick={(e) => {
          handleRefresh(e);
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
        <option value="all">Todos</option>
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
           {  allGames?.map((e)=>{
              return (
                
                <Fragment>
                  <Link to ={'/home/'+ e.id}>
                    <Card name={e.name} img ={e.img} genere={e.genere} rating ={e.rating}/>
                  </Link>
                </Fragment>
                
              )
            })}
        </div>
      </div>
    </div>
  )
}
