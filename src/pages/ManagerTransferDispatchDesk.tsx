import React, { useState, useEffect, useMemo, useRef, type FC } from 'react';
import {
  Truck,
  ArrowRight,
  Building2,
  Store,
  RefreshCw,
  CheckCircle2,
  Sun,
  Moon,
  Navigation,
  PackageCheck,
  AlertTriangle,
  Layers,
  Sprout,
  User,
  ChevronDown,
  LogOut
} from 'lucide-react';
import api from '../service/api';
import '../ManagerTransferDispatchDesk.css';

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

export interface DispatchedLorryRecord {
  _id: string;
  dispatchId: string;
  date: string;
  routeDistrict: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  totalWeightKg: number;
  status: string;
  originCenterId?: {
    centerName?: string;
    name?: string;
    district?: string;
  };
  items: {
    storeId?: { storeName?: string; district?: string };
    productId?: { name?: string };
    loadedQty: number;
    loadingSequence: number;
    distanceFromHubKm: number;
  }[];
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

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });

  const [transfers, setTransfers] = useState<TransferAllocationRow[]>([]);
  const [dispatches, setDispatches] = useState<DispatchedLorryRecord[]>([]);
  const [centerFilter, setCenterFilter] = useState<string>('ALL');
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // Lorry Form State
  const [vehicleNumber, setVehicleNumber] = useState<string>('WP LB-4582');
  const [driverName, setDriverName] = useState<string>('');
  const [driverPhone, setDriverPhone] = useState<string>('');
  const [maxCapacityKg, setMaxCapacityKg] = useState<number>(1500);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDispatching, setIsDispatching] = useState<boolean>(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3800);
  };

  // Load Center to Store Transfer Matrix & Dispatched Lorries
  const fetchTransferData = async () => {
    setIsLoading(true);
    try {
      const [matrixRes, dspRes] = await Promise.all([
        api.get(`/dispatch/transfer-matrix?date=${selectedDate}`),
        api.get('/dispatch/all').catch(() => ({ data: { data: [] } }))
      ]);

      setTransfers(matrixRes.data?.data || []);
      setDispatches(dspRes.data?.data || []);
      setSelectedKeys([]);
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
    if (centerFilter === 'ALL') return transfers;
    return transfers.filter((t) => t.fromCenterId === centerFilter);
  }, [transfers, centerFilter]);

  // Toggle Row Selection 
  const toggleRowSelection = (row: TransferAllocationRow) => {
    if (row.isShortfall || !row.fromCenterId) return;

    if (selectedKeys.includes(row.transferKey)) {
      setSelectedKeys((prev) => prev.filter((k) => k !== row.transferKey));
      return;
    }

    // Check if already selected items belong to a different center
    if (selectedKeys.length > 0) {
      const firstSelected = transfers.find((t) => t.transferKey === selectedKeys[0]);
      if (firstSelected && firstSelected.fromCenterId !== row.fromCenterId) {
        showToast(
          `A single lorry can only load from one Origin Center (${firstSelected.fromCenterName}).`,
          'error'
        );
        return;
      }
    }

    setSelectedKeys((prev) => [...prev, row.transferKey]);
  };

  // Furthest Store Loaded First
  const selectedRows = useMemo(() => {
    return transfers
      .filter((t) => selectedKeys.includes(t.transferKey))
      .sort((a, b) => b.distanceKm - a.distanceKm); // Furthest store first
  }, [transfers, selectedKeys]);

  const selectedTotalKg = useMemo(() => {
    return selectedRows.reduce((sum, r) => sum + r.transferQtyKg, 0);
  }, [selectedRows]);

  // Dispatch Lorry Handler
  const handleDispatchLorry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRows.length === 0) {
      showToast('Select at least one Center-to-Store transfer line to load.', 'error');
      return;
    }
    if (!vehicleNumber.trim() || !driverName.trim() || !driverPhone.trim()) {
      showToast('Enter vehicle number, driver name, and phone.', 'error');
      return;
    }

    const originCenterId = selectedRows[0].fromCenterId!;
    const routeDistrict = selectedRows[0].toStoreDistrict || 'GENERAL';

    setIsDispatching(true);
    try {
      const res = await api.post('/dispatch/create-load', {
        date: selectedDate,
        originCenterId,
        routeDistrict,
        vehicleNumber,
        driverName,
        driverPhone,
        maxCapacityKg,
        items: selectedRows.map((r) => ({
          orderId: r.orderObjectId,
          loadQty: r.transferQtyKg
        }))
      });

      showToast(res.data?.message || 'Lorry dispatched with LIFO loading sequence!', 'success');
      await fetchTransferData();
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to dispatch lorry.', 'error');
    } finally {
      setIsDispatching(false);
    }
  };

  // Overall Summary Metrics
  const totals = useMemo(() => {
    const transferableKg = transfers
      .filter((t) => !t.isShortfall)
      .reduce((s, t) => s + t.transferQtyKg, 0);
    const shortfallKg = transfers
      .filter((t) => t.isShortfall)
      .reduce((s, t) => s + t.transferQtyKg, 0);
    return { transferableKg, shortfallKg };
  }, [transfers]);

  return (
    <div className={`dispatch-desk-root ${isDark ? 'dark-theme' : ''}`}>
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
            <span className="module-tag">Fleet Dispatch Desk</span>
          </a>

          <div className="nav-right-actions">
            <button
              onClick={fetchTransferData}
              disabled={isLoading}
              className="theme-toggle-btn"
              title="Refresh Transfer Matrix"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
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

            <a href="/managerdashboard" className="nav-back-link">
              <span>&larr; Manager Operations</span>
            </a>
          </div>
        </div>
      </header>

      <section className="page-hero-banner">
        <div className="hero-doodle-bg" />
        <div className="hero-content-inner">
          <h1 className="hero-page-title">
            <Truck className="w-7 h-7 text-sky-500" />
            <span>Center-to-Store Proximity Routing &amp; Lorry Dispatch</span>
          </h1>
          <p className="hero-page-desc">
            Algorithmic proximity matrix assigning harvest stock from collection centers to retail stores, featuring Auto-LIFO staging.
          </p>
        </div>
      </section>

   
      <main className="dispatch-main-container flex flex-col gap-6">
        <div className={`p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div>
            <h1 className="text-base sm:text-lg font-bold">Center-to-Store Harvest Transfer Plan</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Shows exact origin Collection Center, destination Store, produce type, quantity (kg), and Haversine distance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
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
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="text-xs text-emerald-400 uppercase font-semibold">Ready for Transfer</span>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{totals.transferableKg.toLocaleString()} kg</div>
            <span className="text-[11px] text-slate-500">{transfers.filter((t) => !t.isShortfall).length} Center &rarr; Store routes</span>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="text-xs text-sky-400 uppercase font-semibold">Dispatched Lorries</span>
            <div className="text-2xl font-bold font-mono text-sky-400 mt-1">{dispatches.length} Loads</div>
            <span className="text-[11px] text-slate-500">In-Transit / Completed</span>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="text-xs text-rose-400 uppercase font-semibold">Unfulfilled Shortfall</span>
            <div className="text-2xl font-bold font-mono text-rose-400 mt-1">{totals.shortfallKg.toLocaleString()} kg</div>
            <span className="text-[11px] text-slate-500">Awaiting center stock</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section className="lg:col-span-8 flex flex-col gap-4">
            <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'border-slate-800 text-slate-100' : 'border-slate-200 text-slate-800'}`}>
                <h2 className="font-bold text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-500" />
                  <span>Center &rarr; Store Transfer Breakdown ({visibleTransfers.length})</span>
                </h2>
                <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Tick rows from same Center to load a lorry</span>
              </div>

              {visibleTransfers.length === 0 ? (
                <div className={`p-12 text-center text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {isLoading ? 'Calculating distance-based transfers...' : 'No pending Center-to-Store transfers for this date.'}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className={`border-b ${isDark ? 'border-slate-800 bg-slate-800/50 text-slate-300' : 'border-slate-200 bg-slate-100/80 text-slate-700 font-bold'}`}>
                        <th className="py-3 px-3 w-10 text-center">Load</th>
                        <th className="py-3 px-3">From (Collection Center)</th>
                        <th className="py-3 px-3">To (Destination Store)</th>
                        <th className="py-3 px-3">Produce</th>
                        <th className="py-3 px-3 text-right">Transfer Qty</th>
                        <th className="py-3 px-3 text-right">Distance</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
                      {visibleTransfers.map((row) => {
                        const isChecked = selectedKeys.includes(row.transferKey);
                        return (
                          <tr
                            key={row.transferKey}
                            onClick={() => toggleRowSelection(row)}
                            className={`transition-colors ${
                              row.isShortfall
                                ? isDark ? 'bg-rose-950/20 text-rose-300' : 'bg-rose-50/70 text-rose-800'
                                : isChecked
                                ? isDark ? 'bg-sky-950/40 cursor-pointer' : 'bg-sky-50 cursor-pointer'
                                : isDark ? 'hover:bg-slate-800/30 cursor-pointer' : 'hover:bg-emerald-50/50 cursor-pointer'
                            }`}
                          >
                            <td className="py-3 px-3 text-center">
                              {row.isShortfall ? (
                                <AlertTriangle className="w-4 h-4 text-rose-500 inline" />
                              ) : (
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {}}
                                  className="rounded accent-sky-500 w-4 h-4 cursor-pointer"
                                />
                              )}
                            </td>

                            {/* From Center */}
                            <td className="py-3 px-3">
                              <div className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                                <Building2 className="w-3.5 h-3.5 shrink-0" />
                                <span>{row.fromCenterName}</span>
                              </div>
                              <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{row.fromCenterDistrict}</div>
                            </td>

                            {/* To Store */}
                            <td className="py-3 px-3">
                              <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                                <Store className="w-3.5 h-3.5 shrink-0" />
                                <span>{row.toStoreName}</span>
                              </div>
                              <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                {row.toStoreDistrict} &bull; <span className={`font-mono font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{row.orderCode}</span>
                              </div>
                            </td>

                            {/* Produce */}
                            <td className={`py-3 px-3 font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{row.productName}</td>

                            {/* Quantity */}
                            <td className="py-3 px-3 text-right font-mono font-extrabold text-sm text-sky-600 dark:text-sky-400">
                              {row.transferQtyKg.toLocaleString()} {row.unit}
                            </td>

                            {/* Distance */}
                            <td className={`py-3 px-3 text-right font-mono font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                              {row.isShortfall ? '—' : `${row.distanceKm} km`}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

          <section className="lg:col-span-4 flex flex-col gap-5">
            <form
              onSubmit={handleDispatchLorry}
              className={`p-5 rounded-2xl border flex flex-col gap-4 ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-sm flex items-center gap-2 text-sky-400">
                  <Truck className="w-4 h-4" />
                  <span>Lorry Load &amp; LIFO Sequence</span>
                </h3>
                <span className="font-mono text-xs font-bold text-emerald-400">
                  {selectedTotalKg} / {maxCapacityKg} kg
                </span>
              </div>

              {/* Capacity Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  style={{ width: `${Math.min(100, (selectedTotalKg / (maxCapacityKg || 1)) * 100)}%` }}
                  className={`h-full transition-all ${selectedTotalKg > maxCapacityKg ? 'bg-rose-500' : 'bg-emerald-400'}`}
                />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase text-slate-400">
                  Loading Order (Furthest Store Loaded #1):
                </span>
                {selectedRows.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-500">
                    Select transfer rows on the left to preview LIFO loading sequence.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedRows.map((item, idx) => (
                      <div
                        key={item.transferKey}
                        className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-mono font-bold text-amber-400 mr-2">Load #{idx + 1}</span>
                          <strong className="text-slate-100">{item.toStoreName}</strong>
                          <div className="text-[10px] text-slate-400">
                            {item.productName} &bull; {item.distanceKm} km away
                          </div>
                        </div>
                        <span className="font-mono font-bold text-sky-400">{item.transferQtyKg} kg</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Vehicle & Driver Inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Lorry Number</label>
                  <input
                    type="text"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Max Capacity (kg)</label>
                  <input
                    type="number"
                    value={maxCapacityKg}
                    onChange={(e) => setMaxCapacityKg(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Driver Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Nimal Perera"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Driver Phone</label>
                  <input
                    type="text"
                    placeholder="0771234567"
                    value={driverPhone}
                    onChange={(e) => setDriverPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isDispatching || selectedRows.length === 0}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 disabled:opacity-50 cursor-pointer"
              >
                <PackageCheck className="w-4 h-4" />
                <span>{isDispatching ? 'Dispatching...' : 'Confirm & Dispatch Lorry'}</span>
              </button>
            </form>

            {/* Dispatched Lorries History */}
            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
              <h3 className="font-bold text-xs uppercase text-slate-400 mb-3">
                Active Dispatched Lorries ({dispatches.length})
              </h3>
              <div className="space-y-2.5 max-h-64 overflow-y-auto">
                {dispatches.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4">No lorries dispatched yet.</p>
                ) : (
                  dispatches.map((d) => (
                    <div key={d._id} className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-sky-400">{d.vehicleNumber}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                          {d.status}
                        </span>
                      </div>
                      <div className="text-slate-300 flex items-center gap-1.5">
                        <span className="text-amber-400 font-semibold">
                          {d.originCenterId?.centerName || d.originCenterId?.name || 'Hub'}
                        </span>
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                        <span>{d.routeDistrict} ({d.totalWeightKg} kg)</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Driver: {d.driverName} ({d.driverPhone})
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

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