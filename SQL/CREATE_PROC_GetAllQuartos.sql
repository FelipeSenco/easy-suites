
CREATE PROCEDURE [dbo].[GetAllQuartos]
WITH EXECUTE AS 'dbo'

AS

BEGIN
	SELECT Q.Id,
		   Q.PropriedadeId,
		   Q.NumeroQuarto,
			Q.Valor,
		   P.Nome AS PropriedadeNome,
		   Inq.Nome as InquilinoNome,
		   Inq.Id as InquilinoId
	FROM Quartos Q
	INNER JOIN Propriedades P ON P.Id = Q.PropriedadeId
	LEFT JOIN Inquilinos Inq ON Inq.QuartoId = Q.Id
END
