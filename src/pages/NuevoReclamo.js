/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/NuevoReclamo.css";
import "../styles/cards.css";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { UserContext, UserDocumentContext, UserBearer, UserRoleContext } from "../App";
import { SuccessPopUp, ErrorPopUp } from "../components/SwalPopUps/SwalPopUps"
import { Loader } from "@mantine/core";

export default function NuevoReclamo(){
    const [loading, setLoading] = useState(false);
    const [edificiosHabilitados, setEdificiosHabilitados] = useState([]);
    const [edificioSeleccionado, setEdificioSeleccionado] = useState();
    const [areasComunes, setAreasComunes] = useState([]);
    const [unidades, setUnidades] = useState([]);

    const navigate = useNavigate();

    const bearer = useContext(UserBearer);
    const id = useContext(UserDocumentContext)
    const role = useContext(UserRoleContext)
    useEffect(() => {
        axios.get(`http://localhost:8080/tpo_apis/edificios`, {
            headers: {
                Authorization: `Bearer ${bearer}`
            }
    }).then((response) => {
            console.log(response.data)
            setEdificiosHabilitados(response.data);
        }).catch(e => console.log(e))
        // axios.get(`http://localhost:8080/tpo_apis/areasComunes`, {
        //     headers: {
        //         Authorization: `Bearer ${bearer}`
        //     }}).then((response) => {
        //         console.log(response.data)
        //         setAreasComunes(response.data);
        //     }).catch(e => console.log(e))
    }, []);

    useEffect(() => {
    if (edificioSeleccionado) {
        // Asegúrate de que edificioSeleccionado es convertido al tipo correcto.
// Si edificioSeleccionado es un string, conviértelo a número.
    const idSeleccionado = Number(edificioSeleccionado);
    const edificio = edificiosHabilitados.find(edificio => edificio.id === idSeleccionado);
        console.log(edificio)
        if(edificio.unidades && edificio.unidades.length > 0){

            console.log("Entro")
            const unidadesPorUsuario = edificio.unidades.filter(unidad =>
                unidad.duenio.id === id || (unidad.inquilino && unidad.inquilino.id === id)
                );
                setUnidades(unidadesPorUsuario);
            
        
    } else {
        // Si no hay unidades, establecer unidadesFiltradas como un array vacío.
        setUnidades([]);
    }
    if(edificio.areasComunes && edificio.areasComunes.length > 0){

            setAreasComunes(edificio.areasComunes);

    } else {
        // Si no hay unidades, establecer unidadesFiltradas como un array vacío.
        setAreasComunes([]);
    }

}}, [edificioSeleccionado, id]);


    const sendNuevoReclamo = async (e) => {
        e.preventDefault();
        // Subimos imagenes a Cloudinary
        const files = e.target.imagen.files[0];
        
        const date = new Date();
        let form;
        let valor = e.target.unidad.value;
        let esUnidad = valor.startsWith('unidad-');
        let esComun = valor.startsWith('comun-');


if(esUnidad) {
    form = {
        "usuario": id,
        "unidad": Number(valor.split('-')[1]), // Obtiene el XXXX de "unidad-XXX"
        "areaComun": null,
        "descripcion": e.target.descripcion.value,
        "edificio": e.target.edificio.value,
        "estado": "ABIERTO",
        "fotos": null,
        "fechaCreacion": date,
        "fechaModificacion": date
    };
} else if(esComun) {
    
    form = {
        "usuario": id,
        "unidad": null,
        "areaComun": Number(valor.split('-')[1]), // Obtiene el XXXX de "comun-XXXX"
        "descripcion": e.target.descripcion.value,
        "edificio": e.target.edificio.value,
        "estado": "ABIERTO",
        "fotos": null,
        "fechaCreacion": date,
        "fechaModificacion": date
    };
}

form = {
    
    "usuario":4,
  "unidad": null,
  "areaComun": null,
  "descripcion": "Descripción de mi reclamo",
  "edificio":null,
  "estado": "ABIERTO",
  "fotos": null,
  "fechaCreacion": "2023-10-31T08:00:00",
  "fechaModificacion": "2023-11-31T08:00:00"

}
            axios.post("http://localhost:8080/tpo_apis/reclamos", JSON.stringify(form), 
                {
                    headers: { 
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': `Bearer ${bearer}`
                     }

                })
                .then((e) => {
                    const formData = new FormData();
                    formData.append("archivo", files);
                    formData.append("reclamoId", e.data.id);
                    axios.post("http://localhost:8080/imagenes/subir", formData ,{headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${bearer}`
        }})
                })
                .catch(() => {
                    ErrorPopUp("No se ha podido crear el reclamo", "Inténtelo nuevamente mas tarde")
                })
                
            
        } 
    


    function redirectToHome(){
        navigate("/misreclamos");
    }

    if(loading){
        return (
            <div className="loading">
              <div className="loader">
                <Loader color="#FC6D14" />
              </div>
              <h3>Estamos preparando tu nuevo reclamo</h3>
            </div>
        );
    }else{
        return (
            <section className="card-father-container mt-4">            
                <div className="card-content">
                    <h1 className="text-center">Nuevo reclamo</h1>
                    <Form onSubmit={sendNuevoReclamo}>
                        <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-label">Edificio:</Form.Label>
                            <Form.Select className="nuevoReclamo-form-group-input" name="edificio" onChange={(e) => setEdificioSeleccionado(e.target.value)}>
                                <option value="-1"></option>
                                {edificiosHabilitados && edificiosHabilitados.length > 0
                                ? edificiosHabilitados.map((edificio) =>
                                        <option key={edificio.id} value={edificio.id} name="unidad">{edificio.nombre}</option>
                                         )
                                : null}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-label">Unidad:</Form.Label>
                            <Form.Select className="nuevoReclamo-form-group-input" name="unidad">
                                <option value="-1"></option>
                                {role && (role === "inquilino" || role === "duenio")
                                ? unidades.map((unidad) => 
                                     <option key={unidad.idUnidad} value={`unidad-${unidad}`} name="unidad">Piso: {unidad.piso}, Unidad: {unidad.nroUnidad}</option>
                                    )
                                : null
                                }
                                {areasComunes && areasComunes.length > 0 ? areasComunes.map((areaComun) =>
                                        <option key={areaComun.idAreaComun} value={`comun-${areaComun}`} name="unidad">Nombre: {areaComun.nombre} - Piso: {areaComun.piso}</option>
                                         ) :null    
                            }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-label">Descripción:</Form.Label>
                            <Form.Control as="textarea" rows={5} name="descripcion" className="nuevoReclamo-form-group-descripcion" required/>
                        </Form.Group>
                        <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-labelImagenes">Imagenes:</Form.Label>
                            <Form.Control type="file" name="imagen" accept="image/*" className="nuevoReclamo-form-group-inputFile"/>
                        </Form.Group>
                        <div className="text-center mt-5 btns-div">
                            <Button className="button-cancel-standard" onClick={redirectToHome}>Cancelar</Button>
                            <Button variant="primary" className="button-standard button-new-reclamo-card" type="submit" >
                                Crear reclamo
                            </Button>       
                        </div>
                    </Form>           
                </div>
            </section>
        )
    }
}