package br.ufg.familycare.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.ufg.familycare.model.Consulta;
import br.ufg.familycare.repository.ConsultaRepository;

@Service
public class ConsultaService {

	@Autowired
	private ConsultaRepository consultaRepository;

	public Consulta salvar(Consulta consulta) {
		return consultaRepository.save(consulta);
	}

	public Optional<Consulta> consultarPorId(Long id) {
		return consultaRepository.findById(id);
	}

	public Iterable<Consulta> listarTodos(Long userId) {
		return consultaRepository.findByUsuarioIdOrderById(userId);
	}

	public Page<Consulta> listarComPaginacao(int pagina, int tamanho, Long userId) {
		Pageable pageable = PageRequest.of(pagina, tamanho, Sort.Direction.ASC, "id");
		return this.consultaRepository.findByUsuarioIdOrderById(pageable, userId);
	}

	public Page<Consulta> listarComFiltro(int pagina, int tamanho, String descricaoFilter, Long userId) {
		Pageable pageable = PageRequest.of(pagina, tamanho, Sort.Direction.ASC, "id");
		return this.consultaRepository.findByDescricaoIgnoreCaseContainingAndUsuarioIdOrderById(pageable,
				descricaoFilter, userId);
	}

	public void deletarPorId(Long id) {
		consultaRepository.deleteById(id);
	}

}