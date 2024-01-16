ALTER PROCEDURE GetAllBeneficiarios

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

--grant exec on GetAllBeneficiarios to easy_suites_dev


