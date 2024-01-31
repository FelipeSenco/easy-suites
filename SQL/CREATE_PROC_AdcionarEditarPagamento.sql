alter PROCEDURE AdicionarEditarPagamento
(
	@id INT = NULL,
	@inquilinoId INT,
	@valor MONEY,
	@dataPagamento DATETIME,
	@mesReferente TINYINT,
	@anoReferente VARCHAR(4)
)

AS

BEGIN
	IF (@ID IS NULL)
		BEGIN
			INSERT INTO PagamentosAluguel 
					(InquilinoId,
					Valor,
					DataPagamento,
					MesReferente,
					AnoReferente,
					Excluido,
					DataCadastro)

			VALUES (@inquilinoId,
					@valor,
					@dataPagamento,
					@mesReferente,
					@anoReferente,
					0,
					getdate())		
					
			SELECT  Pa.Id,
					Inq.Nome as NomeInquilino,
					Inq.Id as InquilinoId,
					P.Nome as PropriedadeNome,
					Inq.PropriedadeId,
					Inq.QuartoId,
					Q.NumeroQuarto,
					Pa.Valor,
					Pa.DataPagamento,
					Pa.MesReferente,
					Pa.AnoReferente,				
					Pa.ComprovanteUrl
			FROM PagamentosAluguel Pa
			INNER JOIN Inquilinos Inq ON Inq.Id = Pa.InquilinoId
			INNER JOIN Propriedades P ON p.Id = Inq.PropriedadeId
			INNER JOIN Quartos Q ON Q.Id = Inq.QuartoId
			WHERE Pa.Id = SCOPE_IDENTITY()
		END
	ELSE
		BEGIN
			UPDATE PagamentosAluguel
			SET InquilinoId = @inquilinoId,
				Valor = @valor,
				DataPagamento = @dataPagamento,
				MesReferente = @mesReferente,
				AnoReferente = @anoReferente,
				DataAtualizacao = getdate()
			WHERE Id = @id

			SELECT  Pa.Id,
					Inq.Nome as NomeInquilino,
					Inq.Id as InquilinoId,
					P.Nome as PropriedadeNome,
					Inq.PropriedadeId,
					Inq.QuartoId,
					Q.NumeroQuarto,
					Pa.Valor,
					Pa.DataPagamento,
					Pa.MesReferente,
					Pa.AnoReferente,
					Pa.ComprovanteUrl
			FROM PagamentosAluguel Pa
			INNER JOIN Inquilinos Inq ON Inq.Id = Pa.InquilinoId
			INNER JOIN Propriedades P ON p.Id = Inq.PropriedadeId
			INNER JOIN Quartos Q ON Q.Id = Inq.QuartoId
			WHERE Pa.Id = @id
		END
END


