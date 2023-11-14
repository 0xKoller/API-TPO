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

import api.curso.segunda_entrega_tpo_apis.app.model.entity.Reclamo;
import api.curso.segunda_entrega_tpo_apis.app.service.IReclamoService;

@RestController
@RequestMapping("/tpo_apis")
public class ReclamoController {
	
	@Autowired
	private IReclamoService reclamoService;
	
	
	@GetMapping("/reclamos")
	public List<Reclamo> findAll(){
		return reclamoService.findAll();
	}
	
	@GetMapping("/reclamos/{reclamoId}")
	public ResponseEntity<?> getReclamo(@PathVariable int reclamoId) {
		Reclamo reclamo = reclamoService.findById(reclamoId);
		
		if(reclamo == null) {
			String mensaje = "Reclamo no encontrado con ID: " + reclamoId;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(reclamo, HttpStatus.OK);

	}
	
	@GetMapping("/reclamosParam")
	public ResponseEntity<?> getReclamoParam(@RequestParam("reclamoId") int reclamoId) {
		Reclamo reclamo = reclamoService.findById(reclamoId);
		
		if(reclamo == null) {
			String mensaje = "Reclamo no encontrado con ID: " + reclamoId;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(reclamo, HttpStatus.OK);
	}
	
	@PostMapping("/reclamos")
	public ResponseEntity<Reclamo> addReclamo(@RequestBody Reclamo reclamo){
		reclamoService.save(reclamo);
		
		return new ResponseEntity<>(reclamo, HttpStatus.CREATED);
				
	}
	
	@PutMapping("/reclamos/{reclamoId}")
	public ResponseEntity<?> updateReclamo(@PathVariable int reclamoId, @RequestBody Reclamo reclamo) {
		Reclamo reclamoOld = reclamoService.findById(reclamoId);
		
		if(reclamoOld == null) {
			String mensaje = "Reclamo no encontrado con ID: " + reclamoId;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}
		
		reclamoService.update(reclamoId, reclamo);
		
		return new ResponseEntity<>(reclamo, HttpStatus.OK);
	}
	
	@DeleteMapping("/reclamos/{reclamoId}")
	public ResponseEntity<String> deleteReclamo(@PathVariable int reclamoId){
		Reclamo reclamo = reclamoService.findById(reclamoId);
		
		if(reclamo == null) {
			String mensaje = "Reclamo no encontrado con ID: " + reclamoId;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}
		
		reclamoService.deleteById(reclamoId);
		
		String mensaje = "Reclamo eliminado [reclamoID: " + reclamoId + "]";
		return new ResponseEntity<>(mensaje, HttpStatus.OK);
	}
}
