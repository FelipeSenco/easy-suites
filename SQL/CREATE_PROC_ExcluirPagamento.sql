CREATE PROCEDURE ExcluirPagamento
(
@id INT 
)
WITH EXECUTE AS 'dbo'

AS

BEGIN
	UPDATE PagamentosAluguel
	SET Excluido = 1,
		DataAtualizacao = getdate()
	WHERE Id = @id
END