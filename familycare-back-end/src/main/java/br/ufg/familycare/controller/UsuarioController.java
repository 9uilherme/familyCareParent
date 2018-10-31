package br.ufg.familycare.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufg.familycare.controller.dto.UsuarioDto;
import br.ufg.familycare.model.Usuario;
import br.ufg.familycare.service.UsuarioService;
import io.swagger.annotations.Api;

@RestController
@RequestMapping("/usuarios")
@Api(value = "Guidelines", description = "Cadastro de Usuários")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@PostMapping()
	Usuario cadastrar(@Valid @RequestBody Usuario usuario) {
		usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
		return usuarioService.salvar(usuario);
	}

	@GetMapping("/existe/{email}")
	Boolean usuarioExiste(@PathVariable String email) {
		Usuario usuario = usuarioService.consultarPorEmail(email);
		return usuario != null;
	}

	@GetMapping("/{email}")
	UsuarioDto consultarPorEmail(@PathVariable String email) {
		Usuario usuario = usuarioService.consultarPorEmail(email);
		return preencherUsuarioDto(usuario);
	}

	@PutMapping()
	UsuarioDto alterarUsuario(@Valid @RequestBody UsuarioDto usuarioDto) {
		Optional<Usuario> usuarioOpt = usuarioService.consultarPorId(usuarioDto.getId());
		Usuario usuario = null;

		if (usuarioOpt.isPresent()) {
			usuario = usuarioOpt.get();

			if (!StringUtils.isEmpty(usuarioDto.getNome())) {
				usuario.setNome(usuarioDto.getNome());
			}
			if (!StringUtils.isEmpty(usuarioDto.getImagemPerfil())) {
				usuario.setImagemPerfil(usuarioDto.getImagemPerfil());
			}
			if (!StringUtils.isEmpty(usuarioDto.getPassword())) {
				usuario.setPassword(passwordEncoder.encode(usuarioDto.getPassword()));
			}
			usuario = usuarioService.salvar(usuario);
			return preencherUsuarioDto(usuario);
		} else {
			return usuarioDto;
		}
	}

	private UsuarioDto preencherUsuarioDto(Usuario usuario) {
		return new UsuarioDto(usuario.getId(), usuario.getNome(), usuario.getPassword(), usuario.getImagemPerfil(),usuario.getPerfil(), usuario.getEmail());
	}

	@GetMapping()
	List<Usuario> listarTodos() {
		return usuarioService.listarTodos();
	}

	@DeleteMapping("/{id}")
	void deletarPorId(@PathVariable Long id) {
		usuarioService.deletarPorId(id);
	}
}
