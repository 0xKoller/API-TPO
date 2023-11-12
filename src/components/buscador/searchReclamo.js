import "../../styles/buscador.css";


export default function Buscador({ nroReclamo, handleInput }) {

  const handleChange = value => {
    handleInput(value)
  }

  return (
    <div>
      <h6 className="titulos-filtros">BUSCADOR</h6>
      <input
        type="number"
        className="buscador"
        placeholder="N° Reclamo"
        onChange={change => handleChange(change.target.value)}
        value={nroReclamo}
      />
    </div>     
  );
}