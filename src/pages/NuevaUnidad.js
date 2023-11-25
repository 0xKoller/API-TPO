import "../styles/NuevoReclamo.css";
import "../styles/cards.css";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {  UserBearer } from "../App";
import { SuccessPopUp, ErrorPopUp } from "../components/SwalPopUps/SwalPopUps"


export default function NuevaUnidad(){
    const navigate = useNavigate();
    const bearer = useContext(UserBearer);
    const [edificios, setEdificios] = useState([]);
    const [duenios, setDuenios] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:8080/tpo_apis/edificios",
            {
                    headers: { 
                        'Authorization': `Bearer ${bearer}`
                     }
                }).then(res => {
                    setEdificios(res.data)
                })
        axios.get("http://localhost:8080/tpo_apis/usuarios",{
                    headers: { 
                        'Authorization': `Bearer ${bearer}`
                     }
                }).then(res => {return res.data}).then((d) => {
                    setDuenios(d)
                })
            },[])

    function sendNuevoReclamo(e){
        e.preventDefault();
        if(e.target.edificio.value === '-1'){
            ErrorPopUp("Seleccione un edificio", "Vuelva a intentarlo")
            return
            }
            if(e.target.duenio.value === '-1'){
                ErrorPopUp("Seleccione un duenio", "Vuelva a intentarlo")
                return
                }

            const form ={
                        "piso": e.target.piso.value,
                        "nroUnidad": e.target.unidad.value,
                        "estado": e.target.estado.value,  // Elige un estado válido de acuerdo a tu enum EstadoUnidad
                        "duenio": {
                            "id": e.target.duenio.value  // Reemplaza con el ID de un usuario existente
                        },
                        "inquilino": {
                            "id": e.target.inquilino.value  // Reemplaza con el ID de un usuario existente
                        },
                        "edificio": {
                            "id": e.target.edificio.value  // Reemplaza con el ID de un edificio existente
                        }
                        }
                    console.log(form)
            // Ejecutamos el fetch
            axios.post("http://localhost:8080/tpo_apis/unidades", JSON.stringify(form), 
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
                    <h1 className="text-center">Nueva unidad</h1>
                    <Form onSubmit={sendNuevoReclamo}>
                        <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-label">Edificio:</Form.Label>
                            <Form.Select className="nuevoReclamo-form-group-input" name="edificio">
                                <option value="-1"></option>
                                {edificios && edificios.length > 0
                                ? edificios.map((edificio) => 
                                     
                                     <option key={edificio.id} value={edificio.id} name="unidad">{edificio.nombre}</option>
                                    )
                                : null
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-label">N unidad:</Form.Label>
                            <Form.Control type="text" name="unidad" className="nuevoReclamo-form-group-input" required/>
                        </Form.Group>
                        <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-label">Piso:</Form.Label>
                            <Form.Control type="text" name="piso" className="nuevoReclamo-form-group-input" required/>
                        </Form.Group>
                            <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-label">Estado:</Form.Label>
                            <Form.Select className="nuevoReclamo-form-group-input" name="estado">
                                <option value="VACIA">Vacia</option>
                                <option value="ALQUILADA">Alquilada</option>
                                <option value="HABITADA">Habilitada</option>
                            </Form.Select>
                            </Form.Group>
                        <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-label">Habitante:</Form.Label>
                            <Form.Select className="nuevoReclamo-form-group-input" name="inquilino">
                                <option value="null">Sin inquilino</option>
                                {duenios && duenios.length > 0 ? duenios.map((duenio) => 
                                     
                                     <option key={duenio.id} value={duenio.id} name="inquilino">{duenio.nombreUsuario}</option>
                                    ) : null
                                
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-label">Duenio:</Form.Label>
                            <Form.Select className="nuevoReclamo-form-group-input" name="duenio">
                                <option value="-1"></option>
                                {duenios && duenios.length > 0 ? duenios.map((duenio) => 
                                     
                                     <option key={duenio.id} value={duenio.id} name="inquilino">{duenio.nombreUsuario}</option>
                                    ) : null
                                
                                }
                            </Form.Select>
                            </Form.Group>
                        <div className="text-center mt-5 btns-div">
                            <Button className="button-cancel-standard" onClick={redirectToHome}>Cancelar</Button>
                            <Button variant="primary" className="button-standard button-new-reclamo-card" type="submit" >
                                Crear Unidad
                            </Button>       
                        </div>
                    </Form>           
                </div>
            </section>
        )
    }
