ALTER PROCEDURE GetAllPagamentos
(
    @page SMALLINT = 0
)
AS 
BEGIN

    DECLARE @RowsToSkip INT = @page * 15;
    
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
    WHERE Pa.Excluido = 0   
    ORDER BY Pa.DataCadastro DESC
    OFFSET @RowsToSkip ROWS       
    FETCH NEXT 15 ROWS ONLY 
END
