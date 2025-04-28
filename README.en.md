# 🎮 Game Tracker

> [Você pode ler em português, basta clicar aqui](./README.md)

### 📚 Introduction

**Game Tracker** is a web application built with **React** that allows users to organize and track the games they are playing quickly and efficiently, making personal notes for each game.

With features like **CRUD (Create, Read, Update, Delete)** operations, **smooth animations**, **advanced rich text editor**, and **secure authentication**, it is the perfect tool for anyone who wants to document their gaming journey.

### 🛠️ Technologies Used

- **React** — Frontend framework for building user interfaces.
- **Framer Motion** — Library for creating fluid and beautiful animations.
- **TipTap** — Advanced text editor for rich text formatting.
- **React Router** — Routing management, including private routes.
- **Firebase** — Backend for authentication and real-time database (Firestore).
- **PNPM** — Fast and efficient package manager.
- **Vercel** — Hosting platform.

### ✨ Features

- Full CRUD functionality for games.
- Functional and customizable rich text editor.
- Firebase authentication (email and password).
- Real-time database with Firestore.
- Protected routes for authenticated users.
- Game classification by platform (e.g., Xbox, PlayStation, etc.).
- Progress status management (e.g., Finished, Playing, Not Started).
- Smooth animations for an enhanced user experience.

### 🚀 Live Demo

🔗 [Click here to access the project](https://zerou.vercel.app)

### 📄 License

[This project is licensed under the MIT License.](./LICENSE)

### ⚙️ Setup

To run the project locally, you need to configure Firebase:

1. Create a project on the [Firebase Console](https://console.firebase.google.com/).
2. Enable authentication using email and password.
3. Create a Firestore Database.
4. Retrieve your configuration credentials (`apiKey`, `authDomain`, `projectId`, etc.).
5. Create a `.env` file at the root of the project with the following variables:

   ```shell
   VITE_FIREBASE_API_KEY=yourapikey
   VITE_FIREBASE_AUTH_DOMAIN=yourproject.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```
