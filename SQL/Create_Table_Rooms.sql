DROP TABLE Quartos
CREATE TABLE Quartos
(
	Id INT IDENTITY(1, 1) PRIMARY KEY,
	PropriedadeId INT,
	NumeroQuarto INT,
	Area INT,
	DataCadastro DATETIME,
)

ALTER TABLE Quartos
ADD CONSTRAINT FK_Quartos_PropriedadeId FOREIGN KEY (PropriedadeId)
REFERENCES Propriedades(Id);

ALTER TABLE quartos
drop column area

ALTER TABLE Quartos
ADD UNIQUE (PropriedadeId, NumeroQuarto);
