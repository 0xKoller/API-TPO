import { useState, useEffect, useContext } from "react";
import { Loader } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/VerReclamo.css";
import NavigateBackButton from "../components/navigateBack/NavigateBackButton";
import "../styles/cards.css";
import { UserBearer, UserRoleContext } from "../App";
import axios from 'axios';
import { SuccessPopUp } from '../components/SwalPopUps/SwalPopUps';

export default function VerReclamo () {
    const {nroReclamo} = useParams();
    const [reclamo, setReclamo] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userRoleContext = useContext(UserRoleContext);
    
    const bearer = useContext(UserBearer);
    useEffect(() => {
        axios.get(`http://localhost:8080/tpo_apis/reclamos/${nroReclamo}`, {
            headers: {
                Authorization: `Bearer ${bearer}`
            },
            
        })
        .then((response) => {return response.data})
        .then((d) => {
            setReclamo(d)
        })
        .catch((e) => console.log(e))
        .finally(() => {
            setLoading(false)
        })
    }, []);

    function redirectToHome(){
        navigate(userRoleContext==="empleado"? "/reclamos": "/misReclamos");
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        let form;
        console.log(reclamo)
        if(reclamo.unidad !== 0){

            form = {
                "id": reclamo.id,
                "descripcion": reclamo.descripcion,
                "estado": e.target.unidad.value,
                "edificio": reclamo.edificio,
                "unidad": reclamo.unidad ,
                "areaComun": null,
                "usuario": reclamo.usuario,
                "fechaCreacion": reclamo.fechaCreacion,
                "fechaModificacion": new Date()
            }
        }else{
            form = {
                "id": reclamo.id,
                "descripcion": reclamo.descripcion,
                "estado": e.target.unidad.value,
                "edificio": reclamo.edificio,
                "unidad": null,
                "areaComun": reclamo.areaComun,
                "usuario": reclamo.usuario,
                "fechaCreacion": reclamo.fechaCreacion,
                "fechaModificacion": new Date()
            }
        }
        axios.put(`http://localhost:8080/tpo_apis/reclamos/${reclamo.id}`,
            JSON.stringify(form), {
                headers: {
                    Authorization: `Bearer ${bearer}`,
                     'Content-Type': 'application/json'
                }
            }
        ).then((response) => {
            SuccessPopUp("Reclamo modificado con éxito!")
            .then(() => navigate("/reclamos"))
    }).catch((e) => console.log(e))
}

   


    if (loading) {
        return (
          <div className="loading">
            <div className="loader">
              <Loader color="#FC6D14" />
            </div>
            <h3>Estamos buscando el reclamo seleccionado</h3>
          </div>
        );
    }
  
    else{ 
        const options = ["ABIERTO", "EN_PROCESO", "DESESTIMADO", "ANULADO", "TERMINADO"]
        return (
        <>
            <NavigateBackButton ruta={userRoleContext === "empleado" ? "/reclamos": "/misReclamos"}/>
            <section className="card-father-container mt-4 mb-4">            
            <div className="card-content">
                <h1 className="reclamo-titulo">Reclamo #{reclamo.id}</h1>
                <Form 
                onSubmit={handleUpdate}
                className='d-flex flex-column justify-content-center '
                >
                    <Form.Group className='d-flex flex-row m-1 justify-content-center  '>
                        <Form.Label className="reclamo-form-group-label text-end mx-2 w-100">Edificio:</Form.Label>
                        <Form.Label className="reclamo-form-group-label-answer text-start mx-2 w-100">{reclamo.edificio}</Form.Label>
                    </Form.Group>
                    
                    <Form.Group className='d-flex flex-column m-1 justify-content-center ' >
                        <Form.Label className="reclamo-form-group-label text-center w-100">Imagen</Form.Label>
                         {reclamo.fotos && reclamo.fotos.length > 0 ? reclamo.fotos.map((foto, index) => (
                    <div className='d-flex flex-row justify-content-center'>
                    <img key={index} src={`data:image/jpeg;base64,${foto.datosImagen}`} alt={`Imagen del reclamo ${index}`} className=' w-50 ' />
                </div>
                    )) :
                            <p>Este reclamo no posee imagenes</p>
                }
                    </Form.Group>
                    <Form.Group className='d-flex flex-column m-1'>
                        <Form.Label className="reclamo-form-group-label">Descripcion</Form.Label>
                        <Form.Label className="reclamo-form-group-label-answer">{reclamo.descripcion}</Form.Label>
                    </Form.Group>
                    <Form.Group className='d-flex flex-row m-1'>
                        <Form.Label className="reclamo-form-group-label">Estado:</Form.Label>
                        <Form.Select className="nuevoReclamo-form-group-input" name="unidad">
                                <option value={reclamo.estado}>{reclamo.estado}</option>
                                {options.map((option) => {
                                    if(option !== reclamo.estado){
                                        return <option key={option} value={option}>{option}</option>
                                    }
                                })}
                                </Form.Select>
                    </Form.Group>
                    {userRoleContext === "empleado" ?
                    <div className="text-center mt-5 btns-div">
                        <Button type='submit' variant="primary" className="card-cancel-button">Modificar</Button>    
                    </div>: null    
                }
                    <div className="text-center mt-5 btns-div">
                        <Button variant="primary" className="card-cancel-button" onClick={redirectToHome}>Volver atrás</Button>    
                    </div>
                </Form>           
            </div>
        </section>
    </>
    );
    }
}
