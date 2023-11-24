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

import api.curso.segunda_entrega_tpo_apis.app.model.entity.AreaComun;
import api.curso.segunda_entrega_tpo_apis.app.model.entity.AreaComunDTO;
import api.curso.segunda_entrega_tpo_apis.app.service.IAreaComunService;

@RestController
@RequestMapping("/tpo_apis")
public class AreaComunController {

	@Autowired
	private IAreaComunService areaComunService;

	@GetMapping("/areasComunes")
	public List<AreaComunDTO> findAll() {
		List<AreaComun> areasComunes = areaComunService.findAll();
        List<AreaComunDTO> areaComunDTOs = convertToDTOs(areasComunes);
        return areaComunDTOs;
	}

	@GetMapping("/areasComunes/{areaComunId}")
	public ResponseEntity<?> getAreaComun(@PathVariable int areaComunId) {
        AreaComun areaComun = areaComunService.findById(areaComunId);

        if (areaComun == null) {
            String mensaje = "AreaComun no encontrado con ID: " + areaComunId;
            return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
        }

        AreaComunDTO areaComunDTO = convertToDTO(areaComun);
        return new ResponseEntity<>(areaComunDTO, HttpStatus.OK);

	}

	@GetMapping("/areasComunesParam")
	public ResponseEntity<?> getAreaComunParam(@RequestParam("areaComunId") int areaComunId) {
		AreaComun areaComun = areaComunService.findById(areaComunId);

		if (areaComun == null) {
			String mensaje = "AreaComun no encontrado con ID: " + areaComunId;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(areaComun, HttpStatus.OK);
	}

	@PostMapping("/areasComunes")
	public ResponseEntity<AreaComunDTO> addAreaComun(@RequestBody AreaComunDTO areaComunDTO) {
        AreaComun areaComun = convertToEntity(areaComunDTO);
        areaComunService.save(areaComun);

        return new ResponseEntity<>(areaComunDTO, HttpStatus.CREATED);

	}

	@PutMapping("/areasComunes/{areaComunId}")
	public ResponseEntity<?> updateAreaComun(@PathVariable int areaComunId, @RequestBody AreaComunDTO areaComunDTO) {
        AreaComun areaComun = convertToEntity(areaComunDTO);
        AreaComun areaComunOld = areaComunService.findById(areaComunId);

        if (areaComunOld == null) {
            String mensaje = "AreaComun no encontrado con ID: " + areaComunId;
            return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
        }

        areaComunService.update(areaComunId, areaComun);

        return new ResponseEntity<>(areaComunDTO, HttpStatus.OK);
	}

	@DeleteMapping("/areasComunes/{areaComunId}")
	public ResponseEntity<String> deleteAreaComun(@PathVariable int areaComunId) {
        AreaComun areaComun = areaComunService.findById(areaComunId);

        if (areaComun == null) {
            String mensaje = "AreaComun no encontrado con ID: " + areaComunId;
            return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
        }

        areaComunService.deleteById(areaComunId);

        String mensaje = "AreaComun eliminado [areaComunID: " + areaComunId + "]";
        return new ResponseEntity<>(mensaje, HttpStatus.OK);
	}
	
    private AreaComunDTO convertToDTO(AreaComun areaComun) {
        return new AreaComunDTO(
            areaComun.getPiso(),
            areaComun.getNombre(),
            areaComun.getEdificio()
        );
    }

    private AreaComun convertToEntity(AreaComunDTO areaComunDTO) {
        AreaComun areaComun = new AreaComun();
        areaComun.setPiso(areaComunDTO.getPiso());
        areaComun.setNombre(areaComunDTO.getNombre());
        areaComun.setEdificio(areaComunDTO.getEdificio());
        return areaComun;
    }

    private List<AreaComunDTO> convertToDTOs(List<AreaComun> areasComunes) {
        List<AreaComunDTO> areaComunDTOs = new ArrayList<>();
        for (AreaComun areaComun : areasComunes) {
            areaComunDTOs.add(convertToDTO(areaComun));
        }
        return areaComunDTOs;
    }
}
