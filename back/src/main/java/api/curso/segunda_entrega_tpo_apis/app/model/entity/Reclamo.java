package api.curso.segunda_entrega_tpo_apis.app.model.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Reclamo")
public class Reclamo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "usuario")
    @JsonBackReference("usuario-reclamo")
    private Usuario usuario;
    @ManyToOne
    @JoinColumn(name = "unidad")
    @JsonBackReference("unidad-reclamo")
    private Unidad unidad;
    @ManyToOne
    @JoinColumn(name = "areaComun")
    @JsonBackReference("areaComun-reclamo")
    private AreaComun areaComun;
    private String descripcion;
    @ManyToOne
    @JoinColumn(name = "edificio")
    @JsonBackReference("edificio-reclamo")
    private Edificio edificio;
    private EstadoReclamo estado;
    @OneToMany(mappedBy = "reclamo", cascade = CascadeType.ALL)
	@JsonManagedReference
    private List<Imagen> fotos;
    private Date fechaCreacion;
    private Date fechaModificacion;

    public Reclamo() {
        super();
    }

	public Reclamo(Usuario usuario, Unidad unidad, AreaComun areaComun, String descripcion, Edificio edificio,
			EstadoReclamo estado, List<Imagen> fotos, Date fechaCreacion, Date fechaModificacion) {
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

	@Override
	public String toString() {
		return "Reclamo [id=" + id +
				", usuarioId=" + (usuario != null ? usuario.getId() : "null") +
				", unidadId=" + (unidad != null ? unidad.getIdUnidad() : "null") +
				", areaComunId=" + (areaComun != null ? areaComun.getIdAreaComun() : "null") +
				", descripcion=" + descripcion +
				", edificioId=" + (edificio != null ? edificio.getId() : "null") +
				", estado=" + estado +
				", fotos=" + (fotos != null ? "Fotos presentes" : "No fotos") +
				", fechaCreacion=" + fechaCreacion +
				", fechaModificacion=" + fechaModificacion + "]";
	}
	
}
