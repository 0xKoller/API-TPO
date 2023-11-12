import React from "react";
import {FiTrash2} from 'react-icons/fi'
import "../../styles/TablaPersonasUnidades.css"

export default function TablaPersonasUnidades(props){

    const eliminarPersona = props.eliminarPersona;
    
    return( <table>
            <thead>
                <tr>
                    <th>Documento</th>
                    <th align="right">Nombre</th>
                </tr>
            </thead>
            <tbody>
            {props.personas.map((row, i) => (
                <tr key={i}>
                    <td scope="row">{row.documento}</td>
                    <td align="left">{row.nombre}</td>
                    <td align="center"><FiTrash2 size={25} className="trash-icon clickable" onClick={() => eliminarPersona(row)}/></td>
                </tr>
            ))}
            </tbody>
			</table>)
}