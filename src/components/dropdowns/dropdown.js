import "../../styles/Dropdown.css";
import { useEffect,useState } from "react";


export default function Dropdowns({ opcionActual, opcionDefault, drop, user, handleSelect }){
    const [data, setData] = useState([opcionDefault]);
    useEffect(() => {
        fetch(`http://localhost:8080/api/reclamos/${drop}`, {
            method: "GET",
            headers: {
                'usuario': `${user}`,
    }})
        .then((response) => response.json())
        .then((d) => {
            setData(data.concat(d));
        }).catch(e => console.log(e))
    }, []);

    const handleChange = value => {
        handleSelect(value);
    }

    return(
        <select value={opcionActual} onChange={change => handleChange(change.target.value)} className="select">
            {data && data.length > 0
            ? data.map((dp, pos) => <option key={pos}>{dp}</option>) : opcionDefault}
        </select>
    );
}