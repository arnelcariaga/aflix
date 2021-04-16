import React, { useState, useEffect, useCallback } from "react";

import SearchForm from "../Parts/search-form";
import MovieGrid from "../Parts/movie-grid";
import TvShowGrid from "../Parts/tv-show-grid";
import Loading from "../Parts/loading";

import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

require('./styles/movie-and-tv-show-grid.css');

const { MovieDb } = require("moviedb-promise");
const moviedb = new MovieDb("d752ed1f70642181ead03a75e9588471");

var pageMovie = 1;
var pageTvShow = 1;

const styles = {
  buttonGoUp: {
    right: 0,
    width: "5%",
    height: "10%",
  },
};

function Items({ data }) {
  const [movies, setMovies] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [movieTotalPage, setMovieTotalPage] = useState(1);

  const [tvShow, setTvShow] = useState([]);
  const [tvShowGenres, setTvShowGenres] = useState([]);
  const [tvShowTotalPage, setVvShowTotalPage] = useState(1);

  const [isMoviesLoading, setIsMoviesLoading] = useState(true);
  const [isTvShowLoading, setIsTvShowLoading] = useState(true);

  const [query, setQuery] = useState("");

  const [movieResultsCount, setMovieResultsCount] = useState();
  const [tvShowResultsCount, setTvShowResultsCount] = useState();

  const [lang, setLang] = useState("es-ES");

  const [showGoUpButton, setShowGoUpButton] = useState(false);

  const fetchMovieData = useCallback(
    (page) => {
      moviedb
        .moviePopular({ language: lang, page: page })
        .then((res) => {
          setMovieTotalPage(res["total_pages"]);
          setMovies((items) => res["results"]);
          setIsMoviesLoading(false);
        })
        .catch(console.error);
    },
    [lang]
  );

  const fetchTvShowData = useCallback(
    (page) => {
      moviedb
        .tvPopular({ language: lang, page: page })
        .then((res) => {
          setVvShowTotalPage(res["total_pages"]);
          setTvShow((items) => res["results"]);
          setIsTvShowLoading(false);
        })
        .catch(console.error);
    },
    [lang]
  );

  useEffect(() => {
    fetchMovieData(pageMovie);
  }, [fetchMovieData]);

  useEffect(() => {
    fetchTvShowData(pageTvShow);
  }, [fetchTvShowData]);

  useEffect(() => {
    moviedb
      .genreMovieList({ language: lang })
      .then((res) => {
        setMovieGenres(res["genres"]);
      })
      .catch(console.error);

    moviedb
      .genreTvList({ language: lang })
      .then((res) => {
        setTvShowGenres(res["genres"]);
      })
      .catch(console.error);
  }, [lang]);

  function handleMoviePagination(e) {
    var selectedPage = e.selected + 1;
    fetchMovieData(selectedPage);
  }

  function handleTvShowPagination(e) {
    var selectedPage = e.selected + 1;
    fetchTvShowData(selectedPage);
  }

  function handleMovieSearchPagination(e) {
    var selectedPage = e.selected + 1;
    searchHandled(query, selectedPage);
  }

  function handleTvShowSearchPagination(e) {
    var selectedPage = e.selected + 1;
    searchHandled(query, selectedPage);
  }

  const moviesAndTvShowElements = (
    <div>
      {" "}
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className="nav-link active"
            id="movie-tab"
            data-bs-toggle="tab"
            href="#movie"
            role="tab"
            aria-controls="movie"
            aria-selected="true"
          >
            Pel&iacute;culas{" "}
            {movieResultsCount > 0 ? <span>({movieResultsCount})</span> : ""}
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link"
            id="tv-show-tab"
            data-bs-toggle="tab"
            href="#tv-show"
            role="tab"
            aria-controls="tv-show"
            aria-selected="false"
          >
            Series{" "}
            {tvShowResultsCount > 0 ? <span>({tvShowResultsCount})</span> : ""}
          </a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="movie"
          role="tabpanel"
          aria-labelledby="nav-movie-tab"
        >
          {isMoviesLoading ? (
            <Loading />
          ) : movies.length === 0 ? (
            <h4>No hay resultados en pel&iacute;culas...</h4>
          ) : (
            <MovieGrid data={movies} movieGenres={movieGenres} lang={lang} />
          )}

          <ReactPaginate
            previousLabel={"Atras"}
            nextLabel={"Siguiente"}
            breakLabel={"..."}
            breakClassName={"page-item"}
            breakLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            nextClassName="page-item"
            pageCount={movieTotalPage}
            marginPagesDisplayed={5}
            pageRangeDisplayed={5}
            onPageChange={
              query === "" ? handleMoviePagination : handleMovieSearchPagination
            }
            pageClassName="page-item"
            pageLinkClassName="page-link"
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>

        <div
          className="tab-pane fade"
          id="tv-show"
          role="tabpanel"
          aria-labelledby="nav-tv-show-tab"
        >
          {isTvShowLoading ? (
            <Loading />
          ) : tvShow.length === 0 ? (
            <h4>No hay resultados en series...</h4>
          ) : (
            <TvShowGrid data={tvShow} tvShowGenres={tvShowGenres} />
          )}
          <ReactPaginate
            previousLabel={"Atras"}
            nextLabel={"Siguiente"}
            breakLabel={"..."}
            breakClassName={"page-item"}
            breakLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            nextClassName="page-item"
            pageCount={tvShowTotalPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={
              query === ""
                ? handleTvShowPagination
                : handleTvShowSearchPagination
            }
            pageClassName="page-item"
            pageLinkClassName="page-link"
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );

  function searchHandled(query, page) {
    setIsMoviesLoading(true);
    setIsTvShowLoading(true);
    setQuery(query);

    moviedb
      .searchMovie({ language: lang, query: query, page: page })
      .then((res) => {
        setMovieTotalPage(res["total_pages"]);
        setMovieResultsCount(res["total_results"]);
        setMovies([]);
        setMovies((items) => res["results"]);
        setIsMoviesLoading(false);
      })
      .catch(console.error);

    moviedb
      .searchTv({ language: lang, query: query, page: page })
      .then((res) => {
        setVvShowTotalPage(res["total_pages"]);
        setTvShowResultsCount(res["total_results"]);
        setTvShow([]);
        setTvShow((items) => res["results"]);
        setIsTvShowLoading(false);
      })
      .catch(console.error);
  }

  function handleIsSearchEmpty(val) {
    if (val) {
      setQuery("");
      fetchMovieData(1);
      fetchTvShowData(1);
      setMovieResultsCount(0);
      setTvShowResultsCount(0);
    }
  }

  function handleScroll() {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      setShowGoUpButton(true);
    }

    if (window.pageYOffset <= 0) {
      setShowGoUpButton(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  function backToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    setShowGoUpButton(false);
  }

  return (
    <div className="row">
      <SearchForm
        searchHandled={searchHandled}
        isSearchEmpty={handleIsSearchEmpty}
      />

      {query === "" ? (
        ""
      ) : (
        <h3>
          Resultados de: <span className="text-danger">{query}</span>
        </h3>
      )}

      {moviesAndTvShowElements}

      {showGoUpButton ? (
        <button
          type="button"
          onClick={backToTop}
          className="btn btn-info rounded-circle bottom-0 m-2 mb-3 position-fixed"
          style={styles.buttonGoUp}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Items;