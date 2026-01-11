# ResumeAI Client

The frontend application for ResumeAI, built with React 19, Vite, and Tailwind CSS v4.

## 🚀 Features

- **Modern Architecture**: React 19 + Vite for lightning-fast HMR.
- **Styling**: Tailwind CSS v4 with a custom `@theme` and sleek aesthetic.
- **Animations**: `framer-motion` for smooth UI interactions.
- **Icons**: `lucide-react` for consistent iconography.
- **Routing**: `react-router-dom` v7 for seamless navigation.

## 🛠️ Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── layout/     # Structural components (Navbar, Footer)
│   │   ├── ui/         # Reusable UI primitives (Button, Card)
│   │   ├── upload/     # File upload logic
│   │   └── results/    # Visualizers for analysis data
│   ├── pages/          # Route pages (Home, Analyzer)
│   └── utils/          # Helper functions
├── index.html          # Entry HTML
└── vite.config.js      # Vite configuration
```

## 📦 Scripts

- `npm run dev`: Start development server on port 5173.
- `npm run build`: Build for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint checks.
