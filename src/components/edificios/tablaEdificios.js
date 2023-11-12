import Edificio from "./edificio";
import "../../styles/tablas.css";

export default function TablaEdificios ({ edificios, esAdmin }) {

    return(
        <table className="tabla">
            <thead>
                <tr className="tr">
                    <th className="th">Edificio</th>
                    <th className="th">Dirección</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {edificios && edificios.length > 0
                ? edificios.map((edificio) => <Edificio key={edificio.codigo} edificio={edificio} esAdmin={esAdmin}/>) : null}
            </tbody>
        </table>
    );
}
