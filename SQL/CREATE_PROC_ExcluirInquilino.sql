CREATE PROCEDURE ExcluirInquilino
(
	@id INT
)
WITH EXECUTE AS 'dbo'

AS 

BEGIN
	UPDATE Inquilinos
	SET excluido = 1,
		DataAtualizacao = getdate()
	WHERE Id = @id	
END