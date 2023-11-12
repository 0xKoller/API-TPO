import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import "../SwalPopUps/SwalPopUps.css"

function ErrorPopUp(title= 'Se ha producido un error', msg='Intentelo nuevamente mas tarde'){
    return Swal.fire({ 
        title: title,
        html: msg,
        icon: "error",
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: 'Entendido',
        allowOutsideClick: false,
    })
}

function SuccessPopUp(title= 'Accion realizada con exito', msg=''){
    return Swal.fire({ 
        title: title,
        html: msg,
        icon: "success",
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonColor: "#FC6D14",
        confirmButtonText: 'Entendido',
        allowOutsideClick: false,
    })
}

function InputPopUp(title= 'Ingrese la informacion', msg='', inputPlaceholder="Ingrese la informacion", validationFunction=()=>{return true}, validationError="Valores incorrectos", confirmText="Agregar"){
    return Swal.fire({ 
        title: title,
        html: msg,
        showConfirmButton: true,
        confirmButtonText: confirmText,
        confirmButtonColor: "#FC6D14",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "grey",
        allowOutsideClick: false,
        input: "text",
        inputPlaceholder: inputPlaceholder,
        inputValidator: async (value) => {
            if (!value) {
              return 'Debe ingresar un valor';
            }
            if(!await validationFunction(value)){
                return validationError;
            }
        }
    })
}

function ValidationPopUp(title="Esta seguro?",msg='',confirmText='Aceptar'){
    return Swal.fire({
        title: title,
        text: msg,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#FC6D14',
        cancelButtonColor: 'grey' ,
        confirmButtonText: confirmText,
        cancelButtonText: "Cancelar",
      })
}

async function CambiarEstadoPopUp() {
    

    const SwalReact = withReactContent(Swal);
    const estados = await fetch("http://localhost:8080/api/reclamos/estados")
                    .then((response) => response.json())
                    .then((d) => d)
    let estado = "";
    let motivo= "";

    return SwalReact.fire({
        title: 'Cambiar Estado',
        confirmButtonColor:"#FC6D14",
        confirmButtonText: "Cambiar",
        focusConfirm: false,
        showLoaderOnConfirm: true,
        html: <>
            <select
                className="swal2-select select selectPopup"
                defaultValue={"default"}
                onChange={(e) => estado = (e.target.value)}
            >
                <option value="default" disabled >Seleccione un Estado</option>
                {estados.map((item) => <option value={item}>{item}</option>)}
            </select>
            <input className="swal2-input" name="motivo" onChange={(e) => { motivo = e.target.value }} placeholder={"Motivo (opcional)"} />
            </>,
        preConfirm: async () => {
            if (!estado) SwalReact.showValidationMessage("Debe seleccionar un estado");
            return {estado: estado, motivo: motivo}
        }
    })
}

async function AltaPersonaPopUp() {
    const SwalReact = withReactContent(Swal);

    let documento = "";
    let nombre = "";
    let apellido = "";
    let usuario = "";
    let password = "";

    return SwalReact.fire({
        title: 'Alta Persona',
        confirmButtonColor:"#FC6D14",
        confirmButtonText: "Crear",
        focusConfirm: false,
        html: <>
            <input className="swal2-input" name="documento" onChange={(e) => { documento = e.target.value }} placeholder={"Documento"} />
            <input className="swal2-input" name="nombre" onChange={(e) => { nombre = e.target.value }} placeholder={"Nombres"} />
            <input className="swal2-input" name="apellido" onChange={(e) => { apellido = e.target.value }} placeholder={"Apellidos"} />
            <input className="swal2-input" name="usuario" onChange={(e) => { usuario = e.target.value }} placeholder={"Usuario"} />
            <input className="swal2-input" type="password" name="password" onChange={(e) => { password = e.target.value }} placeholder={"Contraseña"} />
          
            </>,
        preConfirm: () => {
            if (!documento || !nombre || !apellido || !usuario || !password) SwalReact.showValidationMessage("Debe completar todos los campos");
            return { documento: documento, nombre: `${apellido}, ${nombre}`, usuario:usuario, password:password, rol:"basico" }
        }
    })
}


export {ErrorPopUp, SuccessPopUp, InputPopUp, ValidationPopUp, CambiarEstadoPopUp, AltaPersonaPopUp}