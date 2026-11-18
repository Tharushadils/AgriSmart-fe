# 🌾 රන් පොළොව (Ran Polowa) — Agricultural Supply Chain & Produce Management Platform (Frontend)

**රන් පොළොව (Ran Polowa)** is a full-stack agricultural supply chain, procurement, and produce management web application designed to streamline operations across **Farmers**, **Store Owners**, **Procurement Managers**, and **Collection Centers**.

🌐 **Live Application:** [https://ran-polowa.vercel.app](https://ran-polowa.vercel.app)  
🔗 **Backend API:** [https://agri-smart-be-git-feature-new-feature-tharusha-s-team.vercel.app](https://agri-smart-be-git-feature-new-feature-tharusha-s-team.vercel.app)

---

## ✨ Key Features

- **Role-Based Dashboards & Approval Workflows:** Customized interfaces and protected routes for Farmers, Store Owners, and Managers.
- **Store Pre-Orders & Finalization:** Store owners can place produce pre-orders with delivery deadlines, review order history, and confirm final allocations.
- **Farmer Harvest Submissions:** Farmers can submit harvest availability, track procurement status, and view approved purchase allocations.
- **District Pricing Management:** Managers can configure and publish district-level produce pricing.
- **Collection Center & Dispatch Operations:** End-to-end inventory tracking, inter-center transfers, and dispatch load management.
- **AI Produce Identification *(Planned)*:** Upcoming AI-powered image recognition feature to automatically identify produce types and quality grades during harvest submission.

---

## 🛠️ Tech Stack

- **Framework:** React + TypeScript + Vite
- **Routing:** React Router
- **HTTP Client:** Axios
- **Styling & Icons:** Tailwind CSS / Custom CSS & Custom SVG Iconography
- **Deployment:** Vercel

---

## 📁 Project Structure

```text
AgriSmart-fe/
├── public/              # Static public assets
├── src/
│   ├── assets/          # Images, icons, and branding assets
│   ├── components/      # Reusable UI components (UserProfileMenu, etc.)
│   ├── pages/           # Role-specific views (Farmer, Store, Manager)
│   ├── router/          # Protected & public React Router configurations
│   ├── service/         # API & authentication helper modules
│   ├── api.ts           # Axios instance configured with live backend URL
│   └── main.tsx         # Application entry point
├── .npmrc               # Peer dependency configuration for Vercel builds
├── package.json         # Project dependencies and Vite build scripts
└── vercel.json          # SPA rewrite rules for client-side routing
