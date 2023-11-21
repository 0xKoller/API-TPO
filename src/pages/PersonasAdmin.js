import "../styles/AdminPages.css";
import "../styles/PersonasAdmin.css";
import { useContext, useEffect, useState } from "react";
import {UserContext} from "../App";
import { Loader } from "@mantine/core";
import ListPersonas from "../components/personas/tablaPersonas";
import Buscador from "../components/buscador/searchPersona";
import Button from "react-bootstrap/Button";
import { AltaPersonaPopUp, SuccessPopUp, ErrorPopUp } from "../components/SwalPopUps/SwalPopUps";
import axios from "axios";


export default function PersonasAdmin() {
    const usuario = useContext(UserContext);
    
    const [data, setData] = useState([]);
    const [dataInicial, setDataInicial] = useState([]);
    const [loading, setLoading] = useState(true);
    const [documento, setDocumento] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/usuarios/`)
        .then((response) => response.json())
        .then((d) => {
            setData(d);
            setDataInicial(d);
        }).catch(e => console.log(e))
        .finally(() => setLoading(false))
    }, []);

    if (loading) {
        return (
          <div className="loading">
            <div className="loader">
              <Loader color="#FC6D14" />
            </div>
            <h3>Estamos buscando a todas las personas</h3>
          </div>
        );
      }

    const handleInputBuscador = documento => {
        documento === "" ? setData(dataInicial) : setData(dataInicial.filter(persona => persona.documento.slice(0,documento.length) == documento));
        setDocumento(documento);
    }

    function addPersonAction(){
        AltaPersonaPopUp()
        .then( (swalRes) => {
            if (swalRes.isConfirmed){
                axios.post("http://localhost:8080/usuarios", JSON.stringify(swalRes.value), 
                {
                    headers: { 
                        'Content-Type': 'application/json;charset=UTF-8',
                        usuario: usuario
                     }
                })
                .then( (e) => {
                    SuccessPopUp("Persona creada con éxito!", `Has creado correctamente a ${swalRes.value.nombre}`);
                    setData([...data, {...swalRes.value}])
                    setDataInicial([...dataInicial, {...swalRes.value}])
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
                    <Buscador documento={documento} handleInput={documento => handleInputBuscador(documento)}/>
                    <Button variant="primary" className="agregar-persona button-standard" onClick={addPersonAction}> Agregar </Button>
                </div>
                {data.length >= 1 ? 
                <ListPersonas props={data} />
                : <h4 className="mensaje-error">No hay ninguna persona con ese documento</h4>
                }
                
            </section>
        </div>
    );

}