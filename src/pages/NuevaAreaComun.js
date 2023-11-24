import "../styles/NuevoReclamo.css";
import "../styles/cards.css";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {  UserBearer } from "../App";
import { SuccessPopUp, ErrorPopUp } from "../components/SwalPopUps/SwalPopUps"


export default function NuevaAreaComun(){
    const navigate = useNavigate();
    const bearer = useContext(UserBearer);
    const [edificios, setEdificios] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:8080/tpo_apis/edificios",
            {
                    headers: { 
                        'Authorization': `Bearer ${bearer}`
                     }
                }).then(res => {
                    setEdificios(res.data)
                })
            },[])

    function sendNuevaAreaComun(e){
        e.preventDefault();
        // Subimos imagenes a Cloudinary
        console.log()
        console.log()
        console.log()
        if(e.target.edificio.value === '-1'){
            ErrorPopUp("Seleccione un edificio", "Vuelva a intentarlo")
            return
         }
            const form ={
                        "piso": e.target.piso.value,
                        "nombre": e.target.nombre.value,
                        "edificio": {
                                "id": e.target.edificio.value  // Reemplaza con el ID de un edificio existente
                            }
                        }

            // Ejecutamos el fetch
            axios.post("http://localhost:8080/tpo_apis/areasComunes", JSON.stringify(form), 
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
                    <h1 className="text-center">Nueva area comun</h1>
                    <Form onSubmit={sendNuevaAreaComun}>
                        <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-label">Edificio:</Form.Label>
                            <Form.Select className="nuevoReclamo-form-group-input" name="edificio" required>
                                <option key="default" value="-1"></option>
                                {edificios && edificios.length > 0
                                ? edificios.map((edificio) => 
                                     <option key={edificio.id} value={edificio.id} name="unidad">{edificio.nombre}</option>
                                    )
                                : null
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-label">Piso:</Form.Label>
                            <Form.Control type="number" name="piso" className="nuevoReclamo-form-group-input" required/>
                        </Form.Group>
                            <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-label">Nombre:</Form.Label>
                            <Form.Control type="text" name="nombre" className="nuevoReclamo-form-group-input" required/>
                            </Form.Group>
                        
                        <div className="text-center mt-5 btns-div">
                            <Button className="button-cancel-standard" onClick={redirectToHome}>Cancelar</Button>
                            <Button variant="primary" className="button-standard button-new-reclamo-card" type="submit" >
                                Crear area comun 
                            </Button>       
                        </div>
                    </Form>           
                </div>
            </section>
        )
    }