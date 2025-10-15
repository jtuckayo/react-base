# ⚛️ Base React Development Environment

This repository contains the foundational setup for a modern React development environment, based on **Brian Holt's Complete Intro to React, v8**.

It uses **Vite** for fast bundling and **React 18** for component development, configured with essential tools like **ESLint** and **Prettier** for code quality and consistency.

---

## 🛠️ Recommended Visual Studio Code Extensions (VS Code Users Only)

To ensure a consistent and productive coding experience, especially with Prettier and ESLint, I highly recommend installing the following workspace extensions.

These recommendations are automatically suggested by VS Code when you open the project, based on the configuration in the **`.vscode/extensions.json`** file. You should be prompted to install them upon opening the folder.

| Extension Name                | ID                          | Purpose                                                                                                       |
| :---------------------------- | :-------------------------- | :------------------------------------------------------------------------------------------------------------ |
| **ESLint**                    | `dbaeumer.vscode-eslint`    | Integrates ESLint into VS Code to highlight code quality issues, errors, and warnings based on project rules. |
| **Prettier - Code formatter** | `esbenp.prettier-vscode`    | Automatically formats code using the project's Prettier configuration on save, maintaining consistent style.  |
| **Material Icon Theme**       | `PKief.material-icon-theme` | Provides visually rich icons for file types and folders, improving clarity in the Explorer sidebar.           |

---

## 🚀 Getting Started

To clone this repository and set up the development environment:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/jtuckayo/react-base.git
    cd react-base
    ```
2.  **Install dependencies:**
    This command installs all necessary `devDependencies` (Vite, ESLint, etc.) and `dependencies` (React, React-DOM).
    ```bash
    npm install
    ```
3.  **Start the development server:**
    `bash npm run dev `
    The application will launch and be accessible in your web browser, typically at `http://localhost:5173`.

---

## ⚙️ Available Scripts and Commands

This project is configured with a core set of scripts to manage development, building, and code quality.

| Script    | Command                                     | Description                                                                                                          |
| :-------- | :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------- |
| `dev`     | `vite`                                      | **Starts the local development server** with hot module replacement (HMR). This is your primary development command. |
| `build`   | `vite build`                                | **Compiles the project for production** deployment. The output is placed in the `dist/` directory.                   |
| `preview` | `vite preview`                              | Locally serves and previews the production build from the `dist/` directory.                                         |
| `format`  | `prettier --write "src/**/*.{js,jsx}"`      | Runs **Prettier** to automatically format and rewrite all code files in the `src` directory.                         |
| `lint`    | `eslint "src/**/*.{js,jsx}" --quiet`        | Runs **ESLint** to check for code quality and style issues in the `src` directory.                                   |
| `test`    | `echo "Error: no test specified" && exit 1` | Placeholder for future testing commands (e.g., Jest, Vitest).                                                        |
