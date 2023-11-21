import React, { useContext, useEffect, useState } from "react";
import {UserContext} from "../App"
import { useParams } from "react-router-dom";
import "../styles/EditarUnidades.css"
import { Loader } from "@mantine/core";
import Button from "react-bootstrap/Button";
import TablaPersonasUnidades from "../components/personasUnidades/tablaPersonasUnidades"
import { ErrorPopUp, SuccessPopUp, InputPopUp, ValidationPopUp } from "../components/SwalPopUps/SwalPopUps"
import NavigateBackButton from "../components/navigateBack/NavigateBackButton"

export default function EditarUnidades() {
	const user = useContext(UserContext);
	const {idUnidad} = useParams();
	const [unidad, setUnidad] = useState({});
	const [loading, setLoading] = useState(true);
	const [duenios, setDuenios] = useState([]);
	const [inquilinos, setInquilinos] = useState([]);

	const liberarUnidad = () => {
		ValidationPopUp(`Liberar unidad?`, "Esta seguro que desea liberar la unidad?", "Liberar")
		.then((swalRes) => {
			if (swalRes.isConfirmed) {
				fetch(`http://localhost:8080/unidades/${unidad.id}/liberar`,
				{
					method: "PUT",
					cors: "no-cors",
					cache: "no-cache",
					credentials: "same-origin",
					headers: {
						usuario: user,
					}
				})
				.then(async (response) => {
					if (response.status===200){
						SuccessPopUp("Unidad liberada con exito!");
						setInquilinos([])
						setUnidad({...unidad,habitado:false})
					}else{
						let error = await response.text((body)=>body)
						ErrorPopUp("Error al liberar la unidad",error)
					}
				})
				.catch((e) => console.log(e))
			}
		})
		
	}

	const habitarUnidad = () =>{
		fetch(`http://localhost:8080/unidades/${unidad.id}/habitar`,{
				method: "PUT",
				cors: "no-cors",
				cache: "no-cache",
				credentials: "same-origin",
				headers: {
					usuario: user,
				}
			})
		.then(async (response)=>{
			if (response.status===200){
				SuccessPopUp("Unidad habitada con exito!")
				.then(()=>{
					let unidadCopy = {...unidad};
					unidadCopy.habitado = true;
					setUnidad(unidadCopy);
				});
			}else{
				let error = await response.text((body)=>body)
				ErrorPopUp("Error al habitar la unidad",error)
			}
		})
		.catch((e) => console.log(e))
	}

	const deshabitarUnidad = () =>{
		fetch(`http://localhost:8080/unidades/${unidad.id}/deshabitar`,{
				method: "PUT",
				cors: "no-cors",
				cache: "no-cache",
				credentials: "same-origin",
				headers: {
					usuario: user,
				}
			})
		.then(async (response)=>{
			if (response.status===200){
				SuccessPopUp("Unidad deshabitada con exito!")
				.then(()=>{
					let unidadCopy = {...unidad};
					unidadCopy.habitado = false;
					setUnidad(unidadCopy);
				})
			}else{
				let error = await response.text((body)=>body)
				ErrorPopUp("Error al deshabitar la unidad",error)
			}
		})
		.catch((e) => console.log(e))
	}

	const validarExistenciaPersona = async (persona) =>{
		return await fetch(`http://localhost:8080/usuarios/${persona}`)
		.then((response) => response.status===200)
	}

	const agregarDuenioHandle = () =>{
		let duenio;
		InputPopUp("Agregar Dueño",'Ingrese el documento del nuevo dueño',"DNI11111111",validarExistenciaPersona,"La persona de documento ingresado no se encuentra registrada", "Agregar")
		.then(async (swalRes) => {
			await fetch(`http://localhost:8080/usuarios/${swalRes.value}`)
			.then(async (response) => response.json())
			.then((data)=> {
				duenio = data
				return ValidationPopUp(`${data.nombre} - ${data.documento}`, "Esta seguro que desea agregarlo?", "Agregar")
			})
			.then(async (swalResult) => {
				if (swalResult.isConfirmed) {
					if(await agregarDuenio(duenio)){
						let dueniosCopy = [...duenios];
						dueniosCopy.push(duenio);
						setDuenios(dueniosCopy);
					}
				}
			})
			.catch((e) => console.log(e))
		})
	}

	const agregarDuenio = (duenio) =>{
		return fetch(`http://localhost:8080/unidades/${unidad.id}/agregarDuenio/${duenio.documento}`,
		{
			method: "PUT",
			cors: "no-cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				usuario: user,
			}
		})
		.then(async (response)=>{
			if (response.status!==200){
				let error = await response.text((body)=>body)
				ErrorPopUp("Error al agregar dueño",error)
				return false;
			}
			return true;
		})
		.catch((e) => console.log(e))
	}

	const agregarInquilinoHandle = (alquilar=true) =>{
		let inquilino;
		InputPopUp("Agregar Inquilino",'Ingrese el documento del nuevo inquilino',"DNI11111111",validarExistenciaPersona,"La persona de documento ingresado no se encuentra registrada", "Agregar")
		.then((swalRes) => {
			fetch(`http://localhost:8080/usuarios/${swalRes.value}`)
			.then(async (response) => response.json())
			.then((data)=> {
				inquilino = data
				return ValidationPopUp(`${data.nombre} - ${data.documento}`, "Esta seguro que desea agregarlo?","Agregar")
			})
			.then(async (swalResult) => {
				if (swalResult.isConfirmed) {
					if(await (alquilar? alquilarUnidad(inquilino):agregarInquilino(inquilino))){
						let inquilinosCopy = [...inquilinos];
						inquilinosCopy.push(inquilino);
						setInquilinos(inquilinosCopy);
					}
				}
			})
			.catch((e) => console.log(e))
		})
	}

	const agregarInquilino = (inquilino) =>{
		return fetch(`http://localhost:8080/unidades/${unidad.id}/agregarInquilino/${inquilino.documento}`,
		{
			method: "PUT",
			cors: "no-cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				usuario: user,
			}
		})
		.then(async (response)=>{
			if (response.status!==200){
				let error = await response.text((body)=>body)
				ErrorPopUp("Error al agregar inquilino",error)
				return false;
			}
			return true;
		})
		.catch((e) => console.log(e))
	}

	const alquilarUnidad = (inquilino) =>{
		return fetch(`http://localhost:8080/unidades/${unidad.id}/alquilar/${inquilino.documento}`,
		{
			method: "PUT",
			cors: "no-cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				usuario: user,
			}
		})
		.then(async (response)=>{
			if (response.status!==200){
				let error = await response.text((body)=>body)
				ErrorPopUp("Error al agregar inquilino",error)
				return false;
			}
			setUnidad({...unidad, habitado:true})
			return true;
		})
		.catch((e) => console.log(e))
	}

	const eliminarDuenio = async (duenio) => {
		await ValidationPopUp("Esta seguro?", `Se eliminará a ${duenio.nombre} - ${duenio.documento}`, "Eliminar")
		.then(async (swalResult) => {
			if (swalResult.isConfirmed) {
				fetch(`http://localhost:8080/unidades/${unidad.id}/eliminarDuenio/${duenio.documento}`,
					{
						method: "PUT",
						cors: "no-cors",
						cache: "no-cache",
						credentials: "same-origin",
						headers: {
							usuario: user,
						}
					})
					.then(async (response) => {
						if (response.status !== 200) {
							let error = await response.text((body) => body)
							ErrorPopUp("Error al eliminar dueño", error)
						} else {
							let dueniosCopy = [...duenios]
							dueniosCopy.splice(dueniosCopy.indexOf(duenio), 1)
							setDuenios(dueniosCopy)
						}
					})
					.catch((e) => console.log(e))
			}
		})
	}

	const eliminarInquilino = async (inquilino) =>{
		await ValidationPopUp("Esta seguro?", `Se eliminará a ${inquilino.nombre} - ${inquilino.documento}`,"Eliminar")
		.then(async (swalResult) => {
			if (swalResult.isConfirmed) {
				fetch(`http://localhost:8080/unidades/${unidad.id}/eliminarInquilino/${inquilino.documento}`,
				{
					method: "PUT",
					cors: "no-cors",
					cache: "no-cache",
					credentials: "same-origin",
					headers: {
						usuario: user,
					}
				})
				.then(async (response)=>{
					if (response.status!==200){
						let error = await response.text((body)=>body)
						ErrorPopUp("Error al eliminar inquilino",error)
					}else{
						let inquilinosCopy = [...inquilinos]
						inquilinosCopy.splice(inquilinosCopy.indexOf(inquilino),1)
						setInquilinos(inquilinosCopy)
						if(inquilinosCopy.length ===0){
							setUnidad({...unidad,habitado:false})
						}
					}
				})
				.catch((e) => console.log(e))
			}
		})
	}

	const transferirUnidadHandle = () =>{
		let duenio;
		InputPopUp("Transferir unidad",'Ingrese el documento del nuevo dueño',"DNI11111111",validarExistenciaPersona,"La persona de documento ingresado no se encuentra registrada","Transferir")
		.then(async (swalRes) => {
			await fetch(`http://localhost:8080/usuarios/${swalRes.value}`)
			.then(async (response) => response.json())
			.then((data)=> {
				duenio = data
				return ValidationPopUp(`${data.nombre} - ${data.documento}`, "Esta seguro que desea transferir la unidad?", "Transferir")
			})
			.then(async (swalResult) => {
				if (swalResult.isConfirmed) {
					if(await transferirUnidad(duenio)){
						setDuenios([duenio]);
					}
				}
			})
			.catch((e) => console.log(e))
		})
	}

	const transferirUnidad = (duenio) =>{
		return fetch(`http://localhost:8080/unidades/${unidad.id}/transferir/${duenio.documento}`,
		{
			method: "PUT",
			cors: "no-cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				usuario: user,
			}
		})
		.then(async (response)=>{
			if (response.status!==200){
				let error = await response.text((body)=>body)
				ErrorPopUp("Error al transferir la unidad",error)
				return false;
			}
			return true;
		})
		.catch((e) => console.log(e))
	}

	useEffect(() => {
		fetch(`http://localhost:8080/unidades/${idUnidad}`)
		.then((response) => response.json())
		.then((d) => {
			setUnidad(d);
			return fetch(`http://localhost:8080/unidades/${idUnidad}/duenios`)
		}).then((response) =>  response.json())
		.then((d) => {
			setDuenios(d)
			return fetch(`http://localhost:8080/unidades/${idUnidad}/inquilinos`)
		}).then((response) => response.json())
		.then((d)=> {
			setInquilinos(d)	
		})
		.finally(()=> {
			setLoading(false)
		})
		.catch((e)=>console.log(e))
	}, [])
	
	if (loading) {
        return (
          <div className="loading">
            <div className="loader">
              <Loader color="#FC6D14" />
            </div>
            <h3>Estamos recuperando la informacion de la unidad</h3>
          </div>
        );
    }else{
		return (
			<>
			<NavigateBackButton ruta={`/edificios/${unidad.edificio.codigo}/unidades`}> {"<"} Volver atras </NavigateBackButton>
			<div className="container">
				<div className="info-unidad">
					<h1>Unidad {unidad.id}</h1>
					<h4>Edificio: {unidad.edificio.nombre}</h4>
					<p><b>Piso: </b>{unidad.piso}</p>
					<p><b>Numero: </b>{unidad.numero}</p>
					<p><b>Habitado: </b>{unidad.habitado ? "Si":"No"}</p>
				</div>
				<div className="container-tables">
					<div className="container-single-table">
						<div className="titulo-botones-tabla">	
							<h3 className="self-start">Dueños</h3>
							{
							unidad.habitado ? 
								<Button variant="primary" className="btn-editarUnidad" onClick={deshabitarUnidad}> Deshabitar </Button> 
								: <Button variant="primary" className="btn-editarUnidad" onClick={habitarUnidad}> Habitar </Button>
							}
							<Button variant="primary" className="btn-editarUnidad" onClick={transferirUnidadHandle}>
							Transferir
							</Button>
							<Button variant="primary" className="btn-editarUnidad" onClick={agregarDuenioHandle}>
							Agregar
							</Button>
						</div>
						<TablaPersonasUnidades personas={duenios} eliminarPersona={eliminarDuenio}/>
					</div>
					<div className="container-single-table">
						<div className="titulo-botones-tabla">	
							<h3 className="self-start">Inquilinos</h3>
							<Button variant="primary" className="btn-editarUnidad" onClick={liberarUnidad}>
							Liberar
							</Button>
							{
							inquilinos.length > 0 ?
							<Button variant="primary" className="btn-editarUnidad" onClick={() => agregarInquilinoHandle(false)}> Agregar </Button>
							: <Button variant="primary" className="btn-editarUnidad" onClick={() => agregarInquilinoHandle(true)}> Alquilar </Button>
							}
							
						</div>
						<TablaPersonasUnidades personas={inquilinos} eliminarPersona={eliminarInquilino}/>
					</div>
				</div>
			</div>
			</>
		);
	}
}
