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

	public Iterable<Medicamento> listarTodos() {
		return medicamentoRepository.findAll();
	}

	public void deletarPorId(Long id) {
		medicamentoRepository.deleteById(id);
	}

	public Page<Medicamento> listarComPaginacao(int pagina, int tamanho) {
		Pageable pageable = PageRequest.of(pagina,tamanho,Sort.Direction.ASC,"id");
		return this.medicamentoRepository.findAll(pageable);
	}

	public Page<Medicamento> listarComFiltro(int pagina, int tamanho, String nomeFilter) {
		Pageable pageable = PageRequest.of(pagina,tamanho,Sort.Direction.ASC,"id");
		return this.medicamentoRepository.findByNomeIgnoreCaseContainingOrderById(pageable, nomeFilter);
	}

}