CREATE TABLE PagamentosAluguel
(
	Id INT IDENTITY(1, 1) PRIMARY KEY,
	Valor MONEY,
	DataPagamento DATETIME,
	MesReferente TINYINT,
	InquilinoId INT,
)

ALTER TABLE PagamentosAluguel
ADD CONSTRAINT FK_PagamentosAluguel_InquilinoId FOREIGN KEY (InquilinoId)
REFERENCES [Inquilinos]