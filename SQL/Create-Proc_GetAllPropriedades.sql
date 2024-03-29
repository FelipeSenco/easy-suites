
CREATE PROCEDURE [dbo].[GetAllPropriedades]
WITH EXECUTE AS 'dbo'
AS
BEGIN
    SELECT 
        P.Cidade,
        P.Estado,
        P.Id,
        P.Nome,
        P.Numero,
        P.Rua,
        P.Uf,
        P.cep,
        (SELECT COUNT(*) FROM Inquilinos Inq WHERE Inq.PropriedadeId = P.Id) AS numeroInquilinos,
        (SELECT COUNT(*) FROM Quartos Q WHERE Q.PropriedadeId = P.Id) AS numeroQuartos
    FROM 
        Propriedades P
    GROUP BY 
        P.Cidade, P.Estado, P.Id, P.Nome, P.Numero, P.Rua, P.Uf, P.cep
END



