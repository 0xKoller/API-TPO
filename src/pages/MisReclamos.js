import "../styles/HomeAdmin.css";
import "../styles/AdminPages.css";
import { useContext, useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import ListReclamos from "../components/reclamos/tablaReclamos";
import Drops from "../components/dropdowns/dropdown";
import Buscador from "../components/buscador/searchReclamo";
import { useNavigate } from "react-router-dom";
import { UserContext, UserDocumentContext } from "../App";
import { HandleSelectEdificio, HandleSelectEstado, HandleInputBuscador } from "../components/reclamos/FuncionesReclamos";
import { Button } from "react-bootstrap";


export default function MisReclamos(props) {
    const usuario = useContext(UserContext);
    const userDoc = useContext(UserDocumentContext);
    const [data, setData] = useState([]);
    const [dataInicial, setDataInicial] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const opcionDefaultEstados = "-- Elija un estado --";
    const opcionDefaultEdificios = "-- Elija un edificio --";
    const nroReclamoDefault = "";
    const [estadoReclamo, setEstadoReclamo] = useState(opcionDefaultEstados);
    const [edificioReclamo, setEdificioReclamo] = useState(opcionDefaultEdificios);
    const [nroReclamo, setNroReclamo] = useState(nroReclamoDefault);

    useEffect(() => {
        fetch(`http://localhost:8080/api/reclamos/reclamosPorPersona/${userDoc}/misReclamos`)
        .then((response) => response.json())
        .then((d) => {
            setData(d);
            setDataInicial(d);
        }).catch(e => console.log(e))
        .finally(() => setLoading(false));
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

    const handleSelectEstado = estado => {
        HandleSelectEstado({estado, setData, dataInicial, setEstadoReclamo, setNroReclamo, opcionDefaultEdificios, opcionDefaultEstados, edificioReclamo, nroReclamoDefault});
    }

    const handleSelectEdificio = edificio => {
        HandleSelectEdificio({edificio, setData, dataInicial, setEdificioReclamo, setNroReclamo, opcionDefaultEdificios, opcionDefaultEstados, estadoReclamo, nroReclamoDefault});
    }

    const handleInputBuscador = nroReclamo => {
        HandleInputBuscador({nroReclamo, setData, dataInicial, setEstadoReclamo, setEdificioReclamo, setNroReclamo, opcionDefaultEstados, opcionDefaultEdificios});
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
                    <Buscador nroReclamo={nroReclamo} handleInput={nroReclamo => handleInputBuscador(nroReclamo)}/>
                    <div className="drop-estados">
                        <h6 className="titulos-filtros">Estados</h6>
                        <Drops opcionActual={estadoReclamo} opcionDefault={opcionDefaultEstados} drop={"estados"} user={usuario} handleSelect={estado => handleSelectEstado(estado)}/>
                    </div>
                    <div className="drop-edificios">
                        <h6 className="titulos-filtros">Edificios</h6>
                        <Drops opcionActual={edificioReclamo} opcionDefault={opcionDefaultEdificios} drop={"edificios"} user={usuario} handleSelect={edificio => handleSelectEdificio(edificio)}/>
                    </div>
                </div>
                {data.length >= 1 ? 
                    <ListReclamos data={data} esAdmin={false} misReclamos={true}/>
                    : <h4 className="mensaje-error">No existen reclamos con las especificaciones brindadas</h4>
                }
            </section>
        </div>
    );
}
