package api.curso.segunda_entrega_tpo_apis.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import api.curso.segunda_entrega_tpo_apis.app.model.entity.Unidad;
import api.curso.segunda_entrega_tpo_apis.app.service.IUnidadService;

@RestController
@RequestMapping("/tpo_apis")
public class UnidadController {
	
	@Autowired
	private IUnidadService unidadService;
	
	
	@GetMapping("/unidades")
	public List<Unidad> findAll(){
		return unidadService.findAll();
	}
	
	@GetMapping("/unidades/{unidadId}")
	public ResponseEntity<?> getUnidad(@PathVariable int unidadId) {
		Unidad unidad = unidadService.findById(unidadId);
		
		if(unidad == null) {
			String mensaje = "Unidad no encontrado con ID: " + unidadId;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(unidad, HttpStatus.OK);

	}
	
	@GetMapping("/unidadesParam")
	public ResponseEntity<?> getUnidadParam(@RequestParam("unidadId") int unidadId) {
		Unidad unidad = unidadService.findById(unidadId);
		
		if(unidad == null) {
			String mensaje = "Unidad no encontrado con ID: " + unidadId;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(unidad, HttpStatus.OK);
	}
	
	@PostMapping("/unidades")
	public ResponseEntity<Unidad> addUnidad(@RequestBody Unidad unidad){
		unidadService.save(unidad);
		
		return new ResponseEntity<>(unidad, HttpStatus.CREATED);
				
	}
	
	@PutMapping("/unidades/{unidadId}")
	public ResponseEntity<?> updateUnidad(@PathVariable int unidadId, @RequestBody Unidad unidad) {
		Unidad unidadOld = unidadService.findById(unidadId);
		
		if(unidadOld == null) {
			String mensaje = "Unidad no encontrado con ID: " + unidadId;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}
		
		unidadService.update(unidadId, unidad);
		
		return new ResponseEntity<>(unidad, HttpStatus.OK);
	}
	
	@DeleteMapping("/unidades/{unidadId}")
	public ResponseEntity<String> deleteUnidad(@PathVariable int unidadId){
		Unidad unidad = unidadService.findById(unidadId);
		
		if(unidad == null) {
			String mensaje = "Unidad no encontrado con ID: " + unidadId;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}
		
		unidadService.deleteById(unidadId);
		
		String mensaje = "Unidad eliminado [unidadID: " + unidadId + "]";
		return new ResponseEntity<>(mensaje, HttpStatus.OK);
	}
}
