import React, { useState, useEffect, useRef } from "react";
const axios = require("axios").default;

function GetData({
  page = 0,
  characters,
  setCharacters = () => {},
  observer = null,
  setPreview,
}) {
  let lastEl = useRef();

  useEffect(() => {
    if (page) {
      axios
        .get(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then((res) => setCharacters([...characters, ...res.data.results]));
    }
  }, [page]);

  useEffect(() => {
    if (lastEl.current && observer && observer.current) {
      observer.current.observe(lastEl.current);
    }
    // console.log({characters, el:lastEl.current, observer });
  }, [characters, lastEl.current, observer]);
  return characters.map((character, index) => (
    <div
      key={character.id}
      className="card"
      ref={characters.length - 1 === index ? lastEl : null}
      onClick={() => setPreview(character)}
    >
      <img src={character.image} />
      <p className="text">{character.name}</p>
      <p className="text">{character.status}</p>
    </div>
  ));
}

export default GetData;
