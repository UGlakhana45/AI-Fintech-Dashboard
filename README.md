# AI-Orchestrated Fintech Dashboard

![Fintech Dashboard UI](./AI-Dashboard.png)

A high-performance, responsive financial dashboard built to demonstrate rapid AI-assisted development workflows.

Instead of manually writing boilerplate for complex data grids and charts, I utilized an AI-orchestrated workflow via Cursor, constrained by strict `.cursorrules`, to scaffold this entire UI in under 30 minutes. This allows me to dedicate 100% of my manual engineering hours to what actually matters: API security, state synchronization, and React Query caching.

### 🛠 Tech Stack

- **Framework:** Next.js (App Router) & TypeScript
- **Data Visualization:** Recharts
- **Data Grids:** `@tanstack/react-table` (v8)
- **State & Caching:** React Query
- **Styling:** TailwindCSS

### 🧠 The Architecture (My .cursorrules)

I enforce a strict "Screens Compose, They Do Not Compute" rule. All business logic and data fetching is isolated into custom hooks, ensuring the UI components remain completely dumb and highly performant.
