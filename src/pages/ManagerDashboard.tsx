import React, { useState, useEffect, useRef, useMemo, type FC, type SVGProps, type FormEvent, type ChangeEvent } from 'react';
import api from '../service/api';
import logoImg from '../assets/logo.jpg';
import '../ManagerDashboard.css';


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

export const UsersGroupIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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

export const SearchIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
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

export const OrderChecklistIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M8 11l2 2 4-4" />
    <line x1="8" y1="17" x2="16" y2="17" />
  </BaseIcon>
);

export const PriceTagTrendIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <circle cx="7" cy="7" r="1.5" />
    <path d="M8 15l3-3 2 2 3-3" />
    <polyline points="13 11 16 11 16 14" />
  </BaseIcon>
);

export const WarehouseInventoryIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <line x1="2" y1="20" x2="22" y2="20" />
    <path d="M4 20v2M12 20v2M20 20v2" />
    <rect x="3" y="12" width="8" height="7" rx="1" />
    <rect x="13" y="12" width="8" height="7" rx="1" />
    <rect x="8" y="4" width="8" height="7" rx="1" />
  </BaseIcon>
);

export const CargoTruckIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <rect x="1" y="3" width="14" height="13" rx="1" />
    <path d="M15 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="17.5" cy="18.5" r="2.5" />
    <line x1="8" y1="12" x2="11" y2="12" />
  </BaseIcon>
);

export const FarmBarnIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M3 10L12 3l9 7" />
    <path d="M4 10v10h16V10" />
    <path d="M9 20v-6h6v6" />
    <path d="M9 14l6 6M15 14l-6 6" />
    <path d="M19 8V5a2 2 0 0 0-4 0v3" />
  </BaseIcon>
);

export const StoreFrontIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M3 9l1-5h16l1 5" />
    <path d="M3 9a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 3 0" />
    <path d="M4 9v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" />
    <polyline points="9 15 11 17 15 13" />
  </BaseIcon>
);

export const CollectionHubIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M3 21h18M4 21V9l8-5 8 5v12" />
    <path d="M9 21v-7h6v7" />
    <line x1="9" y1="16.5" x2="15" y2="16.5" />
    <line x1="9" y1="18.5" x2="15" y2="18.5" />
    <circle cx="12" cy="7.5" r="1.5" />
  </BaseIcon>
);

export const PrecisionGearsIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </BaseIcon>
);

export const LayersIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
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

//  Allocation for Farmers 
export const SeedlingAllocationIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
    <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
  </BaseIcon>
);

//  View Farmer Promise 
export const FarmerPromiseIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <rect x="3" y="5" width="6" height="6" rx="1" />
    <path d="m3 17 2 2 4-4" />
    <path d="M13 6h8" />
    <path d="M13 12h8" />
    <path d="M13 18h8" />
  </BaseIcon>
);

//  Harvest Transfer 
export const HarvestTransferIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </BaseIcon>
);

//  Settings 
export const SettingsGearIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </BaseIcon>
);


export interface OrderChartItem {
  id: string;
  name: string;
  orderCount: number;
  volumeTons: number;
  barColorClass?: string;
}

export interface ManagerStatsSummary {
  totalUsers: number;
  totalFarms: number;
  totalStores: number;
  totalCollectionCenters: number;
}

export type ActivityCategory = 'ORDER' | 'HARVEST' | 'PRICE' | 'INVENTORY' | 'ALLOCATION';
export type ActivityStatus = 'COMPLETED' | 'IN_TRANSIT' | 'PENDING' | 'VERIFIED';

export interface ManagerActivityLogItem {
  id: string;
  category: ActivityCategory;
  stakeholder: string;
  entity: string;
  volumeMetric: string;
  timestamp: string;
  status: ActivityStatus;
}

export interface ManagerUserProfile {
  name?: string;
  role?: string;
  email?: string;
  initials?: string;
}

const BAR_PALETTE = ['bar-color-1', 'bar-color-2', 'bar-color-3', 'bar-color-4', 'bar-color-5', 'bar-color-6'];

