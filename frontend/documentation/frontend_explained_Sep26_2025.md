# Frontend Explained: React, TypeScript, and Atomic Design

This document provides a comprehensive guide to the frontend of the Opportunities Alert System. It is designed to help new developers understand the architecture, core technologies, and component organization, with a strong focus on the Atomic Design principles implemented in this project.

## Tech Stack Overview

The frontend is built using a modern and robust tech stack:

-   **React 19**: A declarative, component-based JavaScript library for building user interfaces. React allows us to create reusable UI components and efficiently update the DOM.
-   **TypeScript**: A superset of JavaScript that adds static typing. This helps catch errors early, improves code maintainability, and enhances developer experience through better autocompletion and type checking.
-   **Chakra UI v3**: A simple, modular, and accessible component library that gives us a set of pre-built UI components and a robust design system. It helps in building consistent and visually appealing interfaces rapidly.
-   **React Router**: A standard library for client-side routing in React applications. It enables navigation between different views (pages) within the single-page application.
-   **Vite**: A next-generation frontend tooling that provides a lightning-fast development server and an optimized build process for production.
-   **Axios**: A popular promise-based HTTP client for making API requests from the browser to the backend.
-   **date-fns**: A lightweight and comprehensive JavaScript library for manipulating and formatting dates.

## Project Structure

The `src/` directory is the heart of the frontend application. Here's a breakdown of its key subdirectories:

```
src/
├── api/                # API client functions for interacting with the backend
│   ├── client.ts
│   ├── index.ts
│   ├── opportunities.ts
│   └── users.ts
├── components/         # Reusable UI components, organized by Atomic Design principles
│   ├── atoms/           # Smallest, indivisible UI elements
│   ├── molecules/       # Groups of atoms forming simple components
│   ├── organisms/       # Groups of molecules and atoms forming complex sections
│   ├── templates/       # Page-level layouts
│   └── ui/             # Chakra UI provider and theme setup
├── hooks/              # Custom React hooks for reusable logic
│   ├── useOpportunities.ts
│   └── useUserProfile.ts
├── pages/              # Top-level components representing distinct application views (routes)
│   ├── Dashboard.tsx
│   ├── OpportunitiesList.tsx
│   ├── OpportunityDetail.tsx
│   ├── OpportunityForm.tsx
│   ├── Settings.tsx
│   └── UserProfile.tsx
├── types/              # TypeScript type definitions and interfaces
│   └── index.ts
├── utils/              # Utility functions and helpers
│   ├── constants.ts
│   └── date.ts
├── App.tsx             # Main application component, sets up routing and global context
├── index.css           # Global styles
└── main.tsx            # Entry point of the React application
```

## Component Architecture: Atomic Design

This project rigorously follows **Atomic Design** principles, a methodology for crafting design systems. It breaks down UI into five distinct stages, from smallest to largest, promoting reusability, consistency, and maintainability.

### Analogy to Chemistry

-   **Atoms**: The basic building blocks of matter. In UI, these are single HTML tags, form labels, buttons, inputs, etc. They can't be broken down any further without losing their meaning.
-   **Molecules**: Groups of atoms bonded together. In UI, these are simple components formed by combining atoms, like a form field (label + input + help text) or a search bar (input + button).
-   **Organisms**: Groups of molecules and atoms forming a relatively complex, distinct section of an interface. Examples include a navigation header (logo + menu + search bar) or a user profile card.
-   **Templates**: Page-level objects that place organisms into a layout. They focus on the page's underlying content structure rather than the final content itself.
-   **Pages**: Specific instances of templates with real content. They are the highest level of fidelity and demonstrate how a UI looks with actual data.

### Implementation in this Project (`src/components/`)

#### 1. Atoms (`src/components/atoms/`)

These are the fundamental UI elements, designed to be highly reusable and self-contained. They often wrap basic HTML elements and apply styling or basic functionality. Each atom has a consistent set of props (properties) and styling rules.

**Examples in this project:**

-   `Button.tsx`: Handles all button variants (primary, secondary, ghost, etc.) and states (loading, disabled).
-   `Input.tsx`: Represents various form inputs (text, number, email) with built-in validation styling.
-   `Badge.tsx`: Used for displaying small, informative labels or status indicators.
-   `Text.tsx`: Provides a consistent way to render text content with semantic typography styles.
-   `Heading.tsx`: For hierarchical headings (h1, h2, etc.) ensuring consistent font sizes and weights.

