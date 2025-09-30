---
applyTo: '**'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

1. **Project Context**:
   - This project is a back office web application built with Next.js, React, TypeScript, and Tailwind CSS.
   - The application uses Next.js App Router for server-side rendering, routing, and modern web development patterns.
   - The application is designed to be responsive and accessible, following best practices for modern web development.
   - Uses Next.js built-in routing with App Router for type-safe navigation and server components.
   - Implements server actions and API routes for backend functionality.
   - API layer can be generated using Orval from OpenAPI specifications or custom API routes.

2. **Architecture**:
   - This project implements the Feature-Sliced Design (FSD) architecture adapted for Next.js App Router. Each feature, entity, widget, or page must be organized as a separate slice within the `src/` directory.
   - Each slice should contain the following subfolders, each with a clear responsibility:
      - `model/` → business logic, local state, selectors, server actions
      - `ui/` → visual components specific to the slice (client and server components)
      - `lib/` → utility functions and helpers used only within the slice
      - `api/` → API route handlers, server actions, and API interaction logic
      - `types/` → TypeScript types and contracts for the slice
   - Next.js App Router pages should be organized in `src/app/` following the file-system based routing.
   - Server components should be the default choice, with client components (`'use client'`) used only when interactivity is needed.
   - Shared functionality should be placed in the `src/shared/` folder, and not duplicated across slices.
   - Entity-specific logic should be placed in the `src/entities/` folder. You may use Zustand to manage client-side global state for entities.
   - Follow FSD principles: separation of concerns, scalability, and maintainability. Avoid mixing responsibilities between slices.

3. **Context, state management**:
   - Prefer server state and server components when possible, leveraging Next.js App Router capabilities.
   - For client-side state management, Zustand can be implemented for efficiency and simplicity.
   - Page-specific stores can be stored within the corresponding `entities` folder.
   - Avoid passing props between components, except for simple cases like components in the `shared` folder.
   - React Context is useful for handling client component-specific state that needs to be shared between closely related components.
   - Server actions should be used for data mutations and form handling when possible.
   - Client-side state should be minimal and focused on UI interactions.

4. **Tech Stack & Libraries**:
   - **Framework**: Next.js 15 with App Router for server-side rendering and routing.
   - **State Management**: Zustand for client-side global state, Server Components for server state.
   - **Data Fetching**: Native fetch with Next.js caching, Server Actions for mutations.
   - **Forms**: React Hook Form with server actions for form handling and validation.
   - **UI Components**: Tailwind CSS for styling, potentially Headless UI or Radix UI for accessible components.
   - **Testing**: Vitest with React Testing Library and Playwright for browser testing.
   - **Code Quality**: ESLint for linting, Prettier for formatting (to be configured).

5. **Coding Guidelines**:
   - Write clean, maintainable code with appropriate comments and documentation.
   - Use TypeScript for all new code, ensuring type safety and clarity.
   - Adhere to the principles of DRY (Don't Repeat Yourself) and KISS (Keep It Simple, Stupid).
   - Apply SOLID principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion).
   - Prefer Server Components over Client Components when possible for better performance.
   - Use Client Components (`'use client'`) only when interactivity is required (event handlers, state, browser APIs).
   - Avoid using useEffect when possible in Client Components, prefer server actions or derived state.
   - Use Next.js Server Actions for data mutations and form submissions.
   - Leverage Next.js built-in caching and revalidation strategies.
   - Prefer Zustand over React Context for complex client-side global state management.
   - Use React Context only for client component-specific state that needs to be shared between closely related components.
   - Use proper TypeScript types and interfaces for props and API responses.
   - Use absolute imports with the `@/` alias for internal modules (configured in tsconfig.json).
   - Follow Next.js App Router conventions for file organization and naming.
   - Use Git for version control, with clear and descriptive commit messages following conventional commits.
   - Follow the team's code review process, providing constructive feedback and being open to suggestions.

6. **Testing**:
   - Use Vitest + React Testing Library for unit/integration tests of client components.
   - Use Playwright for end-to-end tests covering the entire user journey.
   - Test Server Components by testing their rendered output and API integrations.
   - Test Server Actions independently as unit tests.
   - Mock external dependencies and API calls using `vi.mock()`.
   - Write deterministic tests: no reliance on timers or unstable selectors.
   - Avoid over-mocking; keep tests close to real usage.

7. **Back Office Specific Guidelines**:
   - Design for administrative users with complex data management needs.
   - Implement proper authentication and authorization for admin access.
   - Create reusable data table components with sorting, filtering, and pagination.
   - Design forms for CRUD operations with proper validation and error handling.
   - Use proper loading states and error boundaries for better UX.
   - Consider implementing role-based access control (RBAC) for different admin levels.