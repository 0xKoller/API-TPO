package api.curso.segunda_entrega_tpo_apis.app.model.entity;


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
import jakarta.persistence.Table;

@Entity
@Table(name = "AreaComun")
public class AreaComun {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idAreaComun;
    private int piso;
    private String nombre;
    @ManyToOne
    @JoinColumn(name = "edificio")
    @JsonBackReference("edificio-areaComun")
    private Edificio edificio;
    @OneToMany(mappedBy = "areaComun", cascade = CascadeType.ALL)
	@JsonManagedReference("areaComun-reclamo")
	private List<Reclamo> reclamos;
    


    public AreaComun() {
        super();
    }

    public AreaComun(int piso, String nombre, Edificio edificio) {
        super();
        this.piso = piso;
        this.nombre = nombre;
        this.edificio = edificio;
    }

    public int getIdAreaComun() {
        return idAreaComun;
    }

    public void setIdAreaComun(int idAreaComun) {
        this.idAreaComun = idAreaComun;
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

	@Override
	public String toString() {
		return "AreaComun [idAreaComun=" + idAreaComun + ", piso=" + piso + ", nombre=" + nombre + ", edificio="
				+ edificio + "]";
	}

	
}

