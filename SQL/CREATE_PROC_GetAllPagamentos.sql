
ALTER PROCEDURE [dbo].[GetAllPagamentos]
(
    @page SMALLINT = 0,
    @anoReferente VARCHAR(4) = NULL,
    @mesReferente TINYINT = NULL,
    @inquilinoId INT = NULL,
    @propriedadeId INT = NULL,
	@beneficiarioId INT = NULL
)
WITH EXECUTE AS 'dbo'
AS 
BEGIN
    DECLARE @RowsToSkip INT = @page * 15;
    DECLARE @SQL NVARCHAR(MAX);
    DECLARE @IncludeEmptyPayments BIT = IIF(@anoReferente IS NOT NULL AND @mesReferente IS NOT NULL, 1, 0);

    SET @SQL = N'SELECT DISTINCT Inq.Id AS InquilinoId,
                        Inq.Nome AS NomeInquilino,
                        P.Nome AS PropriedadeNome,
                        Inq.PropriedadeId,
                        Q.NumeroQuarto,
                        Pa.Id,
                        Pa.Valor,
                        Pa.DataPagamento,
                        ISNULL(Pa.MesReferente, @mesReferente) AS MesReferente,
                        ISNULL(Pa.AnoReferente, @anoReferente) AS AnoReferente,
                        Pa.ComprovanteUrl,
                        B.Nome AS BeneficiarioNome,
						Pa.Observacao
                 FROM Inquilinos Inq
                 INNER JOIN Propriedades P ON P.Id = Inq.PropriedadeId
                 INNER JOIN Quartos Q ON Q.Id = Inq.QuartoId ';


	--when year and month are provided we include empty payments for the remaining tenants that havent a registered payment for that month
    IF @anoReferente IS NOT NULL AND @mesReferente IS NOT NULL
		BEGIN
			SET @SQL += ' LEFT JOIN PagamentosAluguel Pa ON Inq.Id = Pa.InquilinoId AND (Pa.Excluido = 0 OR Pa.Excluido IS NULL) ';
			SET @SQL += N'AND ((Pa.MesReferente = @mesReferente AND Pa.AnoReferente = @anoReferente) OR Pa.Id IS NULL) ';
		END
	ELSE
		BEGIN
			SET @SQL += ' INNER JOIN PagamentosAluguel Pa ON Inq.Id = Pa.InquilinoId AND (Pa.Excluido = 0 OR Pa.Excluido IS NULL) ';
		END

    SET @SQL += N'LEFT JOIN Beneficiarios B ON B.Id = Inq.BeneficiarioId
                  WHERE Inq.Excluido = 0 ';

	--this ensures the year filters works even when no month is selected
	IF (@anoReferente IS NOT NULL AND @mesReferente IS NULL)
		BEGIN
			SET @SQL += N'AND Pa.AnoReferente = @anoReferente ';
		END

    IF @inquilinoId IS NOT NULL
		BEGIN
			SET @SQL += N'AND Inq.Id = @inquilinoId ';
		END

    IF @propriedadeId IS NOT NULL
		BEGIN
			SET @SQL += N'AND Inq.PropriedadeId = @propriedadeId ';
		END

	IF @beneficiarioId IS NOT NULL
		BEGIN
			SET @SQL += N'AND Inq.BeneficiarioId = @beneficiarioId ';
		END

    -- Add additional filters here based on @anoReferente and @mesReferente

    SET @SQL += N'ORDER BY Pa.DataPagamento DESC
                  OFFSET ' + CAST(@RowsToSkip AS NVARCHAR(10)) + ' ROWS       
                  FETCH NEXT 15 ROWS ONLY';

    EXEC sp_executesql @SQL, N'@anoReferente VARCHAR(4), @mesReferente TINYINT, @inquilinoId INT, @propriedadeId INT, @IncludeEmptyPayments BIT, @beneficiarioId INT', @anoReferente, @mesReferente, @inquilinoId, @propriedadeId, @IncludeEmptyPayments, @beneficiarioId;

END
