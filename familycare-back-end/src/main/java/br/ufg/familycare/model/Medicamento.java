package br.ufg.familycare.model;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.ufg.familycare.enums.EnumIntervalo;
import br.ufg.familycare.enums.EnumUnidade;
import lombok.Data;

@Entity
@Data
public class Medicamento {

	@Id 
	@GeneratedValue
	private Long id;

	private String nome;

	@Temporal(TemporalType.DATE)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	private Date data;

	@Temporal(TemporalType.TIME)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
	private Date hora;

	private Boolean lembrete;

	private BigDecimal dosagem;

	@Enumerated(EnumType.STRING)
	private EnumUnidade unidade;

	@Enumerated(EnumType.STRING)
	private EnumIntervalo intervalo;

	private Integer quantidadeDias;

}
