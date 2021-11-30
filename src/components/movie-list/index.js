import React, { useState, useEffect }  from "react";
import axios from 'axios';
import "./index.css";

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

function MovieList() {
  const [query, setQuery] = useState('redux');
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    'https://jsonmock.hackerrank.com/api/movies',
    { hits: [] },
  );

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input 
          type="number" 
          className="large" 
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Enter Year eg 2015" 
          data-testid="app-input"
        />
        <button
          className="" 
          data-testid="submit-button"
          onClick={event => {
            doFetch(
              `https://jsonmock.hackerrank.com/api/movies?Year=${query}`,
            );
  
            event.preventDefault();
          }}
        >
          Search
        </button>
      </section>

      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul className="mt-50 styled" data-testid="movieList">
          {/* {data.hits.map(item => ( */}
            <li  className="slide-up-fade-in py-10"/*  key={item.objectID} */>
              {/* {item.Title} */}
            </li>
          {/* ))} */}
        </ul>
      )}

      <div className="mt-50 slide-up-fade-in" data-testid="no-result"></div>
    </div>
  );
}

export default MovieList