export const ManagerDashboard: FC = () => {
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

  // State
  const [currentUser, setCurrentUser] = useState<ManagerUserProfile | null>(null);
  const [dynamicStats, setDynamicStats] = useState<ManagerStatsSummary>({
    totalUsers: 0,
    totalFarms: 0,
    totalStores: 0,
    totalCollectionCenters: 0,
  });
  const [chartItemsData, setChartItemsData] = useState<OrderChartItem[]>([]);
  const [activityLogs, setActivityLogs] = useState<ManagerActivityLogItem[]>([]);
  const [chartMetric, setChartMetric] = useState<'orders' | 'volume'>('orders');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formCategory, setFormCategory] = useState<ActivityCategory>('ORDER');
  const [formStakeholder, setFormStakeholder] = useState<string>('');
  const [formEntity, setFormEntity] = useState<string>('');
  const [formVolumeMetric, setFormVolumeMetric] = useState<string>('');
  const [formStatus, setFormStatus] = useState<ActivityStatus>('PENDING');

  const [searchFilter, setSearchFilter] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string>('');
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => setToastMessage(''), 3200);
  };


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

    const loadBackendData = async () => {
     
      const fetchList = async (path: string) => {
        try {
          const res = await api.get(`${path}/all`);
          return Array.isArray(res.data) ? res.data : res.data?.data || [];
        } catch {
          try {
            const resRoot = await api.get(path);
            return Array.isArray(resRoot.data) ? resRoot.data : resRoot.data?.data || [];
          } catch {
            return [];
          }
        }
      };

      try {
       
        const [farms, stores, centers, harvests, orders, products] = await Promise.all([
          fetchList('/farms'),
          fetchList('/stores'),
          fetchList('/collection-centers'),
          fetchList('/harvests'),
          fetchList('/orders'),
          fetchList('/products')
        ]);

        
        const calculatedFarms = farms.length;
        const calculatedStores = stores.length;
        const calculatedCenters = centers.length;
        const estimatedStakeholders = calculatedFarms + calculatedStores + (calculatedCenters > 0 ? calculatedCenters : 1);

        setDynamicStats({
          totalUsers: estimatedStakeholders,
          totalFarms: calculatedFarms,
          totalStores: calculatedStores,
          totalCollectionCenters: calculatedCenters,
        });

        //  Product Map for lookup
        const productMap = new Map<string, string>();
        products.forEach((p: any) => {
          const id = String(p._id || p.id || '');
          const name = p.name || p.cropName || p.productName || '';
          if (id && name) productMap.set(id, name);
        });

        //  Identify Today in both local time and UTC
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const todayLocal = `${year}-${month}-${day}`;
        const todayUtc = now.toISOString().split('T')[0];

        const matchesDate = (h: any, targetDate: string) => {
          const dateVal = h.date || h.createdAt;
          if (!dateVal) return false;
          try {
            const d = new Date(dateVal);
            if (isNaN(d.getTime())) return false;
            const hLocal = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            const hUtc = d.toISOString().split('T')[0];
            return hLocal === targetDate || hUtc === targetDate;
          } catch {
            return false;
          }
        };

        // Filter harvests specifically for today
        let todaysHarvests = harvests.filter((h: any) => matchesDate(h, todayLocal) || matchesDate(h, todayUtc));

        // If today doesn't have records yet, fall back to the most recent harvest records
        if (todaysHarvests.length === 0 && harvests.length > 0) {
          const sortedHarvests = [...harvests].sort((a: any, b: any) => {
            const timeA = new Date(a.date || a.createdAt || 0).getTime();
            const timeB = new Date(b.date || b.createdAt || 0).getTime();
            return timeB - timeA;
          });
          const latestDateVal = sortedHarvests[0]?.date || sortedHarvests[0]?.createdAt;
          if (latestDateVal) {
            const latestDate = new Date(latestDateVal).toISOString().split('T')[0];
            todaysHarvests = harvests.filter((h: any) => matchesDate(h, latestDate));
          } else {
            todaysHarvests = harvests.slice(0, 10);
          }
        }

        //  Group today's harvests by Produce for the Bar Chart
        if (todaysHarvests.length > 0) {
          const cropTotalsMap = new Map<string, { id: string; name: string; count: number; totalKg: number }>();

          todaysHarvests.forEach((h: any, idx: number) => {
            const rawId = typeof h.productId === 'object' ? h.productId?._id : h.productId;
            const cropName =
              (typeof h.productId === 'object' && h.productId?.name) ||
              h.productName ||
              h.cropName ||
              productMap.get(String(rawId)) ||
              (h.name ? String(h.name) : `Produce #${idx + 1}`);

            const qty = Number(h.qty || h.quantity || 0);

            const current = cropTotalsMap.get(cropName) || {
              id: String(rawId || h._id || idx),
              name: cropName,
              count: 0,
              totalKg: 0,
            };
            current.count += 1;
            current.totalKg += qty;
            cropTotalsMap.set(cropName, current);
          });

          const chartData: OrderChartItem[] = Array.from(cropTotalsMap.values())
            .sort((a, b) => b.totalKg - a.totalKg)
            .slice(0, 6)
            .map((item, idx) => ({
              id: item.id,
              name: item.name,
              orderCount: item.count,
              volumeTons: Number((item.totalKg / 1000).toFixed(2)),
              barColorClass: BAR_PALETTE[idx % BAR_PALETTE.length],
            }));

          setChartItemsData(chartData);

          // Map Activity Logs from harvest records
          const logs: ManagerActivityLogItem[] = todaysHarvests.slice(0, 5).map((item: any, idx: number) => {
            const rawPId = typeof item.productId === 'object' ? item.productId?._id : item.productId;
            const pName = (typeof item.productId === 'object' && item.productId?.name) || productMap.get(String(rawPId)) || item.name || 'Fresh Produce';
            const farmName = (typeof item.farmId === 'object' && (item.farmId?.name || item.farmId?.fullName)) || 'Registered Farm';
            return {
              id: item.harvestId || `HV-${String(item._id || idx).slice(-4).toUpperCase()}`,
              category: 'HARVEST' as ActivityCategory,
              stakeholder: farmName,
              entity: pName,
              volumeMetric: `${item.qty || item.quantity || 0} kg`,
              timestamp: new Date(item.date || item.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              status: item.status || 'SUBMITTED',
            };
          });
          setActivityLogs(logs);
        } else {
          setChartItemsData([]);
        }
      } catch (err) {
        console.warn('Dashboard data fetch completed with partials.');
      }
    };

    loadBackendData();
  }, []);

  // Compute dynamic scale and percentage height for each bar
  const { renderedChartBars, yAxisLabels } = useMemo(() => {
    if (!chartItemsData || chartItemsData.length === 0) {
      return {
        renderedChartBars: [],
        yAxisLabels: [],
      };
    }

    const values = chartItemsData.map((item) =>
      chartMetric === 'orders' ? item.orderCount : item.volumeTons
    );
    const highestVal = Math.max(...values, 0.1);

    const roundedMax =
      chartMetric === 'orders'
        ? Math.max(Math.ceil(highestVal / 2) * 2, 4)
        : Math.max(Math.ceil(highestVal * 2) / 2, 0.5);

    const formatY = (val: number) => {
      if (val === 0) return '0';
      if (chartMetric === 'orders') {
        return `${val}`;
      }
      return val >= 1 ? `${val.toFixed(1)} T` : `${Math.round(val * 1000)} kg`;
    };

    const labels = [
      formatY(roundedMax),
      formatY(Number((roundedMax * 0.66).toFixed(2))),
      formatY(Number((roundedMax * 0.33).toFixed(2))),
      '0',
    ];

    const bars = chartItemsData.map((item, idx) => {
      const rawVal = chartMetric === 'orders' ? item.orderCount : item.volumeTons;
      const heightPercent = Math.min(100, Math.max(12, Math.round((rawVal / roundedMax) * 100)));
      const tooltipText =
        chartMetric === 'orders'
          ? `${item.name}: ${item.orderCount} Harvest ${item.orderCount === 1 ? 'Batch' : 'Batches'}`
          : `${item.name}: ${item.volumeTons >= 0.1 ? item.volumeTons.toFixed(2) + ' T' : Math.round(item.volumeTons * 1000) + ' kg'} Harvested`;

      return {
        ...item,
        barColorClass: item.barColorClass || BAR_PALETTE[idx % BAR_PALETTE.length],
        heightPercent,
        tooltipText,
      };
    });

    return {
      renderedChartBars: bars,
      yAxisLabels: labels,
    };
  }, [chartItemsData, chartMetric]);

  // Log Table Filter
  const filteredLogs = useMemo(() => {
    if (!searchFilter.trim()) return activityLogs;
    const q = searchFilter.toLowerCase().trim();
    return activityLogs.filter(
      (log) =>
        log.id.toLowerCase().includes(q) ||
        log.stakeholder.toLowerCase().includes(q) ||
        log.entity.toLowerCase().includes(q) ||
        log.category.toLowerCase().includes(q) ||
        log.status.toLowerCase().includes(q)
    );
  }, [activityLogs, searchFilter]);

  // Handle Form Submit for New Dispatch
  const handleAddLogSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formStakeholder.trim() || !formEntity.trim()) {
      showToast('Please provide stakeholder and entity details.');
      return;
    }

    const newLog: ManagerActivityLogItem = {
      id: `OPS-${Date.now().toString().slice(-4)}`,
      category: formCategory,
      stakeholder: formStakeholder.trim(),
      entity: formEntity.trim(),
      volumeMetric: formVolumeMetric.trim() || 'Logged Entry',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: formStatus,
    };

    setActivityLogs((prev) => [newLog, ...prev]);
    showToast(`Notice ${newLog.id} recorded.`);

    setFormStakeholder('');
    setFormEntity('');
    setFormVolumeMetric('');
    setIsModalOpen(false);
  };

  const profileName = currentUser?.name || 'Manager';
  const profileRole = currentUser?.role || 'MANAGER';
  const profileEmail = currentUser?.email || '';
  const profileInitials = currentUser?.initials || (profileName ? profileName.slice(0, 2).toUpperCase() : 'MG');

  return (
    <div className={`manager-dashboard-root ${isDark ? 'dark-theme' : ''}`}>
      
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
              title="Toggle Dark / Light Theme"
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
                  <span>{profileInitials || <UserIcon size={14} />}</span>
                  <span className="user-status-dot" />
                </div>
                {profileName && <span className="user-profile-name">{profileName}</span>}
                <ChevronDownIcon size={14} />
              </button>

              <div className={`profile-dropdown ${isProfileOpen ? 'show' : ''}`}>
                <div className="dropdown-header">
                  <div className="dropdown-title">{profileRole}</div>
                  {profileEmail && <div className="dropdown-subtitle">{profileEmail}</div>}
                </div>
                <a href="/user" className="dropdown-link">
                  <UsersGroupIcon size={15} />
                  <span>Stakeholder Ops</span>
                </a>
                <a href="/allocation" className="dropdown-link">
                  <LayersIcon size={15} />
                  <span>Allocation Hub</span>
                </a>
                <a href="/farmdashboard" className="dropdown-link">
                  <SproutIcon size={15} />
                  <span>Farm Dashboard</span>
                </a>
                <a href="/buy" className="dropdown-link">
                  <PriceTagTrendIcon size={15} />
                  <span>Procurement Desk</span>
                </a>
                <div className="dropdown-divider" />
                <a href="/login" className="dropdown-link" style={{ color: '#ef4444' }}>
                  <XIcon size={15} />
                  <span>Log Out</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/*  Live Chart Banner */}
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
                <h2 className="chart-title">Today's Harvest Yields</h2>
                <span className="live-pill">
                  <span className="live-pulse-dot" />
                  Live Harvests
                </span>
              </div>

              <div className="chart-metric-toggle">
                <button
                  type="button"
                  className={`chart-toggle-btn ${chartMetric === 'orders' ? 'active' : ''}`}
                  onClick={() => setChartMetric('orders')}
                >
                  Batches
                </button>
                <button
                  type="button"
                  className={`chart-toggle-btn ${chartMetric === 'volume' ? 'active' : ''}`}
                  onClick={() => setChartMetric('volume')}
                >
                  Tonnage
                </button>
              </div>
            </div>

            <div className="chart-content">
              {renderedChartBars.length === 0 ? (
                <div className="chart-empty-state">
                  <SeedlingHarvestIcon size={32} style={{ color: '#22c55e', marginBottom: '8px', opacity: 0.8 }} />
                  <p style={{ fontWeight: 600 }}>No harvest records logged for today yet.</p>
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
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Total Stakeholders</span>
            </div>
            <div className="stat-value">{dynamicStats.totalUsers.toLocaleString()}</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Total Farms</span>
            </div>
            <div className="stat-value">{dynamicStats.totalFarms.toLocaleString()}</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Total Stores</span>
              <span className="stat-trend">Active</span>
            </div>
            <div className="stat-value">{dynamicStats.totalStores.toLocaleString()}</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Total Collection Centers</span>
              <span className="stat-trend">Islandwide</span>
            </div>
            <div className="stat-value">{dynamicStats.totalCollectionCenters.toLocaleString()}</div>
          </div>
        </div>
      </section>


      <section className="action-grid-section">
        <div className="watercolor-accent" />

        <div className="action-row">
          <a href="/manager-harvests" className="action-item">
            <div className="action-icon-circle">
              <SeedlingHarvestIcon size={26} />
            </div>
            <h3 className="action-title">View Harvest</h3>
            <p className="action-desc">Seasonal yield &amp; intake</p>
          </a>

          <a href="/manager-orders" className="action-item">
            <div className="action-icon-circle">
              <OrderChecklistIcon size={26} />
            </div>
            <h3 className="action-title">View Orders</h3>
            <p className="action-desc">Dispatch &amp; fulfillment</p>
          </a>

          <a href="/district-price" className="action-item">
            <div className="action-icon-circle">
              <PriceTagTrendIcon size={26} />
            </div>
            <h3 className="action-title">Price Release</h3>
            <p className="action-desc">Daily market tariffs</p>
          </a>

          <a href="/inventory" className="action-item">
            <div className="action-icon-circle">
              <WarehouseInventoryIcon size={26} />
            </div>
            <h3 className="action-title">Center Inventory</h3>
            <p className="action-desc">Hub stock &amp; tonnage</p>
          </a>

          <a href="/allocation" className="action-item">
            <div className="action-icon-circle">
              <PrecisionGearsIcon size={26} />
            </div>
            <h3 className="action-title">Allocations</h3>
            <p className="action-desc">Resource quotas</p>
          </a>
        </div>

        <div className="action-row">
          <a href="/procurement" className="action-item">
            <div className="action-icon-circle">
              <SeedlingAllocationIcon size={26} />
            </div>
            <h3 className="action-title">Allocation for Farmers</h3>
            <p className="action-desc">Resource &amp; quota distribution</p>
          </a>

          <a href="/farmer-procurement" className="action-item">
            <div className="action-icon-circle">
              <FarmerPromiseIcon size={26} />
            </div>
            <h3 className="action-title">View Farmer Promise</h3>
            <p className="action-desc">Pledged harvest &amp; commitments</p>
          </a>

          <a href="/center-transfer" className="action-item">
            <div className="action-icon-circle">
              <HarvestTransferIcon size={26} />
            </div>
            <h3 className="action-title">Harvest Transfer</h3>
            <p className="action-desc">Center-to-center stock dispatch</p>
          </a>

          <a href="/user-setting" className="action-item">
            <div className="action-icon-circle">
              <SettingsGearIcon size={26} />
            </div>
            <h3 className="action-title">Settings</h3>
            <p className="action-desc">Account &amp; system preferences</p>
          </a>
         
        </div>

        <div className="action-row">
          <a href="/manager-farms" className="action-item">
            <div className="action-icon-circle">
              <FarmBarnIcon size={26} />
            </div>
            <h3 className="action-title">Farms</h3>
            <p className="action-desc">Grower network</p>
          </a>

          <a href="/manager-stores" className="action-item">
            <div className="action-icon-circle">
              <StoreFrontIcon size={26} />
            </div>
            <h3 className="action-title">Stores</h3>
            <p className="action-desc">Retail partner network</p>
          </a>

          <a href="/user" className="action-item">
            <div className="action-icon-circle">
              <UsersGroupIcon size={26} />
            </div>
            <h3 className="action-title">Users</h3>
            <p className="action-desc">Stakeholders &amp; roles</p>
          </a>

          <a href="/center" className="action-item">
            <div className="action-icon-circle">
              <CollectionHubIcon size={26} />
            </div>
            <h3 className="action-title">Collection Centers</h3>
            <p className="action-desc">Regional intake hubs</p>
          </a>

          <a href="/products" className="action-item">
            <div className="action-icon-circle">
              <CargoTruckIcon size={26} />
            </div>
            <h3 className="action-title">Products</h3>
            <p className="action-desc">Fresh harvest catalog</p>
          </a>
        </div>
      </section>

    
      <section className="ops-log-section">
        <div className="ops-log-card">
          <div className="log-card-header">
            <div className="log-card-title-group">
              <h3 className="log-title">Recent System Operations &amp; Dispatches</h3>
              <span className="log-count-badge">{filteredLogs.length} Logged</span>
            </div>

            <div className="log-card-actions">
              <input
                type="text"
                placeholder="Filter by ID, entity, status..."
                value={searchFilter}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchFilter(e.target.value)}
                className="log-search-input"
              />

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="log-action-btn"
              >
                <PlusIcon size={14} />
                <span>Dispatch Notice</span>
              </button>
            </div>
          </div>

          <div className="log-table-wrapper">
            {filteredLogs.length === 0 ? (
              <div style={{ padding: '42px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                {searchFilter.trim()
                  ? `No operations found matching "${searchFilter}".`
                  : 'No active operations logged for this cycle.'}
              </div>
            ) : (
              <table className="log-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Category</th>
                    <th>Stakeholder / Facility</th>
                    <th>Entity / Produce</th>
                    <th>Volume Metric</th>
                    <th>Timestamp</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--brand-dark-green)' }}>
                        {log.id}
                      </td>
                      <td>
                        <span className={`category-badge cat-${log.category.toLowerCase()}`}>
                          {log.category}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{log.stakeholder}</td>
                      <td>{log.entity}</td>
                      <td style={{ fontWeight: 700 }}>{log.volumeMetric}</td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{log.timestamp}</td>
                      <td>
                        <span className={`status-pill ${log.status.toLowerCase()}`}>
                          {log.status.replace('_', ' ')}
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

      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Record Manager Dispatch Notice</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <XIcon size={16} />
              </button>
            </div>

            <form onSubmit={handleAddLogSubmit}>
              <div className="modal-body">
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Operation Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as ActivityCategory)}
                    className="log-search-input"
                    style={{ width: '100%', borderRadius: '10px' }}
                  >
                    <option value="ORDER">ORDER (Wholesale Fulfillment)</option>
                    <option value="HARVEST">HARVEST (Field Intake)</option>
                    <option value="PRICE">PRICE (Tariff Index)</option>
                    <option value="INVENTORY">INVENTORY (Cold Hub Depot)</option>
                    <option value="ALLOCATION">ALLOCATION (Crop Quota)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Stakeholder / Target Facility
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter stakeholder / facility name"
                    value={formStakeholder}
                    onChange={(e) => setFormStakeholder(e.target.value)}
                    className="log-search-input"
                    style={{ width: '100%', borderRadius: '10px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Commodity / Details
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter details..."
                    value={formEntity}
                    onChange={(e) => setFormEntity(e.target.value)}
                    className="log-search-input"
                    style={{ width: '100%', borderRadius: '10px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                      Volume / Metric
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Metric Tonnage or Units"
                      value={formVolumeMetric}
                      onChange={(e) => setFormVolumeMetric(e.target.value)}
                      className="log-search-input"
                      style={{ width: '100%', borderRadius: '10px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                      Status
                    </label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as ActivityStatus)}
                      className="log-search-input"
                      style={{ width: '100%', borderRadius: '10px' }}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="IN_TRANSIT">IN TRANSIT</option>
                      <option value="VERIFIED">VERIFIED</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="modal-submit-btn">
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

   
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
            <a href="/district-price" className="footer-link-item">Market Prices</a><br />
            <a href="/farmdashboard" className="footer-link-item">View Harvest</a><br />
            <a href="/manager-orders" className="footer-link-item">View Orders</a><br />
            <a href="/allocation" className="footer-link-item">Settings</a><br />
            <a href="/login" className="footer-link-item">Sign Out</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} රන් පොළොව Ecosystem Sri Lanka. All Rights Reserved.</span><br />
          <span>Powered by Pearl Corporation</span>
        </div>
      </footer>
    </div>
  );
};

export default ManagerDashboard;