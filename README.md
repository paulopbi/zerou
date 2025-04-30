<p align="center">
   <img src="./public/zerou-cover.png">
</p>

> [You can read it in english, just click here](./README.en.md)

### 📚 Introdução

O **Zerou** é uma aplicação web desenvolvida com **React** que permite aos usuários organizarem e acompanharem seus jogos de maneira prática e personalizada, podendo fazer anotações dos jogos que está jogando de maneira rápida.

Com funcionalidades de **CRUD (Criar, Ler, Atualizar e Deletar)**, **animações suaves**, **editor de texto avançado** e **autenticação segura**, é a ferramenta perfeita para quem quer manter anotar toda a sua jogatina.

### 🛠️ Tecnologias Utilizadas

- **React** — Framework para construção da interface.
- **Framer Motion** — Biblioteca para animações fluidas e atraentes.
- **TipTap** — Editor de texto avançado para formatação de descrições.
- **React Router** — Gerenciamento de rotas, incluindo rotas privadas.
- **Firebase** — Backend para autenticação e banco de dados (Firestore).
- **PNPM** — Gerenciador de pacotes rápido e eficiente.
- **Vercel** — Serviço de hospedagem.

### ✨ Funcionalidades

- CRUD completo de jogos.
- Editor de texto funcional e personalizável.
- Autenticação com Firebase (e-mail e senha).
- Banco de dados em tempo real com Firestore.
- Rotas protegidas para usuários autenticados.
- Classificação de jogos por plataforma (ex: Xbox, Playstation, etc).
- Definição de status de progresso dos jogos (ex: Finalizado, Jogando, Não comecei).
- Animações suaves para melhor experiência do usuário.

### 🚀 Demonstração

🔗 [Clique aqui para acessar o projeto](https://zerou.vercel.app)

### 📄 Licença

[Este projeto está licenciado sob a licença MIT.](./LICENSE)

### ⚙️ Configuração

Para rodar o projeto localmente, você precisará configurar o Firebase:

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
2. Ative a autenticação por e-mail/senha.
3. Crie um Firestore Database.
4. Pegue suas credenciais de configuração (`apiKey`, `authDomain`, `projectId`, etc).
5. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```shell
   VITE_FIREBASE_API_KEY=suachave
   VITE_FIREBASE_AUTH_DOMAIN=seuprojeto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=seu-project-id
   VITE_FIREBASE_STORAGE_BUCKET=seu-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
   VITE_FIREBASE_APP_ID=seu-app-id
   ```
