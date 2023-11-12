import "../styles/Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export default function Recupero(props) {
	const { paginaLogin } = props;
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	let navigate = useNavigate();
	const cambioPass = (e) => {
		e.preventDefault();
		let documento = e.target[0].value;
		let usuario = e.target[1].value;
		let password1 = e.target[2].value;
		let password2 = e.target[3].value;
		if (password1!==password2 || !password1){
			if(password1){
				setErrorMsg("Las contraseñas no coinciden")
			}
			setError(true)
		}else{
			fetch(`http://localhost:8080/api/usuarios/${documento}/cambiarPassword`, {
				method: "PUT",
				headers: {
					usuario: usuario,
				},
				body: password1
			}).then(async (response) => {
				if (response.status === 201) {
					Swal.fire({ 
						title: 'Cambio exitoso!',
						html: 'Esta siendo redirigido al log in',
						icon: "success",
						timer: 3000,
						timerProgressBar: true,
						showConfirmButton: false,
						allowOutsideClick: false,
					}).then((swalres)=> navigate(paginaLogin))
					
				} else {
					let resMsg;
					await response.text().then((res)=>resMsg = res)
					setErrorMsg(resMsg)
					setError(true);
				}
			});
		}
	};

	return (
		<section className="login">
			<h1>MiReclamo</h1>
			<div className="login-box">
				<Form onSubmit={cambioPass}>
					<Form.Group className="mb-3" controlId="documento">
						<Form.Label className="bold-text">Documento</Form.Label>
						<Form.Control type="text" placeholder="Ingrese su documento" />
					</Form.Group>
					<Form.Group className="mb-3" controlId="usuario">
						<Form.Label className="bold-text">Usuario</Form.Label>
						<Form.Control type="text" placeholder="Ingrese su usuario" />
					</Form.Group>
					<Form.Group className="mb-3" controlId="pass1">
						<Form.Label className="bold-text">Nueva contraseña</Form.Label>
						<Form.Control type="password" placeholder="Ingrese su contraseña" />
					</Form.Group>
					<Form.Group className="mb-3" controlId="pass2">
						<Form.Label className="bold-text">Repita nueva contraseña</Form.Label>
						<Form.Control type="password" placeholder="Ingrese su contraseña" />
					</Form.Group>
					<div className="text-center">
						<Button variant="primary" className="btn-ingresar " type="submit">
							Cambiar
						</Button>
					</div>
				</Form>
				{error ? <ErrorMessage msg={errorMsg} /> : ""}
			</div>
		</section>
	);
}
