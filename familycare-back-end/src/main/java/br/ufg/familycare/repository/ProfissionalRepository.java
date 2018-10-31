package br.ufg.familycare.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import br.ufg.familycare.model.Profissional;

public interface ProfissionalRepository extends PagingAndSortingRepository<Profissional, Long> {

	Iterable<Profissional> findByUsuarioIdOrderById(Long userId);

	Page<Profissional> findByUsuarioIdOrderById(Pageable pageable, Long userId);

	Page<Profissional> findByNomeIgnoreCaseContainingAndUsuarioIdOrderById(Pageable pageable, String nomeFilter,
			Long userId);

}
