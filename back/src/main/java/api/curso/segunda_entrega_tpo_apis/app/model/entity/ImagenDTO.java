package api.curso.segunda_entrega_tpo_apis.app.model.entity;

public class ImagenDTO {
	private byte[] datosImagen;
	private Reclamo reclamo;
	
	public ImagenDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ImagenDTO(byte[] datosImagen, Reclamo reclamo) {
		super();
		this.datosImagen = datosImagen;
		this.reclamo = reclamo;
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
}
