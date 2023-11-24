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

export default function VerReclamo () {
    const {nroReclamo} = useParams();
    const [reclamo, setReclamo] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userRoleContext = useContext(UserRoleContext);
    console.log(userRoleContext)
    const bearer = useContext(UserBearer);
    useEffect(() => {
        axios.get(`http://localhost:8080/tpo_apis/reclamos/${nroReclamo}`, {
            headers: {
                Authorization: `Bearer ${bearer}`
            }
        }
        )
        .then((response) => {return response.data})
        .then((d) => {
            setReclamo(d)
            console.log(d)
        })
        .catch((e) => console.log(e))
        .finally(() => {
            setLoading(false)
        })
    }, []);

    function redirectToHome(){
        navigate(userRoleContext==="administrador"? "/reclamos": "/misReclamos");
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
        return (
        <>
            <NavigateBackButton ruta={userRoleContext === "empleado" ? "/reclamos": "/misReclamos"}/>
            <section className="card-father-container mt-4 mb-4">            
            <div className="card-content">
                <h1 className="reclamo-titulo">Reclamo #{reclamo.id}</h1>
                <Form>
                    <Form.Group className="reclamo-form-group">
                        <Form.Label className="reclamo-form-group-label">Edificio:</Form.Label>
                        <Form.Label className="reclamo-form-group-label-answer">{reclamo.edificio}</Form.Label>
                    </Form.Group>
                    {/* <Form.Group className="reclamo-form-group">
                        <Form.Label className="reclamo-form-group-label">Unidad:</Form.Label>
                        {reclamo.unidad !== null 
                        ? <Form.Label className="reclamo-form-group-label-answer"> {reclamo.unidad.numero}</Form.Label>
                        : <Form.Label className="reclamo-form-group-label-answer">{reclamo.ubicacion}</Form.Label>
                        }                        
                    </Form.Group> */}
                    <Form.Group className="reclamo-form-group">
                        <Form.Label className="reclamo-form-group-label">Descripcion:</Form.Label>
                        <Form.Label className="reclamo-form-group-label-answer">{reclamo.descripcion}</Form.Label>
                    </Form.Group>
                    <Form.Group className="reclamo-form-group">
                        <Form.Label className="reclamo-form-group-label">Estado:</Form.Label>
                        <Form.Label className="reclamo-form-group-label-answer">{reclamo.estado}</Form.Label>
                    </Form.Group>
                    
                   
                    {/* <Form.Group className="reclamo-form-group-lista">
                        <Form.Label className="reclamo-form-group-labelImagenes">Imagenes:</Form.Label>
                        {reclamo.imagenes && reclamo.imagenes.length < 1 ? <Form.Label className="reclamo-form-group-label-notfound">No hay imágenes por el momento</Form.Label>
                        : reclamo.imagenes.map((imagen) => (<img className="reclamo-imagenes" key={imagen.direccion} src={imagen.direccion} alt=""></img>))}           
                    </Form.Group> */}
                    <div className="text-center mt-5 btns-div">
                        <Button variant="primary" className="card-cancel-button">Modificar</Button>    
                    </div>
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
