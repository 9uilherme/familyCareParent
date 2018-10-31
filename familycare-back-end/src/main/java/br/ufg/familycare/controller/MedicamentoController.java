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

import br.ufg.familycare.model.Medicamento;
import br.ufg.familycare.model.Membro;
import br.ufg.familycare.service.MedicamentoService;
import io.swagger.annotations.Api;

@RestController
@RequestMapping("/medicamentos")
@Api(value = "medicamentos", description = "Cadastro de medicamentos")
public class MedicamentoController {

	@Autowired
	private MedicamentoService medicamentoService;

	@PostMapping()
	Medicamento cadastrar(@Valid @RequestBody Medicamento medicamento) {
		return medicamentoService.salvar(medicamento);
	}

	@GetMapping("/{id}")
	Medicamento consultarPorId(@PathVariable Long id) {
		return medicamentoService.consultarPorId(id).get();
	}

	@PutMapping("/{id}")
	Medicamento alterarMedicamento(@Valid Medicamento medicamento, @PathVariable Long id) {
		return medicamentoService.salvar(medicamento);
	}

	@GetMapping()
	List<Medicamento> listarTodos() {
		Iterable<Medicamento> iterator = medicamentoService.listarTodos();
		List<Medicamento> medicamentos = new ArrayList<>();
		iterator.forEach(medicamentos::add);
		return medicamentos;
	}

	@GetMapping(value = "/{pagina}/{tamanho}")
	public  Page<Medicamento> listarCompaginacao(HttpServletRequest request, @PathVariable int pagina, @PathVariable int tamanho) {
		return medicamentoService.listarComPaginacao(pagina, tamanho);
	}

	@GetMapping(value = "/{pagina}/{tamanho}/{nomeFilter}")
	public  Page<Medicamento> listarComFiltro(HttpServletRequest request, @PathVariable int pagina, @PathVariable int tamanho,@PathVariable String nomeFilter) {
		return medicamentoService.listarComFiltro(pagina, tamanho, nomeFilter);
	}

	@DeleteMapping("/{id}")
	void deletarPorId(@PathVariable Long id) {
		medicamentoService.deletarPorId(id);
	}
}
