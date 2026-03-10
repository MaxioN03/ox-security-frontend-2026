# OX Security — Employee Directory

A web application for managing and viewing employee status across an organization.

## Product Description

Employee Directory is an internal tool for tracking team availability. It displays a list of employees with their current status (Working, On Vacation, Lunch Time, Business Trip), supports search and filtering, and allows updating status in real time.

## Tech Stack


| Layer         | Technologies              |
| --------------- | --------------------------- |
| **Framework** | React 19, TypeScript      |
| **Build**     | Vite 7                    |
| **State**     | Redux Toolkit, RTK Query  |
| **Styling**   | SASS (SCSS modules)       |
| **Testing**   | Vitest                    |
| **Backend**   | Express (see `../backend`) |

## Features

- **Employee list** — View all employees with avatar, name, and status
- **Search** — Filter by name (case-insensitive)
- **Status filter** — Filter by Working, On Vacation, Lunch Time, or Business Trip
- **Update status** — Change employee status with confirmation modal and optimistic updates
- **Create employee** — Add new employees via modal (name + initial status)
- **URL sync** — Search and filter state reflected in the URL for sharing and bookmarking
- **Responsive UI** — Loading skeletons, error states, and accessible modals

## Getting Started

### Prerequisites

- Node.js 18+
- Backend running on `http://localhost:8000` (see `../backend`)

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Scripts


| Command              | Description                         |
| ---------------------- | ------------------------------------- |
| `npm run dev`        | Start dev server with HMR           |
| `npm run build`      | Type-check and build for production |
| `npm run preview`    | Preview production build            |
| `npm run test`       | Run unit tests                      |
| `npm run test:watch` | Run tests in watch mode             |
| `npm run lint`       | Run ESLint                          |

## Project Structure

```
src/
├── app/           # Store, providers, hooks
├── domain/        # Types, constants (Employee, Status)
├── features/
│   └── employees/ # Employee list, cards, modals, selectors
└── infrastructure/
    └── api/       # RTK Query API (usersApi)
```
