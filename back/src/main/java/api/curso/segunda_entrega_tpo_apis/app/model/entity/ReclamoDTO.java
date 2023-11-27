package api.curso.segunda_entrega_tpo_apis.app.model.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ReclamoDTO {
	private int id;
	private int usuario;
	private int unidad;
	private int areaComun;
	private String descripcion;
	private int edificio;
	private EstadoReclamo estado;
	private List<Imagen> fotos;
	private Date fechaCreacion;
	private Date fechaModificacion;

	public ReclamoDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ReclamoDTO(int id, int unidad, int areaComun, String descripcion, int edificio, EstadoReclamo estado,
			List<Imagen> fotos, Date fechaCreacion, Date fechaModificacion) {
		super();
		this.id = id;
		this.unidad = unidad;
		this.areaComun = areaComun;
		this.descripcion = descripcion;
		this.edificio = edificio;
		this.estado = estado;
		this.fotos = fotos;
		this.fechaCreacion = fechaCreacion;
		this.fechaModificacion = fechaModificacion;
	}
	
	

	public ReclamoDTO(int id, int usuario, int unidad, int areaComun, String descripcion, int edificio,
			EstadoReclamo estado, List<Imagen> fotos, Date fechaCreacion, Date fechaModificacion) {
		super();
		this.id = id;
		this.usuario = usuario;
		this.unidad = unidad;
		this.areaComun = areaComun;
		this.descripcion = descripcion;
		this.edificio = edificio;
		this.estado = estado;
		this.fotos = fotos;
		this.fechaCreacion = fechaCreacion;
		this.fechaModificacion = fechaModificacion;
	}

	public int getUnidad() {
		return unidad;
	}

	public void setUnidad(int unidad) {
		this.unidad = unidad;
	}

	public int getAreaComun() {
		return areaComun;
	}

	public void setAreaComun(int areaComun) {
		this.areaComun = areaComun;
	}

	public void setEdificio(int edificio) {
		this.edificio = edificio;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	

	public int getEdificio() {
		return edificio;
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

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUsuario() {
		return usuario;
	}

	public void setUsuario(int usuario) {
		this.usuario = usuario;
	}
	
	
}
