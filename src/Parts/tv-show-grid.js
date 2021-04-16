import React from "react";

const AddMovieModal = () => (

<div className="modal fade" id="modalAddTvShow" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

);


const GenreElement = (genre_ids, tvShowGenres) => {
    let content = []
    for (let tvShowGenre of tvShowGenres) {
      for (let genre_id of genre_ids) {
        if (genre_id === tvShowGenre.id) {
          var genreName = tvShowGenre
          content.push('<span class="text-decoration-underline" id="'+genreName.id+'" class="text-light">' + genreName.name + '</span>')
        }
      }
    }

    return content.join(", ")
     
  }

const GridElement = ({res, tvShowGenres}) =>
<div className="col-2 mb-3">
  <div className="carousel-item active">
      <img src={
              res.poster_path === null
                ? "/img/no_thumb.png"
                : "https://image.tmdb.org/t/p/w500/" + res.poster_path
            } className="d-block w-100" alt="..." />
            <div className="middle position-absolute text-center">
              <div className="text-white"><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalAddTvShow">Seleccionar</button></div>
            </div>
      <div className="carousel-caption w-100 start-0 p-0 bg-dark bottom-0" style={{opacity: 0.9}}>
        <span>{res.name}</span>
        <br></br>
        <small className="text-light" dangerouslySetInnerHTML={{__html: GenreElement(res.genre_ids, tvShowGenres) }} />
      </div>
      <span className="text-dark position-absolute top-0 end-0 badge bg-warning p-2 m-1 rounded-circle">{res.vote_average}</span>
    </div>

    <AddMovieModal />

</div>;

function TvShowGrid({ data, tvShowGenres }) {

  return (
    <div className="row mt-4">
    {
      data &&
      data.map((res) => {

        return <GridElement key={res.id.toString()} res={res} tvShowGenres={tvShowGenres} />

    })
    }
    </div>
    );
}

export default TvShowGrid;
