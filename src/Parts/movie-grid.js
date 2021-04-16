import React, { useEffect, useRef, useState } from "react";

import Loading from "./loading";

const { MovieDb } = require("moviedb-promise");
const moviedb = new MovieDb("d752ed1f70642181ead03a75e9588471");

function timeConvertFunc(num)
 { 
  var hours = Math.floor(num / 60);  
  var minutes = num % 60;
  return hours + "h " + minutes + "m";         
}

const AddMovieModal = ({lang}) => {
const [movieInfo, setMovieInfo] = useState([]);
const [movieCreditsInfo, setMovieCreditsInfo] = useState([]);
const [isMovieInfoLoading, setIsMovieInfoLoading] = useState(true);
var modalAddMovieRef = useRef()

useEffect(() => {
  modalAddMovieRef.current.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget
    var recipient = button.getAttribute('data-bs-movie')
    
    moviedb
        .movieInfo({ language: lang, id: recipient })
        .then((res) => {
          setMovieInfo((items) => [res])
          setIsMovieInfoLoading(false)
        })
        .catch(console.error);

        moviedb
        .movieCredits({ language: lang, id: recipient })
        .then((res) => {
          setMovieCreditsInfo((items) => res["cast"])
        })
        .catch(console.error);

  })
}, [lang])

function handleShowMoreCast(id){
  const element = document.getElementsByClassName('show-more-cast-'+id)[0]
  element.classList.add('h-100')
}

return (

<div className="modal fade" ref={modalAddMovieRef} id="modalAddMovie" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-xl">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {
          isMovieInfoLoading ? <Loading /> : movieInfo.map((res) => {
            return <div className="row" key={res.id.toString()}>

            <div className="col-6">
                <img src={
                    res.poster_path === null
                      ? "/img/no_thumb.png"
                      : "https://image.tmdb.org/t/p/w500/" + res.poster_path
                  } className="d-block w-100 card-img" alt="..." />
                  <span className="text-dark position-absolute top-0 badge bg-warning p-5 m-1 rounded-circle">{res.vote_average}</span>
              </div>

              <div className="col-6">
                <span><strong>T&iacute;tulo: </strong></span> <span>{res.title}</span>
                <br></br>
                <span><strong>T&iacute;tulo original: </strong></span> <span>{res.original_title}</span>
                <br></br>
                <span><strong>G&eacute;nero/s: </strong></span>
                <span dangerouslySetInnerHTML={{
                  __html: res.genres.map((genresRes) => {
                              return '<span class="text-decoration-underline" key='+genresRes.id.toString()+'>'+genresRes.name+'</span>'
                            }).join(", ")
                }} />
                <br></br>
                <span><strong>Fecha de lanzamiento: </strong></span> <span>{res.release_date}</span>
                <br></br>
                <span><strong>Estado: </strong></span> <span>{res.status}</span>
                <br></br>
                <span><strong>Duraci&oacute;n: </strong></span> <span>{timeConvertFunc(res.runtime)}</span>
                <br></br>
                <span><strong>Lenguaje original: </strong></span> <span>{res.original_language}</span>
                <br></br>
                <span><strong>Compañia/s de producci&oacute;n: </strong></span> 
                <span>{
                  res.production_companies.map((cpRes) => {
                    return <li key={cpRes.id.toString()}>{cpRes.name}</li>
                  })
                }</span>
                <span><strong>Pa&iacute;s/es de producci&oacute;n: </strong></span> 
                <span>{
                  res.production_countries.map((pcRes) => {
                    return <li key={pcRes.iso_3166_1.toString()}>{pcRes.name}</li>
                  })
                }</span>
                <span><strong>Sinopsis: </strong></span> <span>{res.overview}</span>
                <br></br>
                <span><strong>Reparto: </strong></span> 

                <p className={"overflow-hidden mb-0 show-more-cast-"+res.id.toString()} style={{height: "3.5%"}} dangerouslySetInnerHTML={{
                  __html: movieCreditsInfo.map((res) => {
                    return  '<mark key='+res.id.toString()+'>'+res.name+'</mark>'
                  }).join(", ")
                }} />

                <button className="btn btn-sm btn-link" onClick={() => handleShowMoreCast(res.id.toString())}><strong>Ver m&aacute;s</strong></button>
              </div>

            </div>
          })
        }

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

);
}

const GenreElement = (genre_ids, movieGenres) => {
    let content = []
    for (let movieGenre of movieGenres) {
      for (let genre_id of genre_ids) {
        if (genre_id === movieGenre.id) {
          var genreName = movieGenre
          content.push('<span class="text-decoration-underline" id="'+genreName.id+'" class="text-light">' + genreName.name + '</span>')
        }
      }
    }

    return content.join(", ")
     
  }

const GridElement = ({ res, movieGenres, lang }) => (
  <div className="col-2 mb-3">
  <div className="carousel-item active">
      <img src={
              res.poster_path === null
                ? "/img/no_thumb.png"
                : "https://image.tmdb.org/t/p/w500/" + res.poster_path
            } className="d-block w-100 card-img" alt="..." />
            <div className="middle position-absolute text-center">
              <div className="text-white"><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalAddMovie" data-bs-movie={res.id}>Seleccionar</button></div>
            </div>
      <div className="carousel-caption w-100 start-0 p-0 bg-dark bottom-0" style={{opacity: 0.9}}>
        <span>{res.title}</span>
        <br></br>
        <small className="text-light" dangerouslySetInnerHTML={{__html: GenreElement(res.genre_ids, movieGenres) }} />
      </div>
      <span className="text-dark position-absolute top-0 end-0 badge bg-warning p-2 m-1 rounded-circle">{res.vote_average}</span>
    </div>

    <AddMovieModal lang={lang} />

  </div>
);

function MovieGrid({ data, movieGenres, lang }) {
  return (
    <div className="row mt-4">
      {data &&
        data.map((res) => {
          return <GridElement key={res.id.toString()} res={res} movieGenres={movieGenres} lang={lang} />;
        })}
    </div>
  );
}

export default MovieGrid;
