
ALTER PROCEDURE [dbo].[GetAllPropriedades]
AS

BEGIN
	Declare @numeroQuartos int = null;
	Declare @numeroInquilinos int = null;

	set @numeroInquilinos  = (SELECT COUNT(I.PropriedadeId) FROM Inquilinos I INNER JOIN Propriedades P ON I.PropriedadeId = P.Id)
	set @numeroQuartos  = (SELECT COUNT(Q.PropriedadeId) FROM QUARTOS Q INNER JOIN Propriedades P ON Q.PropriedadeId = P.Id)

	SELECT P.Cidade,
			P.Estado,
			P.Id,
			P.Nome,
			P.Numero,
			P.Rua,
			P.Uf,
			P.cep,
			@numeroInquilinos AS 'numeroInquilinos',
			@numeroQuartos AS 'numeroQuartos'  FROM Propriedades P 
	
END



