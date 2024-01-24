CREATE PROCEDURE GetAllPagamentos

AS 

BEGIN
			SELECT	Pa.Id,
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
END
--grant exec on GetAllPagamentos to easy_suites_dev