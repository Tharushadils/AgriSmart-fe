import React, { useState, useEffect, useMemo, type FC, type SVGProps } from 'react';
import api from '../service/api';
import UserProfileMenu from '../components/UserProfileMenu';
import '../FarmerPriceConfirm.css';


type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

const BaseIcon: FC<IconProps & { children: React.ReactNode }> = ({
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

const CheckCircle2Icon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </BaseIcon>
);

const ClockIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </BaseIcon>
);

const SunIcon: FC<IconProps> = (p) => (
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

const MoonIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </BaseIcon>
);

const AlertCircleIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </BaseIcon>
);

const RefreshCwIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </BaseIcon>
);

const SproutIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
    <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4.1 1-4.9 2z" />
  </BaseIcon>
);

const SeedlingHarvestIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
    <path d="M12 20V10" />
    <path d="M12 14c-3-3-3-7 0-9" />
    <path d="M12 14c-1-4-5-4-7-2 1 4 4 6 7 2z" />
  </BaseIcon>
);

const HarvestHistoryIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </BaseIcon>
);

const PriceTagTrendIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path d="M7 7h.01" />
  </BaseIcon>
);

const MapPinIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </BaseIcon>
);

const SettingsGearIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </BaseIcon>
);


export interface FarmerHarvestItem {
  _id: string;
  harvestId: string;
  date: string;
  qty: number;
  status: 'SUBMITTED' | 'PRICE_OFFERED' | 'CONFIRMED' | 'REJECTED' | 'CANCELLED';
  buyingPrice?: number;
  productId: {
    _id: string;
    name: string;
    category: string;
    unit: string;
  };
}

export interface ToastMessage {
  msg: string;
  type: 'success' | 'error' | 'info';
}

