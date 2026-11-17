import React, { useState, useEffect, useRef, useMemo, type FC, type SVGProps } from 'react';
import api from '../service/api';
import '../FarmDashboard.css';
import { PackageCheck } from 'lucide-react';

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

export const ChevronDownIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <polyline points="6 9 12 15 18 9" />
  </BaseIcon>
);

export const PlusIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </BaseIcon>
);

export const XIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </BaseIcon>
);

export const SeedlingHarvestIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
    <path d="M12 20V10" />
    <path d="M12 14c-3-3-3-7 0-9" />
    <path d="M12 14c-1-4-5-4-7-2 1 4 4 6 7 2z" />
    <path d="M12 11c3-2 5-1 7 1" />
  </BaseIcon>
);

export const PriceTagTrendIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <circle cx="7" cy="7" r="1.5" />
    <path d="M8 15l2 2 4-4" />
  </BaseIcon>
);

export const MapPinIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </BaseIcon>
);

//  Harvest History
export const HarvestHistoryIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="13" y2="17" />
  </BaseIcon>
);

//  Settings 
export const SettingsGearIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </BaseIcon>
);

export interface FarmHarvestRecord {
  id: string;
  cropName: string;
  quantityKg: number;
  unit: string;
  deliveryDate: string;
  status: string;
}

export interface FarmCropYieldItem {
  name: string;
  yieldKg: number;
  barColorClass?: string;
}

const BAR_PALETTE = ['bar-color-1', 'bar-color-2', 'bar-color-3', 'bar-color-4', 'bar-color-5', 'bar-color-6'];

