package br.ufg.familycare.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufg.familycare.model.Profissional;
import br.ufg.familycare.model.Usuario;
import br.ufg.familycare.service.ProfissionalService;
import br.ufg.familycare.service.UsuarioService;
import io.swagger.annotations.Api;

@RestController
@RequestMapping("/profissionais")
@Api(value = "Guidelines", description = "Cadastro de Profissionais")
public class ProfissionalController {

	@Autowired
	private ProfissionalService profissionalService;

	@Autowired
	private UsuarioService usuarioService;

	@PostMapping()
	Profissional cadastrar(HttpServletRequest request, @Valid @RequestBody Profissional profissional) {
		Usuario usuario = usuarioService.userFromRequest(request);
		profissional.setUsuario(usuario);
		return profissionalService.salvar(profissional);
	}

	@GetMapping("/{id}")
	Profissional consultarPorId(@PathVariable Long id) {
		return profissionalService.consultarPorId(id).get();
	}

	@PutMapping("/{id}")
	Profissional alterarProfissional(@Valid Profissional profissional, @PathVariable Long id) {
		return profissionalService.salvar(profissional);
	}

	@GetMapping()
	List<Profissional> listarTodos(HttpServletRequest request) {
		Usuario usuario = usuarioService.userFromRequest(request);
		Iterable<Profissional> iterator = profissionalService.listarTodos(usuario.getId());
		List<Profissional> profissionais = new ArrayList<>();
		iterator.forEach(profissionais::add);
		return profissionais;
	}

	@GetMapping(value = "/{pagina}/{tamanho}")
	public Page<Profissional> listarCompaginacao(HttpServletRequest request, @PathVariable int pagina,
			@PathVariable int tamanho) {
		Usuario usuario = usuarioService.userFromRequest(request);
		return profissionalService.listarComPaginacao(pagina, tamanho, usuario.getId());
	}

	@GetMapping(value = "/{pagina}/{tamanho}/{nomeFilter}")
	public Page<Profissional> listarComFiltro(HttpServletRequest request, @PathVariable int pagina,
			@PathVariable int tamanho, @PathVariable String nomeFilter) {
		Usuario usuario = usuarioService.userFromRequest(request);
		return profissionalService.listarComFiltro(pagina, tamanho, nomeFilter, usuario.getId());
	}

	@DeleteMapping("/{id}")
	void deletarPorId(@PathVariable Long id) {
		profissionalService.deletarPorId(id);
	}
}
