package api.curso.segunda_entrega_tpo_apis.app.model.entity;

import java.util.ArrayList;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Reclamo")
public class Reclamo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "usuario")
    private Usuario usuario;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "unidad")
    private Unidad unidad;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "areaComun")
    private AreaComun areaComun;
    private String descripcion;
    @OneToOne(cascade = CascadeType.ALL)
    private Edificio edificio;
    private EstadoReclamo estado;
    @OneToMany(mappedBy = "reclamo", cascade = CascadeType.ALL)
	@JsonManagedReference
    private ArrayList<Imagen> fotos;
    private Date fechaCreacion;
    private Date fechaModificacion;

    public Reclamo() {
        super();
    }
    
    

	public Reclamo(Usuario usuario, Unidad unidad, AreaComun areaComun, String descripcion, Edificio edificio,
			EstadoReclamo estado, ArrayList<Imagen> fotos, Date fechaCreacion, Date fechaModificacion) {
		super();
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



	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

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

	public ArrayList<Imagen> getFotos() {
		return fotos;
	}

	public void setFotos(ArrayList<Imagen> fotos) {
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

	@Override
	public String toString() {
		return "Reclamo [id=" + id + ", usuario=" + usuario + ", unidad=" + unidad + ", areaComun=" + areaComun
				+ ", descripcion=" + descripcion + ", edificio=" + edificio + ", estado=" + estado + ", fotos=" + fotos
				+ ", fechaCreacion=" + fechaCreacion + ", fechaModificacion=" + fechaModificacion + "]";
	}

    
}
