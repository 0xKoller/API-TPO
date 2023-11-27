import "../styles/HomeAdmin.css";
import "../styles/AdminPages.css";
import { useContext, useEffect, useState } from "react";
import { UserBearer, UserContext } from "../App";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

export default function HomeAdmin() {
    const usuario = useContext(UserContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [edificiosNames, setEdificiosNames] = useState([]);
    const navigate = useNavigate();
    const bearer = useContext(UserBearer);


    useEffect(() => {
        fetch("http://localhost:8080/tpo_apis/reclamos", {
            method: "GET",
            headers: {
                usuario: `${usuario}`
            }
        })
        .then((response) => response.json())
        .then((d) => {
            setData(d);
        }).catch(e => console.log(e))
        .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/tpo_apis/edificios`, {
        headers: {
            Authorization: `Bearer ${bearer}`
        }
    }    
        ).then((response) => {
            setEdificiosNames(response.data);
            console.log(response.data)
        }).catch(e => console.log(e))
    }, [data]);
    
    const handleReclamo = (id) => {
        navigate(`../reclamos/${id}`);
    }
    const nuevoReclamo = () => {
        navigate("../nuevoreclamo");
    }
    return(
        <div className="principal">
            <section className="navigation">
                <div className="titulo">
                    <h1>Reclamos creados en mis edificios</h1>
                </div>
            </section>
            <section className="reclamos">
                <Button variant="primary" className="button-new-reclamo" onClick={nuevoReclamo}>Nuevo reclamo</Button>
                <div>
                    {edificiosNames && edificiosNames.length > 0 &&
                    data && data.length > 0 ? data.map((reclamo) => <div key={reclamo.id} className='container-fluid d-flex flex-row justify-content-between m-2 card py-2 align-items-center'>
                         <p className='fw-bold mx-1'>Edificio: <span className='fw-normal'>{
                            edificiosNames.find(edificio => edificio.id === reclamo.edificio).nombre
                        }</span></p>   
                        
                        <p className='fw-bold mx-1'>Unidad: <span className='fw-normal'>{
                            reclamo.unidad ? reclamo.unidad : "No aplica"
                        

                        }</span></p>
                        <p className='fw-bold mx-1'>Estado: <span className='fw-normal'>{reclamo.estado}</span></p>
                        <p className='fw-bold mx-1'>Descripcion: <span className='fw-normal'>{reclamo.descripcion}</span></p>
                        <p className='fw-bold mx-1'>Area comun: <span className='fw-normal'>
                            {reclamo.areaComun ? 
                                edificiosNames.find(edificio => edificio.id === reclamo.edificio).areasComunes.find(area => area.id === reclamo.idAreaComun).nombre
                            : "No aplica"}
                            </span></p>
                        <button className='btn btn-primary' onClick={() => handleReclamo(reclamo.id)}>Ver reclamo</button>
                    </div>) :null}
                </div>
            </section>
        </div>
    );
}

