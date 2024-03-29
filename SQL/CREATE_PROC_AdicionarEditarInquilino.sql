
CREATE PROCEDURE [dbo].[AdicionarEditarInquilino]
(
	@id INT = NULL,
	@quartoId INT= NULL,
	@beneficiarioId INT= NULL,
	@inicioAluguel DATETIME = NULL,
	@fimAluguel DATETIME = NULL,
	@diaVencimento TINYINT = NULL,
	@cpf VARCHAR(15) = NULL,
	@propriedadeId INT,
	@nome VARCHAR(255),
	@telefone VARCHAR(20)
)
WITH EXECUTE AS 'dbo'

AS 

BEGIN
	IF (@Id IS NULL)
		BEGIN
			INSERT INTO  Inquilinos
			(
			QuartoId,
			PropriedadeId,
			Nome,
			BeneficiarioId,
			InicioAluguel,
			FimAluguel,
			DiaVencimento,
			Cpf, 
			DataCadastro,
			Excluido,
			Telefone)
			VALUES
			(
			@quartoId,
			@propriedadeId,
			@nome,
			@beneficiarioId,
			@inicioAluguel,
			@fimAluguel,
			@diaVencimento,
			@cpf,			
			getdate(),
			0,
			@telefone)

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
			WHERE Inq.Id = SCOPE_IDENTITY()
		END
		
	ELSE
		BEGIN
			UPDATE Inquilinos
			SET QuartoId = @quartoId,
				PropriedadeId = @propriedadeId,
				Nome = @nome,
				BeneficiarioId = @beneficiarioId,
				InicioAluguel = @inicioAluguel,
				FimAluguel = @fimAluguel,
				DiaVencimento = @diaVencimento,
				Cpf = @cpf,
				DataAtualizacao = GETDATE(),
				Telefone = @telefone
			WHERE Id = @id	
			
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
			WHERE Inq.Id = @id
		END
	
END