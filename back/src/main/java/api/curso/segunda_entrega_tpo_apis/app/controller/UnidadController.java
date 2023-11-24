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

import api.curso.segunda_entrega_tpo_apis.app.model.entity.Unidad;
import api.curso.segunda_entrega_tpo_apis.app.model.entity.UnidadDTO;
import api.curso.segunda_entrega_tpo_apis.app.service.IUnidadService;

@RestController
@RequestMapping("/tpo_apis")
public class UnidadController {
	
	@Autowired
	private IUnidadService unidadService;
	
	
	@GetMapping("/unidades")
	public List<UnidadDTO> findAll(){
		List<Unidad> unidades = unidadService.findAll();
        List<UnidadDTO> unidadDTOs = convertToDTOs(unidades);
        return unidadDTOs;
	}
	
	@GetMapping("/unidades/{unidadId}")
	public ResponseEntity<?> getUnidad(@PathVariable int unidadId) {
        Unidad unidad = unidadService.findById(unidadId);

        if (unidad == null) {
            String mensaje = "Unidad no encontrado con ID: " + unidadId;
            return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
        }

        UnidadDTO unidadDTO = convertToDTO(unidad);
        return new ResponseEntity<>(unidadDTO, HttpStatus.OK);

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
	public ResponseEntity<UnidadDTO> addUnidad(@RequestBody UnidadDTO unidadDTO){
        Unidad unidad = convertToEntity(unidadDTO);
        unidadService.save(unidad);

        return new ResponseEntity<>(unidadDTO, HttpStatus.CREATED);
				
	}
	
	@PutMapping("/unidades/{unidadId}")
	public ResponseEntity<?> updateUnidad(@PathVariable int unidadId, @RequestBody UnidadDTO unidadDTO) {
        Unidad unidad = convertToEntity(unidadDTO);
        Unidad unidadOld = unidadService.findById(unidadId);

        if (unidadOld == null) {
            String mensaje = "Unidad no encontrado con ID: " + unidadId;
            return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
        }

        unidadService.update(unidadId, unidad);

        return new ResponseEntity<>(unidadDTO, HttpStatus.OK);
	}
	
	@DeleteMapping("/unidades/{unidadId}")
	public ResponseEntity<String> deleteUnidad(@PathVariable int unidadId){
        Unidad unidad = unidadService.findById(unidadId);

        if (unidad == null) {
            String mensaje = "Unidad no encontrado con ID: " + unidadId;
            return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
        }

        unidadService.deleteById(unidadId);

        String mensaje = "Unidad eliminada [unidadID: " + unidadId + "]";
        return new ResponseEntity<>(mensaje, HttpStatus.OK);
	}
	
	private UnidadDTO convertToDTO(Unidad unidad) {
        return new UnidadDTO(
            unidad.getPiso(),
            unidad.getNroUnidad(),
            unidad.getEstado(),
            unidad.getDuenio(),
            unidad.getInquilino(),
            unidad.getEdificio()
        );
    }

    private Unidad convertToEntity(UnidadDTO unidadDTO) {
        Unidad unidad = new Unidad();
        unidad.setPiso(unidadDTO.getPiso());
        unidad.setNroUnidad(unidadDTO.getNroUnidad());
        unidad.setEstado(unidadDTO.getEstado());
        unidad.setDuenio(unidadDTO.getDuenio());
        unidad.setInquilino(unidadDTO.getInquilino());
        unidad.setEdificio(unidadDTO.getEdificio());
        return unidad;
    }

    private List<UnidadDTO> convertToDTOs(List<Unidad> unidades) {
        List<UnidadDTO> unidadDTOs = new ArrayList<>();
        for (Unidad unidad : unidades) {
            unidadDTOs.add(convertToDTO(unidad));
        }
        return unidadDTOs;
    }
}
