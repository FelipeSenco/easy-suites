
ALTER PROCEDURE [dbo].[GetAllPropriedades]
AS

BEGIN
	Declare @numeroQuartos int = null;
	Declare @numeroInquilinos int = null;
	

	SELECT P.Cidade,
			P.Estado,
			P.Id,
			P.Nome,
			P.Numero,
			P.Rua,
			P.Uf,
			P.cep,
			COUNT(Inq.PropriedadeId) AS 'numeroInquilinos',
			COUNT(Q.PropriedadeId) AS 'numeroQuartos'  
			FROM Propriedades P
			LEft JOIN Quartos Q on Q.PropriedadeId = P.Id
			Left JOIN Inquilinos Inq ON Inq.PropriedadeId = P.Id
			GROUP BY P.Cidade, P.Estado, P.Id, P.Nome,P.Numero, P.Rua, P.Uf, P.cep		
END



