package br.ufg.familycare.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.ufg.familycare.config.CustomerDateAndTimeDeserialize;
import br.ufg.familycare.config.CustomerTimeDeserialize;
import br.ufg.familycare.enums.EnumUnidade;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
public class Medicamento implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Getter
	@GeneratedValue
	private Long id;
	
	@Getter @Setter
	@ManyToOne(optional=false)
	private Usuario usuario;

	@Getter @Setter
	private String nome;

	@ManyToOne
	@Getter @Setter
	private Membro membro;

	@Setter
	@Temporal(TemporalType.DATE)
	@JsonDeserialize(using = CustomerDateAndTimeDeserialize.class)
	private Date data;

	@Getter @Setter
	@Temporal(TemporalType.TIME)
	@JsonDeserialize(using = CustomerTimeDeserialize.class)
	private Date hora;

	@Getter @Setter
	private boolean lembrete;

	@Getter @Setter
	private BigDecimal dosagem;

	@Getter @Setter
	@Enumerated(EnumType.STRING)
	private EnumUnidade unidade;

	@Getter @Setter
	private Integer intervalo;

	@Getter @Setter
	private Integer quantidadeDias;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ", timezone = "GMT-3")
	public Date getData() {
		return data;
	}
}
