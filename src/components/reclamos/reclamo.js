import Form from 'react-bootstrap/Form';
import { FaPen, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CambiarEstadoPopUp, ErrorPopUp, SuccessPopUp } from '../SwalPopUps/SwalPopUps';
import "../../styles/tablas.css";


export default function Reclamo({ claim, esAdmin, misReclamos, modifySelected, cambiarEstadoPromise }) {
    const [estado, setEstado] = useState(claim.estado);

    function handleCheckBox(e){
        modifySelected(claim.numero, e.target.checked);
    }

    function handleCambiarEstado(){
        CambiarEstadoPopUp()
        .then((swalRes)=>{
            if (swalRes.isConfirmed) {
                cambiarEstadoPromise(claim.numero, swalRes.value.estado, swalRes.value.motivo)
                .then((e) => {
                    SuccessPopUp("Estado del reclamo cambiado con éxito!");
                    setEstado(swalRes.value.estado);
                })
                .catch((e) =>{
                    ErrorPopUp("Hubo un error al intentar cambiar el estado del reclamo", "Intentelo de nuevo mas tarde");
                })
            }
        });
    } 

    return(
        <>
            <tr>
                <td className="extra"><Form.Check id={claim.numero} onChange={(e) => handleCheckBox(e)} /></td>
                <td className="td">{claim.numero}</td>
                <td className="td">{claim.edificio.nombre}</td>
                <td className="td">{claim.unidad !== null ? `Piso ${claim.unidad.piso} - ${claim.unidad.numero}` : "Area común"} </td>
                <td className="td">{claim.ubicacion}</td>
                {esAdmin || !misReclamos? <td className="td">{claim.usuario.nombre}</td> : null}
                <td className="td">{estado}</td>
                <td className="extra"><Link to={`/reclamos/${claim.numero}`} className="estado-extra"><FaSearch className="icons"/></Link></td>
                {esAdmin ? <td className="extra"><button className="estado-extra" onClick={handleCambiarEstado}><FaPen className="icons"/></button></td> : <></>}
            </tr>
        </>
    );
}