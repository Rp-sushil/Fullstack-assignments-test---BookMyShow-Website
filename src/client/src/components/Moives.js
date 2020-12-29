import React, { useState, useEffect } from "react";

export default function Moives({ moives, selectMovie, selectedMoive }) {
  const getClass = (movie) =>
    movie === selectedMoive
      ? "movie-column movie-column-selected"
      : "movie-column";
  return (
    <div className="movie-row" key="moives">
      {moives.map((movie, i) => {
        return (
          <article
            onClick={selectMovie}
            className={getClass(movie)}
            key={"movie" + i}
          >
            {movie}
          </article>
        );
      })}
    </div>
  );
}
