package br.ufg.familycare.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import br.ufg.familycare.model.Consulta;

public interface ConsultaRepository extends PagingAndSortingRepository<Consulta, Long> {

	Iterable<Consulta> findByUsuarioIdOrderById(Long userId);

	Page<Consulta> findByUsuarioIdOrderById(Pageable pageable, Long userId);

	Page<Consulta> findByDescricaoIgnoreCaseContainingAndUsuarioIdOrderById(Pageable pageable, String descricaoFilter,
			Long userId);

}
