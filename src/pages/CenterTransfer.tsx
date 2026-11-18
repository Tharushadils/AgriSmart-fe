import React, { useState, useEffect, useMemo, useRef, type FC } from 'react';
import {
  ArrowRight,
  Building2,
  Store,
  RefreshCw,
  CheckCircle2,
  Sun,
  Moon,
  Navigation,
  AlertTriangle,
  Layers,
  Search,
  Sprout,
  User,
  ChevronDown,
  LogOut,
  Save
} from 'lucide-react';
import api from '../service/api';
import '../CenterTransfer.css';



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

const SeedlingHarvestIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
    <path d="M12 20V10" />
    <path d="M12 14c-3-3-3-7 0-9" />
    <path d="M12 14c-1-4-5-4-7-2 1 4 4 6 7 2z" />
  </NavBaseIcon>
);

const OrderChecklistIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="m9 14 2 2 4-4" />
  </NavBaseIcon>
);

const PriceTagTrendIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path d="M7 7h.01" />
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

const StoreFrontIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
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

const MapPinIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
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

const SettingsGearIcon: FC<NavIconProps> = (p) => (
  <NavBaseIcon {...p}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </NavBaseIcon>
);

export interface TransferAllocationRow {
  transferKey: string;
  orderObjectId: string;
  orderCode: string;
  fromCenterId: string | null;
  fromCenterName: string;
  fromCenterDistrict: string;
  toStoreId: string;
  toStoreName: string;
  toStoreDistrict: string;
  toStoreAddress: string;
  productId: string;
  productName: string;
  unit: string;
  transferQtyKg: number;
  distanceKm: number;
  isShortfall?: boolean;
}

