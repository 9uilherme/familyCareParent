package br.ufg.familycare.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufg.familycare.enums.EnumUnidade;
import io.swagger.annotations.Api;

@RestController
@Api(value = "unidades", description = "Enum de unidades")
public class UnidadeController {

	@GetMapping("/unidades")
	EnumUnidade[] listarTodos() {
		return EnumUnidade.values();
	}

}
