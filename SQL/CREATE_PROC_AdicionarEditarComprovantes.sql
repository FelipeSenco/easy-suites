ALTER PROCEDURE AdicionarEditarComprovante
(
	@pagamentoId INT,
	@url VARCHAR(255) = null
)

AS

BEGIN

	UPDATE PagamentosAluguel
	SET ComprovanteUrl = @url
	WHERE Id = @pagamentoId

	SELECT @url as url
END

--grant exec on AdicionarEditarComprovante to easy_suites_dev