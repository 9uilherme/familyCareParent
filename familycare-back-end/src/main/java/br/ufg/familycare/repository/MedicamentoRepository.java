package br.ufg.familycare.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import br.ufg.familycare.model.Medicamento;

public interface MedicamentoRepository extends PagingAndSortingRepository<Medicamento, Long> {

	Page<Medicamento> findByNomeIgnoreCaseContainingOrderById(Pageable pageable, String nomeFilter);

}
