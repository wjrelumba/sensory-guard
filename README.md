# 🛡️ SensoryGuard

> A real-time data center monitoring system deployed at the **Capitol of Laguna** — tracking critical environmental variables across the data center and alerting administrators the moment thresholds are exceeded.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=flat&logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=flat&logo=capacitor&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel&logoColor=white)
![Version](https://img.shields.io/badge/version-8.0.0-brightgreen?style=flat)

**Live App:** [sensory-guard.vercel.app](https://sensory-guard.vercel.app)

---

## Overview

**SensoryGuard** is a real-time data center monitoring system built to safeguard critical infrastructure. Currently deployed at the **Capitol of Laguna**, it continuously tracks key environmental and hazard variables across the data center, displays live sensor readings on an admin dashboard, and automatically sends alerts when any variable surpasses a configured safety threshold.

The system runs as both a **web application** and an **Android mobile app**, giving administrators and analysts flexible access from any device.

---

## 🌡️ Monitored Variables

| Variable | Description |
|---|---|
| 🌡️ **Temperature** | Ambient temperature inside the data center |
| 💧 **Humidity** | Relative humidity levels — critical for hardware safety |
| 💨 **Smoke & Gas** | Detection of smoke or hazardous gas that could indicate equipment failure or fire |
| 📳 **Vibration** | Structural vibration that could indicate physical disturbance or hardware impact |
| 🔥 **Flame** | Flame presence detection for early fire warnings inside the facility |

---

## ✨ Features

- **Real-Time Monitoring** — Live sensor data displayed on an admin dashboard, updating continuously via Supabase real-time subscriptions
- **Threshold Management** — Admins can configure custom safety thresholds for each monitored variable
- **Automated Alerts** — The system sends immediate alerts to users when a sensor reading exceeds its configured threshold
- **Multi-Platform** — Available as a web app and an Android mobile app (via Capacitor)
- **API Layer** — A dedicated API handles sensor data ingestion and processing
- **Role-Based Access** — Admin-only controls for threshold configuration and system management

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend Framework | React 18 + Vite | Fast, modern web dashboard |
| Styling | TailwindCSS | Utility-first responsive design |
| Backend & Database | Supabase | PostgreSQL, real-time subscriptions, and authentication |
| Mobile | Capacitor | Wraps the web app as a native Android application |
| API | Custom API layer (`/api`) | Sensor data ingestion and processing |
| Deployment | Vercel | Web frontend hosting and CI/CD |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `v18+`
- **npm**, yarn, or pnpm
- A [Supabase](https://supabase.com) account and project
- **Android Studio** (only if building the Android app)

### Web App Setup

```bash
# 1. Clone the repository
git clone https://github.com/wjrelumba/sensory-guard.git
cd sensory-guard

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Add your Supabase credentials (see below)

# 4. Start the development server
npm run dev
```

The web app will be available at `http://localhost:5173`.

### Android App Setup

```bash
# 1. Build the web app first
npm run build

# 2. Sync with Capacitor
npx cap sync android

# 3. Open in Android Studio
npx cap open android
```

> Refer to the [Capacitor documentation](https://capacitorjs.com/docs/android) for further Android build and deployment steps.

---

## 🔐 Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

You can find these values in your Supabase project under **Settings → API**.

---

## 📁 Project Structure

```
sensory-guard/
├── android/                    # Capacitor Android project
├── api/                        # API layer for sensor data ingestion
├── public/                     # Static assets
├── resources/                  # App icons and splash screens (Capacitor)
├── src/
│   ├── components/             # Reusable UI components
│   ├── pages/                  # Route-level page components
│   │   ├── Dashboard.jsx       # Live sensor monitoring dashboard
│   │   ├── Thresholds.jsx      # Admin threshold configuration
│   │   └── Alerts.jsx          # Alert history and acknowledgment
│   ├── lib/
│   │   └── supabaseClient.js   # Supabase client initialization
│   ├── hooks/                  # Custom React hooks (e.g. real-time subscriptions)
│   ├── utils/                  # Helper functions
│   └── main.jsx                # App entry point
├── capacitor.config.json       # Capacitor configuration
├── .env.example                # Environment variable template
├── vercel.json                 # Vercel deployment configuration
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🔔 Alert System

SensoryGuard monitors all sensor readings in real time and streams live data directly to the dashboard. When a reading exceeds a configured threshold, the system automatically sends a **push notification to the administrator's phone**, ensuring critical alerts are received immediately even when the dashboard isn't open.

Thresholds for each variable can be updated at any time from the admin panel without redeploying the application.

---

## 👤 User Roles

| Role | Access |
|---|---|
| **Admin** | Full access — view live dashboard, configure and update thresholds, manage and acknowledge alerts |
| **Analyst** | Read-only access — view live sensor data and alert history, but cannot modify thresholds or system settings |

---

## 🚢 Deployment

### Web (Vercel)

SensoryGuard is deployed on **Vercel** with automatic deployments on every push to `main`.

1. Connect the repo to [Vercel](https://vercel.com)
2. Add environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) under **Project Settings → Environment Variables**
3. Vercel builds with `npm run build` and serves from `dist/`

### Android (APK / Play Store)

1. Run `npm run build && npx cap sync android`
2. Open in Android Studio: `npx cap open android`
3. Build a signed APK or AAB for distribution

---

## 🏛️ Deployment Site

SensoryGuard is actively deployed at:

> **Capitol of Laguna**, Santa Cruz, Laguna, Philippines

The system monitors the data center's environmental conditions in real time, providing administrators and analysts with immediate visibility into conditions that could threaten hardware, infrastructure, or operations.

---

## 📋 Releases

| Version | Date | Notes |
|---|---|---|
| v8.0.0 | March 8, 2026 | Latest stable release |

Full release history is available on the [GitHub Releases page](https://github.com/wjrelumba/sensory-guard/releases).

---

## 📄 License

This project is a purpose-built monitoring system for the Capitol of Laguna. All rights reserved.
