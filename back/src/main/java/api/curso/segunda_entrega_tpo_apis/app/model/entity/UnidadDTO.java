package api.curso.segunda_entrega_tpo_apis.app.model.entity;

public class UnidadDTO {
	private int piso;
	private int nroUnidad;
	private EstadoUnidad estado;
	private Usuario duenio;
	private Usuario inquilino;
	private Edificio edificio;
	
	public UnidadDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UnidadDTO(int piso, int nroUnidad, EstadoUnidad estado, Usuario duenio, Usuario inquilino,
			Edificio edificio) {
		super();
		this.piso = piso;
		this.nroUnidad = nroUnidad;
		this.estado = estado;
		this.duenio = duenio;
		this.inquilino = inquilino;
		this.edificio = edificio;
	}

	public int getPiso() {
		return piso;
	}

	public void setPiso(int piso) {
		this.piso = piso;
	}

	public int getNroUnidad() {
		return nroUnidad;
	}

	public void setNroUnidad(int nroUnidad) {
		this.nroUnidad = nroUnidad;
	}

	public EstadoUnidad getEstado() {
		return estado;
	}

	public void setEstado(EstadoUnidad estado) {
		this.estado = estado;
	}

	public Usuario getDuenio() {
		return duenio;
	}

	public void setDuenio(Usuario duenio) {
		this.duenio = duenio;
	}

	public Usuario getInquilino() {
		return inquilino;
	}

	public void setInquilino(Usuario inquilino) {
		this.inquilino = inquilino;
	}

	public Edificio getEdificio() {
		return edificio;
	}

	public void setEdificio(Edificio edificio) {
		this.edificio = edificio;
	}
	
	
}
