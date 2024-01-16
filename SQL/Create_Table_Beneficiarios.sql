
CREATE TABLE Beneficiarios
(
	Id INT IDENTITY(1, 1) PRIMARY KEY,
	Nome VARCHAR(150),
	BancoCodigo INT,
	NumeroConta INT,
	DigitoConta INT,
	Agencia INT,
	ChavePix VARCHAR(255),
	DataCadastro DATETIME
)

ALTER TABLE Beneficiarios
ADD Banco VARCHAR(60)

ALTER TABLE Beneficiarios
ADD Cpf VARCHAR(18)