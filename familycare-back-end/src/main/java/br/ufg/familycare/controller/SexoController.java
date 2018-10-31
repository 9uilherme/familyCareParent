package br.ufg.familycare.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufg.familycare.enums.EnumSexo;
import io.swagger.annotations.Api;

@RestController
@Api(value = "sexos", description = "Enum de sexos")
public class SexoController {

	@GetMapping("/sexos")
	EnumSexo[] listarTodos() {
		return EnumSexo.values();
	}

}
