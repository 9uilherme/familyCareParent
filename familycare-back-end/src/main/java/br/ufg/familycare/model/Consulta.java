package br.ufg.familycare.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.ufg.familycare.config.CustomerDateAndTimeDeserialize;
import br.ufg.familycare.config.CustomerTimeDeserialize;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
public class Consulta {

	@Id
	@GeneratedValue
	@Getter
	private Long id;

	@Getter
	@Setter
	@ManyToOne(optional = false)
	private Usuario usuario;

	@Setter
	@Temporal(TemporalType.DATE)
	@JsonDeserialize(using = CustomerDateAndTimeDeserialize.class)
	private Date data;

	@Getter
	@Setter
	@Temporal(TemporalType.TIME)
	@JsonDeserialize(using = CustomerTimeDeserialize.class)
	private Date hora;

	@Getter
	@Setter
	private boolean lembrete;

	@Getter
	@Setter
	private String descricao;

	@Getter
	@Setter
	private String endereco;

	@ManyToOne
	@Getter
	@Setter
	private Membro membro;

	@ManyToOne
	@Getter
	@Setter
	private Profissional profissional;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ", timezone = "GMT-3")
	public Date getData() {
		return data;
	}
}
