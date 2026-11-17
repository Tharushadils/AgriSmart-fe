import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  type FC,
  type SVGProps
} from 'react';
import api from '../service/api';
import '../FarmHarvestHistory.css';


export type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

export const BaseIcon: FC<IconProps & { children: React.ReactNode }> = ({
  children,
  size = 18,
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

export const SproutIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
    <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4.1 1-4.9 2z" />
  </BaseIcon>
);

export const SunIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </BaseIcon>
);

export const MoonIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </BaseIcon>
);

export const SearchIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </BaseIcon>
);

export const RefreshIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 21h5v-5" />
  </BaseIcon>
);

export const PackageIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </BaseIcon>
);

export const ScaleIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </BaseIcon>
);

export const WalletIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
  </BaseIcon>
);

export const CheckCircle2Icon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </BaseIcon>
);

export const ClockIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </BaseIcon>
);

export const CalendarIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </BaseIcon>
);

export const ChevronDownIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <polyline points="6 9 12 15 18 9" />
  </BaseIcon>
);

export const XIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </BaseIcon>
);

export const HistoryIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l4 2" />
  </BaseIcon>
);

export const PlusCircleIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8" />
    <path d="M12 8v8" />
  </BaseIcon>
);

export const AlertCircleIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </BaseIcon>
);

export const SeedlingHarvestIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
    <path d="M12 20V10" />
    <path d="M12 14c-3-3-3-7 0-9" />
    <path d="M12 14c-1-4-5-4-7-2 1 4 4 6 7 2z" />
  </BaseIcon>
);

export const HarvestHistoryIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </BaseIcon>
);

export const PriceTagTrendIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path d="M7 7h.01" />
  </BaseIcon>
);

export const MapPinIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </BaseIcon>
);

export const SettingsGearIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </BaseIcon>
);


export interface FarmerHarvestRecord {
  _id: string;
  harvestId: string;
  date: string;
  qty: number;
  bookedQty?: number;
  actualQtyPickedUp?: number;
  buyingPrice?: number;
  unitBuyingPrice?: number;
  totalPaid?: number;
  status: string;
  createdAt?: string;
  confirmedAt?: string;
  bookedAt?: string;
  productId?: {
    _id: string;
    name?: string;
    category?: string;
    unit?: string;
  } | null;
}


