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

import br.ufg.familycare.model.Membro;
import br.ufg.familycare.model.Usuario;
import br.ufg.familycare.service.MembroService;
import br.ufg.familycare.service.UsuarioService;
import io.swagger.annotations.Api;

@RestController
@RequestMapping("/membros")
@Api(value = "Guidelines", description = "Cadastro de Membros")
public class MembroController {

	@Autowired
	private MembroService membroService;

	@Autowired
	private UsuarioService usuarioService;

	@PostMapping()
	Membro cadastrar(HttpServletRequest request, @Valid @RequestBody Membro membro) {
		Usuario usuario = usuarioService.userFromRequest(request);
		membro.setUsuario(usuario);
		return membroService.salvar(membro);
	}

	@GetMapping("/{id}")
	Membro consultarPorId(@PathVariable Long id) {
		return membroService.consultarPorId(id).get();
	}

	@PutMapping("/{id}")
	Membro alterarMembro(@Valid Membro membro, @PathVariable Long id) {
		return membroService.salvar(membro);
	}

	@GetMapping()
	List<Membro> listarTodos(HttpServletRequest request) {
		Usuario usuario = usuarioService.userFromRequest(request);
		Iterable<Membro> iterator = membroService.listarTodos(usuario.getId());
		List<Membro> membros = new ArrayList<>();
		iterator.forEach(membros::add);
		return membros;
	}

	@GetMapping(value = "/{pagina}/{tamanho}")
	public  Page<Membro> listarCompaginacao(HttpServletRequest request, @PathVariable int pagina, @PathVariable int tamanho) {
		Usuario usuario = usuarioService.userFromRequest(request);
		return membroService.listarComPaginacao(pagina, tamanho,usuario.getId());
	}

	@GetMapping(value = "/{pagina}/{tamanho}/{nomeFilter}")
	public  Page<Membro> listarComFiltro(HttpServletRequest request, @PathVariable int pagina, @PathVariable int tamanho,@PathVariable String nomeFilter) {
		Usuario usuario = usuarioService.userFromRequest(request);
		return membroService.listarComFiltro(pagina, tamanho, nomeFilter, usuario.getId());
	}

	@DeleteMapping("/membros/{id}")
	void deletarPorId(@PathVariable Long id) {
		membroService.deletarPorId(id);
	}

}