export const FarmerPriceConfirm: FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [harvests, setHarvests] = useState<FarmerHarvestItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (msg: string, type: ToastMessage['type'] = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3600);
  };

  // Farmer user id
  const userRaw = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const user = userRaw ? JSON.parse(userRaw) : null;
  const userId = user?._id || user?.userId || localStorage.getItem('farmId');

  //  Fetch Farmer's Harvests
  const fetchMyHarvests = async () => {
    if (!userId) {
      showToast('Farmer profile not found. Please log in again.', 'error');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.get(`/harvests/farm/${userId}`);
      const list = res.data?.data || res.data || [];
      setHarvests(Array.isArray(list) ? list : []);
    } catch (err: any) {
      console.error('Failed to load harvests:', err);
      showToast('Failed to load your submitted harvests.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyHarvests();
  }, [userId]);

  //  Confirm Offered Price
  const handleConfirmPrice = async (harvestId: string, cropName: string) => {
    setConfirmingId(harvestId);
    try {
      const res = await api.patch(`/district-pricing/confirm/${harvestId}`);
      const confirmedPrice = res.data?.data?.confirmedBuyingPrice;

      showToast(
        ` Successfully confirmed price for ${cropName} at Rs. ${confirmedPrice}/kg!`,
        'success'
      );

      // Local State Update
      setHarvests((prev) =>
        prev.map((h) =>
          h.harvestId === harvestId
            ? { ...h, status: 'CONFIRMED', buyingPrice: confirmedPrice || h.buyingPrice }
            : h
        )
      );
    } catch (err: any) {
      console.error('Confirmation failed:', err);
      const msg = err.response?.data?.message || 'Price confirmation failed.';
      showToast(` ${msg}`, 'error');
    } finally {
      setConfirmingId(null);
    }
  };

  // Status Filter Counts
  const metrics = useMemo(() => {
    const offered = harvests.filter((h) => h.status === 'PRICE_OFFERED').length;
    const confirmed = harvests.filter((h) => h.status === 'CONFIRMED').length;
    const pending = harvests.filter((h) => h.status === 'SUBMITTED').length;
    return { offered, confirmed, pending };
  }, [harvests]);

  return (
    <div className={`price-confirm-root ${isDark ? 'dark-theme' : ''}`}>
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
              <SproutIcon size={22} style={{ color: '#22c55e' }} />
            </div>
            <span className="logo-text">
              රන් <span>පොළොව</span>
            </span>
            <span className="module-tag">Farmer Verification</span>
          </a>

          <div className="nav-right-actions">
            <button
              type="button"
              onClick={fetchMyHarvests}
              className="theme-toggle-btn"
              title="Refresh Harvests"
            >
              <RefreshCwIcon size={16} className={isLoading ? 'animate-spin' : ''} />
            </button>

            <button
              type="button"
              onClick={() => setIsDark(!isDark)}
              className="theme-toggle-btn"
              title="Toggle theme"
            >
              {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
            </button>

            <UserProfileMenu />

            <a href="/farmdashboard" className="nav-back-link">
              <span>&larr; Farm Dashboard</span>
            </a>
          </div>
        </div>
      </header>

  
      <section className="page-hero-banner">
        <div className="hero-doodle-bg" />
        <div className="hero-content-inner">
          <h1 className="hero-page-title">
            <SproutIcon size={26} className="text-emerald-500" />
            <span>Farmer Harvest Price Review &amp; Order Finalization</span>
          </h1>
          <p className="hero-page-desc">
            Review wholesale buying rates offered by district authorities and confirm your harvest lots for collection intake.
          </p>
        </div>
      </section>

  
      <main className="price-confirm-container space-y-6">
        
     
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="text-[11px] text-amber-400 font-semibold uppercase flex items-center gap-1.5">
              <ClockIcon size={14} />
              <span>Prices Offered (Awaiting Your Review)</span>
            </div>
            <div className="text-2xl font-extrabold text-amber-400 font-mono mt-1">
              {metrics.offered} Lots
            </div>
          </div>

          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="text-[11px] text-emerald-400 font-semibold uppercase flex items-center gap-1.5">
              <CheckCircle2Icon size={14} />
              <span>Confirmed Sell Orders</span>
            </div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">
              {metrics.confirmed} Lots
            </div>
          </div>

          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className={`text-[11px] font-semibold uppercase flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <ClockIcon size={14} />
              <span>Pending Tariff Release (Submitted)</span>
            </div>
            <div className={`text-2xl font-extrabold font-mono mt-1 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
              {metrics.pending} Lots
            </div>
          </div>
        </section>

        {/* Harvest List Container */}
        <section className={`rounded-2xl border overflow-hidden transition-all ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className={`p-4 sm:p-5 border-b flex flex-wrap items-center justify-between gap-2 ${
            isDark ? 'border-slate-800 text-slate-100' : 'border-slate-200 text-slate-900'
          }`}>
            <div>
              <h1 className="font-bold text-base sm:text-lg leading-tight">
                Review District Wholesale Tariffs &amp; Confirm Sells
              </h1>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Prices released by the regional management team for your farm's delivery schedule.
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className={`py-20 text-center text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Loading your submitted harvest records...
            </div>
          ) : harvests.length === 0 ? (
            <div className="py-20 px-4 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <AlertCircleIcon size={22} />
              </div>
              <p className={`text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>No Harvest Submissions Found</p>
              <p className={`text-xs max-w-md mx-auto ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                You haven&apos;t submitted any harvests yet. Visit the Harvest Intake page to log your crop yield.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className={`border-b ${isDark ? 'bg-slate-800/40 border-slate-800 text-slate-300' : 'bg-slate-100/80 border-slate-200 text-slate-700 font-bold'}`}>
                    <th className="p-4 font-semibold">Batch ID &bull; Crop Produce</th>
                    <th className="p-4 font-semibold">Delivery Date</th>
                    <th className="p-4 font-semibold">Intake Qty</th>
                    <th className="p-4 font-semibold">Offered Buying Price (Wholesale)</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800/60' : 'divide-slate-200'} font-mono`}>
                  {harvests.map((h) => {
                    const isPriceOffered = h.status === 'PRICE_OFFERED';
                    const isConfirmed = h.status === 'CONFIRMED';
                    const isSubmitted = h.status === 'SUBMITTED';

                    return (
                      <tr key={h._id} className={isDark ? 'hover:bg-slate-800/30' : 'hover:bg-emerald-50/50'}>
                        {/* Crop Name & Batch ID */}
                        <td className="p-4 font-sans">
                          <div className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                            <span>🌱</span>
                            <span>{h.productId?.name || 'Produce Crop'}</span>
                          </div>
                          <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                            {h.harvestId}
                          </div>
                        </td>

                        {/* Delivery Date */}
                        <td className={`p-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          {new Date(h.date).toISOString().split('T')[0]}
                        </td>

                        {/* Quantity */}
                        <td className={`p-4 font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                          {h.qty} {h.productId?.unit || 'kg'}
                        </td>

                        {/* Buying Price */}
                        <td className="p-4">
                          {isPriceOffered || isConfirmed ? (
                            <span className="text-sm font-extrabold text-emerald-400">
                              Rs. {h.buyingPrice?.toFixed(2) || '0.00'} <span className="text-[11px] font-normal text-slate-400">/{h.productId?.unit || 'kg'}</span>
                            </span>
                          ) : (
                            <span className="text-xs text-slate-500 font-sans italic">
                              Awaiting Manager Release
                            </span>
                          )}
                        </td>

                        <td className="p-4 font-sans">
                          {isPriceOffered && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                              Price Offered
                            </span>
                          )}
                          {isConfirmed && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              ✓ Price Confirmed
                            </span>
                          )}
                          {isSubmitted && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                              Submitted
                            </span>
                          )}
                        </td>

              
                        <td className="p-4 text-right font-sans">
                          {isPriceOffered ? (
                            <button
                              type="button"
                              onClick={() => handleConfirmPrice(h.harvestId, h.productId?.name)}
                              disabled={confirmingId === h.harvestId}
                              className="px-4 py-2 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white inline-flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
                            >
                              <CheckCircle2Icon size={14} />
                              <span>{confirmingId === h.harvestId ? 'Confirming...' : 'I Agree & Confirm'}</span>
                            </button>
                          ) : isConfirmed ? (
                            <span className="text-xs text-emerald-400 font-semibold inline-flex items-center gap-1">
                              <CheckCircle2Icon size={14} /> Lock Secured
                            </span>
                          ) : (
                            <span className="text-xs text-slate-500">
                              Pending Tariff
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
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

      {toast && (
        <div className="fixed top-20 right-5 z-50">
          <div className={`px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold text-white border ${
            toast.type === 'error'
              ? 'bg-rose-600 border-rose-500'
              : toast.type === 'info'
                ? 'bg-sky-600 border-sky-500'
                : 'bg-emerald-600 border-emerald-500'
          }`}>
            <CheckCircle2Icon size={15} />
            <span>{toast.msg}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerPriceConfirm;