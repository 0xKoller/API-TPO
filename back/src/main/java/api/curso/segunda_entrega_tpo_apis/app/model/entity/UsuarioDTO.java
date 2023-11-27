package api.curso.segunda_entrega_tpo_apis.app.model.entity;

import java.util.List;

public class UsuarioDTO {
	private String nombreUsuario;
	private String contrasenia;
	private RolUsuario rolUsuario;
	private int id;
	private List<Reclamo> reclamos;

	public UsuarioDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

	public UsuarioDTO(String nombreUsuario, String contrasenia, RolUsuario rolUsuario, int id) {
		super();
		this.nombreUsuario = nombreUsuario;
		this.contrasenia = contrasenia;
		this.rolUsuario = rolUsuario;
		this.id = id;
	}

	
	public UsuarioDTO(String nombreUsuario, String contrasenia, RolUsuario rolUsuario, int id, List<Reclamo> reclamos) {
		super();
		this.nombreUsuario = nombreUsuario;
		this.contrasenia = contrasenia;
		this.rolUsuario = rolUsuario;
		this.id = id;
		this.reclamos = reclamos;
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

	public RolUsuario getRolUsuario() {
		return rolUsuario;
	}

	public void setRolUsuario(RolUsuario rolUsuario) {
		this.rolUsuario = rolUsuario;
	}


	public int getId() {
		return id;
	}
	public void setId(int id){this.id = id;}



	public List<Reclamo> getReclamos() {
		return reclamos;
	}



	public void setReclamos(List<Reclamo> reclamos) {
		this.reclamos = reclamos;
	}
	
	
}
