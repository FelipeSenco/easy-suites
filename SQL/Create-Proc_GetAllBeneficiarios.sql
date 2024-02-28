
CREATE PROCEDURE [dbo].[GetAllBeneficiarios]
WITH EXECUTE AS 'dbo'

AS

BEGIN
	SELECT  B.Agencia,
			B.BancoCodigo,
			B.ChavePix,
			B.DigitoConta,
			B.Id,
			B.Nome,
			B.NumeroConta,
			b.Banco,
			b.Cpf
	FROM Beneficiarios B
	ORDER BY B.Nome ASC
END


