package api.curso.segunda_entrega_tpo_apis.app.model.entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Edificio")
public class Edificio {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(name = "nombre", nullable = false, length = 50)
	private String nombre;
	@Embedded
	private Direccion direccion;
	private Date createAt;
	@OneToMany(mappedBy = "edificio", cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<AreaComun> areasComunes;
	@OneToMany(mappedBy = "edificio", cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<Unidad> unidades;

	public Edificio() {
		super();
	}

	public Edificio(String nombre, Direccion direccion, Date createAt) {
		super();
		this.nombre = nombre;
		this.direccion = direccion;
		this.createAt = createAt;
	}

	public Edificio(String nombre, Direccion direccion, Date createAt, List<AreaComun> areasComunes,
			List<Unidad> unidades) {
		super();
		this.nombre = nombre;
		this.direccion = direccion;
		this.createAt = createAt;
		this.areasComunes = areasComunes;
		this.unidades = unidades;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Date getCreateAt() {
		return createAt;
	}

	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}

	public Direccion getDireccion() {
		return direccion;
	}

	public void setDireccion(Direccion direccion) {
		this.direccion = direccion;
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

	@Override
	public String toString() {
		return "Edificio [id=" + id + ", nombre=" + nombre + ", direccion=" + direccion + ", createAt=" + createAt
				+ ", areasComunes=" + areasComunes + ", unidades=" + unidades + "]";
	}

	

}