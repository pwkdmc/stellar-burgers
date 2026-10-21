# Stellar Burgers

A modern single-page burger builder built with **React, TypeScript, Redux Toolkit, React Router, Vite, and React DnD**.

The application allows users to browse burger ingredients, build custom burgers with drag-and-drop, place orders, authenticate, manage their profile, and view public and personal order feeds.

## Features

- 🍔 Interactive burger constructor
- 🧩 Drag-and-drop ingredient composition
- 🥬 Ingredient catalog grouped by category
- 🔎 Ingredient detail pages and modal views
- 🛒 Dynamic burger price calculation
- 📦 Burger ordering through the REST API
- 👤 User registration, login, logout, and profile editing
- 🔐 Protected and guest-only routes
- 🔑 Password recovery and password reset flows
- 📋 Personal order history
- 🌐 Public order feed with statistics
- 🔢 Order details accessible by order number
- 🪟 Modal routing with preserved background pages
- ⚡ Redux Toolkit state management
- 🧪 Unit tests with Jest
- 🎭 End-to-end tests with Playwright
- 📚 Storybook component development
- ♿ Accessibility checks through Storybook tooling
- 🧹 ESLint, Stylelint, Prettier, and Git hooks
- 📦 Production builds and GitHub Pages deployment support

---

## Tech Stack

### Core

- **React 19**
- **TypeScript 5**
- **Vite 7**
- **React Router 7**
- **Redux Toolkit**
- **React Redux**

### UI and interaction

- `@krgaa/react-developer-burger-ui-components`
- `react-dnd`
- `react-dnd-html5-backend`
- `react-intersection-observer`
- CSS Modules

### Testing

- **Jest**
- **Testing Library**
- **Playwright**
- **Storybook**
- Storybook Test Runner

### Code quality

- **ESLint**
- **Stylelint**
- **Prettier**
- **Husky**
- **Commitizen**

---

## Requirements

Before running the project, make sure the following are installed:

- **Node.js 18+** (Node.js 20+ is recommended)
- **npm 9+**
- Git

Check your installed versions:

```bash
node --version
npm --version
git --version
```

---

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd stellar-burgers
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

The project expects the following variable:

```env
BURGER_API_URL=https://norma.education-services.ru/api
```

---

## Development

Start the development server:

```bash
npm run start
```

The Vite development server is configured to run on:

```text
http://localhost:4000
```

The application automatically loads the configured burger API URL from `BURGER_API_URL`.

### Alternative Vite commands

Start Vite using its standard development command:

```bash
npx vite
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run start` | Starts the development server on port `4000` |
| `npm run build` | Creates a production build in `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run test` | Runs Jest unit tests |
| `npm run e2e` | Runs Playwright end-to-end tests |
| `npm run e2e:ui` | Opens the Playwright interactive UI |
| `npm run lint` | Runs Stylelint, ESLint, and Prettier |
| `npm run eslint` | Runs ESLint and automatically fixes fixable issues |
| `npm run stylelint` | Runs Stylelint and automatically fixes fixable issues |
| `npm run prettier` | Formats supported source files with Prettier |
| `npm run storybook` | Starts Storybook on port `6006` |
| `npm run build-storybook` | Creates a static Storybook build |
| `npm run test:storybook` | Runs Storybook tests |
| `npm run storybook:test` | Starts Storybook and runs Storybook tests |
| `npm run commit` | Creates a Conventional Commit through Commitizen |
| `npm run deploy` | Deploys the `dist/` directory to GitHub Pages |

---

# Application Architecture

The application follows a component-based React architecture with a dedicated Redux state layer and an API utility layer.

At a high level:

```text
React UI
   │
   ├── Pages
   │     ├── Constructor
   │     ├── Feed
   │     ├── Login / Register
   │     ├── Password Reset
   │     ├── Profile
   │     └── Profile Orders
   │
   ├── Reusable Components
   │     ├── Burger Ingredients
   │     ├── Burger Constructor
   │     ├── Orders
   │     ├── Modals
   │     └── Ingredient Details
   │
   ▼
Redux Toolkit
   │
   ├── Ingredients
   ├── Constructor
   ├── User
   ├── Orders
   └── Feed
   │
   ▼
REST API
   │
   └── norma.education-services.ru
```

---

## Project Structure

The most important directories are organized as follows:

