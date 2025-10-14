# Adopt-Me Project

## 🛠️ Recommended Visual Studio Code Extensions (VS Code Users Only)

For developers using **Visual Studio Code**, we highly recommend installing the following workspace extensions to ensure a consistent and productive development environment.

These extensions are automatically suggested by VS Code when you open the project, based on the configuration in the `.vscode/extensions.json` file. You should be prompted to install them upon opening the folder.

| Extension Name                | ID                          | Purpose                                                                                                       |
| :---------------------------- | :-------------------------- | :------------------------------------------------------------------------------------------------------------ |
| **ESLint**                    | `dbaeumer.vscode-eslint`    | Integrates ESLint into VS Code to highlight code quality issues, errors, and warnings.                        |
| **Prettier - Code formatter** | `esbenp.prettier-vscode`    | Automatically formats code using our defined Prettier rules upon saving, maintaining consistent style.        |
| **Material Icon Theme**       | `PKief.material-icon-theme` | Provides richer, more distinct icons for files and folders, improving visual clarity in the Explorer sidebar. |

---

## 🚀 Available Scripts and Commands

This project uses **Vite** as a build tool and includes scripts for development, building, and code quality using ESLint and Prettier.

| Script    | Command                                     | Description                                                                           |
| :-------- | :------------------------------------------ | :------------------------------------------------------------------------------------ |
| `dev`     | `vite`                                      | Starts the local development server.                                                  |
| `build`   | `vite build`                                | Compiles the project for production deployment.                                       |
| `preview` | `vite preview`                              | Locally serves and previews the production build.                                     |
| `format`  | `prettier --write "src/**/*.{js,jsx}"`      | **Formats all files** in the `src` directory according to the Prettier configuration. |
| `lint`    | `eslint "src/**/*.{js,jsx}" --quiet`        | Runs **ESLint** to check for code quality and style issues.                           |
| `test`    | `echo "Error: no test specified" && exit 1` | Placeholder for future testing commands.                                              |

---

## Getting Started

To get the project running on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd adopt-me
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    `bash npm run dev `
    The application should now be accessible in your web browser.
