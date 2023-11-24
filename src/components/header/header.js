import "./header.css"
import { Link, useResolvedPath, useMatch } from 'react-router-dom'

import { useContext } from "react";
import { UserAuthenticatedContext } from "../../App"
import Button from "react-bootstrap/Button";

export default function NavBar(props){

    const { cerrarSesionCallback } = props;

    const isUserAuthenticated = useContext(UserAuthenticatedContext);

    const isAdmin = props.isAdmin;

    if (isUserAuthenticated){
        return isAdmin ? <NavBarAdmin cerrarSesionCallback={cerrarSesionCallback}/> : <NavBarGuest cerrarSesionCallback={cerrarSesionCallback}/>
    }
    return null;
    
}

function NavBarAdmin({cerrarSesionCallback}){
    return(
        <nav>
            <ul className="nav-container">
                <CustomLink route="/reclamos" text="Reclamos"/>
                <CustomLink route="/edificios" text="Edificios"/>
                <CustomLink route="/personas" text="Personas"/>
            </ul>
            <Button variant="primary" className="cerrar-sesion" onClick={cerrarSesionCallback}>Cerrar sesión</Button>
        </nav>       
    )
}

function NavBarGuest({cerrarSesionCallback}){
    return(
        <nav>
            <ul className="nav-container">
                <CustomLink route="/misReclamos" text="Mis reclamos"/>
            </ul>
            <Button variant="primary" className="cerrar-sesion" onClick={cerrarSesionCallback}>Cerrar sesión</Button>
        </nav>
    )
}


function CustomLink(props){
    const path = useResolvedPath(props.route);
    const isActive = useMatch({ path: path.pathname, end: true});
    return <Link to={props.route} className=  { isActive ? 'active header-link' : 'header-link'} > {props.text} </Link>
}