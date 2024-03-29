
CREATE PROCEDURE [dbo].[GetAllInquilinos]
WITH EXECUTE AS 'dbo'

AS

BEGIN
	SELECT Inq.Id,
		   Inq.Nome,
		   Inq.QuartoId,
		   Q.NumeroQuarto,
		   Inq.PropriedadeId,
		   P.Nome as PropriedadeNome,
		   Inq.Cpf,
		   Inq.BeneficiarioId,
		   B.Nome as BeneficiarioNome,
		   Inq.DiaVencimento,
		   Inq.InicioAluguel,
		   Inq.FimAluguel,
		   Inq.Telefone
	FROM Inquilinos Inq
	INNER JOIN Propriedades P ON P.Id = Inq.PropriedadeId
	INNER JOIN Quartos Q ON Inq.QuartoId = Q.Id
	LEFT JOIN Beneficiarios B ON B.Id = Inq.BeneficiarioId
	where Excluido = 0
	order by p.Id
END
