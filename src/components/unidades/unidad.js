import { FaSearch } from "react-icons/fa";
import "../../styles/tablas.css";
import { Link } from "react-router-dom";

export default function Unidad({ unidad }) {

    return(
        <>
            <tr>
                <td className="td">{unidad.piso}</td>
                <td className="td">{unidad.numero}</td>
                <td className="td">{(unidad.habitado)?"Sí":"No"}</td>
                <td className="td">{unidad.cantInquilinos}</td>
                <td className="td">{unidad.cantDuenios}</td>
                <td className="extra"><Link to={`/unidades/${unidad.id}`} className="estado-extra"><FaSearch className="icons"/></Link></td>
            </tr>
        </>
    );
}