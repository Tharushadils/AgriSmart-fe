# 🌾 රන් පොළොව (Ran Polowa)
### Agricultural Supply Chain & Wholesale Management Ecosystem
🚀 **Live Demo:** [Ran Polowa](https://ran-polowa.vercel.app/login)

<br>

**Ran Polowa** is a comprehensive, full-stack agricultural supply chain and wholesale management platform designed specifically for Sri Lanka. It streamlines the entire agricultural distribution ecosystem — connecting farmers, retail store owners, procurement representatives, distribution representatives, and operations managers through a centralized digital platform.

Built using **React, TypeScript, Node.js, Express.js, and MongoDB**, Ran Polowa simplifies agricultural procurement, harvest planning, regional inventory management, wholesale distribution, and operational coordination.

<div align="center">
  <img width="100%" src="https://github.com/user-attachments/assets/b206190a-43e4-4ee2-bd42-1fcb6557181e" alt="Ran Polowa Platform Dashboard" />
  <br/>
  <sub>Ran Polowa — Platform Overview</sub>
</div>



---

## ✨ Key Features

### 🔐 1. Authentication, Role-Based Access Control & Email Automation

- **Multi-Role Access Control (RBAC):** Role-specific dashboards and workflows for `MANAGER`, `FARM`, and `STORE` users.
- **Account Verification & Approval Pipeline:** A secure two-stage registration process requiring email verification followed by manager approval before portal access is granted.

<div align="center">
  <img width="48%" src="https://github.com/user-attachments/assets/fc3c4e6c-7257-42b2-9901-deb95011e616" alt="Account Registration and Verification" />
  <br/>
  <img width="90%" src="https://github.com/user-attachments/assets/016b5269-9ef8-42cb-8bb3-fcc600295c2e" alt="Manager Account Approval Interface" />
  <br/>
  <sub>Account Verification & Manager Approval Workflow</sub>
</div>

- **Automated Email Notifications (Nodemailer):**
  - Automated HTML email notifications when managers approve user accounts.
  - Professional account confirmation emails with relevant user information.
  - **6-Digit OTP Password Reset:** Time-limited email OTP verification for secure password recovery.

<div align="center">
  <img width="90%" src="https://github.com/user-attachments/assets/5d82803a-06b2-418e-b531-c412909b6341" alt="OTP Password Reset Interface" />
  <br/>
  <sub>Email-Based OTP Password Recovery</sub>
</div>

- **User Profile & Security Management:** Self-service profile updates, password changes, and real-time form validation.

### 🌱 2. Farm & Harvest Management (`FARM`)

- **Farm Registration & Geo-Tagging:** Register farm locations with district mapping, assigned regional collection centers, and interactive geographical coordinates.

<div align="center">
  <img width="100%" src="https://github.com/user-attachments/assets/41b09281-4ae7-4e0e-a227-2bb7dd41edc8" alt="Farm Registration and Location Mapping" />
  <br/>
  <sub>Farm Registration & Geographic Location Management</sub>
</div>

- **Harvest Submission Ledger:** Submit upcoming harvest quantities and expected dates, monitor approval progress, and review farmer payouts.
- **Harvest Lifecycle Tracking:** Track harvest submissions through `PENDING`, `CONFIRMED`, `BOOKED`, and `PURCHASED` statuses.
- **AI-Powered Produce Identification:** Camera-based produce recognition using the browser's `getUserMedia()` API and Gemini AI Vision.

<div align="center">
  <img width="100%" src="https://github.com/user-attachments/assets/000744af-3480-4d6c-9fa8-c057ded43d57" alt="AI-Powered Produce Identification" />
  <br/>
  <sub>AI Produce Identification Interface</sub>
</div>

### 🏪 3. Retail Store Pre-Orders & Fulfillment (`STORE`)

- **Daily Produce Pre-Orders:** Enable store owners to submit bulk produce orders for scheduled delivery dates.
- **Sri Lanka Standard Time Enforcement:** Apply `UTC+5:30` timezone-aware cutoff validation, ensuring orders are submitted before the midnight deadline on the day preceding delivery.
- **Real-Time Extra Stock Purchasing:** Allow stores to request additional produce when surplus stock becomes available.
- **Order Finalization & History:** Confirm final delivered quantities and maintain complete order lifecycle records using `PENDING`, `ALLOCATED`, `FINALIZED`, and `DISPATCHED` statuses.

### 🏢 4. Operations Management & Regional Logistics (`MANAGER / OWNER`)

- **District Market Price Management:** Publish and manage daily wholesale purchasing and selling prices across all 25 administrative districts of Sri Lanka.
- **Automated Store Allocation:** Preview and release district-based produce allocations and store quotas.
- **Farmer Procurement Planning:** Generate farmer pickup schedules and coordinate daily procurement activities.
- **Collection Center Management:**
  - Manage regional collection centers with interactive map-based location selection.
  - Support soft deletion through `isActive` controls.
  - Monitor center-wise and product-wise purchased inventory.
  - Maintain verified farmer purchase receipts.
  - Coordinate inter-center stock and harvest transfers.
- **Inline Directory Management:** Perform row-level updates for registered farms, retail stores, products, and user accounts.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Custom SVG Icon System, CSS Variables |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Authentication & Security** | JWT Access & Refresh Tokens, bcryptjs, Nodemailer |
| **Maps & Geolocation** | Leaflet, CartoDB |
| **Camera & AI** | WebRTC Camera API, Gemini AI Vision |
| **Email Automation** | Nodemailer, Gmail SMTP |
| **Deployment** | Vercel, Render |

---

## ⚙️ Environment Configuration

Create a `.env` file inside the backend project directory and configure the following variables.

### Backend Environment Variables

```env
PORT=5000

# Database
MONGO_URI=your_mongodb_atlas_connection_string

# Authentication
JWT_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret

# Email Service (Gmail SMTP)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_digit_app_password

# Frontend URL
FRONTEND_URL=http://localhost:5173

# AI Produce Identification
GEMINI_API_KEY=your_gemini_api_key
```

**Security Note:** Never commit `.env` files, database credentials, JWT secrets, email app passwords, or API keys to version control. Add sensitive environment files to `.gitignore`.

---

## 🌍 Project Vision

**Ran Polowa** aims to modernize Sri Lanka's agricultural supply chain by creating a transparent, efficient, and digitally connected ecosystem.

By bringing farmers, retail businesses, procurement operations, and regional collection centers onto a single platform, the system helps improve agricultural coordination, inventory visibility, and wholesale distribution management.

**Built with technology. Driven by agriculture. Designed for Sri Lanka.** 🌾
