import React, { useRef } from "react";

function SearchForm({ searchHandled, isSearchEmpty }) {

  var inputSearchRef = useRef();

  function handleSearch(e){
    var inputVal = inputSearchRef.current.value
    if (inputVal !== "") {
      searchHandled(inputVal, 1)
    }else{
      alert("El campo de buscar es obligatorio.")
    }
      
  }

  function onKeyPress(e){
      if (e.charCode === 13) {
        var inputVal = inputSearchRef.current.value
        if (inputVal !== "") {
        searchHandled(inputVal, 1)
      }else{
        alert("El campo de buscar es obligatorio.")
      }
    }
  }

  function handleOnChange(){
    var inputVal = inputSearchRef.current.value
    if (inputVal === "") {
      isSearchEmpty(true)
    }else{
      isSearchEmpty(false)
    }
  }

  return (

    <div className="col-12 mb-3">
      <label>Buscar</label>
      <div className="d-flex">
        <input type="text" ref={inputSearchRef} onKeyPress={onKeyPress} onChange={handleOnChange} placeholder="Buscar contenido para agregar..." className="form-control" />
        <button className="btn btn-primary mx-2" onClick={handleSearch}>Buscar</button>
      </div>
    </div>

    );
}

export default SearchForm;