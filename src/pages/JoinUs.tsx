// import { useState, useRef, type FormEvent, type FC } from 'react';
// import '../JoinUs.css';

// import bgVideoUrl from '../assets/236017.mp4';
// import logoImgUrl from '../assets/logo.jpg';
// export type UserRole = 'farmer' | 'merchant' | 'consumer' | 'officer';
// export type AuthTab = 'signin' | 'register';

// export interface ToastState {
//   show: boolean;
//   message: string;
// }

// const SRI_LANKA_DISTRICTS = [
//   { value: 'colombo', label: 'Colombo' },
//   { value: 'gampaha', label: 'Gampaha' },
//   { value: 'kalutara', label: 'Kalutara' },
//   { value: 'kandy', label: 'Kandy' },
//   { value: 'matale', label: 'Matale' },
//   { value: 'nuwaraeliya', label: 'Nuwara Eliya' },
//   { value: 'galle', label: 'Galle' },
//   { value: 'matara', label: 'Matara' },
//   { value: 'hambantota', label: 'Hambantota' },
//   { value: 'jaffna', label: 'Jaffna' },
//   { value: 'kilinochchi', label: 'Kilinochchi' },
//   { value: 'mannar', label: 'Mannar' },
//   { value: 'vavuniya', label: 'Vavuniya' },
//   { value: 'mullaitivu', label: 'Mullaitivu' },
//   { value: 'batticaloa', label: 'Batticaloa' },
//   { value: 'ampara', label: 'Ampara' },
//   { value: 'trincomalee', label: 'Trincomalee' },
//   { value: 'kurunegala', label: 'Kurunegala' },
//   { value: 'puttalam', label: 'Puttalam' },
//   { value: 'anuradhapura', label: 'Anuradhapura' },
//   { value: 'polonnaruwa', label: 'Polonnaruwa' },
//   { value: 'badulla', label: 'Badulla' },
//   { value: 'monaragala', label: 'Monaragala' },
//   { value: 'ratnapura', label: 'Ratnapura' },
//   { value: 'kegalle', label: 'Kegalle' }
// ];

// export const AgriSmartAuthPortal: FC = () => {
  
//   const [activeTab, setActiveTab] = useState<AuthTab>('signin');
//   const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');

  
//   const [showSignInPassword, setShowSignInPassword] = useState<boolean>(false);
//   const [showRegPassword, setShowRegPassword] = useState<boolean>(false);

  
//   const [signInIdentifier, setSignInIdentifier] = useState<string>('');
//   const [signInPassword, setSignInPassword] = useState<string>('');
//   const [rememberMe, setRememberMe] = useState<boolean>(true);

  
//   const [regFullName, setRegFullName] = useState<string>('');
//   const [regPhone, setRegPhone] = useState<string>('');
//   const [regDistrict, setRegDistrict] = useState<string>('');
//   const [regPassword, setRegPassword] = useState<string>('');
//   const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

  
//   const [toast, setToast] = useState<ToastState>({ show: false, message: '' });
//   const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const showToast = (message: string) => {
//     if (toastTimeoutRef.current) {
//       clearTimeout(toastTimeoutRef.current);
//     }
//     setToast({ show: true, message });
//     toastTimeoutRef.current = setTimeout(() => {
//       setToast({ show: false, message: '' });
//     }, 3500);
//   };

//   const getRoleDisplayName = (role: UserRole): string => {
//     switch (role) {
//       case 'farmer':
//         return 'Farmer / Producer';
//       case 'merchant':
//         return 'Wholesaler / Buyer';
//       case 'consumer':
//         return 'Retailer / Consumer';
//       case 'officer':
//         return 'Agronomist / Expert';
//       default:
//         return 'Member';
//     }
//   };

//   const handleSignInSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     const roleLabel = getRoleDisplayName(selectedRole);
//     showToast(`Signing in as ${roleLabel}... Welcome to Agri SMART!`);
//     setTimeout(() => {
//       window.location.href = 'index.html';
//     }, 1200);
//   };

//   const handleRegisterSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     const roleLabel = getRoleDisplayName(selectedRole);
//     showToast(`Account registered successfully as ${roleLabel}! Redirecting...`);
//     setTimeout(() => {
//       window.location.href = 'index.html';
//     }, 1200);
//   };

