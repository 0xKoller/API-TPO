import "../styles/AdminPages.css";
import "../styles/PersonasAdmin.css";
import { useContext, useEffect, useState } from "react";
import {UserBearer, UserContext, UserDocumentContext} from "../App";
import { Loader } from "@mantine/core";
import ListPersonas from "../components/personas/tablaPersonas";
import Buscador from "../components/buscador/searchPersona";
import Button from "react-bootstrap/Button";
import { AltaPersonaPopUp, SuccessPopUp, ErrorPopUp } from "../components/SwalPopUps/SwalPopUps";
import axios from "axios";


export default function PersonasAdmin() {
        
    const [data, setData] = useState([]);
    const [dataInicial, setDataInicial] = useState([]);
    const [loading, setLoading] = useState(false);
    const [documento, setDocumento] = useState("");
    const bearer = useContext(UserBearer);
    const userDoc = useContext(UserDocumentContext);

    const getUsers = async () => {
        axios.get(`http://localhost:8080/tpo_apis/usuarios`, {
        headers: {
            Autorization: `Bearer ${bearer}`
        }
    }).then((response) => {
        setDataInicial(response.data);
    });
    }

    useEffect(() => {
    getUsers();
}, []);
  
    useEffect(() => {
    const newData = {};
    dataInicial.forEach(e => {
        if (e.id !== userDoc) {
            newData[e.id] = e;
        }
    });

    // Convirtiendo el objeto de usuarios únicos a un array
    const filteredData = Object.values(newData);

    // Actualizando el estado 'data' con los datos filtrados
    setData(filteredData);
}, [dataInicial]);

    function addPersonAction(){
        AltaPersonaPopUp()
        .then( (swalRes) => {
            if (swalRes.isConfirmed){
                console.log(swalRes.value)
                axios.post("http://localhost:8080/tpo_apis/usuarios", JSON.stringify(swalRes.value), 
                {
                    headers: { 
                        'Content-Type': 'application/json;charset=UTF-8',
                        Autorization: `Bearer ${bearer}`
                     }
                })
                .then( (e) => {
                    SuccessPopUp("Persona creada con éxito!", `Has creado correctamente a ${swalRes.value.nombre}`);
                    getUsers();
                })
                .catch( (e) => ErrorPopUp("No se pudo crear la persona", e.response.data)
                )
            }
        })
    }

    return(
        <div className="principal">
            <section className="navigation">
                <h1 className="titulo">Administración de personas</h1>
            </section>
            <section className="personas">
                <div className="filtros">
                    
                    <Button variant="primary" className="agregar-persona button-standard" onClick={addPersonAction} > Agregar </Button>
                </div>
                {data && data.length >= 1 ? 
                data.map((persona) => <div className='card d-flex flex-row justify-content-evenly m-1 align-content-center'>
                    <p className='fw-bold mx-1'>Nombre: <span className='fw-normal'>{persona.nombreUsuario}</span></p>
                    <p className='fw-bold mx-1'>Rol: <span className='fw-normal'>{persona.rolUsuario}</span></p>
                    <p className='fw-bold mx-1'>ID: <span className='fw-normal'>{persona.id}</span></p>
                </div>)    
                : <h4 className="mensaje-error">No hay ninguna persona con ese documento</h4>
                }
                
            </section>
        </div>
    );

}