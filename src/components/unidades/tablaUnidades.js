import Unidad from "./unidad";
import "../../styles/tablas.css";

export default function TablaUnidades ({ unidades, esAdmin }) {
    return(
        <table className="tabla">
            <thead>
                <tr className="tr">
                    <th className="th">Piso</th>
                    <th className="th">Número</th>
                    <th className="th">Habitada</th>
                    <th className="th">Nro Inquilinos</th>
                    <th className="th">Nro Dueños</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {unidades && unidades.length > 0
                ? unidades.map((unidad) => <Unidad key={unidad.id} unidad={unidad} esAdmin={esAdmin}/>) : null}
            </tbody>
        </table>
    );
}
