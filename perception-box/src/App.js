import React, { useEffect, useState, useRef } from "react";
import GetData from "./components/GetData.js";
import "./App.css";
import Search from "./components/Search.js";
import PreviewCard from "./components/PreviewCard.js";

function App() {
  const [characters, setCharacters] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  let [page, setPage] = useState(1);
  let [input, setInput] = useState("");
  let [preview, setPreview] = useState(null);

  const scrollArea = useRef();
  const observer = useRef();

  useEffect(() => {
    if (scrollArea.current) {
      let options = {
        root: scrollArea.current,
        rootMargin: "0px",
        threshold: 1.0,
      };

      observer.current = new IntersectionObserver((entry) => {
        if (entry[0].intersectionRatio > 0.9) {
          console.log(entry);
          setPage(++page);
        }
      }, options);
    }
  }, [scrollArea.current]);

  return preview ? (
    <PreviewCard data={preview} close={() => setPreview(null)} />
  ) : (
    <>
      <Search
        setSearchResults={setSearchResults}
        searchResults={searchResults}
        input={input}
        setInput={setInput}
        setPreview={setPreview}
      />
      {input && (
        <div className="App">
          <div className="characters-list">
            <GetData
              characters={Array.isArray(searchResults) ? searchResults : []}
              setPreview={setPreview}
            />
          </div>
        </div>
      )}
      <div
        className="App"
        ref={scrollArea}
        style={{ display: input.length ? "none" : "block" }}
      >
        <div className="characters-list">
          <GetData
            page={page}
            characters={characters}
            setCharacters={setCharacters}
            observer={observer}
            setPreview={setPreview}
          />
        </div>
      </div>
    </>
  );
}

export default App;
