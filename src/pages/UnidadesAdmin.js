import "../styles/HomeAdmin.css";
import "../styles/UnidadesAdmin.css";
import { useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import TablaUnidades from "../components/unidades/tablaUnidades";
import { useParams } from "react-router-dom";
import React from "react";
import NavigateBackButton from "../components/navigateBack/NavigateBackButton"


export default function UnidadesAdmin() {
    const {idEdificio} = useParams();
    const [unidades, setUnidades] = useState([]);
    const [edificio, setEdificio] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8080/api/edificios/${idEdificio}/unidades`)
        .then((response) => response.json())
        .then((d) => {
            setUnidades(d.reverse());
            return fetch(`http://localhost:8080/api/edificios/${idEdificio}`)
        })
        .then((response) => response.json())
        .then((d) => {
            setEdificio(d)
        })
        .catch(e => console.log(e))
        .finally(() => {
            setLoading(false)});
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
                {unidades.length >= 1 ? 
                    <TablaUnidades unidades={unidades} esAdmin={true} />
                    : <h4 className="mensaje-error">Este edificio no posee unidades</h4>
                }
            </section>
        </div>
        </>
    );
}