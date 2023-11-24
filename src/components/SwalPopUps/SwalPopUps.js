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
    const estados = await fetch("http://localhost:3306/reclamos/estados")
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

    let dni = "";
    let nombre = "";
    let email = "";
    let nombreUsuario = "";
    let contrasenia = "";
    let rolUsuario = ""; // Variable para almacenar el rol seleccionado

    return SwalReact.fire({
        title: 'Alta Persona',
        confirmButtonColor: "#FC6D14",
        confirmButtonText: "Crear",
        focusConfirm: false,
        html: (
            <>
                {/* <input className="swal2-input" name="dni" onChange={(e) => { dni = e.target.value }} placeholder={"DNI"} /> */}
                {/* <input className="swal2-input" name="nombre" onChange={(e) => { nombre = e.target.value }} placeholder={"Nombres"} /> */}
                {/* <input className="swal2-input" name="email" onChange={(e) => { email = e.target.value }} placeholder={"Email"} /> */}
                <input className="swal2-input" name="nombreUsuario" onChange={(e) => { nombreUsuario = e.target.value }} placeholder={"Usuario"} />
                <input className="swal2-input" type="password" name="contrasenia" onChange={(e) => { contrasenia = e.target.value }} placeholder={"Contraseña"} />
                <select className="swal2-input" name="rolUsuario" onChange={(e) => { rolUsuario = e.target.value }}>
                    <option value="">Seleccionar Rol</option>
                    <option value="empleado">Empleado</option>
                    <option value="duenio">Dueño</option>
                    <option value="inquilino">Inquilino</option>
                </select>
            </>
        ),
        preConfirm: () => {
            if ( !nombreUsuario || !contrasenia || !rolUsuario) {
                SwalReact.showValidationMessage("Debe completar todos los campos");
            }
            return { nombreUsuario, contrasenia, rolUsuario }
        }
    });
}



export {ErrorPopUp, SuccessPopUp, InputPopUp, ValidationPopUp, CambiarEstadoPopUp, AltaPersonaPopUp}