export const FarmDashboard: FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('agrismart_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const [harvestRecords, setHarvestRecords] = useState<FarmHarvestRecord[]>([]);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isDark) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
      localStorage.setItem('agrismart_theme', isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Fetch logged in farmer's harvest history from backend
  useEffect(() => {
    const fetchHarvests = async () => {
      try {
        const userRaw = localStorage.getItem('user');
        const user = userRaw ? JSON.parse(userRaw) : null;
        const userId = user?._id || user?.userId || localStorage.getItem('farmId');

        if (!userId) return;

        const res = await api.get(`/harvests/farm/${userId}`);
        const rawList = res.data?.data || res.data || [];

        if (Array.isArray(rawList)) {
          const mapped: FarmHarvestRecord[] = rawList.map((h: any) => ({
            id: h._id || h.harvestId,
            cropName: h.productId?.name || 'Produce Crop',
            quantityKg: h.qty || 0,
            unit: h.productId?.unit || 'kg',
            deliveryDate: new Date(h.date).toISOString().split('T')[0],
            status: h.status || 'SUBMITTED'
          }));
          setHarvestRecords(mapped);
        }
      } catch (err: any) {
        console.error('Failed to load harvests:', err);
      }
    };

    fetchHarvests();
  }, []);

  const userRaw = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const user = userRaw ? JSON.parse(userRaw) : null;
  const farmerName = user?.name || 'Farmer Operator';

  // Real backend grounded stats 
  const dynamicStats = useMemo(() => {
    const totalHarvestKg = harvestRecords.reduce((acc, curr) => acc + (curr.quantityKg || 0), 0);
    const totalBatches = harvestRecords.length;
    const pendingBatches = harvestRecords.filter((h) => h.status === 'SUBMITTED').length;
    const confirmedBatches = harvestRecords.filter((h) => h.status === 'CONFIRMED' || h.status === 'PURCHASED').length;

    return {
      totalHarvestKg,
      totalBatches,
      pendingBatches,
      confirmedBatches
    };
  }, [harvestRecords]);

  // Derive top crops purely by submitted yield
  const activeCropYields = useMemo<FarmCropYieldItem[]>(() => {
    if (harvestRecords.length === 0) return [];

    const grouped: Record<string, number> = {};
    harvestRecords.forEach((r) => {
      const name = r.cropName.trim();
      if (!name) return;
      grouped[name] = (grouped[name] || 0) + (r.quantityKg || 0);
    });

    return Object.entries(grouped).map(([name, yieldKg], idx) => ({
      name,
      yieldKg,
      barColorClass: BAR_PALETTE[idx % BAR_PALETTE.length]
    }));
  }, [harvestRecords]);

  const filteredHarvests = useMemo(() => {
    if (!searchFilter.trim()) return harvestRecords;
    const q = searchFilter.toLowerCase();
    return harvestRecords.filter(
      (r) =>
        r.cropName.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q) ||
        r.deliveryDate.includes(q)
    );
  }, [harvestRecords, searchFilter]);

  const { chartItems, yAxisLabels } = useMemo(() => {
    if (activeCropYields.length === 0) {
      return {
        chartItems: [],
        yAxisLabels: ['100', '50', '20', '0']
      };
    }

    const values = activeCropYields.map((item) => item.yieldKg);
    const highestVal = Math.max(...values, 1);
    const order = Math.pow(10, Math.floor(Math.log10(highestVal)));
    const roundedMax = Math.ceil(highestVal / order) * order;

    const formatLabel = (val: number) => {
      if (val === 0) return '0';
      if (val >= 1000) return `${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}K`;
      return `${val}`;
    };

    const labels = [
      formatLabel(roundedMax),
      formatLabel(Math.round(roundedMax * 0.66)),
      formatLabel(Math.round(roundedMax * 0.33)),
      '0'
    ];

    const items = activeCropYields.map((item, idx) => {
      const heightPercent = Math.min(100, Math.max(12, Math.round((item.yieldKg / roundedMax) * 100)));
      const tooltipText = `${item.name}: ${item.yieldKg.toLocaleString()} Kg`;

      return {
        ...item,
        barColorClass: item.barColorClass || BAR_PALETTE[idx % BAR_PALETTE.length],
        heightPercent,
        tooltipText
      };
    });

    return {
      chartItems: items,
      yAxisLabels: labels
    };
  }, [activeCropYields]);

  return (
    <div className={`farm-dashboard-root ${isDark ? 'dark-theme' : ''}`}>
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
              fill="#ffffff"
              filter="url(#wrinkleShadow)"
            />
          </svg>
        </div>

        <div className="top-nav">
          <a href="/farmdashboard" className="brand-logo" title="රන් පොළොව Home">
            <span className="logo-text">
              රන් <span>පොළොව</span>
            </span>
            <span className="module-tag">Farm Dashboard</span>
          </a>

          <div className="nav-right-actions">
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={() => setIsDark(!isDark)}
              title="Toggle Theme"
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
                  <span>{farmerName.slice(0, 2).toUpperCase()}</span>
                </div>
                <span className="user-profile-name">{farmerName}</span>
                <ChevronDownIcon size={14} />
              </button>

              <div className={`profile-dropdown ${isProfileOpen ? 'show' : ''}`}>
                <div className="dropdown-header">
                  <div className="dropdown-title">{farmerName}</div>
                  <div className="dropdown-subtitle">ROLE: FARMER</div>
                </div>
                <a href="/farm-registration" className="dropdown-link">
                  <MapPinIcon size={15} />
                  <span>Farm Location &amp; District</span>
                </a>
                <a href="/farmer-harvest" className="dropdown-link">
                  <SeedlingHarvestIcon size={15} />
                  <span>Harvest Intake Portal</span>
                </a>
                <a href="/farmer/price-confirm" className="dropdown-link">
                  <PriceTagTrendIcon size={15} />
                  <span>Confirm Harvest Prices</span>
                </a>
                <div className="dropdown-divider" />
                <a
                  href="/login"
                  className="dropdown-link"
                  style={{ color: '#ef4444' }}
                  onClick={() => localStorage.clear()}
                >
                  <XIcon size={15} />
                  <span>Sign Out</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

  
      <section className="hero-section">
        <div className="hero-doodle-bg" />

        <div className="hero-container">
          <div className="basket-showcase-box">
            <div className="basket-img-wrapper">
              <img
                src="../assets/farmer-transparent.png"
                alt="Farmer"
                className="basket-main-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                }}
              />
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <div className="chart-title-wrap">
                <h2 className="chart-title">Crop Harvest Breakdown (Kg)</h2>
                <span className="live-pill">
                  <span className="live-pulse-dot" /> Live
                </span>
              </div>
            </div>

            <div className="chart-content">
              {chartItems.length === 0 ? (
                <div className="chart-empty-state">
                  <SeedlingHarvestIcon size={32} style={{ color: '#22c55e', marginBottom: '8px' }} />
                  <p style={{ fontWeight: 600 }}>No harvests logged yet.</p>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Click &ldquo;Add Today Harvest&rdquo; below to log your harvest yields.
                  </span>
                </div>
              ) : (
                <>
                  <div className="chart-y-axis">
                    {yAxisLabels.map((lbl, i) => (
                      <span key={`${lbl}-${i}`}>{lbl}</span>
                    ))}
                  </div>

                  <div className="chart-bars-wrap">
                    {chartItems.map((item) => (
                      <div key={item.name} className="chart-bar-col">
                        <div className="chart-tooltip">{item.tooltipText}</div>
                        <div
                          className={`chart-bar-pillar ${item.barColorClass}`}
                          style={{ height: `${item.heightPercent}%` }}
                          onClick={() => showToast(item.tooltipText)}
                        />
                        <span className="chart-x-label">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

  
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Total Harvest</span>
              <span className="stat-trend">Kg</span>
            </div>
            <div className="stat-value">{dynamicStats.totalHarvestKg.toLocaleString()} kg</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Batches Logged</span>
              <span className="stat-trend">Total</span>
            </div>
            <div className="stat-value">{dynamicStats.totalBatches}</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Pending Approval</span>
              <span className="stat-trend" style={{ background: 'rgba(234, 179, 8, 0.12)', color: '#ca8a04' }}>
                Pending
              </span>
            </div>
            <div className="stat-value">{dynamicStats.pendingBatches}</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Confirmed Lots</span>
              <span className="stat-trend" style={{ background: 'rgba(34, 197, 94, 0.12)', color: '#16a34a' }}>
                Verified
              </span>
            </div>
            <div className="stat-value">{dynamicStats.confirmedBatches}</div>
          </div>
        </div>
      </section>

   
      <section className="action-grid-section">
        <div className="watercolor-accent" />

        <div className="action-row">
  
          <a
            href="/farmer-harvest"
            className="action-item"
            title="Log new field harvest lot"
          >
            <div className="action-icon-circle">
              <SeedlingHarvestIcon size={24} />
            </div>
            <h3 className="action-title">Add Today Harvest</h3>
            <p className="action-desc">Launch camera &amp; register harvest batch</p>
          </a>

  
          <a
            href="/harvest-history"
            className="action-item"
            title="Check Harvest History"
          >
            <div className="action-icon-circle">
              <HarvestHistoryIcon size={24} />
            </div>
            <h3 className="action-title">Harvest History</h3>
            <p className="action-desc">Review submitted crop batches</p>
          </a>


          <a
            href="/price-confirm"
            className="action-item"
            title="Check Market Prices & Confirm Sells"
          >
            <div className="action-icon-circle">
              <PriceTagTrendIcon size={24} />
            </div>
            <h3 className="action-title">Check Prices &amp; Confirm</h3>
            <p className="action-desc">Live market tariffs &amp; sell locks</p>
          </a>

   
          <a
            href="/farms"
            className="action-item"
            title="Register or view your farm GPS location and district"
          >
            <div className="action-icon-circle">
              <MapPinIcon size={24} />
            </div>
            <h3 className="action-title">Farm Location</h3>
            <p className="action-desc">Enroll land &amp; manage GPS district</p>
          </a>

    
          <a
            href="/farm-owner-setting"
            className="action-item"
            title="Manage account & farm profile settings"
          >
            <div className="action-icon-circle">
              <SettingsGearIcon size={24} />
            </div>
            <h3 className="action-title">Settings</h3>
            <p className="action-desc">Account &amp; farm profile preferences</p>
          </a>
        </div>
      </section>

   
      <section className="harvest-log-section">
        <div className="harvest-log-card">
          <div className="log-card-header">
            <div className="log-card-title-group">
              <h3 className="log-title">Recent Field Harvest Entries</h3>
              <span className="log-count-badge">{filteredHarvests.length} Recorded</span>
            </div>

            <div className="log-card-actions">
              <input
                type="text"
                placeholder="Filter by crop, date, status..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="log-search-input"
              />

              <a href="/farmer-harvest" className="add-harvest-btn">
                <PlusIcon size={14} />
                <span>Log Harvest</span>
              </a>
            </div>
          </div>

          <div className="log-table-wrapper">
            {filteredHarvests.length === 0 ? (
              <div style={{ padding: '42px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                No harvest entries logged yet. Click &ldquo;Log Harvest&rdquo; to add your harvest.
              </div>
            ) : (
              <table className="log-table">
                <thead>
                  <tr>
                    <th>Produce Crop</th>
                    <th>Submitted Quantity</th>
                    <th>Delivery Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHarvests.map((record) => (
                    <tr key={record.id}>
                      <td className="crop-name-cell">
                        <span className="crop-emoji">🌱</span>
                        <span>{record.cropName}</span>
                      </td>
                      <td style={{ fontWeight: 700 }}>
                        {record.quantityKg.toLocaleString()} {record.unit}
                      </td>
                      <td>{record.deliveryDate}</td>
                      <td>
                        <span className={`status-pill ${record.status.toLowerCase()}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      {toastMessage && (
        <div className="action-toast show">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default FarmDashboard;