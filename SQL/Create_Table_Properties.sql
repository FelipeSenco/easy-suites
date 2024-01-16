
CREATE TABLE Propriedades
(
	Id INT IDENTITY(1, 1) PRIMARY KEY,
	Nome VARCHAR(100),
	Rua VARCHAR(150),
	Numero INT,
	Cidade VARCHAR(100),
	Uf VARCHAR(4),
	Estado VARCHAR(100),
	DataCadastro DATETIME,
)

ALTER TABLE Propriedades ADD Bairro varchar(50)
