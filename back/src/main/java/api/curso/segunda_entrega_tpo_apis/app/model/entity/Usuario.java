package api.curso.segunda_entrega_tpo_apis.app.model.entity;


import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nombre;
    private String nombreUsuario;
    private String contrasenia;
    private int dni;
    private int telefono;
    private String email;
    private RolUsuario rolUsuario;
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
	@JsonManagedReference("usuario-reclamo")
	private List<Reclamo> reclamos;

    public Usuario() {
        super();
    }

    public Usuario(String nombre, String nombreUsuario, String contrasenia, int dni, int telefono, String email, RolUsuario rolUsuario) {
        super();
        this.nombre = nombre;
        this.nombreUsuario = nombreUsuario;
        this.contrasenia = contrasenia;
        this.dni = dni;
        this.telefono = telefono;
        this.email = email;
        this.rolUsuario = rolUsuario;
    }
    

	public Usuario(String nombre, String nombreUsuario, String contrasenia, int dni, int telefono, String email,
			RolUsuario rolUsuario, List<Reclamo> reclamos) {
		super();
		this.nombre = nombre;
		this.nombreUsuario = nombreUsuario;
		this.contrasenia = contrasenia;
		this.dni = dni;
		this.telefono = telefono;
		this.email = email;
		this.rolUsuario = rolUsuario;
		this.reclamos = reclamos;
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

	public String getNombreUsuario() {
		return nombreUsuario;
	}

	public void setNombreUsuario(String nombreUsuario) {
		this.nombreUsuario = nombreUsuario;
	}

	public String getContrasenia() {
		return contrasenia;
	}

	public void setContrasenia(String contrasenia) {
		this.contrasenia = contrasenia;
	}

	public int getDni() {
		return dni;
	}

	public void setDni(int dni) {
		this.dni = dni;
	}

	public int getTelefono() {
		return telefono;
	}

	public void setTelefono(int telefono) {
		this.telefono = telefono;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public RolUsuario getRolUsuario() {
		return rolUsuario;
	}

	public void setRolUsuario(RolUsuario rolUsuario) {
		this.rolUsuario = rolUsuario;
	}
	
	

	public List<Reclamo> getReclamos() {
		return reclamos;
	}

	public void setReclamos(List<Reclamo> reclamos) {
		this.reclamos = reclamos;
	}

	@Override
	public String toString() {
		return "Usuario [id=" + id +
				", nombre=" + nombre +
				", nombreUsuario=" + nombreUsuario +
				", contrasenia=" + contrasenia +
				", dni=" + dni +
				", telefono=" + telefono +
				", email=" + email +
				", rolUsuario=" + rolUsuario +
				", reclamosIds=" + (reclamos != null ? reclamos.stream().map(Reclamo::getId).collect(Collectors.toList()) : "null")+"]";
	}

	
}
