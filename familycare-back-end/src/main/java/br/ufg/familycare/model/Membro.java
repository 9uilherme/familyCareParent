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
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.ufg.familycare.config.CustomerDateAndTimeDeserialize;
import br.ufg.familycare.enums.EnumFatorRH;
import br.ufg.familycare.enums.EnumSexo;
import br.ufg.familycare.enums.EnumTipoSanguineo;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
public class Membro implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Getter
	@GeneratedValue
	private Long id;

	@Getter @Setter
	@ManyToOne(optional=false)
	private Usuario usuario;

	@Temporal(TemporalType.DATE)
	@JsonDeserialize(using = CustomerDateAndTimeDeserialize.class)
	private Date dataNascimento;

	@Getter
	@Setter
	@NotBlank(message = "{nome.notblank}")
	@Size(min = 1, max = 255, message = "{nome.size}")
	private String nome;

	@Getter
	@Setter
	private BigDecimal peso;

	@Getter
	@Setter
	private BigDecimal Altura;

	@Getter
	@Setter
	@Enumerated(EnumType.STRING)
	private EnumSexo sexo;

	@Getter
	@Setter
	@Enumerated(EnumType.STRING)
	private EnumTipoSanguineo tipoSanguineo;

	@Getter
	@Setter
	@Enumerated(EnumType.STRING)
	private EnumFatorRH fatorRH;

	@Getter
	@Setter
	@Type(type = "org.hibernate.type.TextType")
	private String imagemPerfil;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ", timezone = "GMT-3")
	public Date getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
	}
}
