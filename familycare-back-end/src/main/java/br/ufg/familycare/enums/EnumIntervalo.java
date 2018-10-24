package br.ufg.familycare.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum EnumIntervalo {


	A(1),
	B(2),
	C(3),
	D(4),
	E(6),
	F(8),
	G(12),
	H(24);

	@JsonValue
	private int intervalo;

	EnumIntervalo(int intervalo) {
		this.intervalo = intervalo;
	}

	public int getIntervalo() {
		return intervalo;
	}

}