export const FarmerHarvestHistory: FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ranpolowa_theme_preference');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isDark) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
      localStorage.setItem('ranpolowa_theme_preference', isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  // User Profile State
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const [profileName, setProfileName] = useState<string>('Farmer Operator');

  useEffect(() => {
    const userRaw = localStorage.getItem('user');
    if (userRaw) {
      try {
        const u = JSON.parse(userRaw);
        setProfileName(u.fullName || u.name || 'Farmer Operator');
      } catch {
        // ignore parse error
      }
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Harvest History State
  const [records, setRecords] = useState<FarmerHarvestRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Filters State
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch Farmer's Harvest History from Backend
  const fetchHarvestHistory = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const userRaw = localStorage.getItem('user');
      const user = userRaw ? JSON.parse(userRaw) : null;
      const resolvedUserId =
        user?._id || user?.userId || user?.id || localStorage.getItem('farmId');

      if (!resolvedUserId) {
        setErrorMsg('User session not found. Please log in again.');
        setIsLoading(false);
        return;
      }

      let rawList: FarmerHarvestRecord[] = [];
      try {
        const res = await api.get(`/harvests/farm/${resolvedUserId}`);
        rawList = Array.isArray(res.data) ? res.data : res.data?.data || res.data?.harvests || [];
      } catch {
        // Fallback if endpoint returns all harvests
        const fallbackRes = await api.get('/harvests');
        const allList: any[] = Array.isArray(fallbackRes.data)
          ? fallbackRes.data
          : fallbackRes.data?.data || [];
        rawList = allList.filter(
          (h) => String(h.farmId?._id || h.farmId) === String(resolvedUserId)
        );
      }

      // Sort newest delivery date / submission first
      const sorted = [...rawList].sort(
        (a, b) =>
          new Date(b.date || b.createdAt || 0).getTime() -
          new Date(a.date || a.createdAt || 0).getTime()
      );

      setRecords(sorted);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Failed to load your harvest history.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHarvestHistory();
  }, []);

  // Format Date Helper (Sri Lanka Local Date)
  const formatSLDate = (iso?: string) => {
    if (!iso) return '—';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return String(iso).split('T')[0];
    return new Date(d.getTime() + 5.5 * 60 * 60 * 1000).toISOString().split('T')[0];
  };

  // Filtered Records
  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      if (statusFilter !== 'ALL' && (rec.status || '').toUpperCase() !== statusFilter) {
        return false;
      }

      if (dateFilter && formatSLDate(rec.date) !== dateFilter) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const code = (rec.harvestId || '').toLowerCase();
        const crop = (rec.productId?.name || '').toLowerCase();
        const status = (rec.status || '').toLowerCase();
        const dateStr = formatSLDate(rec.date).toLowerCase();

        if (!code.includes(q) && !crop.includes(q) && !status.includes(q) && !dateStr.includes(q)) {
          return false;
        }
      }

      return true;
    });
  }, [records, statusFilter, dateFilter, searchQuery]);

  
  const kpiStats = useMemo(() => {
    const totalLots = filteredRecords.length;
    const totalOfferedKg = filteredRecords.reduce((sum, r) => sum + (Number(r.qty) || 0), 0);
    const totalPickedUpKg = filteredRecords.reduce(
      (sum, r) => sum + (Number(r.actualQtyPickedUp) || 0),
      0
    );
    const totalEarnedLkr = filteredRecords.reduce((sum, r) => {
      const paid = Number(r.totalPaid || 0);
      if (paid > 0) return sum + paid;
      const picked = Number(r.actualQtyPickedUp || 0);
      const price = Number(r.buyingPrice ?? r.unitBuyingPrice ?? 0);
      return sum + picked * price;
    }, 0);

    return {
      totalLots,
      totalOfferedKg,
      totalPickedUpKg,
      totalEarnedLkr
    };
  }, [filteredRecords]);

  // Status Badge Helper
  const getStatusBadgeClass = (status: string) => {
    const s = (status || '').toUpperCase();
    if (s === 'PURCHASED' || s === 'PARTIALLY_PURCHASED') return 'status-purchased';
    if (s === 'BOOKED') return 'status-booked';
    if (s === 'CONFIRMED') return 'status-confirmed';
    if (s === 'CANCELLED' || s === 'REJECTED') return 'status-cancelled';
    return 'status-submitted';
  };

  return (
    <div className={`farmer-history-root ${isDark ? 'dark-theme' : ''}`}>
      <header className="header-wrapper">
        <div className="header-bg-svg-wrap">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="wrinkleShadowHistory" x="-5%" y="-10%" width="110%" height="150%">
                <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#143412" floodOpacity="0.22" />
              </filter>
            </defs>
            <path
              d="M 0,0 L 1440,0 L 1440,82.0 L 1435,84.9 L 1430,89.0 L 1425,85.1 L 1420,81.9 L 1415,88.5 L 1410,84.7 L 1405,80.7 L 1400,86.9 L 1395,85.2 L 1390,80.9 L 1385,75.7 L 1380,69.1 L 1375,75.8 L 1370,79.7 L 1365,75.2 L 1360,81.2 L 1355,83.9 L 1350,79.3 L 1345,78.9 L 1340,76.4 L 1335,81.0 L 1330,87.4 L 1325,79.1 L 1320,76.4 L 1315,79.9 L 1310,75.6 L 1305,77.0 L 1300,81.3 L 1295,86.1 L 1290,95.7 L 1285,92.6 L 1280,87.8 L 1275,96.0 L 1270,97.6 L 1265,97.0 L 1260,100.9 L 1255,99.7 L 1250,101.7 L 1245,98.9 L 1240,90.4 L 1235,98.0 L 1230,106.1 L 1225,104.5 L 1220,108.0 L 1215,108.4 L 1210,107.9 L 1205,109.7 L 1200,103.3 L 1195,105.6 L 1190,113.5 L 1185,106.1 L 1180,99.9 L 1175,98.4 L 1170,95.1 L 1165,98.3 L 1160,97.5 L 1155,97.3 L 1150,106.8 L 1145,103.9 L 1140,95.7 L 1135,98.3 L 1130,98.9 L 1125,100.8 L 1120,101.1 L 1115,94.1 L 1110,96.2 L 1105,95.4 L 1100,85.5 L 1095,89.1 L 1090,96.3 L 1085,98.5 L 1080,101.6 L 1075,97.1 L 1070,97.1 L 1065,102.8 L 1060,96.7 L 1055,96.2 L 1050,103.0 L 1045,99.4 L 1040,95.1 L 1035,89.5 L 1030,85.4 L 1025,93.1 L 1020,93.2 L 1015,89.8 L 1010,97.1 L 1005,96.5 L 1000,90.7 L 995,89.4 L 990,86.6 L 985,91.6 L 980,93.0 L 975,82.1 L 970,81.0 L 965,81.4 L 960,74.2 L 955,75.2 L 950,78.0 L 945,82.3 L 940,88.2 L 935,80.8 L 930,78.1 L 925,85.4 L 920,83.1 L 915,82.5 L 910,85.7 L 905,84.1 L 900,85.2 L 895,79.5 L 890,73.7 L 885,84.2 L 880,89.4 L 875,88.0 L 870,93.3 L 865,93.7 L 860,94.4 L 855,95.1 L 850,90.0 L 845,96.6 L 840,102.5 L 835,93.6 L 830,90.3 L 825,89.5 L 820,87.1 L 815,90.4 L 810,88.9 L 805,91.7 L 800,100.2 L 795,93.4 L 790,87.0 L 785,90.6 L 780,89.7 L 775,90.8 L 770,88.6 L 765,82.3 L 760,84.8 L 755,79.5 L 750,70.0 L 745,76.0 L 740,81.1 L 735,82.0 L 730,83.5 L 725,78.6 L 720,80.7 L 715,83.7 L 710,76.4 L 705,79.5 L 700,85.6 L 695,80.4 L 690,76.7 L 685,71.7 L 680,71.1 L 675,79.3 L 670,77.5 L 665,77.8 L 660,86.9 L 655,84.2 L 650,79.7 L 645,79.9 L 640,79.3 L 635,85.5 L 630,84.0 L 625,74.4 L 620,76.6 L 615,74.6 L 610,67.4 L 605,70.2 L 600,73.1 L 595,77.9 L 590,80.7 L 585,71.7 L 580,72.1 L 575,77.5 L 570,72.4 L 565,72.9 L 560,75.2 L 555,72.8 L 550,72.3 L 545,64.4 L 540,61.8 L 535,73.1 L 530,74.7 L 525,74.5 L 520,80.8 L 515,80.8 L 510,82.1 L 505,81.9 L 500,79.6 L 495,89.7 L 490,93.0 L 485,84.8 L 480,85.6 L 475,85.9 L 470,85.6 L 465,90.3 L 460,90.7 L 455,98.2 L 450,106.0 L 445,98.2 L 440,96.7 L 435,102.3 L 430,101.9 L 425,104.1 L 420,101.9 L 415,98.6 L 410,101.6 L 405,93.7 L 400,87.5 L 395,96.2 L 390,99.4 L 385,100.0 L 380,100.5 L 375,96.3 L 370,99.6 L 365,99.1 L 360,91.9 L 355,97.9 L 350,101.2 L 345,94.1 L 340,90.6 L 335,85.9 L 330,87.4 L 325,93.9 L 320,90.6 L 315,94.5 L 310,102.8 L 305,97.7 L 300,94.9 L 295,96.2 L 290,97.4 L 285,103.8 L 280,99.8 L 275,93.3 L 270,97.7 L 265,93.4 L 260,88.0 L 255,93.1 L 250,96.5 L 245,101.8 L 240,101.9 L 235,93.5 L 230,97.2 L 225,99.8 L 220,93.2 L 215,95.3 L 210,96.3 L 205,92.6 L 200,89.6 L 195,79.9 L 190,80.1 L 185,89.2 L 180,86.3 L 175,86.5 L 170,91.4 L 165,88.7 L 160,88.2 L 155,85.3 L 150,84.1 L 145,93.6 L 140,91.4 L 135,82.8 L 130,84.8 L 125,83.3 L 120,82.7 L 115,86.5 L 110,87.6 L 105,97.0 L 100,101.2 L 95,92.6 L 90,95.0 L 85,100.3 L 80,99.5 L 75,102.3 L 70,100.3 L 65,99.6 L 60,101.7 L 55,92.2 L 50,90.5 L 45,100.6 L 40,102.0 L 35,102.9 L 30,103.1 L 25,100.0 L 20,103.5 L 15,99.7 L 10,94.1 L 5,101.8 L 0,101.0 Z"
              fill="#ffffff"
              filter="url(#wrinkleShadowHistory)"
            />
          </svg>
        </div>

        <div className="top-nav">
          <a href="/farmdashboard" className="brand-logo" title="රන් පොළොව Farmer Portal">
            <div className="logo-sprout-icon">
              <SproutIcon size={22} style={{ color: '#22c55e' }} />
            </div>
            <span className="logo-text">
              රන් <span>පොළොව</span>
            </span>
            <span className="module-tag">Harvest History</span>
          </a>

          <div className="nav-right-actions">
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={() => setIsDark(!isDark)}
              title="Toggle Dark / Light Theme"
            >
              {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
            </button>

            <div className="user-profile-menu" ref={profileMenuRef}>
              <button
                type="button"
                className="user-profile-btn"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="user-avatar-circle">
                  <span>{profileName.slice(0, 1).toUpperCase()}</span>
                </div>
                <span className="user-profile-name">{profileName}</span>
                <ChevronDownIcon size={14} />
              </button>

              <div className={`profile-dropdown ${isProfileOpen ? 'show' : ''}`}>
                <div className="dropdown-header">
                  <div className="dropdown-title">{profileName}</div>
                  <div className="dropdown-subtitle">ROLE: FARMER</div>
                </div>
                <a href="/farmdashboard" className="dropdown-link">
                  <SproutIcon size={15} /> Farm Operations
                </a>
                <a href="/farmer-harvest" className="dropdown-link">
                  <PlusCircleIcon size={15} /> Submit Harvest
                </a>
                <div className="dropdown-divider" />
                <a
                  href="/login"
                  className="dropdown-link"
                  style={{ color: '#f43f5e' }}
                  onClick={() => localStorage.clear()}
                >
                  <XIcon size={15} /> Sign Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="page-hero-banner">
        <div className="hero-doodle-bg" />
        <div className="hero-flex-wrap">
          <div>
            <div className="breadcrumb-trail">
              <a href="/farmdashboard">Portal</a>
              <span>/</span>
              <span style={{ color: '#22c55e' }}>Harvest History</span>
            </div>
            <h1 className="page-title">
              My Farm <span>Harvest Ledger</span>
            </h1>
            <p className="page-subtitle">
              Track all your submitted harvest batches, confirmed booking quantities, field pickups, and total payouts.
            </p>
          </div>

          <a href="/farmer-harvest" className="btn-new-harvest">
            <PlusCircleIcon size={16} />
            <span>+ Submit New Harvest</span>
          </a>
        </div>
      </section>


      <section className="kpi-section">
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Total Harvest Batches</span>
              <div className="kpi-icon-badge" style={{ background: 'rgba(34, 197, 94, 0.14)', color: '#22c55e' }}>
                <PackageIcon size={18} />
              </div>
            </div>
            <div className="kpi-value">{kpiStats.totalLots}</div>
            <div className="kpi-subtext">Submitted crop lots</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Total Offered Yield</span>
              <div className="kpi-icon-badge" style={{ background: 'rgba(14, 165, 233, 0.14)', color: '#0284c7' }}>
                <ScaleIcon size={18} />
              </div>
            </div>
            <div className="kpi-value" style={{ color: '#0284c7' }}>
              {kpiStats.totalOfferedKg.toLocaleString()} kg
            </div>
            <div className="kpi-subtext">Declared farm supply</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Collected by Rep</span>
              <div className="kpi-icon-badge" style={{ background: 'rgba(20, 184, 166, 0.14)', color: '#14b8a6' }}>
                <CheckCircle2Icon size={18} />
              </div>
            </div>
            <div className="kpi-value" style={{ color: '#14b8a6' }}>
              {kpiStats.totalPickedUpKg.toLocaleString()} kg
            </div>
            <div className="kpi-subtext">Verified pickup weight</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Total Payout Earned</span>
              <div className="kpi-icon-badge" style={{ background: 'rgba(245, 158, 11, 0.14)', color: '#d97706' }}>
                <WalletIcon size={18} />
              </div>
            </div>
            <div className="kpi-value" style={{ color: '#d97706' }}>
              Rs. {kpiStats.totalEarnedLkr.toLocaleString()}
            </div>
            <div className="kpi-subtext">Completed farm settlements</div>
          </div>
        </div>
      </section>

 
      <main className="history-main-section">
        <div className="history-filter-bar">
          <div className="search-box">
            <SearchIcon size={15} className="search-icon" />
            <input
              type="text"
              placeholder="Search Harvest ID, Crop Name, Status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="clear-input-btn"
                title="Clear search"
              >
                <XIcon size={14} />
              </button>
            )}
          </div>

          <div className="filter-controls">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">All Statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="BOOKED">Booked</option>
              <option value="PURCHASED">Purchased</option>
              <option value="PARTIALLY_PURCHASED">Partially Purchased</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            <div className="date-filter-wrap">
              <CalendarIcon size={14} style={{ color: '#22c55e' }} />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="filter-date"
              />
              {dateFilter && (
                <button
                  type="button"
                  onClick={() => setDateFilter('')}
                  className="clear-date-pill"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={fetchHarvestHistory}
              disabled={isLoading}
              className="refresh-ledger-btn"
              title="Refresh History"
            >
              <RefreshIcon size={14} className={isLoading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <div className="history-ledger-card">
          <div className="ledger-header-row">
            <div className="ledger-title-wrap">
              <HistoryIcon size={18} style={{ color: '#22c55e' }} />
              <h2>Submitted Harvest Submissions</h2>
              <span className="record-count-badge">{filteredRecords.length} Records</span>
            </div>
          </div>

          <div className="table-scroll-container">
            {errorMsg ? (
              <div className="state-placeholder error">
                <AlertCircleIcon size={24} />
                <span>{errorMsg}</span>
              </div>
            ) : isLoading ? (
              <div className="state-placeholder">
                <RefreshIcon size={24} className="animate-spin" />
                <span>Loading your harvest history...</span>
              </div>
            ) : filteredRecords.length === 0 ? (
              <div className="state-placeholder">
                <SproutIcon size={28} style={{ opacity: 0.5 }} />
                <span>No harvest records found matching your filters.</span>
              </div>
            ) : (
              <table className="harvest-history-table">
                <thead>
                  <tr>
                    <th>Harvest ID</th>
                    <th>Delivery Date</th>
                    <th>Crop Produce</th>
                    <th className="text-right">Offered Qty</th>
                    <th className="text-right">Booked Qty</th>
                    <th className="text-right">Picked Up</th>
                    <th className="text-right">Buying Price</th>
                    <th className="text-right">Total Paid</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((item) => {
                    const unit = item.productId?.unit || 'kg';
                    const price = Number(item.buyingPrice ?? item.unitBuyingPrice ?? 0);
                    const picked = Number(item.actualQtyPickedUp || 0);
                    const booked = Number(item.bookedQty || 0);
                    const paid = Number(item.totalPaid || 0);

                    return (
                      <tr key={item._id}>
                        <td className="harvest-id-cell">{item.harvestId}</td>

                        <td className="date-cell">
                          <div className="date-primary">{formatSLDate(item.date)}</div>
                          {item.createdAt && (
                            <div className="date-sub">
                              Added {new Date(item.createdAt).toLocaleDateString()}
                            </div>
                          )}
                        </td>

                        <td className="crop-cell">
                          <span className="crop-name-bold">
                            {item.productId?.name || 'Produce Item'}
                          </span>
                          {item.productId?.category && (
                            <span className="crop-cat-tag">{item.productId.category}</span>
                          )}
                        </td>

                        <td className="num-cell">
                          {Number(item.qty || 0).toLocaleString()} {unit}
                        </td>

                        <td className="num-cell booked">
                          {booked > 0 ? `${booked.toLocaleString()} ${unit}` : '—'}
                        </td>

                        <td className="num-cell picked">
                          {picked > 0 ? `${picked.toLocaleString()} ${unit}` : '—'}
                        </td>

                        <td className="num-cell">
                          {price > 0 ? `Rs. ${price.toLocaleString()}/${unit}` : 'Pending'}
                        </td>

                        <td className="num-cell payout">
                          {paid > 0
                            ? `Rs. ${paid.toLocaleString()}`
                            : booked > 0 && price > 0
                            ? `Est. Rs. ${(booked * price).toLocaleString()}`
                            : 'Rs. 0'}
                        </td>

                        <td>
                          <span className={`history-status-pill ${getStatusBadgeClass(item.status)}`}>
                            {item.status === 'PURCHASED' || item.status === 'BOOKED' ? (
                              <CheckCircle2Icon size={12} />
                            ) : (
                              <ClockIcon size={12} />
                            )}
                            <span>{item.status}</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>


      <div className="rp-floating-dock" role="navigation" aria-label="Farmer Quick Navigation">
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
    </div>
  );
};

export default FarmerHarvestHistory;