import React from 'react';
import $ from "jquery";
import { useHistory } from "react-router-dom";
require('./style.css');

const url = 'http://localhost/aflixapi/login.php';

function Login() {
  let history = useHistory();

  var inputEmailRef = React.createRef(),
  inputPassRef = React.createRef();

  function login(){
    const email = inputEmailRef.current.value;
    const pass = inputPassRef.current.value;

    var fd = new FormData();

    fd.append("email", email);
    fd.append("pass", pass);

    $.ajax({
      url: url,
      type: 'POST',
      contentType: false,
      data: fd,
      processData: false,
      cache: false,
      success: function(res) {
        if (res === "true") {
          history.push("/dashboard");
        }else{
          alert(res)
        }
      }
    })

  }

  return (
    <div className="container d-flex justify-content-center align-items-center">
    <form className="row">
    <div className="col">
    <input type="email" ref={inputEmailRef} className="form-control" placeholder="First name" aria-label="First name" />
    </div>
    <div className="col">
    <input type="password" ref={inputPassRef} className="form-control" placeholder="Last name" aria-label="Last name" />
    </div>
    <div className="col-12 mt-3">
    <button type="button" className="btn btn-primary" onClick={login}>Iniciar</button>
    </div>
    </form>
    </div>
    );
}

export default Login;
