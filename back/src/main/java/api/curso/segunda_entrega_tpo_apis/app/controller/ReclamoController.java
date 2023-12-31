package api.curso.segunda_entrega_tpo_apis.app.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import api.curso.segunda_entrega_tpo_apis.app.model.dao.IAreaComunDAO;
import api.curso.segunda_entrega_tpo_apis.app.model.dao.IEdificioDAO;
import api.curso.segunda_entrega_tpo_apis.app.model.dao.IUnidadDAO;
import api.curso.segunda_entrega_tpo_apis.app.model.dao.IUsuarioDAO;
import api.curso.segunda_entrega_tpo_apis.app.model.entity.AreaComun;
import api.curso.segunda_entrega_tpo_apis.app.model.entity.Edificio;
import api.curso.segunda_entrega_tpo_apis.app.model.entity.Reclamo;
import api.curso.segunda_entrega_tpo_apis.app.model.entity.ReclamoDTO;
import api.curso.segunda_entrega_tpo_apis.app.model.entity.Unidad;
import api.curso.segunda_entrega_tpo_apis.app.model.entity.Usuario;
import api.curso.segunda_entrega_tpo_apis.app.model.entity.UsuarioDTO;
import api.curso.segunda_entrega_tpo_apis.app.service.IAreaComunService;
import api.curso.segunda_entrega_tpo_apis.app.service.IReclamoService;
import api.curso.segunda_entrega_tpo_apis.app.service.IUnidadService;
import api.curso.segunda_entrega_tpo_apis.app.service.IUsuarioService;


@RestController
@RequestMapping("/tpo_apis")
public class ReclamoController {
	
	@Autowired
	private IReclamoService reclamoService;
	
	@Autowired
	private IUnidadDAO unidadDAO;

	@Autowired
	private IAreaComunDAO areaComunDAO;

	@Autowired
	private IEdificioDAO edificioDAO;
	
	@Autowired
	private IUsuarioDAO usuarioDAO;

    

	@GetMapping("/reclamos")
	public List<ReclamoDTO> findAll(){
        List<Reclamo> reclamos = reclamoService.findAll();
        List<ReclamoDTO> reclamoDTOs = convertToDTOs(reclamos);
        return reclamoDTOs;
	}
	
	@GetMapping("/reclamos/{reclamoId}")
	public ResponseEntity<?> getReclamo(@PathVariable int reclamoId) {
        Reclamo reclamo = reclamoService.findById(reclamoId);
        System.out.println(reclamoId);
        System.out.println(reclamo);
        if (reclamo == null) {
            String mensaje = "Reclamo no encontrado con ID: " + reclamoId;
            return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
        }

        ReclamoDTO reclamoDTO = convertToDTO(reclamo);
        return new ResponseEntity<>(reclamoDTO, HttpStatus.OK);

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
	public ResponseEntity<?> addReclamo(@RequestBody ReclamoDTO reclamoDTO) {

	    Reclamo reclamo = convertToEntity(reclamoDTO);
        System.out.println(reclamo);
	    // Guarda el reclamo
	    reclamoService.save(reclamo);


        return new ResponseEntity<>(Collections.singletonMap("id", reclamo.getId()), HttpStatus.CREATED);
	}

	
	@PutMapping("/reclamos/{reclamoId}")
	public ResponseEntity<?> updateReclamo(@PathVariable int reclamoId, @RequestBody ReclamoDTO reclamoDTO) {
		Reclamo reclamoOld = reclamoService.findById(reclamoId);


		if (reclamoOld == null) {
			String mensaje = "Reclamo no encontrado con ID: " + reclamoId;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}
		
		Reclamo reclamoToUpdate = convertToEntity(reclamoDTO);

		reclamoService.update(reclamoId, reclamoToUpdate);
		
		ReclamoDTO reclamoUpdatedDTO = convertToDTO(reclamoToUpdate);

        return new ResponseEntity<>(Collections.singletonMap("id", reclamoUpdatedDTO.getId()), HttpStatus.CREATED);
	}
	
	@DeleteMapping("/reclamos/{reclamoId}")
	public ResponseEntity<String> deleteReclamo(@PathVariable int reclamoId){
        Reclamo reclamo = reclamoService.findById(reclamoId);

        if (reclamo == null) {
            String mensaje = "Reclamo no encontrado con ID: " + reclamoId;
            return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
        }

        reclamoService.deleteById(reclamoId);

        String mensaje = "Reclamo eliminado [reclamoID: " + reclamoId + "]";
        return new ResponseEntity<>(mensaje, HttpStatus.OK);
	}
	
	private ReclamoDTO convertToDTO(Reclamo reclamo) {
	    int unidadId = reclamo.getUnidad() != null ? reclamo.getUnidad().getIdUnidad() : 0;
	    int areaComunId = reclamo.getAreaComun() != null ? reclamo.getAreaComun().getIdAreaComun() : 0;
	    int edificioId = reclamo.getEdificio() != null ? reclamo.getEdificio().getId() : 0;
	    int usuarioId = reclamo.getUsuario() != null ? reclamo.getUsuario().getId() : 0;
		System.out.println(reclamo);
	    return new ReclamoDTO(
		    reclamo.getId(),
		    usuarioId,
	        unidadId,
	        areaComunId,
	        reclamo.getDescripcion(),
	        edificioId,
	        reclamo.getEstado(),
	        reclamo.getFotos(),
	        reclamo.getFechaCreacion(),
	        reclamo.getFechaModificacion()
	    );
	}


	private Reclamo convertToEntity(ReclamoDTO reclamoDTO) {
	    Unidad unidad = unidadDAO.findById(reclamoDTO.getUnidad());
	    AreaComun areaComun = areaComunDAO.findById(reclamoDTO.getAreaComun());
	    Edificio edificio = edificioDAO.findById(reclamoDTO.getEdificio());
	    Usuario usuario = usuarioDAO.findById(reclamoDTO.getUsuario());

	    Reclamo reclamo = new Reclamo(
	    	usuario,
	        unidad,
	        areaComun,
	        reclamoDTO.getDescripcion(),
	        edificio,
	        reclamoDTO.getEstado(),
	        reclamoDTO.getFotos(),
	        reclamoDTO.getFechaCreacion(),
	        reclamoDTO.getFechaModificacion()
	    );
	    return reclamo;
	}


    private List<ReclamoDTO> convertToDTOs(List<Reclamo> reclamos) {
        List<ReclamoDTO> reclamoDTOs = new ArrayList<>();
        for (Reclamo reclamo : reclamos) {
            reclamoDTOs.add(convertToDTO(reclamo));
        }
        return reclamoDTOs;
    }
}