```text
src/
├── components/
│   ├── app/
│   ├── app-header/
│   ├── burger-constructor/
│   ├── burger-constructor-element/
│   ├── burger-ingredient/
│   ├── burger-ingredients/
│   ├── feed-info/
│   ├── ingredient-details/
│   ├── ingredients-category/
│   ├── modal/
│   ├── order-card/
│   ├── order-info/
│   ├── order-status/
│   ├── orders-list/
│   ├── profile-menu/
│   ├── ui/
│   │   ├── pages/
│   │   └── reusable UI components
│   └── index.ts
│
├── services/
│   ├── slices/
│   │   ├── allIngredientsSlice.ts
│   │   ├── feedsSlice.ts
│   │   ├── ingredientsInConstructorSlice.ts
│   │   ├── ordersSlice.ts
│   │   └── userSlice.ts
│   ├── listenerMiddleware.ts
│   ├── rootReducer.ts
│   └── store.ts
│
├── utils/
│   ├── burger-api.ts
│   ├── cookie.ts
│   └── types.ts
│
├── index.tsx
└── index.css

tests/
└── tests.pl.tsx

.storybook/
├── main.ts
├── preview.tsx
└── theme.ts
```

---

# State Management

Redux Toolkit is used as the central state management solution.

The store is configured in:

```text
src/services/store.ts
```

The root reducer combines the following slices:

```text
allIngredients
ingredientsInConstructor
user
orders
feeds
```

## `allIngredients`

Responsible for:

- loading the ingredient catalog
- storing ingredient data
- tracking loading state
- exposing ingredient selectors

Ingredients are loaded when the application starts.

## `ingredientsInConstructor`

Responsible for the current burger composition.

It stores the ingredients selected by the user and supports operations required by the burger constructor, including adding, removing, and reordering ingredients.

## `user`

Responsible for authentication and user profile data.

Supported operations include:

- fetching the current user
- registration
- login
- logout
- profile updates

Authentication tokens are persisted using:

- an `accessToken` cookie
- a `refreshToken` in `localStorage`

## `orders`

Responsible for:

- loading the current user's orders
- creating a new burger order
- loading a specific order
- storing selected order information
- handling order modal state

## `feeds`

Responsible for the public order feed:

- order list
- total number of orders
- total orders for the current day
- feed loading state

---

# API Layer

API communication is centralized in:

```text
src/utils/burger-api.ts
```

The API base URL is configured through:

```env
BURGER_API_URL
```

The default development configuration is:

```env
BURGER_API_URL=https://norma.education-services.ru/api
```

## Main API Operations

### Ingredients

```text
GET /ingredients
```

Returns the complete ingredient catalog.

### Public orders

```text
GET /orders/all
```

Returns the public order feed and aggregate statistics.

### Current user's orders

```text
GET /orders
```

Requires authentication.

### Create an order

```text
POST /orders
```

Requires authentication.

The request contains the IDs of the ingredients used to build the burger.

### Get an order by number

```text
GET /orders/:number
```

Returns information about a specific order.

### Registration

```text
POST /auth/register
```

### Login

```text
POST /auth/login
```

### Current user

```text
GET /auth/user
```

### Update user

```text
PATCH /auth/user
```

### Logout

```text
POST /auth/logout
```

### Refresh authentication token

```text
POST /auth/token
```

### Password recovery

```text
POST /password-reset
```

### Password reset

```text
POST /password-reset/reset
```

---

# Authentication

Authentication is implemented through access and refresh tokens.

The application:

1. Sends login or registration credentials to the API.
2. Receives an access token and refresh token.
3. Stores the access token in a cookie.
4. Stores the refresh token in `localStorage`.
5. Adds the access token to authenticated API requests.
6. Attempts to refresh the session when the API reports an expired JWT.
7. Retries the failed request using the refreshed access token.

The token refresh logic is implemented in:

```text
src/utils/burger-api.ts
```

This behavior is encapsulated by `fetchWithRefresh()`.

---

# Routing

Routing is handled with React Router.

The main application routes are:

| Route | Description | Access |
|---|---|---|
| `/` | Burger constructor | Public |
| `/feed` | Public order feed | Public |
| `/feed/:number` | Order details | Public |
| `/ingredients/:id` | Ingredient details | Public |
| `/login` | Login | Guests only |
| `/register` | Registration | Guests only |
| `/forgot-password` | Password recovery | Guests only |
| `/reset-password` | Password reset | Guests only |
| `/profile` | User profile | Authenticated |
| `/profile/orders` | Personal order history | Authenticated |
| `/profile/orders/:number` | Personal order details | Authenticated |
| `*` | 404 page | Public |

## Protected Routes

Authenticated routes use the `ProtectedRoute` component.

If a user tries to access a protected page without authentication, they are redirected to:

```text
/login
```

The original location is stored so that the user can be returned to the requested page after authentication.

Guest-only routes use the same component with the `onlyUnAuth` flag. Authenticated users are redirected away from login and registration pages.

---

# Modal Routing

The application uses React Router's location state to support modal pages while preserving the underlying page.

For example:

```text
/feed
   └── click order
        └── /feed/12345
              └── rendered as a modal over /feed
```

The current location stores a background location:

```ts
location.state?.background
```

When a background location exists, the application renders the detail route as a modal.

