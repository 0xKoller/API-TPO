export const HandleSelectEstado = props => {
    const {estado, setData, dataInicial, setEstadoReclamo, setNroReclamo, opcionDefaultEdificios, opcionDefaultEstados, edificioReclamo, nroReclamoDefault} = props;
    setEstadoReclamo(estado);
    setNroReclamo(nroReclamoDefault);
    if (estado === opcionDefaultEstados && edificioReclamo !== opcionDefaultEdificios) {
        setData(dataInicial.filter(reclamo => reclamo.edificio.nombre === edificioReclamo));
    }
    if (estado === opcionDefaultEstados && edificioReclamo === opcionDefaultEdificios) {
        setData(dataInicial);
    }
    if (estado !== opcionDefaultEstados && edificioReclamo !== opcionDefaultEdificios) {
        setData(dataInicial.filter(reclamo => reclamo.estado === estado && reclamo.edificio.nombre === edificioReclamo));
    }
    if (estado !== opcionDefaultEstados && edificioReclamo === opcionDefaultEdificios) {
        setData(dataInicial.filter(reclamo => reclamo.estado === estado))
    }
    
}

export const HandleSelectEdificio = props => {
    const {edificio, setData, dataInicial, setEdificioReclamo, setNroReclamo, opcionDefaultEdificios, opcionDefaultEstados, estadoReclamo, nroReclamoDefault} = props;
    setEdificioReclamo(edificio);
    setNroReclamo(nroReclamoDefault);
    if (edificio === opcionDefaultEdificios && estadoReclamo !== opcionDefaultEstados) {
        setData(dataInicial.filter(reclamo => reclamo.estado === estadoReclamo));
    }
    if (edificio === opcionDefaultEdificios && estadoReclamo === opcionDefaultEstados) {
        setData(dataInicial);
    }
    if (edificio !== opcionDefaultEdificios && estadoReclamo !== opcionDefaultEstados) {
        setData(dataInicial.filter(reclamo => reclamo.estado === estadoReclamo && reclamo.edificio.nombre === edificio));
    }
    if (edificio !== opcionDefaultEdificios && estadoReclamo === opcionDefaultEstados) {
        setData(dataInicial.filter(reclamo => reclamo.edificio.nombre === edificio))
    }
}

export const HandleInputBuscador = props => {
    const {nroReclamo, setData, dataInicial, setEstadoReclamo, setEdificioReclamo, setNroReclamo, opcionDefaultEstados, opcionDefaultEdificios} = props;
    const nroReclamoString = nroReclamo.toString();
    nroReclamo === "" ? setData(dataInicial) : setData(dataInicial.filter(reclamo => reclamo.numero.toString().slice(0, nroReclamoString.length) == nroReclamoString));
    setEstadoReclamo(opcionDefaultEstados);
    setEdificioReclamo(opcionDefaultEdificios);
    setNroReclamo(nroReclamo);
}