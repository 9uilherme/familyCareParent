package br.ufg.familycare.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.ufg.familycare.model.Membro;
import br.ufg.familycare.repository.MembroRepository;

@Service
public class MembroService {

	@Autowired
	private MembroRepository membroRepository;

	public Membro salvar(Membro membro) {
		return membroRepository.save(membro);
	}

	public Optional<Membro> consultarPorId(Long id) {
		return membroRepository.findById(id);
	}

	public Iterable<Membro> listarTodos() {
		return membroRepository.findAll();
	}

	public void deletarPorId(Long id) {
		membroRepository.deleteById(id);
	}

	public Page<Membro> listarComPaginacao(int pagina, int tamanho) {
        Pageable pageable = PageRequest.of(pagina,tamanho,Sort.Direction.ASC,"id");
		return this.membroRepository.findAll(pageable);
	}
	
	public Page<Membro> listarComFiltro(int pagina, int tamanho,String nomeFilter) {
        Pageable pageable = PageRequest.of(pagina,tamanho,Sort.Direction.ASC,"id");
		return this.membroRepository.findByNomeIgnoreCaseContainingOrderById(pageable, nomeFilter);
	}

}