package br.ufg.familycare.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.ufg.familycare.model.Medicamento;
import br.ufg.familycare.repository.MedicamentoRepository;

@Service
public class MedicamentoService {

	@Autowired
	private MedicamentoRepository medicamentoRepository;

	public Medicamento salvar(Medicamento medicamento) {
		return medicamentoRepository.save(medicamento);
	}

	public Optional<Medicamento> consultarPorId(Long id) {
		return medicamentoRepository.findById(id);
	}

	public Iterable<Medicamento> listarTodos(Long userId) {
		return medicamentoRepository.findByUsuarioIdOrderById(userId);
	}

	public Page<Medicamento> listarComPaginacao(int pagina, int tamanho, Long userId) {
		Pageable pageable = PageRequest.of(pagina, tamanho, Sort.Direction.ASC, "id");
		return this.medicamentoRepository.findByUsuarioIdOrderById(pageable, userId);
	}

	public Page<Medicamento> listarComFiltro(int pagina, int tamanho, String nomeFilter, Long userId) {
		Pageable pageable = PageRequest.of(pagina, tamanho, Sort.Direction.ASC, "id");
		return this.medicamentoRepository.findByNomeIgnoreCaseContainingAndUsuarioIdOrderById(pageable, nomeFilter,
				userId);
	}

	public void deletarPorId(Long id) {
		medicamentoRepository.deleteById(id);
	}

}