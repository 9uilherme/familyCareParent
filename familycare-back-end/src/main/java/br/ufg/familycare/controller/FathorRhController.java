package br.ufg.familycare.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufg.familycare.enums.EnumFatorRH;
import io.swagger.annotations.Api;

@RestController
@Api(value = "fatores Rh", description = "Enum de fatores Rh")
public class FathorRhController {

	@GetMapping("/fatoresrh")
	EnumFatorRH[] listarTodos() {
		return EnumFatorRH.values();
	}

}
