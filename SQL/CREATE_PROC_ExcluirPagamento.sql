CREATE PROCEDURE ExcluirPagamento
(
@id INT 
)

AS

BEGIN
	UPDATE PagamentosAluguel
	SET Excluido = 1
	WHERE Id = @id
END