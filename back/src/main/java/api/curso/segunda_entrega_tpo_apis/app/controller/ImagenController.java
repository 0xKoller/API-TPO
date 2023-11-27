package api.curso.segunda_entrega_tpo_apis.app.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import api.curso.segunda_entrega_tpo_apis.app.model.entity.Imagen;
import api.curso.segunda_entrega_tpo_apis.app.model.entity.Reclamo;
import api.curso.segunda_entrega_tpo_apis.app.service.IReclamoService;
import api.curso.segunda_entrega_tpo_apis.app.service.ImagenServiceImpl;
import api.curso.segunda_entrega_tpo_apis.app.service.ReclamoServiceImpl;

@RestController
@RequestMapping("/imagenes")
public class ImagenController {
	@Autowired
	private ImagenServiceImpl imagenService;
	
	@Autowired
	private ReclamoServiceImpl reclamoService;

    @PostMapping("/subir")
    public ResponseEntity<String> upload(@RequestParam("archivo") MultipartFile archivo, @RequestParam("reclamoId") int reclamoId) {

        try {
            Reclamo reclamo = reclamoService.findById(reclamoId);
            if (reclamo != null) {
                Imagen imagen = new Imagen();
                imagen.setReclamo(reclamo);
                imagen.setDatosImagen(archivo.getBytes());
                imagenService.save(imagen);

                return ResponseEntity.ok("Imagen subida exitosamente.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reclamo no encontrado.");
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir la imagen.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> download(@PathVariable Long id) {
        Imagen imagen = imagenService.findById(id);
        if (imagen != null) {
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imagen.getDatosImagen());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
