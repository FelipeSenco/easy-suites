CREATE PROCEDURE ExcluirInquilino
(
	@id INT
)

AS 

BEGIN
	UPDATE Inquilinos
	SET excluido = 1
	WHERE Id = @id	
END