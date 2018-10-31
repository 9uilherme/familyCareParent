package br.ufg.familycare.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufg.familycare.enums.EnumTipoSanguineo;
import io.swagger.annotations.Api;

@RestController
@Api(value = "tipos sanguineos", description = "Enum de tipos sanguineos")
public class TipoSanguineoController {

	@GetMapping("/tipossanguineos")
	EnumTipoSanguineo[] listarTodos() {
		return EnumTipoSanguineo.values();
	}

}
