import React, { useState, useEffect, useMemo, type FC } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Plus,
  RefreshCw,
  AlertCircle,
  PackageCheck,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Sun,
  Moon,
  Sprout
} from 'lucide-react';
import api from '../service/api';
import UserProfileMenu from '../components/UserProfileMenu';
import '../StoreOrderConfirmation.css';



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

export interface StoreAllocatedOrder {
  _id: string;
  orderId: string;
  productId: {
    _id: string;
    name: string;
    category?: string;
    imageUrl?: string;
  };
  requestedQty: number;
  allocatedQty: number;
  extraOfferedQty: number;
  extraAcceptedQty: number;
  unitSellingPrice: number;
  finalDeliveredQty: number;
  totalAmount: number;
  status: 'PENDING' | 'ALLOCATED' | 'FINALIZED' | 'DISPATCHED';
  date: string;
}

export const StoreOrderConfirmation: FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [orders, setOrders] = useState<StoreAllocatedOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProcessingId, setIsProcessingId] = useState<string | null>(null);

  // Extra Stock Purchase Modal States
  const [activeModalOrder, setActiveModalOrder] = useState<StoreAllocatedOrder | null>(null);
  const [purchaseAdditionalQty, setPurchaseAdditionalQty] = useState<number | ''>('');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Fetch Store Orders
  const fetchStoreAllocations = async () => {
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem('user');
      const user = storedUser ? JSON.parse(storedUser) : null;
      const storeUserId = user?._id || user?.userId;

      if (!storeUserId) {
        showToast('Store authentication missing. Please login.', 'error');
        return;
      }

      const res = await api.get(`/orders/store/${storeUserId}`);
      const rawOrders: StoreAllocatedOrder[] = res.data?.data || [];
      
      // Filter for orders that require confirmation or review
      setOrders(rawOrders);
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to load allocated orders.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreAllocations();
  }, []);

  //  Confirm Allocated Quota As Final
  const handleFinalizeQuota = async (order: StoreAllocatedOrder) => {
    setIsProcessingId(order._id);
    try {
      await api.patch(`/orders/${order._id}/confirm`, {
        status: 'FINALIZED',
        finalDeliveredQty: order.allocatedQty + (order.extraAcceptedQty || 0),
        totalAmount: (order.allocatedQty + (order.extraAcceptedQty || 0)) * order.unitSellingPrice
      });

      showToast(`Order ${order.orderId} confirmed successfully!`);
      fetchStoreAllocations();
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to confirm order quota.', 'error');
    } finally {
      setIsProcessingId(null);
    }
  };

  //  Real Time Extra Stock Purchase
  const handlePurchaseExtraSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalOrder) return;

    const qty = Number(purchaseAdditionalQty);
    if (!qty || qty <= 0) {
      showToast('Please enter a valid quantity.', 'error');
      return;
    }

    if (qty > activeModalOrder.extraOfferedQty) {
      showToast(`Cannot exceed available extra stock of ${activeModalOrder.extraOfferedQty} kg`, 'error');
      return;
    }

    setIsProcessingId(activeModalOrder._id);
    try {
      const storedUser = localStorage.getItem('user');
      const user = storedUser ? JSON.parse(storedUser) : null;

      await api.post('/orders/purchase-extra-stock', {
        orderId: activeModalOrder._id,
        storeUserId: user?._id || user?.userId,
        additionalQty: qty
      });

      showToast(`Purchased +${qty} kg extra stock successfully!`);
      setActiveModalOrder(null);
      setPurchaseAdditionalQty('');
      fetchStoreAllocations();
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to purchase extra stock.', 'error');
    } finally {
      setIsProcessingId(null);
    }
  };

  // Summary Metrics
  const summary = useMemo(() => {
    return orders.reduce(
      (acc, curr) => {
        acc.totalAllocated += curr.allocatedQty || 0;
        acc.totalExtraAccepted += curr.extraAcceptedQty || 0;
        acc.totalAmount += curr.totalAmount || (curr.allocatedQty * curr.unitSellingPrice) || 0;
        return acc;
      },
      { totalAllocated: 0, totalExtraAccepted: 0, totalAmount: 0 }
    );
  }, [orders]);

  return (
    <div className={`order-confirm-root ${isDark ? 'dark-theme' : ''}`}>
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
            <span className="module-tag">Store Order Desk</span>
          </a>

          <div className="nav-right-actions">
            <button
              onClick={() => setIsDark(!isDark)}
              className="theme-toggle-btn"
              title="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <UserProfileMenu />

            <a href="/storedashboard" className="nav-back-link">
              <span>&larr; Store Dashboard</span>
            </a>
          </div>
        </div>
      </header>


      <section className="page-hero-banner">
        <div className="hero-doodle-bg" />
        <div className="hero-content-inner">
          <h1 className="hero-page-title">
            <PackageCheck className="w-7 h-7 text-emerald-500" />
            <span>Store Order Quotas &amp; Surplus Stock Finalization</span>
          </h1>
          <p className="hero-page-desc">
            Review allocated harvest quotas before the 5:00 AM dispatch gate, purchase extra platform surplus, and verify invoice totals.
          </p>
        </div>
      </section>


      <main className="order-confirm-container flex flex-col gap-6">
        {/* Deadline Warning Banner */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${isDark ? 'bg-amber-950/20 border-amber-800/40 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 shrink-0 animate-pulse text-amber-400" />
            <div className="text-xs">
              <span className="font-bold">5:00 AM Confirmation Deadline:</span> Allocations are released at 5:00 AM on delivery day. Please verify your quotas and finalize before delivery fleet dispatch.
            </div>
          </div>
          <button
            onClick={fetchStoreAllocations}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-amber-500/40 hover:bg-amber-500/10 transition-all shrink-0 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh Quotas</span>
          </button>
        </div>

        {/* Global Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="text-xs text-slate-400 uppercase font-semibold">Allocated Base Quota</span>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{summary.totalAllocated.toLocaleString()} kg</div>
            <span className="text-[11px] text-slate-500 font-medium">Guaranteed Fair-Share</span>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="text-xs text-teal-400 uppercase font-semibold">Extra Purchased Volume</span>
            <div className="text-2xl font-bold font-mono text-teal-400 mt-1">+{summary.totalExtraAccepted.toLocaleString()} kg</div>
            <span className="text-[11px] text-slate-500 font-medium">Instant Real-time Orders</span>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className={`text-xs uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total Order Valuation</span>
            <div className={`text-2xl font-bold font-mono mt-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Rs. {summary.totalAmount.toLocaleString()}</div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Wholesale Rate Applied</span>
          </div>
        </div>

        {/* Orders Card Grid */}
        <div className="flex flex-col gap-4">
          <h3 className={`font-bold text-sm ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>My Requisition Quotas &amp; Status</h3>

          {orders.length === 0 ? (
            <div className={`p-12 text-center rounded-2xl border ${isDark ? 'bg-slate-900/40 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'}`}>
              {isLoading ? 'Loading your allocated orders...' : 'No pre-orders found. Place a pre-order from the dashboard first.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {orders.map((ord) => {
                const isFinal = ord.status === 'FINALIZED' || ord.status === 'DISPATCHED';
                const hasExtraAvailable = (ord.extraOfferedQty || 0) > 0 && !isFinal;
                const totalFinalKg = (ord.allocatedQty || 0) + (ord.extraAcceptedQty || 0);

                return (
                  <div
                    key={ord._id}
                    className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 transition-all ${
                      isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div>
                      {/* Code & Status */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {ord.orderId}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            isFinal
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </div>

                      {/* Produce Crop Details */}
                      <div className="flex justify-between items-baseline mb-3">
                        <h4 className={`text-base font-extrabold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{ord.productId?.name || 'Produce Item'}</h4>
                        <span className={`font-mono text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          Rate: Rs. {ord.unitSellingPrice || 0}/kg
                        </span>
                      </div>

                      {/* Quota Metric Pills */}
                      <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-800/40 font-mono text-xs mb-3">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-sans">Requested</span>
                          <span className="font-bold">{ord.requestedQty} kg</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-sans">Allocated</span>
                          <span className="font-bold text-emerald-400">{ord.allocatedQty} kg</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-sans">Final Total</span>
                          <span className="font-bold text-teal-300">{totalFinalKg} kg</span>
                        </div>
                      </div>

                      {/* Extra Stock Callout Banner (if available) */}
                      {hasExtraAvailable && (
                        <div className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${isDark ? 'bg-teal-950/30 border-teal-800/50 text-teal-300' : 'bg-teal-50 border-teal-200 text-teal-800'}`}>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-teal-400 shrink-0" />
                            <span><strong>+{ord.extraOfferedQty} kg</strong> surplus available!</span>
                          </div>
                          <button
                            onClick={() => {
                              setActiveModalOrder(ord);
                              setPurchaseAdditionalQty(ord.extraOfferedQty);
                            }}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-teal-600 hover:bg-teal-500 text-white cursor-pointer shadow-sm transition-all"
                          >
                            Buy Extra
                          </button>
                        </div>
                      )}
                    </div>

                    {/*  Confirm or Status Final */}
                    <div className={`pt-3 border-t flex items-center justify-between ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
                      <div className="text-xs">
                        <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Total: </span>
                        <strong className={`font-mono ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                          Rs. {((totalFinalKg) * (ord.unitSellingPrice || 0)).toLocaleString()}
                        </strong>
                      </div>

                      {!isFinal ? (
                        <button
                          onClick={() => handleFinalizeQuota(ord)}
                          disabled={isProcessingId === ord._id}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-md shadow-emerald-600/30 disabled:opacity-50 cursor-pointer transition-all"
                        >
                          {isProcessingId === ord._id ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          )}
                          <span>Confirm Order</span>
                        </button>
                      ) : (
                        <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Order Finalized
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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

      {/* Extra Stock Purchase Modal */}
      {activeModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-400" />
                <span>Instant Extra Stock Purchase</span>
              </h3>
              <button
                onClick={() => setActiveModalOrder(null)}
                className="text-slate-400 hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Surplus produce from today's confirmed pool is available for purchase before delivery dispatch.
            </p>

            <form onSubmit={handlePurchaseExtraSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-800/50 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className={`font-sans ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Produce Crop:</span>
                  <span className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{activeModalOrder.productId?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`font-sans ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Already Allocated:</span>
                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{activeModalOrder.allocatedQty} kg</span>
                </div>
                <div className="flex justify-between text-teal-600 dark:text-teal-400">
                  <span className="font-sans">Max Surplus Available:</span>
                  <span className="font-bold">+{activeModalOrder.extraOfferedQty} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className={`font-sans ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Unit Price:</span>
                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>Rs. {activeModalOrder.unitSellingPrice}/kg</span>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Additional Quantity to Purchase (Kg)
                </label>
                <input
                  type="number"
                  min="1"
                  max={activeModalOrder.extraOfferedQty}
                  value={purchaseAdditionalQty}
                  onChange={(e) => setPurchaseAdditionalQty(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  placeholder={`Max ${activeModalOrder.extraOfferedQty} kg`}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-mono font-bold focus:outline-none ${
                    isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-300'
                  }`}
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModalOrder(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-700 hover:bg-slate-800 text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessingId === activeModalOrder._id}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white flex items-center gap-1.5 shadow-lg shadow-teal-600/30 cursor-pointer"
                >
                  {isProcessingId === activeModalOrder._id ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Plus className="w-3.5 h-3.5" />
                  )}
                  <span>Confirm Additional Purchase</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

  
      {toast && (
        <div className="fixed top-20 right-5 z-50">
          <div
            className={`px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold text-white border ${
              toast.type === 'error' ? 'bg-rose-600 border-rose-500' : 'bg-emerald-600 border-emerald-500'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{toast.msg}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreOrderConfirmation;