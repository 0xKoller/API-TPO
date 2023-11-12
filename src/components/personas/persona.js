import "../../styles/tablas.css";

export default function Persona({ person }) {
    return(
        <tr>
            <td className="td">{person.documento}</td>
            <td className="td">{person.nombre}</td>
            <td className="td">{person.usuario}</td>
            <td className="td">{person.rol}</td>
        </tr>
    );
}