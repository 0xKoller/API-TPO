import "../styles/NuevoReclamo.css";
import "../styles/cards.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {  UserBearer } from "../App";
import { SuccessPopUp, ErrorPopUp } from "../components/SwalPopUps/SwalPopUps"


export default function NuevoEdificio(){
    const navigate = useNavigate();
    const bearer = useContext(UserBearer);



    
    function sendNuevoReclamo(e){
        e.preventDefault();
        // Subimos imagenes a Cloudinary
            const form ={
                "nombre": e.target.nombre.value,
                "direccion": {
                    "calle": e.target.calle.value,
                    "ciudad": e.target.ciudad.value,
                    "localidad": e.target.localidad.value,
                    "altura": e.target.altura.value
                },
                "createAt": new Date(),  // Fecha y hora en el formato ISO-8601
                "areasComunes": [],
                "unidades": []
                }

            // Ejecutamos el fetch
            axios.post("http://localhost:8080/tpo_apis/edificios", JSON.stringify(form), 
                {
                    headers: { 
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': `Bearer ${bearer}`
                     }
                })
                .then((e) => {
                    // Si fue exitosa mostramos un PopUp de exito
                    SuccessPopUp('Edificio creado con éxito!')
                    .then(() => navigate('/reclamos')) // Redirigimos a Mis Reclamos
                })
                .catch(() => {
                    // Si la peticion ha fallado, mostramos un PopUp de error
                    ErrorPopUp("No se ha podido crear el reclamo", "Inténtelo nuevamente mas tarde")
                })
            
        } 
    
    function redirectToHome(){
        navigate("/reclamos");
    }

    
        return (
            <section className="card-father-container mt-4">            
                <div className="card-content">
                    <h1 className="text-center">Nuevo edificio</h1>
                    <Form onSubmit={sendNuevoReclamo}>
                        <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-label">Nombre:</Form.Label>
                            <Form.Control type="text" name="nombre" className="nuevoReclamo-form-group-input" required/>
                        </Form.Group>
                        <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-label">Calle:</Form.Label>
                            <Form.Control type="text" name="calle" className="nuevoReclamo-form-group-input" required/>
                        </Form.Group>
                            <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-label">Altura:</Form.Label>
                            <Form.Control type="text" name="altura" className="nuevoReclamo-form-group-input" required/>
                            </Form.Group>
                        <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-label">Ciudad:</Form.Label>
                            <Form.Control type="text" name="ciudad" className="nuevoReclamo-form-group-input" required/>
                        </Form.Group>
                        <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-label">Localidad:</Form.Label>
                            <Form.Control type="text" name="localidad" className="nuevoReclamo-form-group-input" required/>
                            </Form.Group>
                        <div className="text-center mt-5 btns-div">
                            <Button className="button-cancel-standard" onClick={redirectToHome}>Cancelar</Button>
                            <Button variant="primary" className="button-standard button-new-reclamo-card" type="submit" >
                                Crear Edificio
                            </Button>       
                        </div>
                    </Form>           
                </div>
            </section>
        )
    }
