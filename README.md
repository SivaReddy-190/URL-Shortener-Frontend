# 🔗 Snippy — URL Shortener Frontend

A modern, responsive, and analytics-driven URL Shortener web client built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Vite**.

Designed with **color psychology** (Emerald `#10B981` for growth/trust, Warm Coral `#F97316` for vibrant calls to action, Charcoal `#111827`, and Warm Ivory `#FAFAF5`) to provide an intuitive and polished user experience.

---

## ✨ Features

- **⚡ Auth-on-Submit Flow**: Public users can paste and configure a long URL directly from the landing page. Authentication is lazily prompted only upon submission, seamlessly resuming URL creation after login without losing input data.
- **🔗 Smart URL Management**:
  - Instant URL shortening with optional custom alias/short code.
  - Configurable expiration periods (days/hours).
  - One-click clipboard copy with animated visual feedback.
  - Instant deletion with confirmation modal.
- **⏳ Dynamic Expiry Extension**:
  - Extend the validity of expiring links with custom day increments.
  - Real-time new expiration date preview.
  - Full Indian standard date formatting (`DD/MM/YYYY`) across all cards and modals.
- **📊 Interactive Analytics Dashboard**:
  - **KPI Summary Cards**: Total clicks, unique visitors, top referrer domain, and primary country.
  - **Time-Series Charts**: Interactive click volume over time powered by **Recharts**.
  - **Device & Platform Breakdowns**: Visual donut and pie charts for Device (Mobile/Desktop/Tablet), OS (Windows/macOS/Linux/Android/iOS), and Browser (Chrome/Safari/Firefox/Edge).
  - **Referrer Traffic Distribution**: Detailed domain table identifying external sources.
- **🛡️ Secure JWT Authentication**:
  - Login & Registration forms with real-time validation via **React Hook Form** and **Zod**.
  - Persistent authentication state managed with **Zustand** (survives page refreshes via `localStorage`).
  - Automated Axios request/response interceptors with Bearer token injection.
  - Protected routes redirecting unauthenticated traffic to `/login`.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 6](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Toasts / Notifications** | [Sonner](https://sonner.emilkowal.ski/) |
| **Date Utilities** | [date-fns](https://date-fns.org/) (`DD/MM/YYYY` Indian format) |
| **Linter** | [Oxlint](https://oxc.rs/) |

---

## 📁 Project Structure

```text
src/
├── api/                  # Axios HTTP client & API service endpoints
│   ├── client.ts         # Axios instance with JWT interceptor & base URL
│   ├── auth.ts           # Login & register API calls
│   ├── urls.ts           # Shorten, list, delete, & extend expiry APIs
│   └── analytics.ts      # Analytics summary & breakdown APIs
├── assets/               # Static images and vector illustrations
├── components/           # Modular UI components
│   ├── analytics/        # Time charts, pie breakdowns, KPI cards, referrer tables
│   ├── auth/             # LoginForm & RegisterForm components
│   ├── layout/           # Navbar, Footer, and AuthLayout wrappers
│   ├── links/            # LinkCard, LinkList, ShortenForm, Modals (Extend/Delete)
│   └── ui/               # Reusable primitives (Button, Input, Card, Badge, Modal, Spinner)
├── hooks/                # Custom React hooks (useAuth, useAnalytics)
├── pages/                # Route pages
│   ├── HomePage.tsx      # Landing page with interactive hero & quick shortener
│   ├── LoginPage.tsx     # Sign-in page with redirect query preservation
│   ├── RegisterPage.tsx  # Account registration page
│   ├── DashboardPage.tsx # User links management dashboard
│   ├── AnalyticsPage.tsx # Detailed analytics view for a specific short link
│   └── NotFoundPage.tsx  # Custom 404 page
├── stores/               # Zustand global state stores
│   ├── authStore.ts      # User session, JWT tokens, and login/logout state
│   └── linkStore.ts      # User link collection and pagination state
├── types/                # TypeScript interfaces & DTO schemas
│   ├── auth.ts
│   ├── url.ts
│   └── analytics.ts
├── App.tsx               # Route declarations & layout providers
├── index.css             # Tailwind CSS entry & color theme variables
└── main.tsx              # React DOM bootstrap entry
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm** or **pnpm**
- **URL-Shortener Backend**: Spring Boot backend running on `http://localhost:8080`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SivaReddy-190/URL-Shortener-Frontend.git
   cd URL-Shortener-Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The application will be accessible at:
   ```text
   http://localhost:5173
   ```

---

## 🔄 Backend Connectivity & Proxy

The development server includes a pre-configured reverse proxy in `vite.config.ts`:

- `/api` requests are proxied to `http://localhost:8080/api`
- Short link redirects (e.g. `http://localhost:5173/{shortCode}`) are proxied directly to `http://localhost:8080/{shortCode}` to trigger backend telemetry capture and original URL redirection.

To point to a different backend server in production, configure the `VITE_API_BASE_URL` environment variable in a `.env` file:

```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server with HMR at `http://localhost:5173` |
| `npm run build` | Type-checks with `tsc` and compiles an optimized production build into `dist/` |
| `npm run preview` | Locally previews the production build output from `dist/` |
| `npm run lint` | Runs `oxlint` for high-speed JavaScript/TypeScript linting |

---

## 🇮🇳 Date Format Standard

All timestamp displays across link cards, modal pickers, and chart time axes adhere strictly to the Indian standard date format:

$$\text{DD/MM/YYYY} \quad (\text{e.g., } 17/11/2026)$$

---

## 📄 License

This project is licensed under the MIT License.
