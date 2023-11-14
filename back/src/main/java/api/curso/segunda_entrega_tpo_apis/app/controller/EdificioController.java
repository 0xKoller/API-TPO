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

import api.curso.segunda_entrega_tpo_apis.app.model.entity.Edificio;
import api.curso.segunda_entrega_tpo_apis.app.service.IEdificioService;


@RestController
@RequestMapping("/tpo_apis")
public class EdificioController {
	
	@Autowired
	private IEdificioService edificioService;
	
	
	@GetMapping("/edificios")
	public List<Edificio> findAll(){
		return edificioService.findAll();
	}
	
	@GetMapping("/edificios/{edificioId}")
	public ResponseEntity<?> getEdificio(@PathVariable int edificioId) {
		Edificio edificio = edificioService.findById(edificioId);
		
		if(edificio == null) {
			String mensaje = "Edificio no encontrado con ID: " + edificioId;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(edificio, HttpStatus.OK);

	}
	
	@GetMapping("/edificiosParam")
	public ResponseEntity<?> getEdificioParam(@RequestParam("edificioId") int edificioId) {
		Edificio edificio = edificioService.findById(edificioId);
		
		if(edificio == null) {
			String mensaje = "Edificio no encontrado con ID: " + edificioId;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(edificio, HttpStatus.OK);
	}
	
	@PostMapping("/edificios")
	public ResponseEntity<Edificio> addEdificio(@RequestBody Edificio edificio){
		edificioService.save(edificio);
		
		return new ResponseEntity<>(edificio, HttpStatus.CREATED);
				
	}
	
	@PutMapping("/edificios/{edificioId}")
	public ResponseEntity<?> updateEdificio(@PathVariable int edificioId, @RequestBody Edificio edificio) {
		Edificio edificioOld = edificioService.findById(edificioId);
		
		if(edificioOld == null) {
			String mensaje = "Edificio no encontrado con ID: " + edificioId;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}
		
		edificioService.update(edificioId, edificio);
		
		return new ResponseEntity<>(edificio, HttpStatus.OK);
	}
	
	@DeleteMapping("/edificios/{edificioId}")
	public ResponseEntity<String> deleteEdificio(@PathVariable int edificioId){
		Edificio edificio = edificioService.findById(edificioId);
		
		if(edificio == null) {
			String mensaje = "Edificio no encontrado con ID: " + edificioId;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}
		
		edificioService.deleteById(edificioId);
		
		String mensaje = "Edificio eliminado [edificioID: " + edificioId + "]";
		return new ResponseEntity<>(mensaje, HttpStatus.OK);
	}
}
