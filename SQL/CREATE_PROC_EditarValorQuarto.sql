CREATE PROCEDURE EditarValorQuarto
(
@novoValor MONEY,
@quartoId int
)
WITH EXECUTE AS 'dbo'

AS

BEGIN
	IF (@novoValor IS NULL)	
		THROW 5000 ,'Valor nulo, não permitido.', 1
	ELSE

		UPDATE Quartos SET Valor = @novoValor
		WHERE Id = @quartoId
END

