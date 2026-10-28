import { useState, useRef, type FormEvent, type FC } from 'react';

import bgVideoUrl from '../assets/236017.mp4';
import logoImgUrl from '../assets/logo.jpg';
export type UserRole = 'farmer' | 'merchant' | 'consumer' | 'officer';
export type AuthTab = 'signin' | 'register';

export interface ToastState {
  show: boolean;
  message: string;
}

const SRI_LANKA_DISTRICTS = [
  { value: 'colombo', label: 'Colombo' },
  { value: 'gampaha', label: 'Gampaha' },
  { value: 'kalutara', label: 'Kalutara' },
  { value: 'kandy', label: 'Kandy' },
  { value: 'matale', label: 'Matale' },
  { value: 'nuwaraeliya', label: 'Nuwara Eliya' },
  { value: 'galle', label: 'Galle' },
  { value: 'matara', label: 'Matara' },
  { value: 'hambantota', label: 'Hambantota' },
  { value: 'jaffna', label: 'Jaffna' },
  { value: 'kilinochchi', label: 'Kilinochchi' },
  { value: 'mannar', label: 'Mannar' },
  { value: 'vavuniya', label: 'Vavuniya' },
  { value: 'mullaitivu', label: 'Mullaitivu' },
  { value: 'batticaloa', label: 'Batticaloa' },
  { value: 'ampara', label: 'Ampara' },
  { value: 'trincomalee', label: 'Trincomalee' },
  { value: 'kurunegala', label: 'Kurunegala' },
  { value: 'puttalam', label: 'Puttalam' },
  { value: 'anuradhapura', label: 'Anuradhapura' },
  { value: 'polonnaruwa', label: 'Polonnaruwa' },
  { value: 'badulla', label: 'Badulla' },
  { value: 'monaragala', label: 'Monaragala' },
  { value: 'ratnapura', label: 'Ratnapura' },
  { value: 'kegalle', label: 'Kegalle' }
];