This approach provides:

- shareable URLs
- browser navigation support
- direct access to detail pages
- a smooth modal experience when navigating from a list

---

# Burger Constructor

The constructor is the main interactive feature of the application.

Users can:

1. Browse available ingredients.
2. Select buns, sauces, fillings, and other ingredients.
3. Add ingredients to the burger.
4. Reorder constructor ingredients using drag-and-drop.
5. Remove selected ingredients.
6. See the calculated total price.
7. Submit the burger as an order.

Drag-and-drop functionality is implemented using:

```text
react-dnd
react-dnd-html5-backend
```

The constructor state is managed through Redux Toolkit.

---

# Ingredient Catalog

Ingredients are displayed by category.

Typical categories include:

- Buns
- Sauces
- Main ingredients

Each ingredient provides information such as:

- name
- image
- price
- calories
- proteins
- fats
- carbohydrates
- ingredient type
- unique ID

Clicking an ingredient opens a detailed view.

---

# Order Flow

The order creation flow is handled by the `orders` Redux slice.

Conceptually:

```text
User builds burger
       │
       ▼
Ingredient IDs collected
       │
       ▼
POST /orders
       │
       ▼
API creates order
       │
       ▼
Order returned
       │
       ▼
Redux state updated
       │
       ▼
Order details displayed
```

The API returns the created order, including its order number and status.

---

# Error Handling

The API layer normalizes server errors through `toApiError()`.

If the API returns an error payload containing a `message`, that message is converted into a JavaScript `Error`.

This provides a consistent error format for Redux thunks and UI components.

The application also displays loading and error states for asynchronous operations such as:

- loading ingredients
- fetching the current user
- loading orders
- creating an order
- fetching order details

---

# Testing

The project contains several testing layers.

## Unit Tests

Jest is used for Redux slice and application logic tests.

Run:

```bash
npm run test
```

The Jest configuration is located at:

```text
jest.config.ts
```

Current unit tests include coverage for:

- all ingredients state
- ingredients in constructor state

## End-to-End Tests

Playwright is used for browser-level testing.

Run:

```bash
npm run e2e
```

Run tests in interactive mode:

```bash
npm run e2e:ui
```

The Playwright configuration is located at:

```text
playwright.config.ts
```

The E2E environment starts the application automatically with:

```bash
npm run start
```

The configured test URL is:

```text
http://localhost:4000
```

The repository also contains HAR fixtures under:

```text
tests/hars/
```

These fixtures can be used to reproduce API interactions during browser tests.

---

# Storybook

Storybook is configured for isolated component development and visual testing.

Start Storybook:

```bash
npm run storybook
```

Storybook will be available at:

```text
http://localhost:6006
```

Create a production Storybook build:

```bash
npm run build-storybook
```

Run Storybook tests:

```bash
npm run test:storybook
```

The Storybook configuration is stored in:

```text
.storybook/
```

---

# Code Quality

The project uses several tools to maintain consistent code quality.

## ESLint

Run ESLint:

```bash
npm run eslint
```

The command also automatically fixes issues where possible.

## Stylelint

Run Stylelint:

```bash
npm run stylelint
```

## Prettier

Format the project:

```bash
npm run prettier
```

## Full lint pipeline

Run all configured formatting and linting checks:

```bash
npm run lint
```

---

# Git Hooks

Husky is used to automate quality checks during development.

The project uses `lint-staged` to process changed files.

The configured workflow checks:

- CSS files with Stylelint and Prettier
- TypeScript/JavaScript files with ESLint and Prettier
- JSON, HTML, and Markdown files with Prettier

This helps prevent incorrectly formatted or invalid code from being committed.

---

# Path Aliases

TypeScript path aliases are configured in `tsconfig.app.json`.

Common aliases include:

```text
@/*
@components
@pages
@services
@utils
@utils-types
@slices
@selectors
@api
@ui
@ui-pages
```

Examples:

```ts
import { AppHeader } from '@components';
import { ConstructorPage } from '@pages';
import { useDispatch } from '@services/store';
import { getIngredientsApi } from '@api';
```

Using aliases helps avoid long relative import paths and makes module dependencies easier to understand.

---

# Environment Variables

The project uses Vite's environment loading mechanism.

The required variable is:

```env
BURGER_API_URL=https://norma.education-services.ru/api
```

The value is loaded in `vite.config.ts` and exposed to the application as:

```ts
process.env.BURGER_API_URL
```

For local development, create a `.env` file based on `.env.example`.

Do not commit private credentials or environment-specific secrets.

---

# Production Build

Build the application:

```bash
npm run build
```

The generated files are placed in:

```text
dist/
```

You can test the production build locally:

```bash
npm run preview
```

---

# Deployment

The project includes a GitHub Pages deployment script.

Build and deploy with:

