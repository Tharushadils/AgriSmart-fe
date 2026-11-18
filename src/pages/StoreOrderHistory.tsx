import React, { useState, useEffect, useMemo, useRef, type FC, type ChangeEvent, type SVGProps } from 'react';
import api from '../service/api';
import logoImg from '../assets/logo.jpg';
import UserProfileMenu from '../components/UserProfileMenu';
import '../StoreOrderHistory.css';

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
    <path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
  </BaseIcon>
);

export const MoonIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </BaseIcon>
);

export const SearchIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </BaseIcon>
);

export const CalendarIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
  </BaseIcon>
);

export const RefreshIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 21h5v-5" />
  </BaseIcon>
);

export const StoreFrontIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /><path d="M2 7h20" />
  </BaseIcon>
);

export const PackageIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
  </BaseIcon>
);

export const CheckCircle2Icon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
  </BaseIcon>
);

export const ClockIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </BaseIcon>
);

export const PreOrderSlipIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M16.5 9.4 7.55 4.24" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.29 7 12 12 20.71 7" />
    <line x1="12" y1="22" x2="12" y2="12" />
  </BaseIcon>
);

export const StoreBranchIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
  </BaseIcon>
);

export const FinalOrderBoxIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path d="M7 7h.01" />
  </BaseIcon>
);

export const OrderHistoryIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </BaseIcon>
);

export const SettingsGearIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </BaseIcon>
);

