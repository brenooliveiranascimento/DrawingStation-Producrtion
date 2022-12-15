# Back End.

Seja bem vindo a parte do BackEnd da aplicação!
Estou utilizando NodeJs com Express para criar as apis e Mysql como banco de dados e a ORM sequelize para criar as migrations e executar os Models e povoar o banco!.

Utilizei o padrão MSC (Module, service e controller) de arquitetura de software para organizar e distribuir as responsabilidades de cada parte do código.

Utilizo a ORM sequelize para criar as migrations do banco de dados e povoa-lo em hambiente de desenvolvimento utilizando as seeders.

## Até o momento já foram desenvolvidos

APIs para o fluxo de autenticação com JWT, registrando novos usuários e logando usuários já existentes gerando um novo Token e enviando como resposta para o cliente.

Apis para consumir os módulos, subMódulos e Aulas que estão no banco de dados.

Regra de negocio para retornar os dados das aulas privadas apenas para usuários que possuem plano premium ativo e aulas gratuitas para usuáruos que não possuem nenhum tipo de assinatura.

Apis para a manipulação adição ou excluisão do conteúdo da plataforma.
Essas apis são restristas apenas para ADMS e possuem validações de credenciais em seus middlewares.

Apis para adicionar editar e excluir comentários e subcomentários resposta nas aulas.

Acesse a antiga plataforma e confira o conteúdo gratuito que disponibilizei para todos.
https://drawing-station-web.vercel.app/


<div>
<h2>Tecnologias Utilizadas<h2>
<img src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/> 
<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/>
<img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/>
<img src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
<img src="https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white"/> 
</div>

