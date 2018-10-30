package br.ufg.familycare.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufg.familycare.enums.EnumIntervalo;
import io.swagger.annotations.Api;

@RestController
@Api(value = "Intervalos", description = "Enum de intervalos")
public class IntervaloController {
	
	@GetMapping("/intervalos")
	EnumIntervalo[] listarTodos() {
		return EnumIntervalo.values();
	}
}
