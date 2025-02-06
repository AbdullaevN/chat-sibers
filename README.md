React + Vite Template
This is a minimal setup for using React with Vite, providing a fast development experience with Hot Module Replacement (HMR) and ESLint rules for code quality.

Features
React for building user interfaces
Vite as the build tool for fast development and bundling
Hot Module Replacement (HMR) for fast updates during development
ESLint for maintaining code quality and consistency
Two official plugins for React:
@vitejs/plugin-react (using Babel for Fast Refresh)
@vitejs/plugin-react-swc (using SWC for Fast Refresh)
Getting Started
Clone this repository:

bash
Копировать
Редактировать
git clone https://github.com/AbdullaevN/chat-sibers.git
cd react-vite-template
Install dependencies:

bash
Копировать
Редактировать
npm install
Or, if you're using Yarn:

bash
Копировать
Редактировать
yarn
Start the development server:

bash
Копировать
Редактировать
npm run dev
Or with Yarn:

bash
Копировать
Редактировать
yarn dev
Open your browser and go to http://localhost:3000. The app should now be live.

Available Scripts
npm run dev or yarn dev - Start the development server with HMR.
npm run build or yarn build - Build the app for production.
npm run preview or yarn preview - Preview the production build.
Plugins
This template includes two official plugins for React:

@vitejs/plugin-react: Uses Babel for Fast Refresh.
@vitejs/plugin-react-swc: Uses SWC for Fast Refresh, offering a faster alternative to Babel.
You can choose the plugin that fits your needs. The default is @vitejs/plugin-react, but if you prefer SWC, you can replace it in the vite.config.js.