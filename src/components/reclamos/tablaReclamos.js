import Reclamo from "./reclamo";
import "../../styles/tablas.css";
import "../../styles/tablaReclamos.css";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { CambiarEstadoPopUp, SuccessPopUp, ErrorPopUp } from "../SwalPopUps/SwalPopUps";
import { useContext } from 'react';
import { UserContext } from '../../App';

export default function TablaReclamos ({ data, esAdmin, misReclamos }) {

    const [selected, setSelected] = useState([])
    const usuario = useContext(UserContext)
    const [reclamos, setReclamos] = useState(data)

    function modifySelected(idReclamo, isChecked){
        if(isChecked){
            setSelected([...selected, idReclamo])
        }else{
            let copySelected = [...selected]
            copySelected.splice(copySelected.indexOf(idReclamo),1)
            setSelected(copySelected)
        }
    }

    useEffect(() => {setReclamos(data)}, [data])

    function cambiarEstadoPromise(numero, estado, motivo){
        return fetch(`http://localhost:8080/api/reclamos/${numero}/cambiarEstado`,
        {
            method: "PUT",
            cors: "no-cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                usuario: usuario,
            },
            body: JSON.stringify({estado:estado,motivo:motivo})
        })
    }

    function cambiarEstadoMultiple(){
        CambiarEstadoPopUp()
        .then((swalRes)=>{
            if(swalRes.isConfirmed){
                let estado = swalRes.value.estado
                let motivo = swalRes.value.motivo
                const promises = selected.map((idReclamo) => cambiarEstadoPromise(idReclamo,estado,motivo))
                Promise.all(promises)
                .then(() => {
                    const reclamosUpdate = reclamos.map(element => {
                        if(selected.includes(element.numero)){
                            return {...element, estado:estado}
                        }else{
                            return element
                        }
                    })
                    setReclamos(reclamosUpdate);
                    SuccessPopUp("Estado del los reclamos cambiados con éxito!");
                })
                .catch((e) =>{
                    console.log(e)
                    ErrorPopUp("Hubo un error al intentar cambiar el estado del los reclamos", "Intentelo de nuevo mas tarde");
                })
            }
        })
    }

    return(
        <>
        {(selected.length > 1) ? <Button variant="primary" className="cambiar-multi-estado mb-4" onClick={cambiarEstadoMultiple}> Cambiar multiples </Button> : ""}
        <table className="tabla">
            <thead>
                <tr className="tr">
                    <th></th>
                    <th className="th">N° Reclamo</th>
                    <th className="th">Edificio</th>
                    <th className="th">Unidad</th>
                    <th className="th">Ubicacion</th>
                    {esAdmin || !misReclamos ? <th className="th">Persona</th> : null}
                    <th className="th">Estado</th>
                    <th></th>
                    {esAdmin ? <th></th> : <></>}
                </tr>
            </thead>
            <tbody>
                {reclamos && reclamos.length > 0 ? 
                reclamos.map((reclamo, index) => <Reclamo key={index+reclamo.estado} claim={reclamo} esAdmin={esAdmin} misReclamos={misReclamos} modifySelected={modifySelected} cambiarEstadoPromise={cambiarEstadoPromise} />) : null}
            </tbody>
        </table>
        </>
    );
}
