import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./NavigateBackButton.css"

export default function NavigateBackButton({ ruta }) {

    const navigate = useNavigate();

    const navigateBack = () => {
		navigate(ruta)
	}
    
    return(<Button variant="primary" className="btn-navigate-back" onClick={navigateBack}> {"<"} Volver atras </Button>)
}