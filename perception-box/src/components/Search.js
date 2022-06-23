import React, { useEffect, useState } from "react";

export default function Search({
  searchResults,
  setSearchResults,
  setInput,
  input,
  setPreview,
}) {
  function takeMore(url, arr) {
    fetch(url)
      .then((d) => {
        if (d.status === 200) {
          return d.json();
        } else {
          return { results: null };
        }
      })
      .then((f) => {
        if (f.results) {
          let newList = [...arr, ...f.results];
          setSearchResults(newList);
          if (f.info.next) {
            takeMore(f.info.next, newList);
          }
        } else {
          setSearchResults(null);
        }
      });
  }

  useEffect(() => {
    if (input.length >= 2) {
      setSearchResults([]);
      takeMore(`https://rickandmortyapi.com/api/character/?name=${input}`, []);
    }
  }, [input]);

  return (
    <div className="search">
      <p className="text">Search:</p>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="list">
        {Array.isArray(searchResults) ? (
          searchResults.map((item) => (
            <div
              className="text"
              key={item.id}
              onClick={() => setPreview(item)}
            >
              {item.name}
            </div>
          ))
        ) : (
          <p className="text">No results</p>
        )}
      </div>
    </div>
  );
}
