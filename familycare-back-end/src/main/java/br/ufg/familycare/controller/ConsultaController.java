package br.ufg.familycare.controller;

import br.ufg.familycare.model.Consulta;
import br.ufg.familycare.model.Usuario;
import br.ufg.familycare.service.ConsultaService;
import br.ufg.familycare.service.UsuarioService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/consultas")
@Api(value = "consultas", description = "Cadastro de consultas")
public class ConsultaController {

	@Autowired
	private ConsultaService consultaService;

	@Autowired
	private UsuarioService usuarioService;

	@PostMapping()
	Consulta cadastrar(HttpServletRequest request, @Valid @RequestBody Consulta consulta) {
		Usuario usuario = usuarioService.userFromRequest(request);
		consulta.setUsuario(usuario);
		return consultaService.salvar(consulta);
	}

	@GetMapping("/{id}")
	Consulta consultarPorId(@PathVariable Long id) {
		return consultaService.consultarPorId(id).get();
	}

	@PutMapping("/{id}")
	Consulta alterarConsulta(@Valid Consulta consulta, @PathVariable Long id) {
		return consultaService.salvar(consulta);
	}

	@GetMapping()
	List<Consulta> listarTodos(HttpServletRequest request) {
		Usuario usuario = usuarioService.userFromRequest(request);
		Iterable<Consulta> iterator = consultaService.listarTodos(usuario.getId());
		List<Consulta> consultas = new ArrayList<>();
		iterator.forEach(consultas::add);
		return consultas;
	}

	@GetMapping(value = "/{pagina}/{tamanho}")
	public  Page<Consulta> listarCompaginacao(HttpServletRequest request, @PathVariable int pagina, @PathVariable int tamanho) {
		Usuario usuario = usuarioService.userFromRequest(request);
		return consultaService.listarComPaginacao(pagina, tamanho,usuario.getId());
	}

	@GetMapping(value = "/{pagina}/{tamanho}/{nomeFilter}")
	public  Page<Consulta> listarComFiltro(HttpServletRequest request, @PathVariable int pagina, @PathVariable int tamanho,@PathVariable String descricaoFilter) {
		Usuario usuario = usuarioService.userFromRequest(request);
		return consultaService.listarComFiltro(pagina, tamanho, descricaoFilter, usuario.getId());
	}

	@DeleteMapping("/consultas/{id}")
	void deletarPorId(@PathVariable Long id) {
		consultaService.deletarPorId(id);
	}
}