//   return (
//     <div className="auth-portal-container">
      
      

      
//       <div className="bg-container">
        

//         <video
//           ref={(el) => {
//             if (el) {
//               el.muted = true; // Required by browsers to permit autoplay
//               el.play().catch(() => {});
//             }
//           }}
//           autoPlay
//           loop
//           muted
//           playsInline
//           preload="auto"
//           className="bg-video"
//           src={bgVideoUrl}
//         >
//           <source src={bgVideoUrl} type="video/mp4" />
//           <source src="/236017.mp4" type="video/mp4" />
//           <source src="/background.mp4" type="video/mp4" />
//         </video>

//         <div className="bg-overlay"></div>
//       </div>

//       <div className="grid-overlay"></div>

      
//       <nav className="auth-nav">
//         <a href="index.html" className="logo">
//           <img
//             src={logoImgUrl}
//             alt="Agri SMART Logo"
//             className="logo-img"
//             onError={(e) => {
//               (e.currentTarget as HTMLImageElement).src = '/logo.jpg';
//             }}
//           />
//           Agri <span>SMART</span>
//         </a>

//         <div className="nav-right">
//           <a href="http://localhost:5173/" className="nav-back-btn">
//             ← Back to Market Prices
//           </a>
//         </div>
//       </nav>

      
//       <main className="auth-main">
//         <div className="auth-card">
         
//           <div className="auth-header">
//             <div className="auth-badge">Official Member Gateway</div>
//             <h2>
//               Agri <span>SMART</span> Portal
//             </h2>
//             <p>
//               {activeTab === 'signin'
//                 ? 'Sign in to manage farm analytics and market intelligence.'
//                 : 'Join thousands of farmers, merchants, and buyers across Sri Lanka.'}
//             </p>
//           </div>

          
//           <div className="auth-tabs">
//             <button
//               type="button"
//               className={`auth-tab-btn ${activeTab === 'signin' ? 'active' : ''}`}
//               onClick={() => setActiveTab('signin')}
//             >
//               Sign In
//             </button>
//             <button
//               type="button"
//               className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
//               onClick={() => setActiveTab('register')}
//             >
//               Create Account
//             </button>
//           </div>

          
//           <div className="role-section">
//             <span className="role-label">Choose Your Profile Role</span>
//             <div className="role-grid">
//               <button
//                 type="button"
//                 className={`role-chip ${selectedRole === 'farmer' ? 'active' : ''}`}
//                 onClick={() => setSelectedRole('farmer')}
//               >
//                 <span>🚜</span> Farmer / Producer
//               </button>
//               <button
//                 type="button"
//                 className={`role-chip ${selectedRole === 'merchant' ? 'active' : ''}`}
//                 onClick={() => setSelectedRole('merchant')}
//               >
//                 <span>🏪</span> Wholesaler / Buyer
//               </button>
//               <button
//                 type="button"
//                 className={`role-chip ${selectedRole === 'consumer' ? 'active' : ''}`}
//                 onClick={() => setSelectedRole('consumer')}
//               >
//                 <span>🥗</span> Retailer / Consumer
//               </button>
//               <button
//                 type="button"
//                 className={`role-chip ${selectedRole === 'officer' ? 'active' : ''}`}
//                 onClick={() => setSelectedRole('officer')}
//               >
//                 <span>🔬</span> Agronomist / Expert
//               </button>
//             </div>
//           </div>

          
//           {activeTab === 'signin' && (
//             <form onSubmit={handleSignInSubmit}>
//               <div className="form-group">
//                 <label className="form-label" htmlFor="loginIdentifier">
//                   Mobile Number or Email
//                 </label>
//                 <div className="input-wrap">
//                   <span className="input-icon">📱</span>
//                   <input
//                     type="text"
//                     id="loginIdentifier"
//                     className="form-input"
//                     placeholder="e.g. 077 123 4567 / name@example.lk"
//                     value={signInIdentifier}
//                     onChange={(e) => setSignInIdentifier(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label className="form-label" htmlFor="loginPassword">
//                   Password
//                 </label>
//                 <div className="input-wrap">
//                   <span className="input-icon">🔒</span>
//                   <input
//                     type={showSignInPassword ? 'text' : 'password'}
//                     id="loginPassword"
//                     className="form-input"
//                     placeholder="Enter your secret password"
//                     value={signInPassword}
//                     onChange={(e) => setSignInPassword(e.target.value)}
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="toggle-pwd"
//                     onClick={() => setShowSignInPassword((prev) => !prev)}
//                     aria-label="Toggle password visibility"
//                   >
//                     {showSignInPassword ? '🙈' : '👁️'}
//                   </button>
//                 </div>
//               </div>

