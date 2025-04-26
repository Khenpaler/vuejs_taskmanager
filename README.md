# Task Manager Frontend

A Vue.js frontend for the Task Manager application.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Format Files with Prettier

```sh
npm run format
```

## Deployment on Render

This project is configured for deployment on [Render](https://render.com/).

### Deployment Steps

1. **Push your code to a Git repository** (GitHub, GitLab, etc.)

2. **Create a new Static Site on Render**:
   - Log in to your Render account
   - Click "New +" and select "Static Site"
   - Connect your Git repository
   - Fill in the details:
     - Name: `task-manager-frontend` (or your preferred name)
     - Branch: `main` (or your deployment branch)
     - Build Command: `npm install && npm run build`
     - Publish Directory: `dist`

3. **Configure Environment Variables**:
   - Set the environment variable in the Render dashboard:
     - `VITE_API_URL`: The URL of your backend API, e.g., `https://your-backend-api.onrender.com/api`

4. **Configure Redirect Rules**:
   - In the Render dashboard, go to "Redirects/Rewrites"
   - Add a rule:
     - Source: `/*`
     - Destination: `/index.html`
     - Type: Rewrite
   - This ensures that the SPA routing works correctly

5. **Deploy**:
   - Click "Create Static Site" and wait for the deployment to complete

### Automatic Deployment with render.yaml

Alternatively, you can use the included `render.yaml` file for Blueprint deployment:

1. In the Render dashboard, go to "Blueprints" and click "New Blueprint Instance"
2. Connect your Git repository
3. Render will automatically detect the `render.yaml` file and configure the service
4. Review the settings and deploy
