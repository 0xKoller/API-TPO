import "../styles/HomeAdmin.css";
import "../styles/UnidadesAdmin.css";
import { useContext, useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import TablaUnidades from "../components/unidades/tablaUnidades";
import { useParams } from "react-router-dom";
import React from "react";
import NavigateBackButton from "../components/navigateBack/NavigateBackButton"
import axios from 'axios';
import { UserBearer } from '../App';


export default function UnidadesAdmin() {
    const {idEdificio} = useParams();
    const [unidades, setUnidades] = useState([]);
    const [areasComunes, setAreasComunes] = useState([]);
    const [edificio, setEdificio] = useState({});
    const [loading, setLoading] = useState(false);
    const bearer = useContext(UserBearer);

    useEffect(() => {
        axios.get(`http://localhost:8080/tpo_apis/edificios/${idEdificio}`, {
            headers: {
                Authorization: `Bearer ${bearer}`
            }
        }
        ).then((response) => {return response.data}).then((d) => {
            setAreasComunes(d.areasComunes)
            setUnidades(d.unidades)
            setEdificio(d)
        })
    }, []);

    if (loading) {
        return (
          <div className="loading">
            <div className="loader">
              <Loader color="#FC6D14" />
            </div>
            <h3>Estamos buscando todos las unidades para el edificio seleccionado</h3>
          </div>
        );
      }

    return (
        <>
        <NavigateBackButton ruta={`/edificios`}> {"<"} Volver atras </NavigateBackButton>
        <div className="principal mt-5">
            <section className="navigation">
                <div className="titulo">
                    <h1>Administración Unidades</h1>
                    <h5 className="subtitulo">Edificio {edificio.nombre}</h5>
                </div>
            </section>
                <section className="unidades">
                <h3 className="subtitulo">Unidades</h3>
                {unidades && unidades.length >= 1 ? 
                    unidades.map((unidad) => <div className='container-fluid d-flex flex-row justify-content-between my-1 card py-2 px-1'>  
                    <p className='fw-bold mx-1'>Unidad: <span className='fw-normal'>{unidad.idUnidad}</span></p>
                    <p className='fw-bold mx-1'>Piso: <span className='fw-normal'>{unidad.piso}</span></p>
                    <p className='fw-bold mx-1'>Numero: <span className='fw-normal'>{unidad.nroUnidad}</span></p>
                    <p className='fw-bold mx-1'>Estado: <span className='fw-normal'>{unidad.estado}</span></p>
                    </div>)
                    : <h4 className="mensaje-error">Este edificio no posee unidades</h4>
                }
            </section>
            <section className="unidades">
                <h3 className="subtitulo">Areas Comunes</h3>
                {areasComunes && areasComunes.length >= 1 ? 
                    areasComunes.map((unidad) => <div className='container-fluid d-flex flex-row justify-content-evenly my-1 card py-2 px-1'>  
                    
                    <p className='fw-bold mx-1'>Nombre: <span className='fw-normal'>{unidad.nombre}</span></p>
                    <p className='fw-bold mx-1'>Piso: <span className='fw-normal'>{unidad.piso}</span></p>
                    
                    </div>)
                    : <h4 className="mensaje-error">Este edificio no posee areas comunes</h4>
                }
            </section>
        </div>
        </>
    );
}