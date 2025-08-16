<p align="center">
  <img src="https://ik.imagekit.io/pedrolazzz/Co%CC%81pia-de-HUBfitHUB-1.png?updatedAt=1755131403313" alt="Logo DevLivery" width="200"/>
</p>

<h1 align="center">
  DEVLIVERY
</h1>

<p align="center">
  <strong>Deploy de sabor e saúde no seu dia, peça já!</strong>
</p>

<p align="center">
  <img alt="Status do Projeto" src="https://img.shields.io/badge/status-concluído-green?style=for-the-badge&color=7d8d2a">
  <img alt="Versão" src="https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge&color=e7a545">
  <img alt="Licença" src="https://img.shields.io/badge/license-MIT-lightgrey?style=for-the-badge">
</p>

---

## 🚀 Deploy

Acesse a aplicação front-end através do link abaixo:

[**https://dev-livery-front.vercel.app/**](https://dev-livery-front.vercel.app/)

[![Deploy with Vercel](https://vercel.com/button)](https://dev-livery-front.vercel.app/)

---

## 📝 Sobre o Projeto

**DEVLIVERY** é uma plataforma web completa para o delivery de alimentos saudáveis. O projeto foi desenvolvido com foco em praticidade e bem-estar, conectando fornecedores (restaurantes) a clientes que buscam uma vida mais saudável.

A aplicação possui duas experiências distintas e integradas: uma **vitrine de produtos** moderna e intuitiva para o cliente final, e um **painel de gerenciamento (CRUD)** robusto para que o fornecedor tenha total controle sobre seu cardápio.

---

## ✨ Funcionalidades Principais

### 👤 Para o Cliente (Usuário)
- **Navegação e Descoberta:** Cardápio completo com busca por nome e filtro por categorias.
- **Recomendações:** Uma seção especial que filtra e exibe apenas os pratos mais saudáveis.
- **Carrinho de Compras:** Adicione produtos, visualize o carrinho e finalize a compra (fluxo fictício).
- **Perfil de Usuário:** Uma área pessoal para o cliente, preparada para futuras funcionalidades como histórico de pedidos e gerenciamento de endereços.

### 🏪 Para o Fornecedor (Administrador)
- **Painel de Controle:** Um dashboard central para gerenciar a loja virtual.
- **CRUD de Categorias:** Controle total para Criar, Ler, Atualizar e Deletar as categorias de produtos.
- **CRUD de Produtos:** Gerenciamento completo do cardápio, permitindo Criar, Ler, Atualizar e Deletar pratos.

---

## 🛠️ Tecnologias e Arquitetura

O projeto foi construído com uma arquitetura moderna, separando as responsabilidades entre Front-end e Back-end.

### 💻 Front-end (React)

- **React com Vite:** Para uma interface rápida, reativa e uma experiência de desenvolvimento ágil.
- **TypeScript:** Garantindo um código mais seguro, organizado e com menos erros.
- **Tailwind CSS:** Para uma estilização moderna, customizada e totalmente responsiva.
- **React Router DOM:** Para a navegação fluida entre as páginas.
- **Axios:** Para a comunicação com a API do back-end.
- **React Context API:** Para o gerenciamento de estado global da autenticação (`AuthContext`) e do carrinho de compras (`CartContext`).

### ⚙️ Back-end (Nest.js)

- **Nest.js:** Framework robusto e escalável para a construção da API.
- **TypeScript:** Linguagem segura e tipada também no lado do servidor.
- **PostgreSQL:** Banco de dados relacional utilizado no ambiente de produção (Render).
- **TypeORM:** Faz a ponte entre o código e o banco de dados, facilitando as operações.
- **Autenticação e Segurança:**
  - **JWT (JSON Web Tokens):** Todas as rotas sensíveis são protegidas, exigindo autenticação.
  - **Bcrypt:** As senhas dos usuários são criptografadas, seguindo as melhores práticas de segurança.
- **Swagger:** A API é totalmente documentada e pode ser testada interativamente através do Swagger.

---


## 💿 Como Acessar e Rodar o Projeto

Para executar este projeto localmente, você precisará ter o **Back-end** e o **Front-end** rodando em terminais separados.

### Pré-requisitos

Antes de começar, garanta que você tenha instalado:
* [Node.js](https://nodejs.org/en/)
* [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) (para o Front-end)
* [Git](https://git-scm.com/)
* Um cliente de banco de dados **PostgreSQL** (como DBeaver ou PgAdmin).

### 🎲 Rodando o Back-end (Servidor)

1.  **Clone o repositório do Back-end:**
    ```bash
    git clone [https://github.com/Grupo-06-Turma-JavaScript-07/Devlivery](https://github.com/Grupo-06-Turma-JavaScript-07/Devlivery)
    ```
2.  **Acesse a pasta do projeto:**
    ```bash
    cd Devlivery
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Configure o Banco de Dados:**
    * Certifique-se de que seu servidor PostgreSQL está rodando.
    * Crie um banco de dados para o projeto.
    * As credenciais e o nome do banco são configurados no seu back-end, provavelmente em um arquivo de serviço de dados (`data/services/dev.service.ts`) ou em variáveis de ambiente.

5.  **Inicie o servidor:**
    ```bash
    npm run start:dev
    ```
    * O servidor estará rodando em `http://localhost:4000`.
    * Você pode acessar a documentação da API em `http://localhost:4000/swagger`.

### 🖥️ Rodando o Front-end (Cliente)

Você pode acessar diretamente pelo link: `https://dev-livery-front.vercel.app`, ou seguir o passo a passo para rodar localmente:

1.  **Clone o repositório do Front-end:**
    ```bash
    git clone [https://github.com/Grupo-06-Turma-JavaScript-07/DevLivery_Front](https://github.com/Grupo-06-Turma-JavaScript-07/DevLivery_Front)
    ```
2.  **Acesse a pasta do projeto:**
    ```bash
    cd DevLivery_Front
    ```
3.  **Instale as dependências:**
    ```bash
    yarn install
    ```
4.  **Configure as Variáveis de Ambiente:**
    * Na raiz do projeto, crie um arquivo chamado `.env`.
    * Dentro dele, adicione a seguinte linha, apontando para o seu back-end local:
      ```
      VITE_API_URL=http://localhost:4000
      ```
5.  **Inicie o servidor:**
    ```bash
    yarn dev
    ```
    * A aplicação estará acessível em `http://localhost:5173` (ou a porta indicada no seu terminal).
  
---------------

## 👨‍💻 Equipe de Desenvolvedores

| [<img src="https://ik.imagekit.io/pedrolazzz/Juliana_Freddi_2_1.jpg?updatedAt=1754919604935" width="115" height="115"><br><sub>Juliana Freddi</sub>](https://github.com/ddifreju) | [<img src="https://ik.imagekit.io/pedrolazzz/Larissa.jpg?updatedAt=1754919604772" width="115" height="115"><br><sub>Larissa Santana</sub>](https://github.com/Santana-larissa) | [<img src="https://ik.imagekit.io/pedrolazzz/perfil20quadrado.jpg?updatedAt=1754919604936" width="115" height="115"><br><sub>Ludmily Oliveira</sub>](https://github.com/LudmilyS) | [<img src="https://ik.imagekit.io/pedrolazzz/Untitled-1.png?updatedAt=1754571230256" width="115" height="115"><br><sub>Matheus Schneider</sub>](https://github.com/matheusschneider1) | [<img src="https://ik.imagekit.io/pedrolazzz/Pedro%20Elias%20%20(3).jpg?updatedAt=1754566149442" width="115" height="115"><br><sub>Pedro Elias</sub>](https://github.com/pedro-eliasd) |
| :---: | :---: | :---: | :---: | :---: |

---

<p align="center">
  Projeto desenvolvido para o bootcamp de Pessoa Desenvolvedora Web Full Stack da Generation Brasil.
</p>
