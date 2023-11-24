package api.curso.segunda_entrega_tpo_apis.app.controller;

import java.util.ArrayList;
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
import api.curso.segunda_entrega_tpo_apis.app.model.entity.EdificioDTO;
import api.curso.segunda_entrega_tpo_apis.app.service.IEdificioService;


@RestController
@RequestMapping("/tpo_apis")
public class EdificioController {
	
	@Autowired
	private IEdificioService edificioService;
	
	
	@GetMapping("/edificios")
	public List<EdificioDTO> findAll(){
		List<Edificio> edificios = edificioService.findAll();
        List<EdificioDTO> edificioDTOs = convertToDTOs(edificios);
		System.out.println(edificioDTOs);
        return edificioDTOs;
	}
	
	@GetMapping("/edificios/{edificioId}")
	public ResponseEntity<?> getEdificio(@PathVariable int edificioId) {
		 Edificio edificio = edificioService.findById(edificioId);

	        if (edificio == null) {
	            String mensaje = "Edificio no encontrado con ID: " + edificioId;
	            return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
	        }

	        EdificioDTO edificioDTO = convertToDTO(edificio);
	        return new ResponseEntity<>(edificioDTO, HttpStatus.OK);

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
	public ResponseEntity<EdificioDTO> addEdificio(@RequestBody EdificioDTO edificioDTO){
		Edificio edificio = convertToEntity(edificioDTO);
        edificioService.save(edificio);

        return new ResponseEntity<>(edificioDTO, HttpStatus.CREATED);
				
	}
	
	@PutMapping("/edificios/{edificioId}")
	public ResponseEntity<?> updateEdificio(@PathVariable int edificioId, @RequestBody EdificioDTO edificioDTO) {
		Edificio edificio = convertToEntity(edificioDTO);
        Edificio edificioOld = edificioService.findById(edificioId);

        if (edificioOld == null) {
            String mensaje = "Edificio no encontrado con ID: " + edificioId;
            return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
        }

        edificioService.update(edificioId, edificio);

        return new ResponseEntity<>(edificioDTO, HttpStatus.OK);
	}
	
	@DeleteMapping("/edificios/{edificioId}")
	public ResponseEntity<String> deleteEdificio(@PathVariable int edificioId){
        Edificio edificio = edificioService.findById(edificioId);

        if (edificio == null) {
            String mensaje = "Edificio no encontrado con ID: " + edificioId;
            return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
        }

        edificioService.deleteById(edificioId);

        String mensaje = "Edificio eliminado [edificioID: " + edificioId + "]";
        return new ResponseEntity<>(mensaje, HttpStatus.OK);
	}
	
	 private EdificioDTO convertToDTO(Edificio edificio) {
	        return new EdificioDTO(
	            edificio.getNombre(),
	            edificio.getDireccion(),
	            edificio.getCreateAt(),
	            edificio.getAreasComunes(),
	            edificio.getUnidades(),
					edificio.getId()
	        );
	    }
	 private Edificio convertToEntity(EdificioDTO edificioDTO) {
	        Edificio edificio = new Edificio();
	        edificio.setNombre(edificioDTO.getNombre());
	        edificio.setDireccion(edificioDTO.getDireccion());
	        edificio.setCreateAt(edificioDTO.getCreateAt());
	        edificio.setAreasComunes(edificioDTO.getAreasComunes());
	        edificio.setUnidades(edificioDTO.getUnidades());
	        return edificio;
	    }
	 private List<EdificioDTO> convertToDTOs(List<Edificio> edificios) {
	        List<EdificioDTO> edificioDTOs = new ArrayList<>();
	        for (Edificio edificio : edificios) {
	            edificioDTOs.add(convertToDTO(edificio));
	        }
	        return edificioDTOs;
	 }
}