#### 2. Molecules (`src/components/molecules/`)

Molecules are combinations of atoms that function together as a unit. They are still relatively simple but offer more context and functionality than individual atoms.

**Examples in this project:**

-   `FormField.tsx`: Combines an `Input`, a `Text` label, validation messages, and potentially a help `Text`. It encapsulates the common structure of a form input.
-   `OpportunityCard.tsx`: Displays a summary of an opportunity, potentially combining `Heading` for title, `Text` for description, `Badge` for status, and `Button` for actions (e.g., "View Details").

#### 3. Organisms (`src/components/organisms/`)

Organisms are more complex UI components composed of molecules, atoms, or even other organisms. They represent distinct sections of an interface and are usually self-contained units with significant functionality.

**Examples in this project:**

-   `Header.tsx`: Contains navigation elements, branding (logo), and potentially user-related controls (e.g., profile icon, dark/light mode toggle).
-   `Footer.tsx`: Displays site-wide information like copyright, links, and contact details.

#### 4. Templates (`src/components/templates/`)

Templates define the page-level structure by arranging organisms into a layout. They are content-agnostic and focus on the wireframe of a page, ensuring consistent overall page composition.

**Example in this project:**

-   `PageLayout.tsx`: Provides a consistent wrapper for most application pages, including the `Header` and `Footer`, and a main content area.

#### 5. Pages (`src/pages/`)

Pages are specific instances of templates filled with real content. They represent the final rendered views of the application and are often connected to a specific route in React Router.

**Examples in this project:**

-   `Dashboard.tsx`: The main landing page after login, displaying an overview of relevant information.
-   `OpportunitiesList.tsx`: Shows a list of all available opportunities.
-   `OpportunityDetail.tsx`: Displays the full details of a single opportunity.
-   `OpportunityForm.tsx`: A page dedicated to creating or editing an opportunity.
-   `UserProfile.tsx`: Displays and allows editing of the user's profile information.
-   `Settings.tsx`: Contains user-specific application settings, like notification preferences or theme.

## Other Key Directories

-   **`src/api/`**: This directory contains client-side functions responsible for making API calls to the Django backend. It centralizes all API interactions, ensuring consistency and making it easier to manage endpoints.
-   **`src/hooks/`**: Houses custom React hooks. Hooks allow us to encapsulate reusable stateful logic and share it across components without relying on class components or render props. Examples include `useOpportunities` for data fetching and caching, and `useUserProfile` for managing user-related state.
-   **`src/types/`**: Contains TypeScript interface and type definitions used throughout the application. This ensures strong typing for data structures, API responses, and component props, leading to a more robust and error-free codebase.
-   **`src/utils/`**: A collection of general utility functions that don't fit into other categories. This includes helper functions for date formatting (`date.ts`) or application-wide constants (`constants.ts`).

## Development Workflow

For local development, ensure you have Node.js 20+ and Docker installed.

### Local Setup

```bash
# Install dependencies
npm install

# Start development server (usually runs on http://localhost:5173)
npm run dev

# Run type checking
npm run type-check

# Build for production
npm run build
```

### Dockerized Development

The frontend is designed to run within a Docker container as part of the complete project setup. From the project root:

```bash
# Build and start all services (frontend, backend, database, etc.)
docker-compose up --build

# The frontend will typically be accessible at http://localhost:5173
```

## API Integration

This frontend integrates with the Django REST API. The `src/api/` directory contains client functions for the following endpoints:

-   `GET /api/opportunities/`
-   `POST /api/opportunities/`
-   `GET /api/opportunities/:id/`
-   `PUT /api/opportunities/:id/`
-   `DELETE /api/opportunities/:id/`
-   `GET /api/users/profiles/`
-   `POST /api/users/profiles/`
-   `GET /api/users/notes/`
-   `POST /api/users/notes/`

API responses are strictly typed using TypeScript interfaces defined in `src/types/index.ts`, ensuring data consistency and reducing runtime errors.

## Further Reading

-   [React Documentation](https://react.dev/)
-   [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
-   [Chakra UI Documentation](https://v2.chakra-ui.com/)
-   [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
