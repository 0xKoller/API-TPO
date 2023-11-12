import { FaSearch } from "react-icons/fa";
import "../../styles/tablas.css";
import { Link } from "react-router-dom";


export default function Edificio({ edificio }) {

    return(
        <>
            <tr>
                <td className="td">{edificio.nombre}</td>
                <td className="td">{edificio.direccion}</td>
                <td className="extra"><Link to={`/edificios/${edificio.codigo}/unidades`} className="estado-extra"><FaSearch className="icons"/></Link></td>
            </tr>
        </>
    );
}