package api.curso.segunda_entrega_tpo_apis.app.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Unidad")
public class Unidad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idUnidad;
    private int piso;
    private int nroUnidad;
	 @Column(name = "estado", nullable = false, length = 50)
     private EstadoUnidad estado;
     @OneToOne
     private Usuario duenio;
     @OneToOne
     private Usuario inquilino;
     @ManyToOne
     @JoinColumn(name = "edificio")
     @JsonBackReference
     private Edificio edificio;


    public Unidad() {
        super();
    }

    public Unidad(int piso, int nroUnidad, EstadoUnidad estado, Usuario duenio, Usuario inquilino, Edificio edificio) {
        super();
        this.piso = piso;
        this.nroUnidad = nroUnidad;
        this.estado = estado;
        this.duenio = duenio;
        this.inquilino = inquilino;
        this.edificio = edificio;
    }

    public int getIdUnidad() {
        return idUnidad;
    }

    public void setIdUnidad(int idUnidad) {
        this.idUnidad = idUnidad;
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

    @Override
    public String toString() {
        return "Unidad{" +
                "idUnidad=" + idUnidad +
                ", piso=" + piso +
                ", nroUnidad=" + nroUnidad +
                ", estado=" + estado +
                ", duenio=" + duenio +
                ", inquilino=" + inquilino +
                ", edificio=" + edificio +
                '}';
    }
}
