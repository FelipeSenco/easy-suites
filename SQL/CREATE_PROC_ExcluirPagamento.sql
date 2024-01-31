alter PROCEDURE ExcluirPagamento
(
@id INT 
)

AS

BEGIN
	UPDATE PagamentosAluguel
	SET Excluido = 1,
		DataAtualizacao = getdate()
	WHERE Id = @id
END