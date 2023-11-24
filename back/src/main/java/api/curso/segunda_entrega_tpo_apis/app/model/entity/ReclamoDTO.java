package api.curso.segunda_entrega_tpo_apis.app.model.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ReclamoDTO {
//	private int usuario;
	private int id;
	private Unidad unidad;
	private AreaComun areaComun;
    private String descripcion;
    private Edificio edificio;
    private EstadoReclamo estado;
    private List<Imagen> fotos;
    private Date fechaCreacion;
    private Date fechaModificacion;
    
    
    
	public ReclamoDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public ReclamoDTO( Unidad unidad, AreaComun areaComun, String descripcion, Edificio edificio,
			EstadoReclamo estado, List<Imagen> fotos, Date fechaCreacion, Date fechaModificacion, int id) {
		super();
		this.id = id;
//		this.usuario = usuario;
		this.unidad = unidad;
		this.areaComun = areaComun;
		this.descripcion = descripcion;
		this.edificio = edificio;
		this.estado = estado;
		this.fotos = fotos;
		this.fechaCreacion = fechaCreacion;
		this.fechaModificacion = fechaModificacion;
	}
	
//	
//	public int getUsuario() {
//		return usuario;
//	}

//	public void setUsuario(int usuario) {
//		this.usuario = usuario;
//	}

	public Unidad getUnidad() {
		return unidad;
	}
	public void setUnidad(Unidad unidad) {
		this.unidad = unidad;
	}
	public AreaComun getAreaComun() {
		return areaComun;
	}
	public void setAreaComun(AreaComun areaComun) {
		this.areaComun = areaComun;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public Edificio getEdificio() {
		return edificio;
	}
	public void setEdificio(Edificio edificio) {
		this.edificio = edificio;
	}
	public EstadoReclamo getEstado() {
		return estado;
	}
	public void setEstado(EstadoReclamo estado) {
		this.estado = estado;
	}
	public List<Imagen> getFotos() {
		return fotos;
	}
	public void setFotos(List<Imagen> fotos) {
		this.fotos = fotos;
	}
	public Date getFechaCreacion() {
		return fechaCreacion;
	}
	public void setFechaCreacion(Date fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}
	public Date getFechaModificacion() {
		return fechaModificacion;
	}
	public void setFechaModificacion(Date fechaModificacion) {
		this.fechaModificacion = fechaModificacion;
	}

	public int getId() {return id;}
	public void setId(int id) {this.id = id;}
}
