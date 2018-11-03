package br.ufg.familycare.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import br.ufg.familycare.enums.EnumPerfil;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDto {

	private Long id;

	private String nome;

	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;

	private String imagemPerfil;
	
	private EnumPerfil perfil;
	
	private String email;
}
