package api.curso.segunda_entrega_tpo_apis.app.model.entity;

import java.util.Arrays;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

@Entity
public class Imagen {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Lob
	@Column(columnDefinition = "LONGBLOB")
	private byte[] datosImagen;
	@ManyToOne
    @JoinColumn(name = "reclamo")
    @JsonBackReference
	private Reclamo reclamo;

	public Imagen() {
		super();
		// TODO Auto-generated constructor stub
	}


	
	public Imagen(byte[] datosImagen, Reclamo reclamo) {
		super();
		this.datosImagen = datosImagen;
		this.reclamo = reclamo;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public byte[] getDatosImagen() {
		return datosImagen;
	}

	public void setDatosImagen(byte[] datosImagen) {
		this.datosImagen = datosImagen;
	}

	public Reclamo getReclamo() {
		return reclamo;
	}

	public void setReclamo(Reclamo reclamo) {
		this.reclamo = reclamo;
	}

	@Override
	public String toString() {
		return "Imagen [id=" + id + ", datosImagen=" + Arrays.toString(datosImagen) + ", reclamo=" + reclamo + "]";
	}

	
}