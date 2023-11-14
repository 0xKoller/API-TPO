package api.curso.segunda_entrega_tpo_apis.app.model.entity;

public class UsuarioDTO {
	private String nombreUsuario;
	private String contrasenia;
	private RolUsuario rolUsuario;
	
	public UsuarioDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

	public UsuarioDTO(String nombreUsuario, String contrasenia, RolUsuario rolUsuario) {
		super();
		this.nombreUsuario = nombreUsuario;
		this.contrasenia = contrasenia;
		this.rolUsuario = rolUsuario;
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

	
}
