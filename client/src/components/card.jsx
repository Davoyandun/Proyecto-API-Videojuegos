import React from "react";
import { Link } from "react-router-dom";

export default function card({videogame}) {
  const { name, genere, rating, img } = videogame;
  return (
    <div>
      <img src={img} alt="Img no found"  width = '200px' height ='250px' />
      <h1>{name}</h1>
      <h3>{genere}</h3>
      <h3>{rating}</h3>
      <Link>
        <button to="/details">Detalles del juego</button>
      </Link>
    </div>
  );
}
