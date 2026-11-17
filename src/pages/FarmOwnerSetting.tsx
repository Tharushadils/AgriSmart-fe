import React, { useState, useEffect, useMemo, type FC } from 'react';
import {
  User,
  Lock,
  Save,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Sun,
  Moon,
  Mail,
  Phone,
  ShieldCheck,
  ArrowLeft,
  KeyRound,
  Check,
  X
} from 'lucide-react';
import api from '../service/api';
import logoImg from '../assets/logo.jpg';
import UserProfileMenu from '../components/UserProfileMenu';
import '../UserSetting.css';



type NavIconProps = React.SVGProps<SVGSVGElement> & { size?: number | string };

const NavBaseIcon: FC<NavIconProps & { children: React.ReactNode }> = ({
  children,
  size = 14,
  className = '',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block shrink-0 align-middle ${className}`}
    {...props}
  >
    {children}
  </svg>
);


const PreOrderSlipIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <path d="M16.5 9.4 7.55 4.24" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.29 7 12 12 20.71 7" />
    <line x1="12" y1="22" x2="12" y2="12" />
  </NavBaseIcon>
);

const StoreBranchIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
  </NavBaseIcon>
);

const FinalOrderBoxIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path d="M7 7h.01" />
  </NavBaseIcon>
);

const OrderHistoryIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </NavBaseIcon>
);

const SettingsGearIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </NavBaseIcon>
);


/* Farmer & Manager Navigation Icons */
const SeedlingHarvestIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
    <path d="M12 20V10" />
    <path d="M12 14c-3-3-3-7 0-9" />
    <path d="M12 14c-1-4-5-4-7-2 1 4 4 6 7 2z" />
  </NavBaseIcon>
);

const PriceTagTrendIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path d="M7 7h.01" />
  </NavBaseIcon>
);

const MapPinIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </NavBaseIcon>
);

const OrderChecklistIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="m9 14 2 2 4-4" />
  </NavBaseIcon>
);

const WarehouseIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z" />
    <path d="M6 18h12" />
    <path d="M6 14h12" />
    <rect width="12" height="12" x="6" y="10" />
  </NavBaseIcon>
);

const PrecisionGearsIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </NavBaseIcon>
);

const SeedlingAllocationIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
    <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
  </NavBaseIcon>
);

const FarmerPromiseIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
    <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
    <path d="m2 16 6 6" />
    <circle cx="16" cy="9" r="2.9" />
    <circle cx="6" cy="5" r="3" />
  </NavBaseIcon>
);

const HarvestTransferIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <path d="M8 3 4 7l4 4" />
    <path d="M4 7h16" />
    <path d="m16 21 4-4-4-4" />
    <path d="M20 17H4" />
  </NavBaseIcon>
);

const FarmBarnIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <path d="M3 10.5 12 4l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5Z" />
    <path d="M9 21v-7h6v7" />
    <path d="m9 14 6 7" />
    <path d="m15 14-6 7" />
  </NavBaseIcon>
);

const UsersGroupIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </NavBaseIcon>
);

const CargoTruckIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </NavBaseIcon>
);

export const HarvestHistoryIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </NavBaseIcon>
);


interface UserProfileData {
  _id?: string;
  name: string;
  email: string;
  telephoneNumber: string;
  role: string;
}

export const UserSettings: FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('agrismart_theme') || localStorage.getItem('ranpolowa_theme_preference');
      if (saved) return saved === 'dark';
      return document.documentElement.classList.contains('dark-theme') || document.body.classList.contains('dark-theme');
    }
    return false;
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isDark) {
        document.documentElement.classList.add('dark-theme');
        document.body.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
        document.body.classList.remove('dark-theme');
      }
      localStorage.setItem('agrismart_theme', isDark ? 'dark' : 'light');
      localStorage.setItem('ranpolowa_theme_preference', isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  // Personal Details State (matching UserModel: name, email, telephoneNumber, role)
  const [profile, setProfile] = useState<UserProfileData>({
    name: '',
    email: '',
    telephoneNumber: '',
    role: 'USER'
  });
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(false);
  const [isSavingProfile, setIsSavingProfile] = useState<boolean>(false);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showCurrentPw, setShowCurrentPw] = useState<boolean>(false);
  const [showNewPw, setShowNewPw] = useState<boolean>(false);
  const [showConfirmPw, setShowConfirmPw] = useState<boolean>(false);
  const [isChangingPw, setIsChangingPw] = useState<boolean>(false);

  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Load Current User Data from /api/auth/me 
  useEffect(() => {
    const loadUser = async () => {
      setIsLoadingProfile(true);
      try {
        const stored = localStorage.getItem('user');
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setProfile({
              _id: parsed._id || parsed.id,
              name: parsed.name || parsed.fullName || '',
              email: parsed.email || '',
              telephoneNumber: parsed.telephoneNumber || parsed.phone || '',
              role: parsed.role || 'USER'
            });
          } catch {
            // ignore JSON error
          }
        }

        const res = await api.get('/auth/me');
        const u = res.data?.data || res.data;
        if (u) {
          setProfile({
            _id: u._id,
            name: u.name || u.fullName || '',
            email: u.email || '',
            telephoneNumber: u.telephoneNumber || u.phone || '',
            role: u.role || 'USER'
          });
        }
      } catch {
        // Keep localStorage values if request fails
      } finally {
        setIsLoadingProfile(false);
      }
    };

    loadUser();
  }, []);

  const getDashboardPath = (role: string): string => {
    const r = String(role || '').toUpperCase();
    if (r === 'MANAGER' || r === 'OWNER' || r === 'ADMIN') return '/managerdashboard';
    if (r === 'FARM' || r === 'FARMER') return '/farmdashboard';
    if (r === 'STORE' || r === 'STORE OWNER') return '/storedashboard';
    return '/user';
  };

  // Handle Personal Details Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name.trim()) {
      showToast('Full name is required.', 'error');
      return;
    }
    if (!profile.email.trim()) {
      showToast('Email address is required.', 'error');
      return;
    }
    if (!profile.telephoneNumber.trim()) {
      showToast('Telephone number is required.', 'error');
      return;
    }

    setIsSavingProfile(true);
    try {
      const payload = {
        name: profile.name.trim(),
        email: profile.email.trim().toLowerCase(),
        telephoneNumber: profile.telephoneNumber.trim()
      };

      const res = await api.patch('/auth/profile', payload);
      const updated = res.data?.data;

      // Sync updated user info in localStorage
      const stored = localStorage.getItem('user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          localStorage.setItem(
            'user',
            JSON.stringify({
              ...parsed,
              ...(updated || payload)
            })
          );
        } catch {
          // ignore error
        }
      }

      showToast('Personal details updated successfully!');
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to update personal details.', 'error');
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Handle Password Change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast('Please fill in all password fields.', 'error');
      return;
    }
    if (newPassword.trim().length < 6) {
      showToast('New password must be at least 6 characters long.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New password and confirmation do not match.', 'error');
      return;
    }
    if (currentPassword === newPassword) {
      showToast('New password must be different from current password.', 'error');
      return;
    }

    setIsChangingPw(true);
    try {
      await api.patch('/auth/change-password', {
        currentPassword,
        newPassword
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('Password changed successfully!');
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to change password.', 'error');
    } finally {
      setIsChangingPw(false);
    }
  };

  // Password validation checks for visual indicator
  const isLenValid = useMemo(() => newPassword.trim().length >= 6, [newPassword]);
  const isMatchValid = useMemo(
    () => Boolean(newPassword && confirmPassword && newPassword === confirmPassword),
    [newPassword, confirmPassword]
  );
  const isDiffFromCurrent = useMemo(
    () => Boolean(newPassword && currentPassword && newPassword !== currentPassword),
    [newPassword, currentPassword]
  );

  return (
    <div className={`user-settings-root ${isDark ? 'dark-theme' : ''}`}>
    
      <header className="header-wrapper">
        <div className="header-bg-svg-wrap">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="wrinkleShadowSettings" x="-5%" y="-10%" width="110%" height="150%">
                <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#143412" floodOpacity="0.22" />
              </filter>
            </defs>
            <path
              d="M 0,0 L 1440,0 L 1440,82.0 L 1435,84.9 L 1430,89.0 L 1425,85.1 L 1420,81.9 L 1415,88.5 L 1410,84.7 L 1405,80.7 L 1400,86.9 L 1395,85.2 L 1390,80.9 L 1385,75.7 L 1380,69.1 L 1375,75.8 L 1370,79.7 L 1365,75.2 L 1360,81.2 L 1355,83.9 L 1350,79.3 L 1345,78.9 L 1340,76.4 L 1335,81.0 L 1330,87.4 L 1325,79.1 L 1320,76.4 L 1315,79.9 L 1310,75.6 L 1305,77.0 L 1300,81.3 L 1295,86.1 L 1290,95.7 L 1285,92.6 L 1280,87.8 L 1275,96.0 L 1270,97.6 L 1265,97.0 L 1260,100.9 L 1255,99.7 L 1250,101.7 L 1245,98.9 L 1240,90.4 L 1235,98.0 L 1230,106.1 L 1225,104.5 L 1220,108.0 L 1215,108.4 L 1210,107.9 L 1205,109.7 L 1200,103.3 L 1195,105.6 L 1190,113.5 L 1185,106.1 L 1180,99.9 L 1175,98.4 L 1170,95.1 L 1165,98.3 L 1160,97.5 L 1155,97.3 L 1150,106.8 L 1145,103.9 L 1140,95.7 L 1135,98.3 L 1130,98.9 L 1125,100.8 L 1120,101.1 L 1115,94.1 L 1110,96.2 L 1105,95.4 L 1100,85.5 L 1095,89.1 L 1090,96.3 L 1085,98.5 L 1080,101.6 L 1075,97.1 L 1070,97.1 L 1065,102.8 L 1060,96.7 L 1055,96.2 L 1050,103.0 L 1045,99.4 L 1040,95.1 L 1035,89.5 L 1030,85.4 L 1025,93.1 L 1020,93.2 L 1015,89.8 L 1010,97.1 L 1005,96.5 L 1000,90.7 L 995,89.4 L 990,86.6 L 985,91.6 L 980,93.0 L 975,82.1 L 970,81.0 L 965,81.4 L 960,74.2 L 955,75.2 L 950,78.0 L 945,82.3 L 940,88.2 L 935,80.8 L 930,78.1 L 925,85.4 L 920,83.1 L 915,82.5 L 910,85.7 L 905,84.1 L 900,85.2 L 895,79.5 L 890,73.7 L 885,84.2 L 880,89.4 L 875,88.0 L 870,93.3 L 865,93.7 L 860,94.4 L 855,95.1 L 850,90.0 L 845,96.6 L 840,102.5 L 835,93.6 L 830,90.3 L 825,89.5 L 820,87.1 L 815,90.4 L 810,88.9 L 805,91.7 L 800,100.2 L 795,93.4 L 790,87.0 L 785,90.6 L 780,89.7 L 775,90.8 L 770,88.6 L 765,82.3 L 760,84.8 L 755,79.5 L 750,70.0 L 745,76.0 L 740,81.1 L 735,82.0 L 730,83.5 L 725,78.6 L 720,80.7 L 715,83.7 L 710,76.4 L 705,79.5 L 700,85.6 L 695,80.4 L 690,76.7 L 685,71.7 L 680,71.1 L 675,79.3 L 670,77.5 L 665,77.8 L 660,86.9 L 655,84.2 L 650,79.7 L 645,79.9 L 640,79.3 L 635,85.5 L 630,84.0 L 625,74.4 L 620,76.6 L 615,74.6 L 610,67.4 L 605,70.2 L 600,73.1 L 595,77.9 L 590,80.7 L 585,71.7 L 580,72.1 L 575,77.5 L 570,72.4 L 565,72.9 L 560,75.2 L 555,72.8 L 550,72.3 L 545,64.4 L 540,61.8 L 535,73.1 L 530,74.7 L 525,74.5 L 520,80.8 L 515,80.8 L 510,82.1 L 505,81.9 L 500,79.6 L 495,89.7 L 490,93.0 L 485,84.8 L 480,85.6 L 475,85.9 L 470,85.6 L 465,90.3 L 460,90.7 L 455,98.2 L 450,106.0 L 445,98.2 L 440,96.7 L 435,102.3 L 430,101.9 L 425,104.1 L 420,101.9 L 415,98.6 L 410,101.6 L 405,93.7 L 400,87.5 L 395,96.2 L 390,99.4 L 385,100.0 L 380,100.5 L 375,96.3 L 370,99.6 L 365,99.1 L 360,91.9 L 355,97.9 L 350,101.2 L 345,94.1 L 340,90.6 L 335,85.9 L 330,87.4 L 325,93.9 L 320,90.6 L 315,94.5 L 310,102.8 L 305,97.7 L 300,94.9 L 295,96.2 L 290,97.4 L 285,103.8 L 280,99.8 L 275,93.3 L 270,97.7 L 265,93.4 L 260,88.0 L 255,93.1 L 250,96.5 L 245,101.8 L 240,101.9 L 235,93.5 L 230,97.2 L 225,99.8 L 220,93.2 L 215,95.3 L 210,96.3 L 205,92.6 L 200,89.6 L 195,79.9 L 190,80.1 L 185,89.2 L 180,86.3 L 175,86.5 L 170,91.4 L 165,88.7 L 160,88.2 L 155,85.3 L 150,84.1 L 145,93.6 L 140,91.4 L 135,82.8 L 130,84.8 L 125,83.3 L 120,82.7 L 115,86.5 L 110,87.6 L 105,97.0 L 100,101.2 L 95,92.6 L 90,95.0 L 85,100.3 L 80,99.5 L 75,102.3 L 70,100.3 L 65,99.6 L 60,101.7 L 55,92.2 L 50,90.5 L 45,100.6 L 40,102.0 L 35,102.9 L 30,103.1 L 25,100.0 L 20,103.5 L 15,99.7 L 10,94.1 L 5,101.8 L 0,101.0 Z"
              fill="var(--header-bg)"
              filter="url(#wrinkleShadowSettings)"
            />
          </svg>
        </div>

        <div className="top-nav">
          <a href="/" className="brand-logo" title="රන් පොළොව Home">
            <img
              src={logoImg}
              alt=" Logo"
              className="brand-logo-img"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/logo.png';
              }}
            />
            <span className="logo-text">
              රන් <span>පොළොව</span>
            </span>
            <span className="module-tag">Account Settings</span>
          </a>

          <div className="nav-right-actions">
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={() => setIsDark(!isDark)}
              title="Toggle Dark / Light Theme"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <UserProfileMenu />

          
          </div>
        </div>
      </header>

     
      <section className="page-hero-banner">
        <div className="hero-doodle-bg" />
        <div className="hero-content-inner">
          

          <div className="hero-header-row">
            <div>
              <h1 className="hero-page-title">
                <ShieldCheck size={30} style={{ color: '#22c55e' }} />
                <span>Account Profile &amp; Security</span>
              </h1>
              <p className="hero-page-desc">
                Administer your certified stakeholder contact channels, telephone hotline credentials, and manage multi-tier cryptographic password authentication.
              </p>
            </div>
          
          </div>
        </div>
      </section>

   
      <main className="settings-main-container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Stakeholder Name</span>
              <div className="stat-icon-wrap">
                <User size={18} style={{ color: '#16a34a' }} />
              </div>
            </div>
            <div className="stat-value green-val">{profile.name || 'Anonymous User'}</div>
            <div className="stat-subtext">Role: {profile.role}</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Registered Email</span>
              <div className="stat-icon-wrap">
                <Mail size={18} style={{ color: '#0284c7' }} />
              </div>
            </div>
            <div className="stat-value cyan-val">{profile.email || 'Not Configured'}</div>
            <div className="stat-subtext">Verified communications</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Hotline Contact</span>
              <div className="stat-icon-wrap">
                <Phone size={18} style={{ color: '#d97706' }} />
              </div>
            </div>
            <div className="stat-value amber-val">{profile.telephoneNumber || 'Not Linked'}</div>
            <div className="stat-subtext">SMS alerts &amp; dispatch hotline</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Security Protocol</span>
              <div className="stat-icon-wrap">
                <Lock size={18} style={{ color: '#0f172a' }} />
              </div>
            </div>
            <div className="stat-value slate-val">Protected</div>
            <div className="stat-subtext">Encrypted authentication</div>
          </div>
        </div>

   
        <div className="settings-grid-layout">
          {/*  Personal Details Form */}
          <div className="settings-card">
            <div className="settings-card-header">
              <div className="settings-icon-badge green">
                <User size={22} />
              </div>
              <div>
                <h2 className="settings-card-title">Personal Details</h2>
                <p className="settings-card-subtitle">
                  Update your official stakeholder identity and emergency communication line.
                </p>
              </div>
            </div>

            {isLoadingProfile ? (
              <div style={{ padding: '40px 0', textAlign: 'center', opacity: 0.7 }}>
                <div className="btn-spinner" style={{ margin: '0 auto 12px', borderColor: '#16a34a', borderTopColor: 'transparent' }} />
                <span>Loading personal records...</span>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="form-fields-stack">
                {/* Full Name */}
                <div className="settings-field-group">
                  <label className="settings-label">
                    <span className="settings-label-left">
                      <span>Full Name</span>
                      <span className="settings-req-star">*</span>
                    </span>
                  </label>
                  <div className="settings-input-wrap">
                    <span className="settings-input-prefix-icon">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      required
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      placeholder="e.g. Kasun Bandara"
                      className="settings-text-input"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="settings-field-group">
                  <label className="settings-label">
                    <span className="settings-label-left">
                      <span>Email Address</span>
                      <span className="settings-req-star">*</span>
                    </span>
                  </label>
                  <div className="settings-input-wrap">
                    <span className="settings-input-prefix-icon">
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      required
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      placeholder="e.g. kasun@ranpolowa.lk"
                      className="settings-text-input"
                    />
                  </div>
                </div>

                {/* Telephone Number */}
                <div className="settings-field-group">
                  <label className="settings-label">
                    <span className="settings-label-left">
                      <span>Telephone Number</span>
                      <span className="settings-req-star">*</span>
                    </span>
                  </label>
                  <div className="settings-input-wrap">
                    <span className="settings-input-prefix-icon">
                      <Phone size={16} />
                    </span>
                    <input
                      type="tel"
                      required
                      value={profile.telephoneNumber}
                      onChange={(e) => setProfile({ ...profile, telephoneNumber: e.target.value })}
                      placeholder="e.g. 0771234567"
                      className="settings-text-input"
                    />
                  </div>
                </div>

                {/* Role  */}
                <div className="settings-field-group">
                  <label className="settings-label">
                    <span className="settings-label-left">
                      <span>Ecosystem Stakeholder Role</span>
                    </span>
                    <span className="settings-badge-readonly">System Assigned</span>
                  </label>
                  <div className="settings-input-wrap">
                    <span className="settings-input-prefix-icon">
                      <ShieldCheck size={16} />
                    </span>
                    <input
                      type="text"
                      readOnly
                      disabled
                      value={profile.role}
                      className="settings-text-input readonly"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="btn-submit-action green-btn"
                >
                  {isSavingProfile ? (
                    <>
                      <span className="btn-spinner" />
                      <span>Saving Records...</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>Save Personal Details</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Change Password Form */}
          <div className="settings-card">
            <div className="settings-card-header">
              <div className="settings-icon-badge cyan">
                <KeyRound size={22} />
              </div>
              <div>
                <h2 className="settings-card-title">Change Password</h2>
                <p className="settings-card-subtitle">
                  Enforce strong cryptographic security across all your active device sessions.
                </p>
              </div>
            </div>

            <form onSubmit={handleChangePassword} className="form-fields-stack">
              {/* Current Password */}
              <div className="settings-field-group">
                <label className="settings-label">
                  <span className="settings-label-left">
                    <span>Current Password</span>
                    <span className="settings-req-star">*</span>
                  </span>
                </label>
                <div className="settings-input-wrap">
                  <span className="settings-input-prefix-icon">
                    <Lock size={16} />
                  </span>
                  <input
                    type={showCurrentPw ? 'text' : 'password'}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter existing password"
                    className="settings-text-input has-toggle"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    className="settings-pw-toggle-btn"
                    title={showCurrentPw ? 'Hide password' : 'Show password'}
                    aria-label="Toggle current password visibility"
                  >
                    {showCurrentPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="settings-field-group">
                <label className="settings-label">
                  <span className="settings-label-left">
                    <span>New Password</span>
                    <span className="settings-req-star">*</span>
                  </span>
                </label>
                <div className="settings-input-wrap">
                  <span className="settings-input-prefix-icon">
                    <Lock size={16} />
                  </span>
                  <input
                    type={showNewPw ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="settings-text-input has-toggle"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw(!showNewPw)}
                    className="settings-pw-toggle-btn"
                    title={showNewPw ? 'Hide password' : 'Show password'}
                    aria-label="Toggle new password visibility"
                  >
                    {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="settings-field-group">
                <label className="settings-label">
                  <span className="settings-label-left">
                    <span>Confirm New Password</span>
                    <span className="settings-req-star">*</span>
                  </span>
                </label>
                <div className="settings-input-wrap">
                  <span className="settings-input-prefix-icon">
                    <Lock size={16} />
                  </span>
                  <input
                    type={showConfirmPw ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="settings-text-input has-toggle"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPw(!showConfirmPw)}
                    className="settings-pw-toggle-btn"
                    title={showConfirmPw ? 'Hide password' : 'Show password'}
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Password Quality Checklist */}
              <div className="pw-rules-box">
                <span className="pw-rule-title">Password Verification</span>
                <div className={`pw-rule-item ${isLenValid ? 'valid' : ''}`}>
                  {isLenValid ? <Check size={14} /> : <X size={14} />}
                  <span>Minimum 6 characters in length</span>
                </div>
                <div className={`pw-rule-item ${isMatchValid ? 'valid' : ''}`}>
                  {isMatchValid ? <Check size={14} /> : <X size={14} />}
                  <span>New password and confirmation match</span>
                </div>
                <div className={`pw-rule-item ${isDiffFromCurrent ? 'valid' : ''}`}>
                  {isDiffFromCurrent ? <Check size={14} /> : <X size={14} />}
                  <span>Different from current password</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isChangingPw}
                className="btn-submit-action cyan-btn"
              >
                {isChangingPw ? (
                  <>
                    <span className="btn-spinner" />
                    <span>Updating Security Token...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={16} />
                    <span>Update Password</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>


            <div className="rp-floating-dock" role="navigation" aria-label="Store Quick Navigation">
              <div className="rp-floating-pill">
                {[
                  { href: '/farmer-harvest', label: 'Add Today Harvest', icon: <SeedlingHarvestIcon size={14} /> },
                  { href: '/harvest-history', label: 'Harvest History', icon: <HarvestHistoryIcon size={14} /> },
                  { href: '/price-confirm', label: 'Check Prices & Confirm', icon: <PriceTagTrendIcon size={14} /> },
                  { href: '/farms', label: 'Farm Location', icon: <MapPinIcon size={14} /> },
                  { href: '/farm-owner-setting', label: 'Settings', icon: <SettingsGearIcon size={14} /> },
                ].map((item) => {
                  const isActive =
                    typeof window !== 'undefined' && window.location.pathname === item.href;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`rp-floating-item ${isActive ? 'active' : ''}`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

  
      {toast && (
        <div className={`settings-toast ${toast.type}`}>
          {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          <span>{toast.msg}</span>
        </div>
      )}

    
      <footer className="app-site-footer">
        <div className="footer-inner-content">
          <div className="footer-logo-block">
            <a href="/" className="footer-brand-anchor">
              <img
                src={logoImg}
                alt=" Logo"
                className="footer-logo-img"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/logo.png';
                }}
              />
              <span className="footer-logo-text">
                රන්&nbsp;පොළොව
              </span>
            </a>
            <p className="footer-tagline">
              Agricultural Intelligence, Governance &amp; Procurement Ecosystem Sri Lanka.
            </p>
          </div>

          <div className="footer-links-group">
            <a href="/district-price" className="footer-link-item">Market Prices</a>
            <a href="/manager-harvest-view" className="footer-link-item">Harvest Intake</a>
            <a href="/manager-store-orders" className="footer-link-item">Store Orders</a>
            <a href="/user" className="footer-link-item">Stakeholder Ops</a>
            <a href="/allocation" className="footer-link-item">Resource Allocation</a>
            <a href="/buy" className="footer-link-item">Procurement Desk</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} රන් පොළොව Ecosystem Sri Lanka. All Rights Reserved.</span>
          <span>Role-Based Secure Identity &amp; Access Governance</span>
        </div>
      </footer>
    </div>
  );
};

export default UserSettings;