export interface StoreOrderHistoryRecord {
  _id: string;
  orderId: string;
  date: string;
  productId?: {
    name?: string;
    category?: string;
    unit?: string;
  } | null;
  requestedQty: number;
  finalDeliveredQty: number;
  unitSellingPrice: number;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export const StoreOrderHistory: FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark', 'dark-theme');
      document.body.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark', 'dark-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [isDark]);

  const [orders, setOrders] = useState<StoreOrderHistoryRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [dateFilter, setDateFilter] = useState<string>('');

 const fetchStoreOrderHistory = async () => {
    setIsLoading(true);
    try {
      const userRaw = localStorage.getItem('user');
      const parsedUser = userRaw ? JSON.parse(userRaw) : null;
      const resolvedId =
        parsedUser?._id ||
        parsedUser?.id ||
        parsedUser?.userId ||
        localStorage.getItem('storeId');

      let res;
      if (resolvedId) {
        res = await api
          .get(`/orders/store/${resolvedId}`)
          .catch(() => api.get(`/orders/user/${resolvedId}`))
          .catch(() => api.get('/orders'));
      } else {
        res = await api.get('/orders');
      }

      const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setOrders(list);
    } catch (err: any) {
      console.error('Failed to load store order history:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreOrderHistory();
  }, []);

  const toSriLankaDateStr = (isoDate: string): string => {
    if (!isoDate) return '';
    const d = new Date(isoDate);
    if (isNaN(d.getTime())) return String(isoDate).split('T')[0];
    const slTime = new Date(d.getTime() + 5.5 * 60 * 60 * 1000);
    return slTime.toISOString().split('T')[0];
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      if (dateFilter && toSriLankaDateStr(ord.date) !== dateFilter) return false;
      if (statusFilter !== 'ALL' && (ord.status || '').toUpperCase() !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const code = (ord.orderId || '').toLowerCase();
        const prod = (ord.productId?.name || '').toLowerCase();
        if (!code.includes(q) && !prod.includes(q)) return false;
      }
      return true;
    });
  }, [orders, dateFilter, statusFilter, searchQuery]);

  return (
    <div className={`store-history-root ${isDark ? 'dark-theme' : ''}`}>
      <header className="header-wrapper">
        <div className="header-bg-svg-wrap">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0,0 L 1440,0 L 1440,82.0 L 1435,84.9 L 1430,89.0 L 1425,85.1 L 1420,81.9 L 1415,88.5 L 1410,84.7 L 1405,80.7 L 1400,86.9 L 1395,85.2 L 1390,80.9 L 1385,75.7 L 1380,69.1 L 1375,75.8 L 1370,79.7 L 1365,75.2 L 1360,81.2 L 1355,83.9 L 1350,79.3 L 1345,78.9 L 1340,76.4 L 1335,81.0 L 1330,87.4 L 1325,79.1 L 1320,76.4 L 1315,79.9 L 1310,75.6 L 1305,77.0 L 1300,81.3 L 1295,86.1 L 1290,95.7 L 1285,92.6 L 1280,87.8 L 1275,96.0 L 1270,97.6 L 1265,97.0 L 1260,100.9 L 1255,99.7 L 1250,101.7 L 1245,98.9 L 1240,90.4 L 1235,98.0 L 1230,106.1 L 1225,104.5 L 1220,108.0 L 1215,108.4 L 1210,107.9 L 1205,109.7 L 1200,103.3 L 1195,105.6 L 1190,113.5 L 1185,106.1 L 1180,99.9 L 1175,98.4 L 1170,95.1 L 1165,98.3 L 1160,97.5 L 1155,97.3 L 1150,106.8 L 1145,103.9 L 1140,95.7 L 1135,98.3 L 1130,98.9 L 1125,100.8 L 1120,101.1 L 1115,94.1 L 1110,96.2 L 1105,95.4 L 1100,85.5 L 1095,89.1 L 1090,96.3 L 1085,98.5 L 1080,101.6 L 1075,97.1 L 1070,97.1 L 1065,102.8 L 1060,96.7 L 1055,96.2 L 1050,103.0 L 1045,99.4 L 1040,95.1 L 1035,89.5 L 1030,85.4 L 1025,93.1 L 1020,93.2 L 1015,89.8 L 1010,97.1 L 1005,96.5 L 1000,90.7 L 995,89.4 L 990,86.6 L 985,91.6 L 980,93.0 L 975,82.1 L 970,81.0 L 965,81.4 L 960,74.2 L 955,75.2 L 950,78.0 L 945,82.3 L 940,88.2 L 935,80.8 L 930,78.1 L 925,85.4 L 920,83.1 L 915,82.5 L 910,85.7 L 905,84.1 L 900,85.2 L 895,79.5 L 890,73.7 L 885,84.2 L 880,89.4 L 875,88.0 L 870,93.3 L 865,93.7 L 860,94.4 L 855,95.1 L 850,90.0 L 845,96.6 L 840,102.5 L 835,93.6 L 830,90.3 L 825,89.5 L 820,87.1 L 815,90.4 L 810,88.9 L 805,91.7 L 800,100.2 L 795,93.4 L 790,87.0 L 785,90.6 L 780,89.7 L 775,90.8 L 770,88.6 L 765,82.3 L 760,84.8 L 755,79.5 L 750,70.0 L 745,76.0 L 740,81.1 L 735,82.0 L 730,83.5 L 725,78.6 L 720,80.7 L 715,83.7 L 710,76.4 L 705,79.5 L 700,85.6 L 695,80.4 L 690,76.7 L 685,71.7 L 680,71.1 L 675,79.3 L 670,77.5 L 665,77.8 L 660,86.9 L 655,84.2 L 650,79.7 L 645,79.9 L 640,79.3 L 635,85.5 L 630,84.0 L 625,74.4 L 620,76.6 L 615,74.6 L 610,67.4 L 605,70.2 L 600,73.1 L 595,77.9 L 590,80.7 L 585,71.7 L 580,72.1 L 575,77.5 L 570,72.4 L 565,72.9 L 560,75.2 L 555,72.8 L 550,72.3 L 545,64.4 L 540,61.8 L 535,73.1 L 530,74.7 L 525,74.5 L 520,80.8 L 515,80.8 L 510,82.1 L 505,81.9 L 500,79.6 L 495,89.7 L 490,93.0 L 485,84.8 L 480,85.6 L 475,85.9 L 470,85.6 L 465,90.3 L 460,90.7 L 455,98.2 L 450,106.0 L 445,98.2 L 440,96.7 L 435,102.3 L 430,101.9 L 425,104.1 L 420,101.9 L 415,98.6 L 410,101.6 L 405,93.7 L 400,87.5 L 395,96.2 L 390,99.4 L 385,100.0 L 380,100.5 L 375,96.3 L 370,99.6 L 365,99.1 L 360,91.9 L 355,97.9 L 350,101.2 L 345,94.1 L 340,90.6 L 335,85.9 L 330,87.4 L 325,93.9 L 320,90.6 L 315,94.5 L 310,102.8 L 305,97.7 L 300,94.9 L 295,96.2 L 290,97.4 L 285,103.8 L 280,99.8 L 275,93.3 L 270,97.7 L 265,93.4 L 260,88.0 L 255,93.1 L 250,96.5 L 245,101.8 L 240,101.9 L 235,93.5 L 230,97.2 L 225,99.8 L 220,93.2 L 215,95.3 L 210,96.3 L 205,92.6 L 200,89.6 L 195,79.9 L 190,80.1 L 185,89.2 L 180,86.3 L 175,86.5 L 170,91.4 L 165,88.7 L 160,88.2 L 155,85.3 L 150,84.1 L 145,93.6 L 140,91.4 L 135,82.8 L 130,84.8 L 125,83.3 L 120,82.7 L 115,86.5 L 110,87.6 L 105,97.0 L 100,101.2 L 95,92.6 L 90,95.0 L 85,100.3 L 80,99.5 L 75,102.3 L 70,100.3 L 65,99.6 L 60,101.7 L 55,92.2 L 50,90.5 L 45,100.6 L 40,102.0 L 35,102.9 L 30,103.1 L 25,100.0 L 20,103.5 L 15,99.7 L 10,94.1 L 5,101.8 L 0,101.0 Z" fill="#ffffff" />
          </svg>
        </div>
        <div className="top-nav">
          <a href="/" className="brand-logo">
            <img src={logoImg} alt=" Logo" className="brand-logo-img" />
            <span className="logo-text">රන් <span>පොළොව</span></span>
          </a>
          <div className="nav-right-actions">
            <button type="button" className="theme-toggle-btn" onClick={() => setIsDark(!isDark)}>
              {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
            </button>
            <UserProfileMenu />
          </div>
        </div>
      </header>


      <section className="page-hero-banner">
        <div className="hero-content-inner">
          <h1 className="hero-page-title">
            <StoreFrontIcon size={26} style={{ color: '#22c55e' }} />
            <span>Store Order History &amp; Fulfillment Tracking</span>
          </h1>
          <p className="hero-page-desc">
            Review past retail pre-orders, confirmed allocation quotas, unit pricing, and dispatch delivery status.
          </p>
        </div>
      </section>

      <main className="store-history-container">
        {/* Filter Bar */}
        <div className="surface-card filter-bar-card">
          <div className="search-box-wrap">
            <SearchIcon size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search Order ID or Produce Name..."
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="filter-search-input"
            />
          </div>

          <div className="filter-controls-group">
            <div className="date-filter-box">
              <CalendarIcon size={14} style={{ opacity: 0.65 }} />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="date-filter-input"
              />
              {dateFilter && (
                <button type="button" onClick={() => setDateFilter('')} className="clear-pill-btn">Clear</button>
              )}
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select-dropdown"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="ALLOCATED">Allocated</option>
              <option value="FINALIZED">Finalized</option>
              <option value="DISPATCHED">Dispatched</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            <button type="button" onClick={fetchStoreOrderHistory} className="refresh-action-btn">
              <RefreshIcon size={15} className={isLoading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="surface-card table-ledger-card">
          <div className="table-card-header">
            <h2 className="table-card-title">
              <PackageIcon size={18} style={{ color: '#22c55e' }} />
              <span>My Store Orders Ledger</span>
            </h2>
            <span className="table-count-badge">{filteredOrders.length} Records Found</span>
          </div>

          <div className="table-wrapper">
            {isLoading ? (
              <div className="table-empty-box">
                <RefreshIcon size={24} className="animate-spin" style={{ color: '#22c55e' }} />
                <span>Loading your order history...</span>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="table-empty-box">
                <span>No store order history found matching your criteria.</span>
              </div>
            ) : (
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Order Ref</th>
                    <th>Delivery Date</th>
                    <th>Produce Item</th>
                    <th className="text-right">Requested Qty</th>
                    <th className="text-right">Delivered Qty</th>
                    <th className="text-right">Unit Price (Rs.)</th>
                    <th className="text-right">Total Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((ord) => {
                    const status = (ord.status || 'PENDING').toUpperCase();
                    return (
                      <tr key={ord._id}>
                        <td>
                          <span className="order-ref-text">{ord.orderId}</span>
                        </td>
                        <td>
                          <span className="date-text">{toSriLankaDateStr(ord.date)}</span>
                        </td>
                        <td>
                          <div className="produce-name">{ord.productId?.name || 'Produce Item'}</div>
                          <div className="produce-category">{ord.productId?.category || 'FRESH PRODUCE'}</div>
                        </td>
                        <td className="text-right font-mono font-bold">
                          {Number(ord.requestedQty || 0).toLocaleString()} kg
                        </td>
                        <td className="text-right font-mono font-extrabold text-emerald-500">
                          {status === 'PENDING' ? '—' : `${Number(ord.finalDeliveredQty || ord.requestedQty || 0).toLocaleString()} kg`}
                        </td>
                        <td className="text-right font-mono text-secondary">
                          Rs. {Number(ord.unitSellingPrice || 0).toLocaleString()}
                        </td>
                        <td className="text-right font-mono font-bold">
                          Rs. {Number(ord.totalAmount || 0).toLocaleString()}
                        </td>
                        <td>
                          <span className={`status-badge ${status.toLowerCase()}`}>
                            {status === 'FINALIZED' || status === 'DISPATCHED' ? (
                              <CheckCircle2Icon size={12} />
                            ) : (
                              <ClockIcon size={12} />
                            )}
                            <span>{status.replace(/_/g, ' ')}</span>
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


      <div className="rp-floating-dock" role="navigation" aria-label="Store Quick Navigation">
        <div className="rp-floating-pill">
          {[
            { href: '/store-orders', label: 'Pre-Order Produce', icon: <PreOrderSlipIcon size={14} /> },
            { href: '/stores', label: 'My Store Details', icon: <StoreBranchIcon size={14} /> },
            { href: '/final-order', label: 'Final Order', icon: <FinalOrderBoxIcon size={14} /> },
            { href: '/order-history', label: 'Check My Orders', icon: <OrderHistoryIcon size={14} /> },
            { href: '/store-owner-setting', label: 'Settings', icon: <SettingsGearIcon size={14} /> },
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


      <footer className="footer-wrapper">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="/" className="footer-logo">
              <img src={logoImg} alt=" Logo" className="footer-logo-img" />
              <span className="footer-logo-text">රන්&nbsp;පොළොව</span>
            </a>
            <p className="footer-tagline">Agricultural Intelligence, Governance &amp; Procurement Ecosystem Sri Lanka.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} රන් පොළොව Ecosystem Sri Lanka. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default StoreOrderHistory;