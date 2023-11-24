import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login"
import PersonasAdmin from "./pages/PersonasAdmin";
import HomeAdmin from "./pages/HomeAdmin"
import NotFound from "./pages/NotFound";
import NuevoReclamo from "./pages/NuevoReclamo";
import './App.css';
import React, { useState } from "react";
import Recupero from "./pages/Recupero";
import EditarUnidades from "./pages/EditarUnidades";

import EdificiosAdmin from "./pages/EdificiosAdmin";
import UnidadesAdmin from "./pages/UnidadesAdmin";
import VerReclamo from "./pages/VerReclamo";
import Navbar from "./components/header/header";
import MisReclamos from "./pages/MisReclamos";
import ReclamosMisEdificios from "./pages/ReclamosMisEdificios";
import NuevoEdificio from './pages/NuevoEdifico';
import NuevaUnidad from './pages/NuevaUnidad';
import NuevaAreaComun from './pages/NuevaAreaComun';

export const UserAuthenticatedContext = React.createContext(false);
export const UserContext = React.createContext(null);
export const UserRoleContext = React.createContext(null);
export const UserDocumentContext = React.createContext(null);
export const UserBearer = React.createContext(null);

function App() {
  const [isUserAuthenticated , setIsUserAuthenticated] = useState(sessionStorage.getItem("isUserAuthenticated"))
  const [userRole , setUserRole] = useState(sessionStorage.getItem("userRole"));
  const [user , setUser] = useState(sessionStorage.getItem("user"));
  const [userDocument, setUserDoc] = useState(sessionStorage.getItem("userDoc"))
  const [userBearer, setUserBearer] = useState(sessionStorage.getItem("jwt"))
  const landingPageAdmin = "/reclamos";
  const landingPageUsuarioBasico = "/misReclamos";
  const navigate = useNavigate();
  const paginaLogin = "/*";

  const cerrarSesion = () => {
    navigate("/");
    sessionStorage.removeItem("user");
    setUser(null);
    sessionStorage.removeItem("userRole");
    setUserRole(null);
    sessionStorage.removeItem("userDoc");
    setUserDoc(null);
    sessionStorage.removeItem("isUserAuthenticated");

    setIsUserAuthenticated(false);
    
    console.log("Sesion cerrada")
  }

  if(isUserAuthenticated){
    if(userRole==="empleado"){
      //rutas usuario administrador
      return (
        <>
          <UserAuthenticatedContext.Provider value={isUserAuthenticated}>
          <UserContext.Provider value={user}>
          <UserRoleContext.Provider value={userRole}>
          <UserDocumentContext.Provider value={userDocument}>
          <UserBearer.Provider value={userBearer}>
          <Navbar isAdmin={true} cerrarSesionCallback={cerrarSesion}/>
          <Routes>
            <Route path="/unidades/:idUnidad" element={<EditarUnidades />}/>
            <Route exact path="/reclamos" element={<HomeAdmin />}/>
            <Route exact path="/edificios" element={<EdificiosAdmin />}/>
            <Route exact path="/nuevoEdificio" element={<NuevoEdificio />}/>
            <Route exact path="/nuevaUnidad" element={<NuevaUnidad />}/>
            <Route exact path="/nuevaAreaComun" element={<NuevaAreaComun />}/>
            <Route exact path="/personas" element={<PersonasAdmin />}/>
            <Route exact path="/edificios/:idEdificio" element={<UnidadesAdmin />}/>
            <Route exact path="/reclamos/:nroReclamo" element={<VerReclamo />}/>
            <Route exact path="/nuevoreclamo" element={<NuevoReclamo />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          </UserBearer.Provider>
          </UserDocumentContext.Provider>
          </UserRoleContext.Provider>
          </UserContext.Provider>
          </UserAuthenticatedContext.Provider>
        </>)
    }else{
      //rutas usuario basico
      return (
        <>
          <UserAuthenticatedContext.Provider value={isUserAuthenticated}>
          <UserContext.Provider value={user}>
          <UserRoleContext.Provider value={userRole}>
          <UserDocumentContext.Provider value={userDocument}>
            <UserBearer.Provider value={userBearer}>
          <Navbar isAdmin={false} cerrarSesionCallback={cerrarSesion}/>
            <Routes>
              <Route exact path="/misReclamos" element={<MisReclamos cerrarSesion={cerrarSesion} />}/>
              <Route exact path="/edificioReclamos" element={<ReclamosMisEdificios />}/>
              <Route exact path="/reclamos/:nroReclamo" element={<VerReclamo />}/>
              <Route path="/*" element={<NotFound />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/nuevoreclamo" element={<NuevoReclamo />} />
                    </Routes>
          </UserBearer.Provider>
          </UserDocumentContext.Provider>
          </UserRoleContext.Provider>
          </UserContext.Provider>
          </UserAuthenticatedContext.Provider>
        </>
      )
    }
  }else{
    //rutas usuario no autenticado
    return (
      <Routes>
        <Route path="/recupero" element={<Recupero paginaLogin={paginaLogin} />} />
        <Route
          exact path={paginaLogin}
          element={
            <Login
              setIsUserAuthenticated={setIsUserAuthenticated}
              setUserRole={setUserRole}
              setUser={setUser}
              setUserDoc={setUserDoc}
              setUserBearer={setUserBearer}
              landingPageAdmin={landingPageAdmin}
              landingPageUsuarioBasico={landingPageUsuarioBasico}
            />} />
      </Routes>
    )
  }
}

export default App;
