package api.curso.segunda_entrega_tpo_apis.app.model.entity;

public class AreaComunDTO {
	private int piso;
	private String nombre;
	private Edificio edificio;
	
	public AreaComunDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public AreaComunDTO(int piso, String nombre, Edificio edificio) {
		super();
		this.piso = piso;
		this.nombre = nombre;
		this.edificio = edificio;
	}

	public int getPiso() {
		return piso;
	}

	public void setPiso(int piso) {
		this.piso = piso;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Edificio getEdificio() {
		return edificio;
	}

	public void setEdificio(Edificio edificio) {
		this.edificio = edificio;
	}
	
}
