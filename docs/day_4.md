DIA 4:
Depois de um fim de semana de preguiça, estou de volta. Para não dizer que não fiz nada, no sábado eu finalizei a rota GET. Hoje concluí os outros endpoints: GET por ID, POST, PATCH e DELETE, finalizando assim a primeira parte da API e o CRUD completo da rota applications.
Depois de tentar usar o método PATCH da forma errada algumas vezes, finalmente entendi como usar corretamente. No início, eu usava um único req.body para tudo e não tratava campos específicos de forma dinâmica com arrays. Hoje aprendi a fazer isso da maneira certa, utilizando if.
No geral, não tive grandes problemas, apenas código e música.

DIA 4 RESUMO TECNICO

Stack:
-Node.js
-Express
-MySQL
-GIT

Aprendizados:
-CRUD completo implementado para a rota /applications
-Implementação das rotas GET, POST, PATCH E DELETE
-Aprendizado do uso correto de PATCH para atualizações parciais
-Uso do IF para o metodo patch
-Continuidade nos commits diários no GitHub

Problemas resolvidos:
-Implementação incorreta do PATCH (enviando o body completo em vez de parcial)
-Aprendizado de como atualizar apenas campos específicos