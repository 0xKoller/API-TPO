package api.curso.segunda_entrega_tpo_apis.app.model.entity;

import java.util.Date;
import java.util.List;

public class EdificioDTO {
	private String nombre;
	private Direccion direccion;
	private Date createAt;
	private List<AreaComun> areasComunes;
	private List<Unidad> unidades;

	private int id;
	
	
	public EdificioDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public EdificioDTO(String nombre, Direccion direccion, Date createAt, List<AreaComun> areasComunes,
			List<Unidad> unidades, int id) {
		super();
		this.nombre = nombre;
		this.direccion = direccion;
		this.createAt = createAt;
		this.areasComunes = areasComunes;
		this.unidades = unidades;
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public Direccion getDireccion() {
		return direccion;
	}
	public void setDireccion(Direccion direccion) {
		this.direccion = direccion;
	}
	public Date getCreateAt() {
		return createAt;
	}
	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}
	public List<AreaComun> getAreasComunes() {
		return areasComunes;
	}
	public void setAreasComunes(List<AreaComun> areasComunes) {
		this.areasComunes = areasComunes;
	}
	public List<Unidad> getUnidades() {
		return unidades;
	}
	public void setUnidades(List<Unidad> unidades) {
		this.unidades = unidades;
	}

	public int getId() {return  id;}
	public void setId(int id) {this.id = id;}
}


