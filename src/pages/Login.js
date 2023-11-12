import "../styles/Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
	const {setIsUserAuthenticated, setUserRole, setUser, setUserDoc, landingPageAdmin, landingPageUsuarioBasico} = props;
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	const validarLogin = (e) => {
		e.preventDefault();
		fetch("http://localhost:8080/api/usuarios/login", {
			method: "POST",
			headers: {
				usuario: e.target[0].value,
				password: e.target[1].value,
			},
		}).then(async (response) => {
			if (response.status === 200) {
				let rol; let documento;
				await response.text().then((res)=> JSON.parse(res)).then((res) => { rol = res.rol; documento = res.documento});
				console.log("Autenticacion exitosa")
				sessionStorage.setItem("user", e.target[0].value)
				setUser(e.target[0].value)
				sessionStorage.setItem("userRole", rol)
				setUserRole(rol)
				sessionStorage.setItem("userDoc", documento)
				setUserDoc(documento)
				sessionStorage.setItem("isUserAuthenticated", true)
				setIsUserAuthenticated(true)
				rol === "administrador" ? navigate(landingPageAdmin) : navigate(landingPageUsuarioBasico);
			} else {
				setError(true);
			}
		});
	};

	return (
		<section className="login">
			<h1>MiReclamo</h1>
			<div className="login-box">
				<Form onSubmit={validarLogin}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label className="bold-text">Usuario</Form.Label>
						<Form.Control type="text" placeholder="Ingrese su usuario" />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label className="bold-text">Contraseña</Form.Label>
						<Form.Control type="password" placeholder="Ingrese su contraseña" />
					</Form.Group>
					<div className="text-center">
						<Button variant="primary" className="btn-ingresar" type="submit">
							Ingresar
						</Button>
					</div>
				</Form>
				{error ? <ErrorMessage /> : ""}
				<div className="text-center mt-2">
					<a href="./recupero" className={"linkRecupero"}>
						Olvide mi contraseña
					</a>
				</div>
			</div>
		</section>
	);
}
