import "../styles/HomeAdmin.css";
import "../styles/AdminPages.css";
import { useContext, useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { UserBearer, UserDocumentContext } from "../App";
import { Button } from "react-bootstrap";
import axios from 'axios';


export default function MisReclamos(props) {
    const userDoc = useContext(UserDocumentContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const bearer = useContext(UserBearer)

    useEffect(() => {
        axios.get(`http://localhost:8080/tpo_apis/reclamos`, {
            headers: {
                Authorization: `Bearer ${bearer}`
            }
        }).then((response) => {
            const reclamos = response.data.filter(reclamo => reclamo.usuario === userDoc);
            setData(reclamos);
        })
        .catch(e => console.log(e))
        
    }, []);

    if (loading) {
        return (
          <div className="loading">
            <div className="loader">
              <Loader color="#FC6D14" />
            </div>
            <h3>Estamos buscando todos los reclamos</h3>
          </div>
        );
    }

    const nuevoReclamo = () => {
        navigate("../nuevoreclamo");
    }
    
    return(
        <div className="principal">
            <section className="navigation">
                <div className="titulo">
                    <h1>Mis Reclamos</h1>
                </div>
            </section>
            <section className="reclamos">
                <div className="filtros">
                <Button variant="primary" className="button-new-reclamo" onClick={nuevoReclamo}>Nuevo reclamo</Button>
                    
                </div>
                {data && data.length > 0 ? 
                    data.map((reclamo) => 
                        <div key={reclamo.id} className='card d-flex flex-row justify-content-evenly m-2 p-2'>
                            <p className='fw-bold'>Reclamo N#<span className='fw-normal'>{reclamo.id}</span></p>
                            <p className='fw-bold'>Edificio: <span className='fw-normal'>{reclamo.edificio}</span></p>
                            {reclamo.unidad ? <p className='fw-bold'>Unidad: <span className='fw-normal'>{reclamo.unidad}</span></p> : <p className='fw-bold'>Area Comun: <span className='fw-normal'>{reclamo.areaComun}</span></p>}
                            <p className='fw-bold'>Estado: <span className='fw-normal'>{reclamo.estado}</span></p>
                            <button className="btn btn-primary" onClick={() => navigate(`/reclamos/${reclamo.id}`)}>Ver Reclamo</button>
                        </div>
                    )
                    :
                    <div className="no-reclamos">
                        <h1>No hay reclamos</h1>
                    </div>}
            </section>
        </div>
    );
}
