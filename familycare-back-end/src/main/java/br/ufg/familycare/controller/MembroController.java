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
import br.ufg.familycare.service.MembroService;
import io.swagger.annotations.Api;

@RestController
@RequestMapping("/membros")
@Api(value = "Guidelines", description = "Cadastro de Membros")
public class MembroController {

	@Autowired
	private MembroService membroService;

	@PostMapping()
	Membro cadastrar(@Valid @RequestBody Membro membro) {
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
	List<Membro> listarTodos() {
		Iterable<Membro> iterator = membroService.listarTodos();
		List<Membro> membros = new ArrayList<>();
		iterator.forEach(membros::add);
		return membros;
	}

	@GetMapping(value = "/{pagina}/{tamanho}")
	public  Page<Membro> listarCompaginacao(HttpServletRequest request, @PathVariable int pagina, @PathVariable int tamanho) {
		return membroService.listarComPaginacao(pagina, tamanho);
	}

	@GetMapping(value = "/{pagina}/{tamanho}/{nomeFilter}")
	public  Page<Membro> listarComFiltro(HttpServletRequest request, @PathVariable int pagina, @PathVariable int tamanho,@PathVariable String nomeFilter) {
		return membroService.listarComFiltro(pagina, tamanho, nomeFilter);
	}
	
	@DeleteMapping("/membros/{id}")
	void deletarPorId(@PathVariable Long id) {
		membroService.deletarPorId(id);
	}
}
