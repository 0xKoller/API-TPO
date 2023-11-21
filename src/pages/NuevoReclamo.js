import "../styles/NuevoReclamo.css";
import "../styles/cards.css";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { UserContext, UserDocumentContext } from "../App";
import { SuccessPopUp, ErrorPopUp } from "../components/SwalPopUps/SwalPopUps"
import { Loader } from "@mantine/core";

export default function NuevoReclamo(){
    const [loading, setLoading] = useState(true);
    const [edificiosHabilitados, setEdificiosHabilitados] = useState([]);
    const [unidadesHabilitadas, setUnidadesHabilitadas] = useState([]);
    const [edificioSeleccionado, setEdificioSeleccionado] = useState();
    const archivosURL = [];
    const navigate = useNavigate();

    const documentoUsuario = useContext(UserDocumentContext);
    const usuario = useContext(UserContext)

    useEffect(() => {
        Promise.all([
        fetch(`http://localhost:8080/usuarios/${documentoUsuario}/edificiosHabilitadosAReclamo`),
        fetch(`http://localhost:8080/usuarios/${documentoUsuario}/unidadesHabilitadasAReclamo`)
            ])
        .then(([resEdificios, resUnidades]) => 
        Promise.all([resEdificios.json(), resUnidades.json()])
        )
        .then(([dataEdificios, dataUnidades]) => {
            setEdificiosHabilitados(dataEdificios);
            setUnidadesHabilitadas(dataUnidades);

            setEdificioSeleccionado(dataEdificios[0].codigo);
        })
        .finally(() => setLoading(false));
    }, []);
    

    function sendNuevoReclamo(e){
        e.preventDefault();
        // Subimos imagenes a Cloudinary
        const files = Array.from(e.target.imagen.files);
        const uploaders = files.map((file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "tpo-api");
            formData.append("api_key", 451325535756131);
            return axios.post("https://api.cloudinary.com/v1_1/dayw2rwz8/image/upload", formData)
            .then(response => {
                const data = response.data;
                const imagen = {
                    "direccion": data.secure_url,
                    "tipo": data.format
                }
                //Obtenemos las URL de las imagenes y las agregamos al Array
                archivosURL.push(imagen);
            })
        });

        // Una vez que subimos todas las imagenes, creamos el reclamo
        axios.all(uploaders).then(() => 
        {
            const form = {
                "documento": documentoUsuario,
                "codigoEdificio": edificioSeleccionado,
                "ubicacion": e.target.ubicacion.value,
                "descripcion": e.target.descripcion.value,
                "imagenes": archivosURL,
                "estado": "Abierto"
            }
            // Si la unidad "Area comun" (value = -1) no enviamos la unidad
            if (e.target.unidad.value != '-1') form["identificadorUnidad"] = e.target.unidad.value;

            // Ejecutamos el fetch
            axios.post("http://localhost:8080/reclamos", JSON.stringify(form), 
                {
                    headers: { 
                        'Content-Type': 'application/json;charset=UTF-8',
                        usuario: usuario
                     }

                })
                .then((e) => {
                    // Si fue exitosa mostramos un PopUp de exito
                    SuccessPopUp('Reclamo creado con éxito!',`Tu número de reclamo: ${e.data}`)
                    .then(() => navigate('/misreclamos')) // Redirigimos a Mis Reclamos
                })
                .catch(() => {
                    // Si la peticion ha fallado, mostramos un PopUp de error
                    ErrorPopUp("No se ha podido crear el reclamo", "Inténtelo nuevamente mas tarde")
                })
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
                            {edificiosHabilitados.length > 1
                            ? <Form.Select onChange={(e) => setEdificioSeleccionado(e.target.value)} className="nuevoReclamo-form-group-input">
                                    {edificiosHabilitados && edificiosHabilitados.length > 0
                                    ? edificiosHabilitados.map((edificio) => 
                                        <option key={edificio.codigo} value={edificio.codigo} name="edificio">{edificio.nombre}</option>)
                                    : null
                                    }
                               </Form.Select>
                            : null
                            }
                            {edificiosHabilitados.length == 1
                            ? <Form.Label className="nuevoReclamo-form-group-input" value={edificiosHabilitados[0].codigo}>{edificiosHabilitados[0].nombre}</Form.Label>
                            : null
                            }
                        </Form.Group>
                        <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-label">Unidad:</Form.Label>
                            <Form.Select className="nuevoReclamo-form-group-input" name="unidad">
                                <option value="-1">Area común</option>
                                {unidadesHabilitadas && unidadesHabilitadas.length > 0
                                ? unidadesHabilitadas.map((unidad) => 
                                    unidad.edificio.codigo == edificioSeleccionado 
                                    ? <option key={unidad.id} value={unidad.id} name="unidad">Piso: {unidad.piso}, Unidad: {unidad.numero}</option>
                                    : null)
                                : null
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-label">Ubicación:</Form.Label>
                            <Form.Control type="text" name="ubicacion" className="nuevoReclamo-form-group-input" required/>
                        </Form.Group>
                        <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-label">Descripción:</Form.Label>
                            <Form.Control as="textarea" rows={5} name="descripcion" className="nuevoReclamo-form-group-descripcion" required/>
                        </Form.Group>
                        <Form.Group className="nuevoReclamo-form-group">
                            <Form.Label className="nuevoReclamo-form-group-labelImagenes">Imagenes:</Form.Label>
                            <Form.Control type="file" multiple name="imagen" accept="image/*" className="nuevoReclamo-form-group-inputFile"/>
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