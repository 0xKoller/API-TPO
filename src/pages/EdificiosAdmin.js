import "../styles/AdminPages.css";
import "../styles/EdificiosAdmin.css";
import { React, useContext, useEffect, useState } from "react";
import {UserBearer} from "../App"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EdificiosAdmin({ }) {
    const [edificios, setEdificios] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const bearer = useContext(UserBearer);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8080/tpo_apis/edificios`, {
            headers: {
                Authorization: `Bearer ${bearer}`
            }
    })
        .then((response) => {return response.data})
        .then((d) => {
            setEdificios(d);
            console.log(d)
        }).catch(e => console.log(e))
        .finally(() => setLoading(false));
    }, []);

    const nuevoEdificio = () => {
        navigate("../nuevoEdificio");
    }
    const nuevaUnidad = () => {
        navigate("../nuevaUnidad");
    }
    const nuevaAreaComun = () => {
        navigate("../nuevaAreaComun");
    }
    const verEdificio = (id) => {
        navigate(`../edificios/${id}`);
    }

    return(
        <div className="principal">
            <section className="navigation">
                <div className="titulo">
                    <h1>Administración de edificios</h1>
                </div>
            </section>
            <section className="edificios">
                <button className="btn btn-primary my-1" onClick={nuevoEdificio}>Nuevo edificio</button>
                <button className="btn btn-primary my-1" onClick={nuevaUnidad}>Nueva unidad</button>
                <button className="btn btn-primary my-1" onClick={nuevaAreaComun}>Nueva area comun</button>
                {edificios && edificios.length >= 1 ? 
                    edificios.map((edificio) => <div className='container-fluid d-flex flex-row justify-content-between my-1 card py-2 px-1'>
                    <p className='fw-bold mx-1'>Edificio: <span className='fw-normal'>{edificio.nombre}</span></p>
                    <p className='fw-bold mx-1'>Calle: <span className='fw-normal'>{edificio.direccion.calle}</span></p>
                    <p className='fw-bold mx-1'>Altura: <span className='fw-normal'>{edificio.direccion.altura}</span></p>
                    <p className='fw-bold mx-1'>Ciudad: <span className='fw-normal'>{edificio.direccion.ciudad}</span></p>
                    <p className='fw-bold mx-1'>Localidad: <span className='fw-normal'>{edificio.direccion.localidad}</span></p>
                    <button className='btn btn-primary' onClick={() => verEdificio(edificio.id)}>Ver edificio</button>
                    </div>)
                    : <h4 className="mensaje-error">No posee edificios asignados</h4>
                }
                
            </section>
        </div>
    );
}
