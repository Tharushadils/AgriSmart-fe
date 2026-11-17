import React, { useState, useEffect, useRef, useMemo, type FC, type SVGProps } from 'react';
import api from '../service/api';
import logoImg from '../assets/logo.jpg';
import '../StoreDashboard.css';


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

export const UserIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </BaseIcon>
);

export const ChevronDownIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <polyline points="6 9 12 15 18 9" />
  </BaseIcon>
);

export const XIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </BaseIcon>
);

export const PreOrderSlipIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M9 12h6" />
    <path d="M9 16h6" />
  </BaseIcon>
);

export const StockLedgerIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <rect x="2" y="3" width="20" height="18" rx="2" />
    <line x1="2" y1="9" x2="22" y2="9" />
    <line x1="2" y1="15" x2="22" y2="15" />
    <line x1="9" y1="9" x2="9" y2="21" />
  </BaseIcon>
);

export const PriceTagTrendIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <circle cx="7" cy="7" r="1.5" />
    <path d="M8 15l2 2 4-4" />
  </BaseIcon>
);

export const PrecisionGearsIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </BaseIcon>
);

export const WarehouseIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M3 21h18M4 21V9l8-5 8 5v12" />
    <path d="M9 21v-7h6v7" />
    <line x1="9" y1="16.5" x2="15" y2="16.5" />
    <line x1="9" y1="18.5" x2="15" y2="18.5" />
    <circle cx="12" cy="7.5" r="1.5" />
  </BaseIcon>
);

export const SproutIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4.1 5.5.8z" />
    <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
  </BaseIcon>
);

//  Pre Order Produce 


//  My Store Details 
export const StoreBranchIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </BaseIcon>
);

//  Final Order 
export const FinalOrderBoxIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
    <path d="m9 15 2 2 4-4" />
  </BaseIcon>
);

//  Check My Orders 
export const OrderHistoryIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l4 2" />
  </BaseIcon>
);

//  Settings 
export const SettingsGearIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </BaseIcon>
);

export interface StoreProduceStockItem {
  id: string;
  name: string;
  stockKg: number;
  dispatchedKg: number;
  barColorClass?: string;
}

export interface StoreStatsSummary {
  totalRequestedKg: number;
  totalAllocatedKg: number;
  totalDeliveredKg: number;
  activeOrdersCount: number;
  totalSpendLkr: number;
}

export interface StoreOrderLogItem {
  id: string;
  orderId: string;
  cropName: string;
  requestedQty: number;
  allocatedQty: number;
  finalDeliveredQty: number;
  totalAmount: number;
  date: string;
  status: string;
}

export interface StoreUserProfile {
  storeName?: string;
  storeId?: string;
  userId?: string;
  location?: string;
  managerName?: string;
  initials?: string;
}

const BAR_PALETTE = ['bar-color-1', 'bar-color-2', 'bar-color-3', 'bar-color-4', 'bar-color-5', 'bar-color-6'];


