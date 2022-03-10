import React from 'react'
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import EditStyle from "./EditProfile.module.css"

const EditProfile = () => {
    var auxUser = "";
    var auxfn = "";
    var auxln = "";
    var auxemail = "";
    var token = localStorage.getItem("tokenLocal");
    var id_user = localStorage.getItem("user_id");
    var image_profile = "";
    const params = useParams();
    const navigate = useNavigate();

    const regresar = () =>{
        window.location='/Profile/'+id_user
    }

    const logout = () =>{
        window.location='/'
    }

    axios
        .get("http://localhost:8000/api/v1/user/profile/" + id_user, {
            headers: {
                'Authorization': "Token 7d772eff3c31851df260714078f92e032a2c0e1d",
            },
        })
        .then((response) => {
            console.log(response.data);
            if (response.data.url_image == null) {
                image_profile = "http://127.0.0.1:8000/assets/img/Default.jpg"
            } else {
                image_profile = "http://localhost:8000" + response.data.url_image;
            }
            document.getElementById("image").src = image_profile;
            auxUser = response.data.username;
            auxfn = response.data.first_name;
            auxln = response.data.last_name;
            auxemail = response.data.email;
            
        })
        .catch((error) => {
            console.log(image_profile);
            console.error("Error al obtener la imagen");
        });

    const consumir_update_user = () => {
        var putData = new FormData();
        var usernamePut = document.getElementById("username").value;
        var lastNamePut = document.getElementById("lastname").value;
        var firstNamePut = document.getElementById("firstname").value;
        var emailPut = document.getElementById("e-mail").value;

        if (usernamePut == null||usernamePut==''){
            console.log('dato nulo')
            usernamePut=auxUser
        }
        if (lastNamePut == null||lastNamePut==''){
            console.log('dato nulo')
            lastNamePut=auxln
        }
        if (firstNamePut == null||firstNamePut==''){
            console.log('dato nulo')
            firstNamePut=auxfn
        }
        if (emailPut == null||emailPut==''){
            console.log('dato nulo')
            emailPut=auxemail
        }

        putData.append("first_name", firstNamePut);
        putData.append("last_name", lastNamePut);
        putData.append("username", usernamePut);
        putData.append("email", emailPut);

        // var putData={
        //     username: document.getElementById("username").value,
        //     first_name: document.getElementById("firstname").value,
        //     last_name: document.getElementById("lastname").value,
        //     email: document.getElementById("e-mail").value
        // }

        console.log(id_user)
        axios.put("http://localhost:8000/api/v1/user/data/" + id_user + "/", putData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Token 7d772eff3c31851df260714078f92e032a2c0e1d",
            }
        }).then((response) => {
            alert("se actualizaron los datos");
            //window.location.reload();
        }).catch((error) => {
            alert("No se pudieron actualizar los datos");
        })

    }

    const Updateimg = () => {
        let putData = new FormData();;
        putData.append('url_image', document.getElementById('img').files[0]);
        axios.put("http://localhost:8000/api/v1/user/profile/" + id_user, putData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Token 7d772eff3c31851df260714078f92e032a2c0e1d",
            }
        }).then((response) => {
            console.log(response.data);
            image_profile = "http://localhost:8000" + response.data.url_image;
            console.log(image_profile);
            document.getElementById('img').src = image_profile;
            alert("Imagen de perfil actualizada")
            window.location.reload();
        }).catch((error) => {
            console.log(error.response.data);
        })
    }


    return (
        <div>EditProfile
            <button onClick={regresar} class={EditStyle.EButton3} role="button">Regresar</button>
            <div className={EditStyle.container}>
                <div className={EditStyle.cDer}>
                    <h1>Editar información</h1>
                    <div className={EditStyle.formulario}>
                        <form>
                            <div className={EditStyle.EBox}>
                                <input class="input is-info" id="username" type="text" autocomplete="off" required />
                                <label>Username</label>
                            </div>

                            <div className={EditStyle.EBox}>
                                <input class="input is-info" id="firstname" type="text" autocomplete="off" required />
                                <label>Primer Nombre</label>
                            </div>

                            <div className={EditStyle.EBox}>
                                <input class="input is-info" id="lastname" type="text" autocomplete="off" required />
                                <label>Ultimo Nombre</label>
                            </div>

                            <div className={EditStyle.EBox}>
                                <input class="input is-info" id="e-mail" type="text" autocomplete="off" required />
                                <label>Correo</label>
                            </div>
                        </form>
                        <button onClick={consumir_update_user}>Actualizar datos</button>
                    </div>
                    <h1>Editar foto de perfil</h1>
                    <img id='image' className={EditStyle.EImg} />
                    <input accept="image/*" type="file" id="img"></input>
                    <button onClick={Updateimg}>Cambiar imagen</button>
                </div>
                <div className={EditStyle.cIzq}>
                    <button class={EditStyle.EButton2} role="button">Editar perfil</button>
                    <button onClick={logout}class={EditStyle.EButton} role="button">Log out</button>


                </div>
            </div>

        </div>
    )
}

export default EditProfile