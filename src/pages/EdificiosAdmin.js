import "../styles/AdminPages.css";
import "../styles/EdificiosAdmin.css";
import { React, useContext, useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import TablaEdificios from "../components/edificios/tablaEdificios";
import {UserContext} from "../App"

export default function EdificiosAdmin({ }) {
    const usuario = useContext(UserContext);
    const [edificios, setEdificios] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8080/edificios/admin`, {
            method: "GET",
            headers: {
                usuario: `${usuario}`,
    }})
        .then((response) => response.json())
        .then((d) => {
            setEdificios(d);
        }).catch(e => console.log(e))
        .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
          <div className="loading">
            <div className="loader">
              <Loader color="#FC6D14" />
            </div>
            <h3>Estamos buscando todos los edificios</h3>
          </div>
        );
      }

    return(
        <div className="principal">
            <section className="navigation">
                <div className="titulo">
                    <h1>Administración de edificios</h1>
                </div>
            </section>
            <section className="edificios">
                {edificios.length >= 1 ? 
                    <TablaEdificios edificios={edificios} esAdmin={true} />
                    : <h4 className="mensaje-error">No posee edificios asignados</h4>
                }
                
            </section>
        </div>
    );
}