export const StoreDashboard: FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('agrismart_theme');
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
      localStorage.setItem('agrismart_theme', isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const [currentStore, setCurrentStore] = useState<StoreUserProfile | null>(null);
  const [dynamicStats, setDynamicStats] = useState<StoreStatsSummary>({
    totalRequestedKg: 0,
    totalAllocatedKg: 0,
    totalDeliveredKg: 0,
    activeOrdersCount: 0,
    totalSpendLkr: 0,
  });

  const [inventoryItems, setInventoryItems] = useState<StoreProduceStockItem[]>([]);
  const [storeOrders, setStoreOrders] = useState<StoreOrderLogItem[]>([]);
  const [chartMetric, setChartMetric] = useState<'requested' | 'allocated'>('requested');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const [toastMessage, setToastMessage] = useState<string>('');
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  
  useEffect(() => {
    let activeUserId = '';
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        activeUserId = u._id || u.userId || '';
        const name = u.fullName || u.name || '';
        setCurrentStore({
          storeName: u.storeName || u.name || 'My Store',
          storeId: u.storeId || u._id || '',
          userId: activeUserId,
          location: u.district || u.location || '',
          managerName: name,
          initials: name ? name.slice(0, 2).toUpperCase() : 'ST',
        });
      } catch {
        // ignore parse error
      }
    }

    const loadStoreData = async () => {
      if (!activeUserId) return;

      try {
      
        const ordersRes = await api.get(`/orders/store/${activeUserId}`);
        const ordersList: any[] = ordersRes.data?.data || ordersRes.data || [];

        let reqKg = 0;
        let allocKg = 0;
        let delivKg = 0;
        let spendLkr = 0;

        const mappedOrders: StoreOrderLogItem[] = ordersList.map((ord: any) => {
          const rQty = Number(ord.requestedQty || 0);
          const aQty = Number(ord.allocatedQty || 0);
          const fQty = Number(ord.finalDeliveredQty || aQty);
          const amt = Number(ord.totalAmount || 0);

          reqKg += rQty;
          allocKg += aQty;
          delivKg += fQty;
          spendLkr += amt;

          return {
            id: ord._id,
            orderId: ord.orderId || String(ord._id).slice(-6).toUpperCase(),
            cropName: ord.productId?.name || 'Produce',
            requestedQty: rQty,
            allocatedQty: aQty,
            finalDeliveredQty: fQty,
            totalAmount: amt,
            date: ord.date ? new Date(ord.date).toLocaleDateString() : '',
            status: ord.status || 'PENDING',
          };
        });

        setStoreOrders(mappedOrders);
        setDynamicStats({
          totalRequestedKg: reqKg,
          totalAllocatedKg: allocKg,
          totalDeliveredKg: delivKg,
          activeOrdersCount: mappedOrders.length,
          totalSpendLkr: spendLkr,
        });

        
        const cropTotalsMap = new Map<string, { requested: number; allocated: number }>();
        mappedOrders.forEach((o) => {
          const current = cropTotalsMap.get(o.cropName) || { requested: 0, allocated: 0 };
          current.requested += o.requestedQty;
          current.allocated += o.allocatedQty;
          cropTotalsMap.set(o.cropName, current);
        });

        const chartBars: StoreProduceStockItem[] = Array.from(cropTotalsMap.entries()).map(([crop, val], idx) => ({
          id: String(idx),
          name: crop,
          stockKg: val.requested,
          dispatchedKg: val.allocated,
          barColorClass: BAR_PALETTE[idx % BAR_PALETTE.length],
        }));

        setInventoryItems(chartBars);
      } catch (err: any) {
        console.warn('Failed to load store orders data:', err?.message);
      }
    };

    loadStoreData();
  }, []);

  // Compute Chart Scaling
  const { renderedChartBars, yAxisLabels } = useMemo(() => {
    if (inventoryItems.length === 0) {
      return { renderedChartBars: [], yAxisLabels: [] };
    }

    const values = inventoryItems.map((item) =>
      chartMetric === 'requested' ? item.stockKg : item.dispatchedKg
    );
    const highestVal = Math.max(...values, 0);

    if (highestVal === 0) {
      return { renderedChartBars: [], yAxisLabels: [] };
    }

    const roundedMax = Math.ceil(highestVal / 10) * 10 || 10;
    const formatY = (val: number) => (val >= 1000 ? `${Math.round(val / 1000)}K` : `${val}`);

    const labels = [
      formatY(roundedMax),
      formatY(Math.round(roundedMax * 0.66)),
      formatY(Math.round(roundedMax * 0.33)),
      '0',
    ];

    const bars = inventoryItems.map((item, idx) => {
      const rawVal = chartMetric === 'requested' ? item.stockKg : item.dispatchedKg;
      const heightPercent = Math.min(100, Math.max(8, Math.round((rawVal / roundedMax) * 100)));
      const tooltipText =
        chartMetric === 'requested'
          ? `${item.name}: ${item.stockKg.toLocaleString()} Kg Requested`
          : `${item.name}: ${item.dispatchedKg.toLocaleString()} Kg Allocated`;

      return {
        ...item,
        barColorClass: item.barColorClass || BAR_PALETTE[idx % BAR_PALETTE.length],
        heightPercent,
        tooltipText,
      };
    });

    return { renderedChartBars: bars, yAxisLabels: labels };
  }, [inventoryItems, chartMetric]);

  // Log Table Search Filter
  const filteredOrders = useMemo(() => {
    if (!searchFilter.trim()) return storeOrders;
    const q = searchFilter.toLowerCase().trim();
    return storeOrders.filter(
      (ord) =>
        ord.orderId.toLowerCase().includes(q) ||
        ord.cropName.toLowerCase().includes(q) ||
        ord.status.toLowerCase().includes(q)
    );
  }, [storeOrders, searchFilter]);

  const displayName = currentStore?.managerName || currentStore?.storeName || '';
  const displayInitials = currentStore?.initials || (displayName ? displayName.slice(0, 2).toUpperCase() : 'ST');

  return (
    <div className={`store-dashboard-root ${isDark ? 'dark-theme' : ''}`}>
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
                aria-expanded={isProfileOpen}
              >
                <div className="user-avatar-circle">
                  <span>{displayInitials || <UserIcon size={14} />}</span>
                  <span className="user-status-dot" />
                </div>
                {displayName && <span className="user-profile-name">{displayName}</span>}
                <ChevronDownIcon size={14} />
              </button>

              <div className={`profile-dropdown ${isProfileOpen ? 'show' : ''}`}>
                <div className="dropdown-header">
                  <div className="dropdown-title">{currentStore?.storeName || displayName}</div>
                  {currentStore?.location && (
                    <div className="dropdown-subtitle">{currentStore.location}</div>
                  )}
                </div>
                <a href="/store-orders" className="dropdown-link">
                  <PreOrderSlipIcon size={15} />
                  <span>Pre-Order Produce</span>
                </a>
                <a href="/stores" className="dropdown-link">
                  <WarehouseIcon size={15} />
                  <span>My Store Details</span>
                </a>
                <a href="/allocation" className="dropdown-link">
                  <PrecisionGearsIcon size={15} />
                  <span>My Allocations</span>
                </a>
                <a href="/district-price" className="dropdown-link">
                  <PriceTagTrendIcon size={15} />
                  <span>Market Prices</span>
                </a>
                <div className="dropdown-divider" />
                <a
                  href="/login"
                  className="dropdown-link"
                  style={{ color: '#ef4444' }}
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('ACCESS_TOKEN');
                    localStorage.removeItem('user');
                  }}
                >
                  <XIcon size={15} />
                  <span>Log Out</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/*  Store Orders Visualization */}
      <section className="hero-section">
        <div className="hero-doodle-bg" />

        <div className="hero-container">
          <div className="basket-showcase-box">
            <div className="basket-img-wrapper">
              <img
                src={logoImg}
                alt=" Logo"
                className="hero-chart-logo-img"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/logo.png';
                }}
              />
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <div className="chart-title-wrap">
                <h2 className="chart-title">My Pre-Order Requisitions</h2>
                <span className="live-pill">
                  <span className="live-pulse-dot" />
                  Store Orders
                </span>
              </div>

              <div className="chart-metric-toggle">
                <button
                  type="button"
                  className={`chart-toggle-btn ${chartMetric === 'requested' ? 'active' : ''}`}
                  onClick={() => setChartMetric('requested')}
                >
                  Requested (Kg)
                </button>
                <button
                  type="button"
                  className={`chart-toggle-btn ${chartMetric === 'allocated' ? 'active' : ''}`}
                  onClick={() => setChartMetric('allocated')}
                >
                  Allocated (Kg)
                </button>
              </div>
            </div>

            <div className="chart-content">
              {renderedChartBars.length === 0 ? (
                <div className="chart-empty-state">
                  <StockLedgerIcon size={32} style={{ color: '#22c55e', marginBottom: '8px', opacity: 0.8 }} />
                  <p style={{ fontWeight: 600 }}>No pre-orders submitted for this store yet.</p>
                </div>
              ) : (
                <>
                  <div className="chart-y-axis">
                    {yAxisLabels.map((lbl, i) => (
                      <span key={`${lbl}-${i}`}>{lbl}</span>
                    ))}
                  </div>

                  <div className="chart-guidelines">
                    <div className="chart-grid-line" />
                    <div className="chart-grid-line" />
                    <div className="chart-grid-line" />
                    <div className="chart-grid-line" />
                  </div>

                  <div className="chart-bars-wrap">
                    {renderedChartBars.map((bar) => (
                      <div key={bar.id} className="chart-bar-col">
                        <div className="chart-tooltip">{bar.tooltipText}</div>
                        <div
                          className={`chart-bar-pillar ${bar.barColorClass}`}
                          style={{ height: `${bar.heightPercent}%` }}
                          onClick={() => showToast(bar.tooltipText)}
                          title={bar.tooltipText}
                        />
                        <span className="chart-x-label">{bar.name}</span>
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
          <div
            className="stat-card"
            onClick={() => showToast(`Total Requested: ${dynamicStats.totalRequestedKg.toLocaleString()} Kg`)}
          >
            <div className="stat-header">
              <span className="stat-label">Total Requested</span>
            </div>
            <div className="stat-value">
              {dynamicStats.totalRequestedKg > 0 ? `${dynamicStats.totalRequestedKg.toLocaleString()} kg` : '0 kg'}
            </div>
          </div>

          <div
            className="stat-card"
            onClick={() => showToast(`Total Allocated Quota: ${dynamicStats.totalAllocatedKg.toLocaleString()} Kg`)}
          >
            <div className="stat-header">
              <span className="stat-label">Allocated Quota</span>
            </div>
            <div className="stat-value" style={{ color: '#22c55e' }}>
              {dynamicStats.totalAllocatedKg.toLocaleString()} kg
            </div>
          </div>

          <div
            className="stat-card"
            onClick={() => showToast(`Final Confirmed Volume: ${dynamicStats.totalDeliveredKg.toLocaleString()} Kg`)}
          >
            <div className="stat-header">
              <span className="stat-label">Final Volume</span>
              <span className="stat-trend">{dynamicStats.activeOrdersCount} Orders</span>
            </div>
            <div className="stat-value">
              {dynamicStats.totalDeliveredKg.toLocaleString()} kg
            </div>
          </div>

          <div
            className="stat-card"
            onClick={() => showToast(`Estimated Procurement Cost: LKR ${dynamicStats.totalSpendLkr.toLocaleString()}`)}
          >
            <div className="stat-header">
              <span className="stat-label">Estimated Spend</span>
            </div>
            <div className="stat-value">
              LKR {dynamicStats.totalSpendLkr.toLocaleString()}
            </div>
          </div>
        </div>
      </section>

   
      <section className="action-grid-section">
  <div className="watercolor-accent" />

  <div className="action-row">
    {/*  Order Danna  */}
    <a href="/store-orders" className="action-item">
      <div className="action-icon-circle">
        <PreOrderSlipIcon size={24} />
      </div>
      <h3 className="action-title">Pre-Order Produce</h3>
      <p className="action-desc">Submit next-day wholesale requisitions</p>
    </a>

    {/* Store ek add krnna  */}
    <a href="/stores" className="action-item">
      <div className="action-icon-circle">
        <StoreBranchIcon size={24} />
      </div>
      <h3 className="action-title">My Store Details</h3>
      <p className="action-desc">Register or update retail branch &amp; geo location</p>
    </a>

    {/* Allocation ek blnna  */}
    <a href="/final-order" className="action-item">
      <div className="action-icon-circle">
        <FinalOrderBoxIcon size={24} />
      </div>
      <h3 className="action-title">Final Order</h3>
      <p className="action-desc">Check 5:00 AM released quotas &amp; extra stocks</p>
    </a>

    {/* view previous orders */}
    <a href="/order-history" className="action-item">
      <div className="action-icon-circle">
        <OrderHistoryIcon size={24} />
      </div>
      <h3 className="action-title">Check My Orders</h3>
      <p className="action-desc">Track past requisitions &amp; delivery status</p>
    </a>

    {/*  settings */}
    <a href="/user-setting" className="action-item">
      <div className="action-icon-circle">
        <SettingsGearIcon size={24} />
      </div>
      <h3 className="action-title">Settings</h3>
      <p className="action-desc">Account &amp; system preferences</p>
    </a>
  </div>
</section>

      {/*  Store Orders Ledger */}
      <section className="store-log-section">
        <div className="store-log-card">
          <div className="log-card-header">
            <div className="log-card-title-group">
              <h3 className="log-title">My Recent Pre-Orders</h3>
              <span className="log-count-badge">{filteredOrders.length} Orders</span>
            </div>

            <div className="log-card-actions">
              <input
                type="text"
                placeholder="Filter by Order ID, Produce, Status..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="log-search-input"
              />
            </div>
          </div>

          <div className="log-table-wrapper">
            {filteredOrders.length === 0 ? (
              <div style={{ padding: '42px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                {searchFilter.trim()
                  ? `No store orders found matching "${searchFilter}".`
                  : 'No pre-orders placed yet. Click "Pre-Order Produce" above to create one.'}
              </div>
            ) : (
              <table className="log-table">
                <thead>
                  <tr>
                    <th>Order Code</th>
                    <th>Produce Crop</th>
                    <th>Requested (Kg)</th>
                    <th>Allocated (Kg)</th>
                    <th>Confirmed Vol</th>
                    <th>Est. Amount</th>
                    <th>Delivery Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--brand-dark-green)' }}>
                        {ord.orderId}
                      </td>
                      <td style={{ fontWeight: 600 }}>{ord.cropName}</td>
                      <td>{ord.requestedQty.toLocaleString()} Kg</td>
                      <td style={{ fontWeight: 700, color: ord.allocatedQty > 0 ? '#10b981' : 'inherit' }}>
                        {ord.allocatedQty > 0 ? `${ord.allocatedQty.toLocaleString()} Kg` : 'Pending'}
                      </td>
                      <td>{ord.finalDeliveredQty.toLocaleString()} Kg</td>
                      <td style={{ fontWeight: 600 }}>
                        {ord.totalAmount > 0 ? `Rs. ${ord.totalAmount.toLocaleString()}` : '—'}
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{ord.date || '—'}</td>
                      <td>
                        <span className={`status-pill ${ord.status.toLowerCase()}`}>
                          {ord.status}
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

      <div className={`action-toast ${toastMessage ? 'show' : ''}`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>{toastMessage}</span>
      </div>


      <footer className="footer-wrapper">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="/" className="footer-logo">
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
            <a href="/store-orders" className="footer-link-item">Pre-Order</a>
            <a href="/stores" className="footer-link-item">My Store</a>
            <a href="/allocation" className="footer-link-item">Allocations</a>
            <a href="/district-price" className="footer-link-item">Market Prices</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} රන් පොළොව Ecosystem Sri Lanka. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default StoreDashboard;