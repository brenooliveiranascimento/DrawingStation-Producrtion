# Front End.

Seja bem vindo a parte do FrontEnd da aplicação!
Estou utilizando NextJs e Redux para o gerenciamento do estado Global da aplicação!.

## Até o momento já foram desenvolvidos

Dashboard onde os Adminstradores terão acesso aos conteúdos da plataforma, podendo assim adicionar novos módulos e aulas assim com editar as mesmas.
Estou criado a conceção com Api Rest que desenvolvi no BackEnd através do Axios com o auxilio do Redux Thunk para poder criar Actions assincronas executando uma ação no reducer apenas quando o retorno da API der a operação como bem sucedida.

Fluxo de autenticação utilizando JWT com integração de login pela conta do google
(PS: Autenticação pelo google por enquanto está disponivél apenas em hambiente de desenvolvimento).
O JWT fica salvo nos cookies.

As rotas de dashboard são privadas, apenas contas em emails dentro de uma lista conseguem ter acesso as rotas de ADMS.
para todas as ações dentro da dashboard como editar adicionar ou excluir conteúdo são verificados se o JWT que o cliente envia para o BackEnd pertence de fato ao cliente que o está enviando, além de ser necessario a utilização de uma senha especifica criada para unica e exclusivamente para o ADM que está executando a ação.

O Css no momento está básico pois o meu intuito no momento é deixar a aplicação <strong>Funcional<strong>

<div>
<h2>Tecnologias Utilizadas<h2>
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/>
<img src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"/>
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"/>
<img src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white"/> 
</div>

