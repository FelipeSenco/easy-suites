alter PROCEDURE ExcluirInquilino
(
	@id INT
)

AS 

BEGIN
	UPDATE Inquilinos
	SET excluido = 1,
		DataAtualizacao = getdate()
	WHERE Id = @id	
END