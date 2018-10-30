package br.ufg.familycare.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.ufg.familycare.enums.EnumIntervalo;
import br.ufg.familycare.enums.EnumUnidade;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Medicamento implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private Long id;

	private String nome;

	@ManyToOne
	private Membro membro;

	@Temporal(TemporalType.DATE)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date data;

	@Temporal(TemporalType.TIME)
	private Date hora;

	private Boolean lembrete;

	private BigDecimal dosagem;

	@Enumerated(EnumType.STRING)
	private EnumUnidade unidade;

	@Enumerated(EnumType.STRING)
	private EnumIntervalo intervalo;

	private Integer quantidadeDias;

}
