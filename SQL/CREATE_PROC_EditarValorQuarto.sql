ALTER PROCEDURE EditarValorQuarto
(
@novoValor MONEY,
@quartoId int
)

AS

BEGIN
	IF (@novoValor IS NULL)	
		THROW 5000 ,'Valor nulo, não permitido.', 1
	ELSE

		UPDATE Quartos SET Valor = @novoValor
		WHERE Id = @quartoId
END

