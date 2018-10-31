package br.ufg.familycare.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import br.ufg.familycare.model.Membro;

public interface MembroRepository extends PagingAndSortingRepository<Membro, Long> {

	Page<Membro> findByNomeIgnoreCaseContainingOrderById(Pageable pageable, String nomeFilter);

}