```bash
npm run deploy
```

The `predeploy` hook automatically runs:

```bash
npm run build
```

The deployment command publishes the contents of `dist/` using `gh-pages`.

Before deploying, verify:

- the production API URL is configured correctly
- the generated application works with the target environment
- routing is compatible with the selected hosting provider
- all required assets are included in the build

---

# Development Workflow

A recommended development workflow is:

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env

# 3. Start the application
npm run start

# 4. Develop and test your changes

# 5. Run unit tests
npm run test

# 6. Run E2E tests
npm run e2e

# 7. Check formatting and linting
npm run lint

# 8. Create a conventional commit
npm run commit
```

For UI work, Storybook can be run separately:

```bash
npm run storybook
```

---

# Component Design

The project separates application-level components from UI-level components.

A typical pattern is:

```text
components/
├── feature/
│   ├── feature.tsx
│   ├── index.ts
│   └── type.ts
│
└── ui/
    └── feature/
        ├── feature.tsx
        ├── feature.module.css
        ├── feature.module.css.d.ts
        ├── index.ts
        └── type.ts
```

This separation keeps business logic and presentation concerns easier to maintain.

Reusable UI components are grouped under:

```text
src/components/ui/
```

Feature-level components connect these UI components with Redux state and application behavior.

---

# Performance Considerations

The application uses several techniques that help keep the UI responsive:

- Redux Toolkit for predictable state updates
- CSS Modules for scoped styles
- Vite for fast development and optimized production builds
- React Router for route-level navigation
- `react-intersection-observer` for viewport-aware behavior
- memoization and selective Redux subscriptions where appropriate
- API request centralization
- reusable UI components

When adding new functionality, prefer selecting only the required Redux state rather than subscribing a component to the entire store.

---

# Accessibility

Accessibility is considered throughout the UI and testing setup.

Storybook includes accessibility tooling, allowing components to be checked independently.

When developing new components, follow these principles:

- use semantic HTML where possible
- provide meaningful labels for form controls
- ensure keyboard navigation works
- maintain visible focus states
- use accessible modal behavior
- provide meaningful alternative text for images
- avoid relying exclusively on color to communicate information

---

# Troubleshooting

## The application cannot connect to the API

Check your `.env` file:

```env
BURGER_API_URL=https://norma.education-services.ru/api
```

Then restart the development server:

```bash
npm run start
```

Vite reads environment configuration when the server starts.

## Authentication does not work

Check that:

- the API URL is correct
- cookies are enabled in the browser
- the refresh token exists in `localStorage`
- the browser is not blocking required requests
- the API is reachable

Logging in again can also recreate the authentication tokens.

## Port 4000 is already in use

The project uses port `4000` for development and E2E tests.

Stop the process using that port or run the project with an alternative Vite configuration for local development.

## Jest cannot resolve an alias

Check `jest.config.ts` and ensure the corresponding `moduleNameMapper` entry exists.

TypeScript aliases and Jest aliases are configured independently.

## Playwright tests fail to start

Make sure the development server can run successfully:

```bash
npm run start
```

Then verify:

```text
http://localhost:4000
```

is accessible.

---

# Browser Support

The project targets modern browsers capable of supporting:

- ES2022 JavaScript
- modern DOM APIs
- HTML5 drag-and-drop support
- modern CSS features

For the best experience, use an up-to-date version of Chrome, Edge, Firefox, or Safari.

---

# Security Notes

The project uses token-based authentication provided by the backend API.

Important security considerations:

- never commit secrets to Git
- do not expose private API credentials in client-side code
- keep `.env` files with local secrets outside version control
- use HTTPS in production
- validate authentication state before rendering protected content
- do not trust client-side authorization alone for sensitive backend operations

The frontend is not a security boundary; authorization must ultimately be enforced by the backend API.

---

# Contributing

Before submitting changes:

1. Create a dedicated branch.
2. Implement the feature or fix.
3. Run unit tests:

   ```bash
   npm run test
   ```

4. Run E2E tests when applicable:

   ```bash
   npm run e2e
   ```

5. Run linting and formatting:

   ```bash
   npm run lint
   ```

6. Review the final diff.
7. Create a Conventional Commit:

   ```bash
   npm run commit
   ```

Keep pull requests focused and avoid mixing unrelated refactoring with feature changes.

---

# License

This project is for educational purposes and is free to use.

---

## Summary

**Stellar Burgers** is a full-featured React/TypeScript burger ordering application combining:

- a drag-and-drop burger constructor
- REST API integration
- Redux Toolkit state management
- authenticated user flows
- public and private order feeds
- route-based modal navigation
- unit and E2E testing
- Storybook component development
- automated linting and formatting
- Vite-based production builds

The project is structured to keep UI components, application logic, state management, API communication, and testing concerns separated and maintainable.
