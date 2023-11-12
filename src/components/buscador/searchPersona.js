import "../../styles/buscador.css";


export default function Buscador({ documento, handleInput }) {

  const handleChange = value => {
    handleInput(value)
  }

  return (
    <div>
      <h6 className="titulos-filtros">BUSCADOR</h6>
      <input
        type="text"
        className="buscador"
        placeholder="N° Documento"
        onChange={change => handleChange(change.target.value)}
        value={documento}
      />
    </div>     
  );
}