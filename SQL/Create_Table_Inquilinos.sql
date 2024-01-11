drop table inquilinos
CREATE TABLE Inquilinos
(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	Nome VARCHAR(100),
	QuartoId INT,
	PropriedadeId INT,
	BeneficiarioId INT,
	InicioAluguel Datetime,
	FimAluguel DateTime,
	DataCadastro DATETIME,
	DataAtualizacao DATETIME
)

ALTER TABLE Inquilinos
ADD CONSTRAINT FK_Inquilinos_QuartoId FOREIGN KEY (QuartoId)
REFERENCES Quartos(Id);

ALTER TABLE Inquilinos
ADD CONSTRAINT FK_Inquilinoss_PropriedadeId FOREIGN KEY (PropriedadeId)
REFERENCES Propriedades(Id);


ALTER TABLE Inquilinos
ADD CONSTRAINT FK_Inquilinos_BeneficiarioId FOREIGN KEY (BeneficiarioId)
REFERENCES Beneficiarios(Id);
