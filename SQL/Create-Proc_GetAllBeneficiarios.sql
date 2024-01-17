
ALTER PROCEDURE [dbo].[GetAllBeneficiarios]

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
END


