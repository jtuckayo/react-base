# 🚀 React App Base Repository

This repository serves as a **modern, standardized starting point** for all new React projects.

It is built upon the foundational setup and configuration taught in **Brian Holt's _Complete Intro to React v8_** course. Clone or fork this repo to instantly bootstrap a new application with powerful build tooling and code quality checks already configured.

---

## 💻 Tech Stack & Features

This base repo uses a fast, opinionated set of modern frontend tools:

| Feature          | Tool                                                                    | Version/Purpose                                |
| :--------------- | :---------------------------------------------------------------------- | :--------------------------------------------- |
| **UI Library**   | **React**                                                               | `^18.2.0`                                      |
| **Build Tool**   | **Vite**                                                                | `^3.1.4` (Fast Dev Server & Optimized Builds)  |
| **Formatting**   | **Prettier**                                                            | `^2.7.1` (Automated Code Style)                |
| **Linting**      | **ESLint**                                                              | `^8.24.0` (Code Quality & Bug Prevention)      |
| **React Plugin** | `@vitejs/plugin-react`                                                  | Handles JSX and Fast Refresh                   |
| **Lint Plugins** | `eslint-plugin-react`, `eslint-plugin-jsx-a11y`, `eslint-plugin-import` | Comprehensive React/Accessibility/Import rules |

---

## 🛠️ Getting Started

Follow these steps to use this repository for a new project.

### 1. Clone & Setup

Since this is a base repo, it's best to clone it and immediately create a new git history for your specific project:

```bash
# 1. Clone the repository (replace [YOUR_REPO_URL] with the actual URL)
git clone [YOUR_REPO_URL] my-new-app

# 2. Navigate into the new directory
cd my-new-app

# 3. Remove the old .git history
rm -rf .git

# 4. Initialize a fresh Git repository
git init

# 5. Install all dependencies
npm install
```
