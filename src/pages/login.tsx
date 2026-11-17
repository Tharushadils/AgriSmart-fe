import React, { useState, useRef, type SubmitEvent } from 'react';
import '../login.css';
import videoSrc from '../assets/236017.mp4';
import { login, register } from '../service/auth';

export type ProfileRole =
  | 'FARM'
  | 'STORE'
  | 'DISTRIBUTION_REP'
  | 'PROCUREMENT_REP'
  | 'MANAGER'
  | 'OWNER';

export type AuthMode = 'signup' | 'signin';

const ROLE_DISPLAY_NAMES: Record<ProfileRole, string> = {
  FARM: 'FARM',
  STORE: 'STORE OWNER',
  DISTRIBUTION_REP: 'DISTRIBUTION REP',
  PROCUREMENT_REP: 'PROCUREMENT REP',
  MANAGER: 'MANAGER',
  OWNER: 'OWNER'
};

export default function Login(): React.ReactNode {
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [selectedRole, setSelectedRole] = useState<ProfileRole>('FARM');
  const [fullName, setFullName] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [toastMessage, setToastMessage] = useState<string>('Welcome to රන් පොළොව!');
  const [showToast, setShowToast] = useState<boolean>(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const handleSelectRole = (role: ProfileRole) => {
    setSelectedRole(role);
    triggerToast(`Role selected: ${ROLE_DISPLAY_NAMES[role]}`);
  };

  const redirectUser = (role: string) => {
    if (typeof window === 'undefined') return;

    const normalizedRole = role ? role.toUpperCase() : '';

    switch (normalizedRole) {
      case 'OWNER':
      case 'MANAGER':
        window.location.href = '/managerdashboard';
        break;
      case 'FARM':
        window.location.href = '/farmdashboard';
        break;
      case 'STORE':
      case 'STORE OWNER':
        window.location.href = '/storedashboard';
        break;
      case 'DISTRIBUTION_REP':
        window.location.href = '/distributionrepdashboard';
        break;
      case 'PROCUREMENT_REP':
        window.location.href = '/procurementrepdashboard';
        break;
      default:
        window.location.href = '/farmdashboard';
        break;
    }
  };

  const handleFormSubmission = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (authMode === 'signup') {
        await register(
          fullName,
          email,
          password,
          mobileNumber,
          selectedRole
        );

        triggerToast(' Account created! Please wait for email verification and admin approval.');
        setTimeout(() => {
          setAuthMode('signin');
        }, 2500);
      } 
      else {
        const res = await login(email, password);

        const token = res.data?.data?.access_token || res.data?.access_token;
        const refreshToken = res.data?.data?.refresh_token || res.data?.refresh_token;
        const userData = res.data?.data?.user || res.data?.user;

        if (token) {
          localStorage.setItem('ACCESS_TOKEN', token);
          localStorage.setItem('token', token);
        }
        if (refreshToken) {
          localStorage.setItem('REFRESH_TOKEN', refreshToken);
        }
        if (userData) {
          localStorage.setItem('user', JSON.stringify(userData));
          const farmId = userData.farmId || userData.farm || userData._id;
          if (farmId) {
            localStorage.setItem('farmId', farmId);
          }
        }

        const userRole = userData?.role || selectedRole;

        triggerToast('🌱 Welcome back! Redirecting...');
        setTimeout(() => {
          redirectUser(userRole);
        }, 1200);
      }
    } catch (error: any) {
      console.error('Auth Error:', error);

      const status = error.response?.status;
      const errorData = error.response?.data;
      const errorMsg = errorData?.message || 'Authentication failed. Please check your credentials.';

      if (status === 403) {
        if (errorData?.code === 'PENDING_APPROVAL') {
          triggerToast(' Account is pending admin approval. You cannot log in yet.');
        } else if (errorData?.code === 'EMAIL_NOT_VERIFIED') {
          triggerToast(' Please verify your email address before logging in.');
        } else if (errorData?.code === 'ACCOUNT_DEACTIVATED') {
          triggerToast(' Account is deactivated. Please contact support.');
        } else {
          triggerToast(` ${errorMsg}`);
        }
      } else if (status === 401) {
        triggerToast(' Invalid email or password.');
      } else {
        triggerToast(` ${errorMsg}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page-root">
      <div className="login-doodle-bg" />
      <header className="login-header-wrapper">
        <div className="login-header-bg-svg-wrap">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="wrinkleShadow" x="-5%" y="-10%" width="110%" height="150%">
                <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#143412" floodOpacity="0.22" />
              </filter>
            </defs>
            <path
              d="M 0,0 L 1440,0 L 1440,82.0 L 1435,84.9 L 1430,89.0 L 1425,85.1 L 1420,81.9 L 1415,88.5 L 1410,84.7 L 1405,80.7 L 1400,86.9 L 1395,85.2 L 1390,80.9 L 1385,75.7 L 1380,69.1 L 1375,75.8 L 1370,79.7 L 1365,75.2 L 1360,81.2 L 1355,83.9 L 1350,79.3 L 1345,78.9 L 1340,76.4 L 1335,81.0 L 1330,87.4 L 1325,79.1 L 1320,76.4 L 1315,79.9 L 1310,75.6 L 1305,77.0 L 1300,81.3 L 1295,86.1 L 1290,95.7 L 1285,92.6 L 1280,87.8 L 1275,96.0 L 1270,97.6 L 1265,97.0 L 1260,100.9 L 1255,99.7 L 1250,101.7 L 1245,98.9 L 1240,90.4 L 1235,98.0 L 1230,106.1 L 1225,104.5 L 1220,108.0 L 1215,108.4 L 1210,107.9 L 1205,109.7 L 1200,103.3 L 1195,105.6 L 1190,113.5 L 1185,106.1 L 1180,99.9 L 1175,98.4 L 1170,95.1 L 1165,98.3 L 1160,97.5 L 1155,97.3 L 1150,106.8 L 1145,103.9 L 1140,95.7 L 1135,98.3 L 1130,98.9 L 1125,100.8 L 1120,101.1 L 1115,94.1 L 1110,96.2 L 1105,95.4 L 1100,85.5 L 1095,89.1 L 1090,96.3 L 1085,98.5 L 1080,101.6 L 1075,97.1 L 1070,97.1 L 1065,102.8 L 1060,96.7 L 1055,96.2 L 1050,103.0 L 1045,99.4 L 1040,95.1 L 1035,89.5 L 1030,85.4 L 1025,93.1 L 1020,93.2 L 1015,89.8 L 1010,97.1 L 1005,96.5 L 1000,90.7 L 995,89.4 L 990,86.6 L 985,91.6 L 980,93.0 L 975,82.1 L 970,81.0 L 965,81.4 L 960,74.2 L 955,75.2 L 950,78.0 L 945,82.3 L 940,88.2 L 935,80.8 L 930,78.1 L 925,85.4 L 920,83.1 L 915,82.5 L 910,85.7 L 905,84.1 L 900,85.2 L 895,79.5 L 890,73.7 L 885,84.2 L 880,89.4 L 875,88.0 L 870,93.3 L 865,93.7 L 860,94.4 L 855,95.1 L 850,90.0 L 845,96.6 L 840,102.5 L 835,93.6 L 830,90.3 L 825,89.5 L 820,87.1 L 815,90.4 L 810,88.9 L 805,91.7 L 800,100.2 L 795,93.4 L 790,87.0 L 785,90.6 L 780,89.7 L 775,90.8 L 770,88.6 L 765,82.3 L 760,84.8 L 755,79.5 L 750,70.0 L 745,76.0 L 740,81.1 L 735,82.0 L 730,83.5 L 725,78.6 L 720,80.7 L 715,83.7 L 710,76.4 L 705,79.5 L 700,85.6 L 695,80.4 L 690,76.7 L 685,71.7 L 680,71.1 L 675,79.3 L 670,77.5 L 665,77.8 L 660,86.9 L 655,84.2 L 650,79.7 L 645,79.9 L 640,79.3 L 635,85.5 L 630,84.0 L 625,74.4 L 620,76.6 L 615,74.6 L 610,67.4 L 605,70.2 L 600,73.1 L 595,77.9 L 590,80.7 L 585,71.7 L 580,72.1 L 575,77.5 L 570,72.4 L 565,72.9 L 560,75.2 L 555,72.8 L 550,72.3 L 545,64.4 L 540,61.8 L 535,73.1 L 530,74.7 L 525,74.5 L 520,80.8 L 515,80.8 L 510,82.1 L 505,81.9 L 500,79.6 L 495,89.7 L 490,93.0 L 485,84.8 L 480,85.6 L 475,85.9 L 470,85.6 L 465,90.3 L 460,90.7 L 455,98.2 L 450,106.0 L 445,98.2 L 440,96.7 L 435,102.3 L 430,101.9 L 425,104.1 L 420,101.9 L 415,98.6 L 410,101.6 L 405,93.7 L 400,87.5 L 395,96.2 L 390,99.4 L 385,100.0 L 380,100.5 L 375,96.3 L 370,99.6 L 365,99.1 L 360,91.9 L 355,97.9 L 350,101.2 L 345,94.1 L 340,90.6 L 335,85.9 L 330,87.4 L 325,93.9 L 320,90.6 L 315,94.5 L 310,102.8 L 305,97.7 L 300,94.9 L 295,96.2 L 290,97.4 L 285,103.8 L 280,99.8 L 275,93.3 L 270,97.7 L 265,93.4 L 260,88.0 L 255,93.1 L 250,96.5 L 245,101.8 L 240,101.9 L 235,93.5 L 230,97.2 L 225,99.8 L 220,93.2 L 215,95.3 L 210,96.3 L 205,92.6 L 200,89.6 L 195,79.9 L 190,80.1 L 185,89.2 L 180,86.3 L 175,86.5 L 170,91.4 L 165,88.7 L 160,88.2 L 155,85.3 L 150,84.1 L 145,93.6 L 140,91.4 L 135,82.8 L 130,84.8 L 125,83.3 L 120,82.7 L 115,86.5 L 110,87.6 L 105,97.0 L 100,101.2 L 95,92.6 L 90,95.0 L 85,100.3 L 80,99.5 L 75,102.3 L 70,100.3 L 65,99.6 L 60,101.7 L 55,92.2 L 50,90.5 L 45,100.6 L 40,102.0 L 35,102.9 L 30,103.1 L 25,100.0 L 20,103.5 L 15,99.7 L 10,94.1 L 5,101.8 L 0,101.0 Z"
              fill="#ffffff"
              filter="url(#wrinkleShadow)"
            />
          </svg>
        </div>

        <div className="login-top-nav">
          <a href="/" className="login-brand-logo" title="රන් පොළොව Home">
            <span className="login-logo-text">
              රන් <span>පොළොව</span>
            </span>
          </a>
          <div className="login-nav-links">
            <a href="/" className="login-nav-link-btn">
              <span>← Back to Market</span>
            </a>
          </div>
        </div>
      </header>

      <main className="login-page-container">
        <div className="login-auth-grid">
          <div className="login-auth-form-card">
            <div className="login-form-header-row">
              <h1 className="login-form-title">
                {authMode === 'signup' ? 'Get Started Now' : 'Welcome Back'}
              </h1>

              <div className="login-auth-mode-toggle" role="tablist">
                <button
                  type="button"
                  className={`login-auth-mode-tab ${authMode === 'signin' ? 'active' : ''}`}
                  onClick={() => setAuthMode('signin')}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className={`login-auth-mode-tab ${authMode === 'signup' ? 'active' : ''}`}
                  onClick={() => setAuthMode('signup')}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {authMode === 'signup' && (
              <div className="login-role-section">
                <span className="login-role-section-label">Choose Your Role</span>
                <div className="login-roles-wrapper" role="radiogroup" aria-label="Profile Role">
                  {(Object.keys(ROLE_DISPLAY_NAMES) as ProfileRole[]).map((roleKey) => (
                    <button
                      key={roleKey}
                      type="button"
                      className={`login-role-pill ${selectedRole === roleKey ? 'active' : ''}`}
                      onClick={() => handleSelectRole(roleKey)}
                    >
                      {ROLE_DISPLAY_NAMES[roleKey]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleFormSubmission}>
              {authMode === 'signup' && (
                <>
                  <div className="login-form-group">
                    <label className="login-form-label" htmlFor="inputFullName">
                      Full Name
                    </label>
                    <div className="login-input-container">
                      <input
                        type="text"
                        id="inputFullName"
                        className="login-form-input"
                        placeholder="Enter your full name"
                        autoComplete="name"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="login-form-group">
                    <label className="login-form-label" htmlFor="inputMobileNumber">
                      Mobile Number
                    </label>
                    <div className="login-input-container">
                      <input
                        type="tel"
                        id="inputMobileNumber"
                        className="login-form-input"
                        placeholder="+94 77 123 4567"
                        autoComplete="tel"
                        required
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="login-form-group">
                <label className="login-form-label" htmlFor="inputEmailAddress">
                  Email Address
                </label>
                <div className="login-input-container">
                  <input
                    type="email"
                    id="inputEmailAddress"
                    className="login-form-input"
                    placeholder="name@example.com"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="login-form-group">
                <label className="login-form-label" htmlFor="inputPassword">
                  Password
                </label>
                <div className="login-input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="inputPassword"
                    className="login-form-input"
                    placeholder="••••••••••••"
                    autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="login-password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="login-form-options-row">
                {authMode === 'signup' ? (
                  <label className="login-custom-checkbox-label">
                    <input
                      type="checkbox"
                      required
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                    />
                    <span>I agree to terms &amp; policy</span>
                  </label>
                ) : (
                  <>
                    <label className="login-custom-checkbox-label">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span>Remember me</span>
                    </label>
                    <button
                      type="button"
                      className="login-forgot-pass-link"
                      onClick={() => triggerToast('Password reset link sent.')}
                    >
                      Forgot Password?
                    </button>
                  </>
                )}
              </div>

              <button type="submit" className="login-submit-btn" disabled={isSubmitting}>
                <span>
                  {isSubmitting
                    ? 'Authenticating...'
                    : authMode === 'signup'
                    ? 'Sign Up'
                    : 'Sign In'}
                </span>
              </button>
            </form>
          </div>

          <div className="login-auth-showcase-column">
            <h2 className="login-showcase-heading">
              Connect with a trusted agricultural network and unlock new opportunities across Sri Lanka.
            </h2>
            <div className="login-video-showcase-container">
              <video
                className="login-showcase-video"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </main>

      <div className={`login-toast-notice ${showToast ? 'show' : ''}`} role="alert">
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}