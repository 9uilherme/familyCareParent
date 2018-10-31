package br.ufg.familycare.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.ufg.familycare.model.Profissional;
import br.ufg.familycare.repository.ProfissionalRepository;

@Service
public class ProfissionalService {

	@Autowired
	private ProfissionalRepository profissionalRepository;

	public Profissional salvar(Profissional profissional) {
		return profissionalRepository.save(profissional);
	}

	public Optional<Profissional> consultarPorId(Long id) {
		return profissionalRepository.findById(id);
	}

	public Iterable<Profissional> listarTodos(Long userId) {
		return profissionalRepository.findByUsuarioIdOrderById(userId);
	}

	public Page<Profissional> listarComPaginacao(int pagina, int tamanho, Long userId) {
		Pageable pageable = PageRequest.of(pagina, tamanho, Sort.Direction.ASC, "id");
		return this.profissionalRepository.findByUsuarioIdOrderById(pageable, userId);
	}

	public Page<Profissional> listarComFiltro(int pagina, int tamanho, String nomeFilter, Long userId) {
		Pageable pageable = PageRequest.of(pagina, tamanho, Sort.Direction.ASC, "id");
		return this.profissionalRepository.findByNomeIgnoreCaseContainingAndUsuarioIdOrderById(pageable, nomeFilter,
				userId);
	}

	public void deletarPorId(Long id) {
		profissionalRepository.deleteById(id);
	}

}