export const ManagerTransferDispatchDesk: FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    role: string;
    email: string;
    initials: string;
  } | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userRaw = localStorage.getItem('user');
    if (userRaw) {
      try {
        const u = JSON.parse(userRaw);
        setCurrentUser({
          name: u.fullName || u.name || 'Manager',
          role: u.role || u.roles?.[0] || 'MANAGER',
          email: u.email || '',
          initials: (u.fullName || u.name || 'MG').slice(0, 2).toUpperCase(),
        });
      } catch {
        // ignore parse error
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const profileName = currentUser?.name || 'Manager';
  const profileRole = currentUser?.role || 'MANAGER';
  const profileEmail = currentUser?.email || '';
  const profileInitials = currentUser?.initials || (profileName ? profileName.slice(0, 2).toUpperCase() : 'MG');

  // Sri Lanka Local Date (+05:30) for Tomorrow
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const slNow = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
    slNow.setUTCDate(slNow.getUTCDate() + 1);
    return slNow.toISOString().split('T')[0];
  });

  const [transfers, setTransfers] = useState<TransferAllocationRow[]>([]);
  const [centerFilter, setCenterFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncedDbCount, setSyncedDbCount] = useState<number>(0);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Auto-save valid matrix rows to MongoDB 
  const autoSaveTransfersToDb = async (rows: TransferAllocationRow[], dateStr: string) => {
    const validRows = rows.filter(
      (r) => !r.isShortfall && r.fromCenterId && r.toStoreId && Number(r.transferQtyKg) > 0
    );
    if (validRows.length === 0) return;

    setIsSyncing(true);
    try {
      const saveRes = await api.post('/center-transfers/bulk-confirm', {
        date: dateStr,
        rows: validRows
      });
      const savedList = Array.isArray(saveRes.data?.data) ? saveRes.data.data : [];
      const totalInDb = saveRes.data?.totalInDb ?? validRows.length;
      setSyncedDbCount(totalInDb);

      if (savedList.length > 0) {
        showToast(`${savedList.length} transfer orders auto-saved to database!`);
      }
    } catch (err: any) {
      console.error('Auto-save transfer matrix error:', err);
      showToast(
        err.response?.data?.message || 'Failed to save transfer matrix to database.',
        'error'
      );
    } finally {
      setIsSyncing(false);
    }
  };

  const fetchTransferData = async () => {
    setIsLoading(true);
    try {
      const matrixRes = await api.get(`/dispatch/transfer-matrix?date=${selectedDate}`);
      const rows: TransferAllocationRow[] = matrixRes.data?.data || [];
      setTransfers(rows);

      // Immediately save to database
      await autoSaveTransfersToDb(rows, selectedDate);
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to load transfer plan.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransferData();
  }, [selectedDate]);

  // Unique Origin Centers from the Transfer Plan
  const originCenters = useMemo(() => {
    const map = new Map<string, string>();
    transfers.forEach((t) => {
      if (t.fromCenterId && !t.isShortfall) {
        map.set(t.fromCenterId, `${t.fromCenterName} (${t.fromCenterDistrict})`);
      }
    });
    return Array.from(map.entries()).map(([id, label]) => ({ id, label }));
  }, [transfers]);

  // Filtered Transfer Rows
  const visibleTransfers = useMemo(() => {
    return transfers.filter((t) => {
      if (centerFilter !== 'ALL' && t.fromCenterId !== centerFilter) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        t.fromCenterName.toLowerCase().includes(q) ||
        t.toStoreName.toLowerCase().includes(q) ||
        t.productName.toLowerCase().includes(q) ||
        t.orderCode.toLowerCase().includes(q) ||
        t.toStoreDistrict.toLowerCase().includes(q)
      );
    });
  }, [transfers, centerFilter, searchQuery]);

  // Overall Summary Metrics
  const totals = useMemo(() => {
    const validTransfers = visibleTransfers.filter((t) => !t.isShortfall);
    const transferableKg = validTransfers.reduce((s, t) => s + t.transferQtyKg, 0);
    const shortfallKg = visibleTransfers
      .filter((t) => t.isShortfall)
      .reduce((s, t) => s + t.transferQtyKg, 0);
    const avgDistanceKm =
      validTransfers.length > 0
        ? (validTransfers.reduce((s, t) => s + t.distanceKm, 0) / validTransfers.length).toFixed(1)
        : '0';

    return {
      routeCount: validTransfers.length,
      transferableKg,
      shortfallKg,
      avgDistanceKm
    };
  }, [visibleTransfers]);

  return (
    <div className={`center-transfer-root ${isDark ? 'dark-theme' : ''}`}>
      <header className="header-wrapper">
        <div className="header-bg-svg-wrap">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="wrinkleShadow" x="-5%" y="-10%" width="110%" height="150%">
                <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#143412" floodOpacity="0.22" />
              </filter>
            </defs>
            <path
              d="M 0,0 L 1440,0 L 1440,82.0 L 1435,84.9 L 1430,89.0 L 1425,85.1 L 1420,81.9 L 1415,88.5 L 1410,84.7 L 1405,80.7 L 1400,86.9 L 1395,85.2 L 1390,80.9 L 1385,75.7 L 1380,69.1 L 1375,75.8 L 1370,79.7 L 1365,75.2 L 1360,81.2 L 1355,83.9 L 1350,79.3 L 1345,78.9 L 1340,76.4 L 1335,81.0 L 1330,87.4 L 1325,79.1 L 1320,76.4 L 1315,79.9 L 1310,75.6 L 1305,77.0 L 1300,81.3 L 1295,86.1 L 1290,95.7 L 1285,92.6 L 1280,87.8 L 1275,96.0 L 1270,97.6 L 1265,97.0 L 1260,100.9 L 1255,99.7 L 1250,101.7 L 1245,98.9 L 1240,90.4 L 1235,98.0 L 1230,106.1 L 1225,104.5 L 1220,108.0 L 1215,108.4 L 1210,107.9 L 1205,109.7 L 1200,103.3 L 1195,105.6 L 1190,113.5 L 1185,106.1 L 1180,99.9 L 1175,98.4 L 1170,95.1 L 1165,98.3 L 1160,97.5 L 1155,97.3 L 1150,106.8 L 1145,103.9 L 1140,95.7 L 1135,98.3 L 1130,98.9 L 1125,100.8 L 1120,101.1 L 1115,94.1 L 1110,96.2 L 1105,95.4 L 1100,85.5 L 1095,89.1 L 1090,96.3 L 1085,98.5 L 1080,101.6 L 1075,97.1 L 1070,97.1 L 1065,102.8 L 1060,96.7 L 1055,96.2 L 1050,103.0 L 1045,99.4 L 1040,95.1 L 1035,89.5 L 1030,85.4 L 1025,93.1 L 1020,93.2 L 1015,89.8 L 1010,97.1 L 1005,96.5 L 1000,90.7 L 995,89.4 L 990,86.6 L 985,91.6 L 980,93.0 L 975,82.1 L 970,81.0 L 965,81.4 L 960,74.2 L 955,75.2 L 950,78.0 L 945,82.3 L 940,88.2 L 935,80.8 L 930,78.1 L 925,85.4 L 920,83.1 L 915,82.5 L 910,85.7 L 905,84.1 L 900,85.2 L 895,79.5 L 890,73.7 L 885,84.2 L 880,89.4 L 875,88.0 L 870,93.3 L 865,93.7 L 860,94.4 L 855,95.1 L 850,90.0 L 845,96.6 L 840,102.5 L 835,93.6 L 830,90.3 L 825,89.5 L 820,87.1 L 815,90.4 L 810,88.9 L 805,91.7 L 800,100.2 L 795,93.4 L 790,87.0 L 785,90.6 L 780,89.7 L 775,90.8 L 770,88.6 L 765,82.3 L 760,84.8 L 755,79.5 L 750,70.0 L 745,76.0 L 740,81.1 L 735,82.0 L 730,83.5 L 725,78.6 L 720,80.7 L 715,83.7 L 710,76.4 L 705,79.5 L 700,85.6 L 695,80.4 L 690,76.7 L 685,71.7 L 680,71.1 L 675,79.3 L 670,77.5 L 665,77.8 L 660,86.9 L 655,84.2 L 650,79.7 L 645,79.9 L 640,79.3 L 635,85.5 L 630,84.0 L 625,74.4 L 620,76.6 L 615,74.6 L 610,67.4 L 605,70.2 L 600,73.1 L 595,77.9 L 590,80.7 L 585,71.7 L 580,72.1 L 575,77.5 L 570,72.4 L 565,72.9 L 560,75.2 L 555,72.8 L 550,72.3 L 545,64.4 L 540,61.8 L 535,73.1 L 530,74.7 L 525,74.5 L 520,80.8 L 515,80.8 L 510,82.1 L 505,81.9 L 500,79.6 L 495,89.7 L 490,93.0 L 485,84.8 L 480,85.6 L 475,85.9 L 470,85.6 L 465,90.3 L 460,90.7 L 455,98.2 L 450,106.0 L 445,98.2 L 440,96.7 L 435,102.3 L 430,101.9 L 425,104.1 L 420,101.9 L 415,98.6 L 410,101.6 L 405,93.7 L 400,87.5 L 395,96.2 L 390,99.4 L 385,100.0 L 380,100.5 L 375,96.3 L 370,99.6 L 365,99.1 L 360,91.9 L 355,97.9 L 350,101.2 L 345,94.1 L 340,90.6 L 335,85.9 L 330,87.4 L 325,93.9 L 320,90.6 L 315,94.5 L 310,102.8 L 305,97.7 L 300,94.9 L 295,96.2 L 290,97.4 L 285,103.8 L 280,99.8 L 275,93.3 L 270,97.7 L 265,93.4 L 260,88.0 L 255,93.1 L 250,96.5 L 245,101.8 L 240,101.9 L 235,93.5 L 230,97.2 L 225,99.8 L 220,93.2 L 215,95.3 L 210,96.3 L 205,92.6 L 200,89.6 L 195,79.9 L 190,80.1 L 185,89.2 L 180,86.3 L 175,86.5 L 170,91.4 L 165,88.7 L 160,88.2 L 155,85.3 L 150,84.1 L 145,93.6 L 140,91.4 L 135,82.8 L 130,84.8 L 125,83.3 L 120,82.7 L 115,86.5 L 110,87.6 L 105,97.0 L 100,101.2 L 95,92.6 L 90,95.0 L 85,100.3 L 80,99.5 L 75,102.3 L 70,100.3 L 65,99.6 L 60,101.7 L 55,92.2 L 50,90.5 L 45,100.6 L 40,102.0 L 35,102.9 L 30,103.1 L 25,100.0 L 20,103.5 L 15,99.7 L 10,94.1 L 5,101.8 L 0,101.0 Z"
              fill="var(--header-bg)"
              filter="url(#wrinkleShadow)"
            />
          </svg>
        </div>

        <div className="top-nav">
          <a href="/" className="brand-logo" title="රන් පොළොව Home">
            <div className="logo-sprout-icon">
              <Sprout size={22} style={{ color: '#22c55e' }} />
            </div>
            <span className="logo-text">
              රන් <span>පොළොව</span>
            </span>
           
          </a>

          <div className="nav-right-actions">
            
            <button
              onClick={() => setIsDark(!isDark)}
              className="theme-toggle-btn"
              title="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="user-profile-menu" ref={profileMenuRef}>
              <button
                type="button"
                className="user-profile-btn"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-expanded={isProfileOpen}
              >
                <div className="user-avatar-circle">
                  <span>{profileInitials || <User size={14} />}</span>
                  <span className="user-status-dot" />
                </div>
                {profileName && <span className="user-profile-name">{profileName}</span>}
                <ChevronDown size={14} />
              </button>

              <div className={`profile-dropdown ${isProfileOpen ? 'show' : ''}`}>
                <div className="dropdown-header">
                  <div className="dropdown-title">{profileName}</div>
                  <div className="dropdown-subtitle">{profileRole} {profileEmail ? `• ${profileEmail}` : ''}</div>
                </div>
                <a href="/managerdashboard" className="dropdown-link">
                  <Layers size={15} />
                  <span>Manager Dashboard</span>
                </a>
                <a href="/allocation" className="dropdown-link">
                  <Layers size={15} />
                  <span>Allocation Hub</span>
                </a>
                <a href="/user" className="dropdown-link">
                  <User size={15} />
                  <span>Stakeholders</span>
                </a>
                <div className="dropdown-divider" />
                <a href="/login" className="dropdown-link" style={{ color: '#ef4444' }}>
                  <LogOut size={15} />
                  <span>Log Out</span>
                </a>
              </div>
            </div>

            
          </div>
        </div>
      </header>

     
      <section className="page-hero-banner">
        <div className="hero-doodle-bg" />
        <div className="hero-content-inner">
          <h1 className="hero-page-title">
            <Navigation className="w-7 h-7 text-sky-500" />
            <span>Center-to-Store Harvest Transfer Matrix</span>
          </h1>
          <p className="hero-page-desc">
            Proximity-based harvest allocation overview directing produce from regional Collection Centers to fulfillment store locations.
          </p>
        </div>
      </section>

    
      <main className="center-transfer-container flex flex-col gap-6">
        {/* Filter & Control Bar */}
        <div className={`p-5 rounded-2xl border flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div>
            <h1 className="text-base sm:text-lg font-bold flex items-center gap-2">
              <span>Center-to-Store Harvest Transfer Details</span>
              {syncedDbCount > 0 && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  DB Saved ({syncedDbCount})
                </span>
              )}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              View which Collection Center supplies each Store, the exact produce, allocated weight (kg), and distance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-52">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search center, store, crop..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-8 pr-3 py-2 text-xs rounded-xl border focus:outline-none ${isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200'}`}
              />
            </div>

            <select
              value={centerFilter}
              onChange={(e) => setCenterFilter(e.target.value)}
              className={`px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none ${isDark ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-slate-100 border-slate-200'}`}
            >
              <option value="ALL">All Origin Centers</option>
              {originCenters.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={`px-3 py-2 rounded-xl border text-xs font-mono font-bold focus:outline-none ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}
            />

            <button
              type="button"
              onClick={() => autoSaveTransfersToDb(transfers, selectedDate)}
              disabled={isSyncing || isLoading || totals.routeCount === 0}
              className="px-4 py-2 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-md disabled:opacity-50 cursor-pointer"
              title="Sync transfer routes to database"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSyncing ? 'Saving...' : 'Save to DB'}</span>
            </button>
          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="text-xs text-emerald-400 uppercase font-semibold">Total Allocated Transfer Volume</span>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{totals.transferableKg.toLocaleString()} kg</div>
            <span className="text-[11px] text-slate-500">{totals.routeCount} Center &rarr; Store allocations</span>
          </div>

          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="text-xs text-sky-400 uppercase font-semibold">Average Proximity Distance</span>
            <div className="text-2xl font-bold font-mono text-sky-400 mt-1">{totals.avgDistanceKm} km</div>
            <span className="text-[11px] text-slate-500">Nearest-hub Haversine routing</span>
          </div>

          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="text-xs text-rose-400 uppercase font-semibold">Unfulfilled Stock Shortfall</span>
            <div className="text-2xl font-bold font-mono text-rose-400 mt-1">{totals.shortfallKg.toLocaleString()} kg</div>
            <span className="text-[11px] text-slate-500">Awaiting center harvest stock</span>
          </div>
        </div>

        {/* Full Width Transfer Ledger Table */}
        <section className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${isDark ? 'border-slate-800 text-slate-100' : 'border-slate-200 text-slate-800'}`}>
            <h2 className="font-bold text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-500" />
              <span>Harvest Movement Matrix ({visibleTransfers.length})</span>
            </h2>
            <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Date: {selectedDate}</span>
          </div>

          {visibleTransfers.length === 0 ? (
            <div className={`p-14 text-center text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {isLoading ? 'Calculating distance-based transfers...' : 'No Center-to-Store transfers found for this date.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className={`border-b ${isDark ? 'border-slate-800 bg-slate-800/50 text-slate-300' : 'border-slate-200 bg-slate-100/80 text-slate-700 font-bold'}`}>
                    <th className="py-3.5 px-4">Origin (Collection Center)</th>
                    <th className="py-3.5 px-2 text-center w-10"></th>
                    <th className="py-3.5 px-4">Destination (Store &amp; Order)</th>
                    <th className="py-3.5 px-4">Produce Item</th>
                    <th className="py-3.5 px-4 text-right">Transfer Quantity</th>
                    <th className="py-3.5 px-4 text-right">Distance</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
                  {visibleTransfers.map((row) => (
                    <tr
                      key={row.transferKey}
                      className={`transition-colors ${
                        row.isShortfall
                          ? isDark ? 'bg-rose-950/20 text-rose-300' : 'bg-rose-50/70 text-rose-800'
                          : isDark ? 'hover:bg-slate-800/30' : 'hover:bg-emerald-50/50'
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        {row.isShortfall ? (
                          <div className="font-bold text-rose-500 dark:text-rose-400 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            <span>{row.fromCenterName}</span>
                          </div>
                        ) : (
                          <>
                            <div className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5 shrink-0" />
                              <span>{row.fromCenterName}</span>
                            </div>
                            <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>{row.fromCenterDistrict}</div>
                          </>
                        )}
                      </td>

                      <td className="py-3.5 px-2 text-center">
                        <ArrowRight className="w-4 h-4 text-slate-400 inline" />
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                          <Store className="w-3.5 h-3.5 shrink-0" />
                          <span>{row.toStoreName}</span>
                        </div>
                        <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>
                          {row.toStoreDistrict} &bull; <span className={`font-mono font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{row.orderCode}</span>
                        </div>
                      </td>

                      <td className={`py-3.5 px-4 font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{row.productName}</td>

                      <td className="py-3.5 px-4 text-right font-mono font-extrabold text-sm text-sky-600 dark:text-sky-400">
                        {row.transferQtyKg.toLocaleString()} {row.unit}
                      </td>

                      <td className={`py-3.5 px-4 text-right font-mono font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                        {row.isShortfall ? '—' : `${row.distanceKm} km`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>


      <div className="rp-floating-dock" role="navigation" aria-label="Manager Quick Navigation">
        <div className="rp-floating-pill">
          {[
            { href: '/manager-harvests', label: 'View Harvest', icon: <SeedlingHarvestIcon size={14} /> },
            { href: '/manager-orders', label: 'View Orders', icon: <OrderChecklistIcon size={14} /> },
            { href: '/district-price', label: 'Price Release', icon: <PriceTagTrendIcon size={14} /> },
            { href: '/inventory', label: 'Center Inventory', icon: <WarehouseIcon size={14} /> },
            { href: '/allocation', label: 'Allocations', icon: <PrecisionGearsIcon size={14} /> },
            { href: '/procurement', label: 'Allocation for Farmers', icon: <SeedlingAllocationIcon size={14} /> },
            { href: '/farmer-procurement', label: 'View Farmer Promise', icon: <FarmerPromiseIcon size={14} /> },
            { href: '/center-transfer', label: 'Harvest Transfer', icon: <HarvestTransferIcon size={14} /> },
            { href: '/manager-farms', label: 'Farms', icon: <FarmBarnIcon size={14} /> },
            { href: '/manager-stores', label: 'Stores', icon: <StoreFrontIcon size={14} /> },
            { href: '/user', label: 'Users', icon: <UsersGroupIcon size={14} /> },
            { href: '/center', label: 'Collection Centers', icon: <MapPinIcon size={14} /> },
            { href: '/products', label: 'Products', icon: <CargoTruckIcon size={14} /> },
            { href: '/user-setting', label: 'Settings', icon: <SettingsGearIcon size={14} /> },
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
        <div className="fixed top-20 right-5 z-50">
          <div className={`px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold text-white border ${toast.type === 'error' ? 'bg-rose-600 border-rose-500' : 'bg-emerald-600 border-emerald-500'}`}>
            <CheckCircle2 className="w-4 h-4" />
            <span>{toast.msg}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerTransferDispatchDesk;