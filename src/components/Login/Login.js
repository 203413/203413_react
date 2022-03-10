import LoginStyle from './Login.module.css'
import axios from 'axios';
import React, { Component } from "react";
import Register from '../Register/Register'


import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  BrowserRouter,
  Navigate,
  useNavigate,
  useParams
} from "react-router-dom";






function App(){
  const navigate = useNavigate()
  const params = useParams();
    
    const consumir_login = () => {
        var postData = {
            username: document.getElementById('userL').value,
            password: document.getElementById('passL').value,
          }

        axios
          .post("http://localhost:8000/api/v1/login/", postData, {
            Headers: { 'Content-Type': 'application/json', },
          })
          .then(response => {
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('username',response.data.username)
            localStorage.setItem('user_id',response.data.user_id)
            params.id=localStorage.setItem('user_id',response.data.user_id)
            /*localStorage.setItem('email',response.data.email)
            localStorage.setItem('first_name',response.data.first_name)
            localStorage.setItem('last_name',response.data.last_name)*/
            window.location='/Profile/'+response.data.user_id
          }).catch(
            (error) => {
              console.log(error.response.data);
              alert('Hacen falta datos');
            }
    
          )
    }
    return (
      <div className={LoginStyle.body}>
        <div className={LoginStyle.container}>
          <div className={LoginStyle.cIzq}>
            <h1 className={LoginStyle.titulo}>¡Bienvenido de nuevo!</h1>
            <br/>
            <p className={LoginStyle.TRegister}> ¿No tienes cuenta? <NavLink to="/Register">¡Registrate ahora!</NavLink></p>
            
          </div>

          <div className={LoginStyle.cDer}>

            <div className={LoginStyle.formulario}>
              <form>

              <div className={LoginStyle.boxCont}>
                
                <input class="input is-info" type="text" autocomplete="off" id = 'userL' required />
                <label>User</label>
              </div>

                <br/><br/>

              <div className={LoginStyle.boxCont}>
                
                <input class="input is-info" type="password" id = 'passL' required />
                <label> Password</label>
              </div>

              </form>
            </div>
          
    
          <header className={LoginStyle.boton}>
            <button onClick={consumir_login} className={LoginStyle.LButton}><span>Entrar</span></button>
          </header>
          </div>
        </div>
      </div>
      

        
    
      );
}

export default App;