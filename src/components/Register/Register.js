import axios from 'axios';
import React, { Component } from "react";

import Login from '../Login/Login'
import RegisterStyle from './Register.module.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  BrowserRouter,
  Navigate,
  useNavigate
} from "react-router-dom";
var token = localStorage.getItem("token");

function App() {
  

  const navigate = useNavigate()
  const consumir_crear = () => {
    var postData = {
      username: document.getElementById('user').value,
      password: document.getElementById('pass').value,
      password2: document.getElementById('pass2').value,
      email: document.getElementById('correo').value,
      first_name: document.getElementById('nombre').value,
      last_name: document.getElementById('apellido').value
  
    }
    // alert("Hola login");
    axios
      .post("http://localhost:8000/api/v1/crear_usuario/", postData, {
        Headers: { 'Content-Type': 'application/json', },
      })
      .then(response => {
        console.log(response.data);
        navigate('/')
        alert('Usuario creado')
      }).catch(
        (error) => {
          console.log(error.response.data);
          alert('Error'+error.response.data)
        }

      )
  }



  return (

    <div>
      
     

      <div className={RegisterStyle.container}>
        <div className={RegisterStyle.cIzq}>
          <h1 className={RegisterStyle.titulo}>Registro</h1>
          <p className={RegisterStyle.TLogin}>Es rápido y fácil. <br/> Si ya está registrado, <NavLink to="/">ingrese aquí</NavLink> </p>
        
        </div>

        <div className={RegisterStyle.cDer}>
        <div className={RegisterStyle.formulario}>
          <form>
          <div className={RegisterStyle.boxCont}>
            
            <input class="input is-info" type="text" autocomplete="off" id = 'user' required />
            <label>Usuario</label> 
          </div>

            <br/>
          
          <div className={RegisterStyle.boxCont}>
            
            <input class="input is-info" type="text" autocomplete="off" id = 'pass' required />
            <label>Contrasenia</label>
          </div>

            <br/>

          <div className={RegisterStyle.boxCont}>
            
            <input class="input is-info" type="text" autocomplete="off" id = 'pass2' required />
            <label>Contrasenia (de nuevo)</label>
          </div> 

            <br/>

          <div className={RegisterStyle.boxCont}>
            
            <input class="input is-info" type="text" autocomplete="off" id = 'correo' required />
            <label>Correo</label>
          </div> 

            <br/>
            
          <div className={RegisterStyle.boxCont}> 
            
            <input class="input is-info" type="text" autocomplete="off" id = 'nombre' required />
            <label>Nombre</label>
          </div>

            <br/>

          <div className={RegisterStyle.boxCont}> 
            
            <input class="input is-info" type="text" autocomplete="off" id = 'apellido' required />
            <label>Apellido</label>
          </div>


          </form>
          <header className="App-header">
        
        <button onClick={consumir_crear} className={RegisterStyle.LButton2} role="button"><span class="text">Registrarse</span><span>Vamos!</span></button>
        </header>
        </div>
        </div>
        
        
      </div>




      
    </div>

  );



}

export default App;