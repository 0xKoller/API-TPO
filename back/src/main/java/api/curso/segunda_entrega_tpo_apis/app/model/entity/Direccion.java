package api.curso.segunda_entrega_tpo_apis.app.model.entity;

import jakarta.persistence.Embeddable;

@Embeddable
public class Direccion {
    private String ciudad;
    private String localidad;
    private String calle;
    private int altura;

    public Direccion() {
        super();
    }

    public Direccion(String ciudad, String localidad, String calle, int altura) {
        super();
        this.ciudad = ciudad;
        this.localidad = localidad;
        this.calle = calle;
        this.altura = altura;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getLocalidad() {
        return localidad;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public int getAltura() {
        return altura;
    }

    public void setAltura(int altura) {
        this.altura = altura;
    }

    @Override
    public String toString() {
        return "Direccion{" +
                "ciudad='" + ciudad + '\'' +
                ", localidad='" + localidad + '\'' +
                ", calle='" + calle + '\'' +
                ", altura=" + altura +
                '}';
    }
}
