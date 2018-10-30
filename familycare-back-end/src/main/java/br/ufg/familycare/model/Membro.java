package br.ufg.familycare.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.ufg.familycare.enums.EnumFatorRH;
import br.ufg.familycare.enums.EnumSexo;
import br.ufg.familycare.enums.EnumTipoSanguineo;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Membro implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private Long id;

	@Temporal(TemporalType.DATE)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date dataNascimento;

	@NotBlank(message = "{nome.notblank}")
	@Size(min = 1, max = 255, message = "{nome.size}")
	private String nome;

	private BigDecimal peso;

	private BigDecimal Altura;

	@Enumerated(EnumType.STRING)
	private EnumSexo sexo;

	@Enumerated(EnumType.STRING)
	private EnumTipoSanguineo tipoSanguineo;

	@Enumerated(EnumType.STRING)
	private EnumFatorRH fatorRH;

	@Type(type = "org.hibernate.type.TextType")
	private String imagemPerfil;

}
