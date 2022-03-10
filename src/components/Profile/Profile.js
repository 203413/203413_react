import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import ProfileStyle from './Profile.module.css'

const Profile = () => {
  var token = localStorage.getItem("token");
  var first_name = "";
  var last_name = "";
  var username = "";
  var email = "";

  let fullLiga = ""

  const navigate = useNavigate()
  
  const redconfig = () => {
    navigate('/Profile/' + localStorage.getItem('user_id') + '/settings')
  }

  var postData = {
    id_user: localStorage.getItem('user_id'),
    url_image: null
  }
  axios
    .post("http://localhost:8000/api/v1/user/profile", postData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token '+token,
      },
    })
    .then(response => {
      console.log('usuario creado')
      console.log(response.data)
    }).catch(
      (error) => {
        console.log(error.response.data)
        
      }
    )




  //const [liga, setLiga] = useState()
  //Consumiendo el componente de profile

  window.onload = function loadImg() {
    axios
      .get("http://localhost:8000/api/v1/user/profile/" + localStorage.getItem('user_id'), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token '+token,
        },
      })
      .then((response) => {
        if (response.data.url_image == null) {
          fullLiga = "http://127.0.0.1:8000/assets/img/Default.jpg"
          console.log(fullLiga)
        } else {
          fullLiga = "http://127.0.0.1:8000" + response.data.url_image
        }
        username = response.data.username;
        first_name = response.data.first_name;
        last_name = response.data.last_name;
        email = response.data.email;
        document.getElementById("first_name").value = first_name;
        document.getElementById("last_name").value = last_name;
        document.getElementById("correo").value = email;
        document.getElementById("user").value = username;
        document.getElementById('image').src = fullLiga
      })
      .catch((error) => {
        console.log(error.data)
        // fullLiga = "http://127.0.0.1:8000/assets/img/Default.jpg"
        // console.log(fullLiga)
        // document.getElementById('image').src = fullLiga
      })
  }
  return (
    <div className={ProfileStyle.body}>
      <div className={ProfileStyle.container}>
        <div className={ProfileStyle.cDer}>

          <input id="user" readOnly className={ProfileStyle.username} />
          <h3>
            
            <input id="first_name" readOnly className={ProfileStyle.names} />
            <input id="last_name" readOnly className={ProfileStyle.names} />
          </h3>
          <h3>
            <input id="correo" readOnly className={ProfileStyle.email} />
          </h3>

        </div>
        <div className={ProfileStyle.cIzq}>
          <img id='image' className={ProfileStyle.PImg}/>
        </div>
        <div   >
          <button onClick={redconfig} className={ProfileStyle.PButton}>
            Opciones
          </button>
        </div>



      </div>


    </div>
  )
}

export default Profile