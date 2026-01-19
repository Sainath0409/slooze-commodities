
# Slooze Commodities Management

A Role-Based Access Control (RBAC) demo application built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Features

- **Authentication**: Key-less mock authentication flow.
- **RBAC**: 
  - **Manager**: Access Dashboard & Products.
  - **Store Keeper**: Access Products only.
- **UI**: Modern, clean interface using shadcn/ui & lucide-react.
- **Theming**: Light/Dark mode support.

## 🛠 Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: lucide-react
- **Language**: TypeScript

## 🏁 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)**

## 🔐 Credentials

| Role | Email | Password | Access |
|------|-------|----------|--------|
| **Manager** | `manager@slooze.xyz` | `password` | Dashboard, Products |
| **Store Keeper** | `store@slooze.xyz` | `password` | Products |

## 📁 Project Structure

```
src/
├─ app/          # Next.js App Router pages
├─ components/   # React components (UI, Layout, Auth)
├─ hooks/        # Custom hooks (useAuth)
├─ lib/          # Utilities & Business Logic (Auth, Roles)
├─ mock/         # Mock Data
└─ types/        # TypeScript definitions
```

## 📝 Assumptions

- Backend APIs are mocked via local storage and mock files.
- Authentication is simulated for demonstration purposes.
