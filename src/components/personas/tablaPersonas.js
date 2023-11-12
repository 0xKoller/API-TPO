import Persona from "../personas/persona";
import "../../styles/tablas.css";

export default function TablaPersonas ({ props }) {
    return(
        <table className="tabla">
            <thead>
                <tr className="tr">
                    <th className="th">Documento</th>
                    <th className="th">Nombre</th>
                    <th className="th">Usuario</th>
                    <th className="th">Rol</th>
                </tr>
            </thead>
            <tbody>
                {props && props.length > 0
                ? props.map((persona) => <Persona key={persona.documento} person={persona}/>) : null}
            </tbody>
        </table>
    );
}