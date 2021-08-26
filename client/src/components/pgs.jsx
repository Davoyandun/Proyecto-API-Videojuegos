import React from "react";

export default function Pgs({ gamesperPage, allGame, paginado }) {
  let pageNumbers = [];

  for (let i = 0; i <= Math.ceil(allGame / gamesperPage); i++) {
    pageNumbers.push(i+1);
  }

  return (
    <nav>
      <ul className ='paginado'>
        {pageNumbers &&
          pageNumbers.map(e => (
          
              <button  key = {e} onClick={() => paginado(e)} >{e} </button>
           
  ))}
      </ul>
    </nav>
  );
}
