-- Table: flyway_schema_history

CREATE TABLE flyway_schema_history
(
  installed_rank integer NOT NULL,
  version character varying(50),
  description character varying(200) NOT NULL,
  type character varying(20) NOT NULL,
  script character varying(1000) NOT NULL,
  checksum integer,
  installed_by character varying(100) NOT NULL,
  installed_on timestamp without time zone NOT NULL DEFAULT now(),
  execution_time integer NOT NULL,
  success boolean NOT NULL,
  CONSTRAINT flyway_schema_history_pk PRIMARY KEY (installed_rank)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE flyway_schema_history
  OWNER TO postgres;

-- Index: flyway_schema_history_s_idx

CREATE INDEX flyway_schema_history_s_idx
  ON flyway_schema_history
  USING btree
  (success);

-- Usuario: Inicializando um usuário

INSERT INTO usuario(
            id, email, imagem_perfil, nome, password, perfil)
    VALUES (((SELECT MAX(ID) FROM USUARIO)+1), 'wendel@gmail.com','', 'Wendel Guedes', '$2a$10$CSeRbeszwjB4QQydRn8BaO5HJb4gkQVnzPycg3w3G2DcIbLN1kakS', 'ADMIN');