//               <div className="form-row">
//                 <label className="checkbox-wrap">
//                   <input
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                   />
//                   <span>Remember me</span>
//                 </label>
//                 <a
//                   href="#forgot"
//                   className="forgot-link"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     showToast('Password recovery instructions sent to registered contact.');
//                   }}
//                 >
//                   Forgot Password?
//                 </a>
//               </div>

//               <button type="submit" className="submit-btn">
//                 <span>Sign In to Agri SMART</span> →
//               </button>

//               <div className="divider">
//                 <span>Or continue with</span>
//               </div>

//               <div className="sso-buttons">
//                 <button
//                   type="button"
//                   className="sso-btn"
//                   onClick={() => showToast('Authenticating with Google Single Sign-On...')}
//                 >
//                   <span>🌐</span> Google
//                 </button>
//                 <button
//                   type="button"
//                   className="sso-btn"
//                   onClick={() => showToast('Authenticating with Apple ID...')}
//                 >
//                   <span>🍎</span> Apple
//                 </button>
//               </div>
//             </form>
//           )}

          
//           {activeTab === 'register' && (
//             <form onSubmit={handleRegisterSubmit}>
//               <div className="form-group">
//                 <label className="form-label" htmlFor="regFullName">
//                   Full Name
//                 </label>
//                 <div className="input-wrap">
//                   <span className="input-icon">👤</span>
//                   <input
//                     type="text"
//                     id="regFullName"
//                     className="form-input"
//                     placeholder="e.g. Kasun Perera"
//                     value={regFullName}
//                     onChange={(e) => setRegFullName(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label className="form-label" htmlFor="regPhone">
//                   Mobile Phone Number
//                 </label>
//                 <div className="input-wrap">
//                   <span className="input-icon">📞</span>
//                   <input
//                     type="tel"
//                     id="regPhone"
//                     className="form-input"
//                     placeholder="e.g. 077 234 5678"
//                     value={regPhone}
//                     onChange={(e) => setRegPhone(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label className="form-label" htmlFor="regDistrict">
//                   Primary District
//                 </label>
//                 <div className="input-wrap">
//                   <span className="input-icon">📍</span>
//                   <select
//                     id="regDistrict"
//                     className="form-select"
//                     value={regDistrict}
//                     onChange={(e) => setRegDistrict(e.target.value)}
//                     required
//                   >
//                     <option value="" disabled>
//                       Select your district
//                     </option>
//                     {SRI_LANKA_DISTRICTS.map((district) => (
//                       <option key={district.value} value={district.value}>
//                         {district.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label className="form-label" htmlFor="regPassword">
//                   Create Password
//                 </label>
//                 <div className="input-wrap">
//                   <span className="input-icon">🔒</span>
//                   <input
//                     type={showRegPassword ? 'text' : 'password'}
//                     id="regPassword"
//                     className="form-input"
//                     placeholder="Minimum 6 characters"
//                     value={regPassword}
//                     onChange={(e) => setRegPassword(e.target.value)}
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="toggle-pwd"
//                     onClick={() => setShowRegPassword((prev) => !prev)}
//                     aria-label="Toggle password visibility"
//                   >
//                     {showRegPassword ? '🙈' : '👁️'}
//                   </button>
//                 </div>
//               </div>

//               <div className="form-row">
//                 <label className="checkbox-wrap">
//                   <input
//                     type="checkbox"
//                     checked={agreeTerms}
//                     onChange={(e) => setAgreeTerms(e.target.checked)}
//                     required
//                   />
//                   <span>I agree to Agri SMART Terms & Privacy Policy</span>
//                 </label>
//               </div>

//               <button type="submit" className="submit-btn">
//                 <span>Create Agri SMART Account</span> →
//               </button>
//             </form>
//           )}
//         </div>
//       </main>

      
//       <div className={`toast-msg ${toast.show ? 'show' : ''}`} role="alert">
//         <span>{toast.message}</span>
//       </div>
//     </div>
//   );
// };

// export default AgriSmartAuthPortal;