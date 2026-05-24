# Internshala Internship Search Platform Clone

A production-grade, highly performant ReactJS internship search platform inspired by Internshala’s internship listing page. Built with React 19, TypeScript, and Vite, this project is optimized for visual density, layout responsiveness, and resilient filtering capabilities.

## 🚀 Live Demo & Screenshots

- **Live Demo Link:** *[Insert Live Deployment Link Here]*
- **Project Walkthrough:** Refer to the developer [walkthrough.md](file:///Users/ovaiskoite/.gemini/antigravity-ide/brain/72f9ce06-bdce-44af-ac42-8f6f13d18230/walkthrough.md) for architecture design logs and type-checking outputs.

---

## ✨ Features

- **Resilient API Architecture**: Attempts to query the live Internshala endpoint (`https://internshala.com/hiring/search`) and dynamically falls back to a structured local static backup dataset in case of network outages or CORS limitations.
- **Dynamic Derived Filters**: Scans the loaded dataset in real-time to compute unique available profiles, locations, and durations. Filter select options adjust dynamically to match the current dataset.
- **Robust Multi-Parameter Search**:
  - Direct Zustand store synchronization keeps desktop and mobile search fully in sync.
  - Smart multi-word matching: typing multiple words (e.g., "react mumbai") checks each word across all search fields (*title*, *company name*, *profile name*, and *locations*).
  - Normalized case-insensitive checks, trimmed queries, and instant updates.
- **Tighter UI visual density**: Closely aligns with Internshala’s spacing, margin structure, and card padding.
- **Full Layout Responsiveness**: Features a 5-column desktop layout that collapses to a single column on mobile, introducing a floating action filter drawer for smaller screens.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript (Strict Type Safety)
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v3 (Stable) + PostCSS
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query (v5)
- **Icons**: Lucide React
- **Helper Utilities**: `clsx`, `tailwind-merge`

---

## 📂 Folder Structure

```
src/
 ├── api/
 │    └── axiosInstance.ts      # Pre-configured Axios client targeting Internshala.com
 ├── assets/                    # Platform assets and SVGs
 ├── components/
 │    ├── filters/
 │    │    └── FilterSidebar.tsx # Sidebar filtering dropdown selectors & radio options
 │    ├── internship/
 │    │    ├── InternshipCard.tsx # Listing card for internship details
 │    │    └── InternshipList.tsx # List manager with skeletons & useMemo filter pass
 │    ├── layout/
 │    │    ├── Layout.tsx        # Grid system container & mobile sheet drawer
 │    │    └── Navbar.tsx        # Compact header with logo & SearchInput component
 │    └── ui/
 │         ├── Badge.tsx         # Status indicators (neutral, success, warning)
 │         ├── Button.tsx        # Standard button variants (primary, secondary, outline)
 │         ├── EmptyState.tsx    # Clean dynamic empty state feedback
 │         └── Skeleton.tsx      # Pulse placeholder skeleton loader
 ├── constants/
 │    └── index.ts              # Predefined stipend, duration, and navigation values
 ├── hooks/
 │    ├── useDerivedFilters.ts  # Dynamically extracts unique filter values from payload
 │    └── useInternships.ts     # TanStack Query hook with local fallback
 ├── services/
 │    └── internshipFallback.ts # 10 mock internship records matching the API
 ├── store/
 │    └── filterStore.ts        # Zustand filter parameters store
 ├── utils/
 │    └── cn.ts                 # Conditional Tailwind classes merger
 ├── App.css                    # Cleared styles
 ├── App.tsx                    # QueryClientProvider wrapper & page layout mount
 ├── index.css                  # Custom scrollbars & fonts setup
 └── main.tsx                   # StrictMode root renderer
```

---

## 📦 Setup and Running Locally

Ensure you have [NodeJS](https://nodejs.org) installed on your machine.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hukshh/internshala_clone.git
   cd internshala_clone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your web browser.

4. **Verify TypeScript and Lints:**
   ```bash
   npm run lint
   npm run build
   ```

---

## ☁️ Deployment Instructions

### Deploy to Vercel

The project is fully pre-configured for instant Vercel deployments:

1. **Push your code changes to GitHub.**
2. **Log into Vercel** and select **Add New Project**.
3. **Import the repository** `internshala_clone`.
4. Vercel will automatically detect the Vite preset:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Your Internshala clone will be live in less than a minute!