export const AgriSmartAuthPortal: FC = () => {
  
  const [activeTab, setActiveTab] = useState<AuthTab>('signin');
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');

  
  const [showSignInPassword, setShowSignInPassword] = useState<boolean>(false);
  const [showRegPassword, setShowRegPassword] = useState<boolean>(false);

  
  const [signInIdentifier, setSignInIdentifier] = useState<string>('');
  const [signInPassword, setSignInPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  
  const [regFullName, setRegFullName] = useState<string>('');
  const [regPhone, setRegPhone] = useState<string>('');
  const [regDistrict, setRegDistrict] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

  
  const [toast, setToast] = useState<ToastState>({ show: false, message: '' });
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ show: true, message });
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3500);
  };

  const getRoleDisplayName = (role: UserRole): string => {
    switch (role) {
      case 'farmer':
        return 'Farmer / Producer';
      case 'merchant':
        return 'Wholesaler / Buyer';
      case 'consumer':
        return 'Retailer / Consumer';
      case 'officer':
        return 'Agronomist / Expert';
      default:
        return 'Member';
    }
  };

  const handleSignInSubmit = (e: FormEvent) => {
    e.preventDefault();
    const roleLabel = getRoleDisplayName(selectedRole);
    showToast(`Signing in as ${roleLabel}... Welcome to Agri SMART!`);
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1200);
  };

  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    const roleLabel = getRoleDisplayName(selectedRole);
    showToast(`Account registered successfully as ${roleLabel}! Redirecting...`);
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1200);
  };

  return (
    <div className="auth-portal-container">
      
      <style>{`
        .auth-portal-container {
          --bg: #030a06;
          --green: #4ade80;
          --green-bright: #70ff9a;
          --green-glow: #22c55e;
          --cyan: #38bdf8;
          --white: #f8fafc;
          --card-bg: rgba(6, 22, 13, 0.78);
          --card-border: rgba(112, 255, 154, 0.28);
          --card-border-hover: rgba(112, 255, 154, 0.65);
          
          font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: var(--white);
          background: var(--bg);
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        .auth-portal-container * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .bg-container {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .bg-video {
          position: absolute;
          top: 50%;
          left: 50%;
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          transform: translate(-50%, -50%) scale(1.05);
          object-fit: cover;
          filter: brightness(1.06) contrast(1.05) saturate(1.12);
        }

        .bg-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 80% 80%, rgba(112, 255, 154, 0.08) 0%, transparent 60%),
            linear-gradient(180deg, rgba(3, 14, 8, 0.55) 0%, rgba(2, 10, 6, 0.72) 100%);
        }

        .grid-overlay {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(112, 255, 154, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(112, 255, 154, 0.08) 1px, transparent 1px);
          background-size: 64px 64px;
          opacity: 0.04;
          pointer-events: none;
          z-index: 1;
        }

        .auth-nav {
          position: sticky;
          top: 0;
          z-index: 20;
          height: 82px;
          padding: 0 6vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(3, 13, 7, 0.75);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid rgba(112, 255, 154, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 13px;
          font-family: 'Outfit', sans-serif;
          font-size: 23px;
          font-weight: 800;
          letter-spacing: 0.5px;
          color: var(--white);
          text-decoration: none;
        }

        .logo span {
          background: linear-gradient(135deg, #70ff9a 0%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 900;
        }

        .logo-img {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          object-fit: cover;
          border: 1.5px solid rgba(112, 255, 154, 0.5);
          box-shadow: 0 0 20px rgba(112, 255, 154, 0.3);
          display: block;
          background: rgba(6, 22, 13, 0.8);
        }

        .nav-back-btn {
          padding: 10px 22px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: var(--white);
          background: linear-gradient(135deg, rgba(112, 255, 154, 0.15), rgba(56, 189, 248, 0.08));
          border: 1px solid rgba(112, 255, 154, 0.35);
          border-radius: 100px;
          backdrop-filter: blur(12px);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35);
          text-decoration: none;
          font-family: inherit;
        }

        .nav-back-btn:hover {
          background: linear-gradient(135deg, #70ff9a, #24d36f);
          color: #030c07;
          border-color: transparent;
          box-shadow: 0 0 32px rgba(112, 255, 154, 0.6);
          transform: translateY(-2px);
        }

        .auth-main {
          position: relative;
          z-index: 8;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 50px 20px 80px;
        }

        .auth-card {
          width: 100%;
          max-width: 520px;
          background: linear-gradient(165deg, rgba(6, 26, 15, 0.88), rgba(2, 14, 8, 0.94));
          border: 1px solid rgba(112, 255, 154, 0.32);
          border-radius: 28px;
          padding: 38px 42px;
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          box-shadow:
            0 35px 95px rgba(0, 0, 0, 0.85),
            0 0 50px rgba(112, 255, 154, 0.15);
          position: relative;
          overflow: hidden;
          animation: authCardIn 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .auth-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #70ff9a, #38bdf8, transparent);
        }

        @keyframes authCardIn {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .auth-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .auth-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          border-radius: 100px;
          background: rgba(112, 255, 154, 0.08);
          border: 1px solid rgba(112, 255, 154, 0.3);
          color: var(--green-bright);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .auth-header h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: var(--white);
          letter-spacing: -0.5px;
          line-height: 1.15;
        }

        .auth-header h2 span {
          background: linear-gradient(135deg, #70ff9a 0%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .auth-header p {
          color: #9eb8a9;
          font-size: 14px;
          margin-top: 8px;
        }

        .auth-tabs {
          display: flex;
          background: rgba(2, 9, 5, 0.85);
          border: 1px solid rgba(112, 255, 154, 0.22);
          border-radius: 16px;
          padding: 5px;
          margin-bottom: 24px;
          position: relative;
        }

        .auth-tab-btn {
          flex: 1;
          padding: 11px 0;
          border: none;
          background: transparent;
          color: #8daea0;
          font-family: inherit;
          font-size: 13.5px;
          font-weight: 700;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.28s ease;
        }

        .auth-tab-btn.active {
          background: linear-gradient(135deg, rgba(112, 255, 154, 0.25), rgba(56, 189, 248, 0.18));
          color: var(--green-bright);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(112, 255, 154, 0.35);
        }

        .role-section {
          margin-bottom: 22px;
        }

        .role-label {
          display: block;
          font-size: 11.5px;
          font-weight: 700;
          color: #92b5a2;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 10px;
        }

        .role-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 9px;
        }

        .role-chip {
          padding: 9px 12px;
          border-radius: 12px;
          background: rgba(2, 9, 5, 0.8);
          border: 1px solid rgba(112, 255, 154, 0.2);
          color: #b0c9bb;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          text-align: center;
          transition: all 0.22s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-family: inherit;
        }

        .role-chip:hover {
          border-color: rgba(112, 255, 154, 0.5);
          color: var(--white);
        }

        .role-chip.active {
          background: rgba(112, 255, 154, 0.18);
          border-color: var(--green-bright);
          color: var(--green-bright);
          font-weight: 700;
          box-shadow: 0 0 14px rgba(112, 255, 154, 0.22);
        }

        .form-group {
          margin-bottom: 18px;
        }

        .form-label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #a4c5b3;
          margin-bottom: 7px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 15px;
          font-size: 15px;
          color: #70ff9a;
          pointer-events: none;
        }

        .form-input, .form-select {
          width: 100%;
          padding: 13px 18px 13px 44px;
          border-radius: 14px;
          background: rgba(2, 9, 5, 0.95);
          border: 1px solid rgba(112, 255, 154, 0.35);
          color: var(--white);
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          outline: none;
          transition: all 0.25s ease;
          box-sizing: border-box;
        }

        .form-input:focus, .form-select:focus {
          border-color: var(--green-bright);
          box-shadow: 0 0 20px rgba(112, 255, 154, 0.35);
          background: rgba(4, 15, 9, 0.98);
        }

        .form-input::placeholder {
          color: #617c6e;
          font-weight: 500;
        }

        .toggle-pwd {
          position: absolute;
          right: 14px;
          background: none;
          border: none;
          color: #8daea0;
          cursor: pointer;
          font-size: 14px;
          padding: 4px;
        }

        .toggle-pwd:hover {
          color: var(--green-bright);
        }

        .form-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 22px;
          font-size: 13px;
          color: #9eb8a9;
        }

        .checkbox-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          user-select: none;
        }

        .checkbox-wrap input[type="checkbox"] {
          accent-color: #22c55e;
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .forgot-link {
          color: var(--green-bright);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .forgot-link:hover {
          text-decoration: underline;
          color: #a7f3d0;
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #70ff9a 0%, #22c55e 100%);
          color: #020c06;
          font-family: inherit;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.4px;
          cursor: pointer;
          box-shadow: 0 0 28px rgba(112, 255, 154, 0.45);
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 40px rgba(112, 255, 154, 0.7);
          filter: brightness(1.05);
        }

        .divider {
          display: flex;
          align-items: center;
          margin: 24px 0 20px;
          color: #617d70;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .divider::before, .divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: rgba(112, 255, 154, 0.2);
        }

        .divider span {
          padding: 0 12px;
        }

        .sso-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .sso-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px;
          border-radius: 12px;
          background: rgba(2, 9, 5, 0.85);
          border: 1px solid rgba(112, 255, 154, 0.24);
          color: #e2f2e9;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.25s ease;
        }

        .sso-btn:hover {
          background: rgba(112, 255, 154, 0.12);
          border-color: rgba(112, 255, 154, 0.5);
          color: var(--white);
          transform: translateY(-1px);
        }

        .toast-msg {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%) translateY(100px);
          background: linear-gradient(135deg, rgba(6, 28, 16, 0.95), rgba(2, 14, 8, 0.98));
          border: 1px solid var(--green-bright);
          padding: 14px 24px;
          border-radius: 100px;
          color: var(--white);
          font-size: 13.5px;
          font-weight: 700;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(112, 255, 154, 0.35);
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 100;
          opacity: 0;
          transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
          pointer-events: none;
        }

        .toast-msg.show {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }

        @media (max-width: 580px) {
          .auth-card {
            padding: 30px 22px;
            border-radius: 22px;
          }
          .auth-header h2 {
            font-size: 26px;
          }
          .role-grid {
            grid-template-columns: 1fr;
          }
          .sso-buttons {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      
      <div className="bg-container">
        

        <video
          ref={(el) => {
            if (el) {
              el.muted = true; // Required by browsers to permit autoplay
              el.play().catch(() => {});
            }
          }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="bg-video"
          src={bgVideoUrl}
        >
          <source src={bgVideoUrl} type="video/mp4" />
          <source src="/236017.mp4" type="video/mp4" />
          <source src="/background.mp4" type="video/mp4" />
        </video>

        <div className="bg-overlay"></div>
      </div>

      <div className="grid-overlay"></div>

      
      <nav className="auth-nav">
        <a href="index.html" className="logo">
          <img
            src={logoImgUrl}
            alt="Agri SMART Logo"
            className="logo-img"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/logo.jpg';
            }}
          />
          Agri <span>SMART</span>
        </a>

        <div className="nav-right">
          <a href="http://localhost:5173/" className="nav-back-btn">
            ← Back to Market Prices
          </a>
        </div>
      </nav>

      
      <main className="auth-main">
        <div className="auth-card">
         
          <div className="auth-header">
            <div className="auth-badge">Official Member Gateway</div>
            <h2>
              Agri <span>SMART</span> Portal
            </h2>
            <p>
              {activeTab === 'signin'
                ? 'Sign in to manage farm analytics and market intelligence.'
                : 'Join thousands of farmers, merchants, and buyers across Sri Lanka.'}
            </p>
          </div>

          
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab-btn ${activeTab === 'signin' ? 'active' : ''}`}
              onClick={() => setActiveTab('signin')}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Create Account
            </button>
          </div>

          
          <div className="role-section">
            <span className="role-label">Choose Your Profile Role</span>
            <div className="role-grid">
              <button
                type="button"
                className={`role-chip ${selectedRole === 'farmer' ? 'active' : ''}`}
                onClick={() => setSelectedRole('farmer')}
              >
                <span>🚜</span> Farmer / Producer
              </button>
              <button
                type="button"
                className={`role-chip ${selectedRole === 'merchant' ? 'active' : ''}`}
                onClick={() => setSelectedRole('merchant')}
              >
                <span>🏪</span> Wholesaler / Buyer
              </button>
              <button
                type="button"
                className={`role-chip ${selectedRole === 'consumer' ? 'active' : ''}`}
                onClick={() => setSelectedRole('consumer')}
              >
                <span>🥗</span> Retailer / Consumer
              </button>
              <button
                type="button"
                className={`role-chip ${selectedRole === 'officer' ? 'active' : ''}`}
                onClick={() => setSelectedRole('officer')}
              >
                <span>🔬</span> Agronomist / Expert
              </button>
            </div>
          </div>

          
          {activeTab === 'signin' && (
            <form onSubmit={handleSignInSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="loginIdentifier">
                  Mobile Number or Email
                </label>
                <div className="input-wrap">
                  <span className="input-icon">📱</span>
                  <input
                    type="text"
                    id="loginIdentifier"
                    className="form-input"
                    placeholder="e.g. 077 123 4567 / name@example.lk"
                    value={signInIdentifier}
                    onChange={(e) => setSignInIdentifier(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="loginPassword">
                  Password
                </label>
                <div className="input-wrap">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showSignInPassword ? 'text' : 'password'}
                    id="loginPassword"
                    className="form-input"
                    placeholder="Enter your secret password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-pwd"
                    onClick={() => setShowSignInPassword((prev) => !prev)}
                    aria-label="Toggle password visibility"
                  >
                    {showSignInPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div className="form-row">
                <label className="checkbox-wrap">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <a
                  href="#forgot"
                  className="forgot-link"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('Password recovery instructions sent to registered contact.');
                  }}
                >
                  Forgot Password?
                </a>
              </div>

              <button type="submit" className="submit-btn">
                <span>Sign In to Agri SMART</span> →
              </button>

              <div className="divider">
                <span>Or continue with</span>
              </div>

              <div className="sso-buttons">
                <button
                  type="button"
                  className="sso-btn"
                  onClick={() => showToast('Authenticating with Google Single Sign-On...')}
                >
                  <span>🌐</span> Google
                </button>
                <button
                  type="button"
                  className="sso-btn"
                  onClick={() => showToast('Authenticating with Apple ID...')}
                >
                  <span>🍎</span> Apple
                </button>
              </div>
            </form>
          )}

          
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="regFullName">
                  Full Name
                </label>
                <div className="input-wrap">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    id="regFullName"
                    className="form-input"
                    placeholder="e.g. Kasun Perera"
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="regPhone">
                  Mobile Phone Number
                </label>
                <div className="input-wrap">
                  <span className="input-icon">📞</span>
                  <input
                    type="tel"
                    id="regPhone"
                    className="form-input"
                    placeholder="e.g. 077 234 5678"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="regDistrict">
                  Primary District
                </label>
                <div className="input-wrap">
                  <span className="input-icon">📍</span>
                  <select
                    id="regDistrict"
                    className="form-select"
                    value={regDistrict}
                    onChange={(e) => setRegDistrict(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select your district
                    </option>
                    {SRI_LANKA_DISTRICTS.map((district) => (
                      <option key={district.value} value={district.value}>
                        {district.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="regPassword">
                  Create Password
                </label>
                <div className="input-wrap">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    id="regPassword"
                    className="form-input"
                    placeholder="Minimum 6 characters"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-pwd"
                    onClick={() => setShowRegPassword((prev) => !prev)}
                    aria-label="Toggle password visibility"
                  >
                    {showRegPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div className="form-row">
                <label className="checkbox-wrap">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    required
                  />
                  <span>I agree to Agri SMART Terms & Privacy Policy</span>
                </label>
              </div>

              <button type="submit" className="submit-btn">
                <span>Create Agri SMART Account</span> →
              </button>
            </form>
          )}
        </div>
      </main>

      
      <div className={`toast-msg ${toast.show ? 'show' : ''}`} role="alert">
        <span>✅</span>
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

export default AgriSmartAuthPortal;