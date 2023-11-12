import React from "react";
import { IoIosWarning } from "react-icons/io";
import "../styles/ErrorMessage.css";

const ErrorMessage = (props) => {
	let {msg} = props;
	msg = msg? msg : "Los datos ingresados son incorrectos"
	return (
		<div className="badgeError mt-2">
			<IoIosWarning className="img-center" />
			{msg}
		</div>
	);
};

export default ErrorMessage;
