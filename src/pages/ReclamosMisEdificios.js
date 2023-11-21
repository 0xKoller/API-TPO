import "../styles/HomeAdmin.css";
import { useContext, useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import ListReclamos from "../components/reclamos/tablaReclamos";
import Drops from "../components/dropdowns/dropdown";
import Buscador from "../components/buscador/searchReclamo";
import { UserContext, UserDocumentContext } from "../App";
import { HandleSelectEdificio, HandleSelectEstado, HandleInputBuscador } from "../components/reclamos/FuncionesReclamos";

export default function ReclamosMisEdificios() {
    const usuario = useContext(UserContext);
    const userDoc = useContext(UserDocumentContext);
    const [data, setData] = useState([]);
    const [dataInicial, setDataInicial] = useState([]);
    const [loading, setLoading] = useState(true);
    const opcionDefaultEstados = "-- Elija un estado --";
    const opcionDefaultEdificios = "-- Elija un edificio --";
    const nroReclamoDefault = "";
    const [estadoReclamo, setEstadoReclamo] = useState(opcionDefaultEstados);
    const [edificioReclamo, setEdificioReclamo] = useState(opcionDefaultEdificios);
    const [nroReclamo, setNroReclamo] = useState(nroReclamoDefault);

    useEffect(() => {
        fetch(`http://localhost:8080/reclamos/reclamosPorPersona/${userDoc}/reclamosEnMisEdificios`)
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
                    <h1>Reclamos en mis edificios</h1>
                </div>
            </section>
            <section className="reclamos">
                <div className="filtros">
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
                    <ListReclamos data={data} esAdmin={false} misReclamos={false}/>
                    : <h4 className="mensaje-error">No existen reclamos con las especificaciones brindadas</h4>
                }
            </section>
        </div>
    );
}
