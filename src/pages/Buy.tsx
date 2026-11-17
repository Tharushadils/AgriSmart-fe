// import React, { useState, useEffect, useMemo, type FC } from 'react';
// import {
//   Sprout,
//   CheckCircle2,
//   Truck,
//   RefreshCw,
//   Wallet,
//   Sun,
//   Moon,
//   Search,
//   Building2,
//   Scale,
//   Receipt,
//   Phone,
//   MapPin,
//   Layers
// } from 'lucide-react';
// import api from '../service/api';
// import UserProfileMenu from '../components/UserProfileMenu';
// import '../Buy.css';

// export interface BookedHarvestRecord {
//   _id: string;
//   harvestId: string;
//   date: string;
//   qty: number;
//   bookedQty: number;
//   actualQtyPickedUp: number;
//   buyingPrice: number;
//   totalPaid: number;
//   status: 'BOOKED' | 'PARTIALLY_PURCHASED' | 'PURCHASED';
//   farmId: {
//     _id: string;
//     fullName?: string;
//     name?: string;
//     district?: string;
//     phone?: string;
//     collectionCenterId?: {
//       _id: string;
//       centerName?: string;
//       name?: string;
//       district?: string;
//     } | null;
//   };
//   productId: {
//     _id: string;
//     name: string;
//     category?: string;
//   };
// }

// export const RepFieldPurchaseDesk: FC = () => {
//   const [isDark, setIsDark] = useState<boolean>(true);
//   const [selectedDate, setSelectedDate] = useState<string>(() => {
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     return tomorrow.toISOString().split('T')[0];
//   });
//   const [showAllDates, setShowAllDates] = useState<boolean>(false);

//   const [harvests, setHarvests] = useState<BookedHarvestRecord[]>([]);
//   const [weighedQuantities, setWeighedQuantities] = useState<Record<string, number>>({});
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [districtFilter, setDistrictFilter] = useState<string>('ALL');

//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [submittingId, setSubmittingId] = useState<string | null>(null);
//   const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

//   const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
//     setToast({ msg, type });
//     setTimeout(() => setToast(null), 3800);
//   };

//   // Fetch strictly BOOKED harvests from backend
//   const fetchFieldQueue = async () => {
//     setIsLoading(true);
//     try {
//       const queryParams = new URLSearchParams();
//       if (!showAllDates && selectedDate) {
//         queryParams.append('date', selectedDate);
//       }
//       if (districtFilter !== 'ALL') {
//         queryParams.append('district', districtFilter);
//       }

//       const res = await api.get(`/harvests/booked-queue?${queryParams.toString()}`);
//       const fetchedHarvests: BookedHarvestRecord[] = res.data?.data || [];

//       setHarvests(fetchedHarvests);

//       const initialWeights: Record<string, number> = {};
//       fetchedHarvests.forEach((h) => {
//         initialWeights[h.harvestId] = h.bookedQty;
//       });
//       setWeighedQuantities(initialWeights);
//     } catch (err: any) {
//       showToast(err.response?.data?.message || 'Failed to load booked harvest queue.', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFieldQueue();
//   }, [selectedDate, showAllDates, districtFilter]);

//   // Execute Field Weighing & Farmer Payout
//   const handleConfirmPurchase = async (record: BookedHarvestRecord) => {
//     const actualWeight = Number(weighedQuantities[record.harvestId] || 0);
//     if (actualWeight <= 0) {
//       showToast('Please enter a valid weighed quantity (kg) greater than 0.', 'error');
//       return;
//     }

//     setSubmittingId(record.harvestId);
//     try {
//       const storedUser = localStorage.getItem('user');
//       const user = storedUser ? JSON.parse(storedUser) : null;
//       const repId = user?._id || user?.userId;

//       const res = await api.post('/harvests/purchase', {
//         harvestId: record.harvestId,
//         actualQtyPickedUp: actualWeight,
//         collectedByRepId: repId
//       });

//       showToast(res.data?.message || `Purchased ${actualWeight}kg successfully!`, 'success');
//       await fetchFieldQueue();
//     } catch (err: any) {
//       showToast(err.response?.data?.message || 'Failed to record purchase.', 'error');
//     } finally {
//       setSubmittingId(null);
//     }
//   };

//   // Available Districts from fetched list
//   const availableDistricts = useMemo(() => {
//     const set = new Set<string>();
//     harvests.forEach((h) => {
//       if (h.farmId?.district) set.add(h.farmId.district.toUpperCase());
//     });
//     return Array.from(set).sort();
//   }, [harvests]);

  
//   const pendingPickups = useMemo(() => {
//     return harvests.filter((h) => {
//       if (h.status !== 'BOOKED' || (h.bookedQty || 0) <= 0) return false;
//       if (!searchQuery.trim()) return true;

//       const q = searchQuery.toLowerCase();
//       const farmerName = (h.farmId?.fullName || h.farmId?.name || '').toLowerCase();
//       const productName = (h.productId?.name || '').toLowerCase();
//       const centerName = (h.farmId?.collectionCenterId?.centerName || h.farmId?.collectionCenterId?.name || '').toLowerCase();

//       return (
//         h.harvestId.toLowerCase().includes(q) ||
//         farmerName.includes(q) ||
//         productName.includes(q) ||
//         centerName.includes(q)
//       );
//     });
//   }, [harvests, searchQuery]);

//   const completedPurchases = useMemo(() => {
//     return harvests.filter((h) => h.status === 'PURCHASED' || h.status === 'PARTIALLY_PURCHASED');
//   }, [harvests]);

  
//   const stats = useMemo(() => {
//     const pendingKg = pendingPickups.reduce((sum, item) => sum + Number(item.bookedQty || 0), 0);
//     const collectedKg = completedPurchases.reduce((sum, item) => sum + Number(item.actualQtyPickedUp || 0), 0);
//     const totalPaid = completedPurchases.reduce((sum, item) => sum + Number(item.totalPaid || 0), 0);
//     return { pendingKg, collectedKg, totalPaid };
//   }, [pendingPickups, completedPurchases]);

//   return (
//     <div className={`buy-root ${isDark ? 'dark-theme' : ''}`}>
   
//       <header className="header-wrapper">
//         <div className="header-bg-svg-wrap">
//           <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <filter id="wrinkleShadow" x="-5%" y="-10%" width="110%" height="150%">
//                 <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#143412" floodOpacity="0.22" />
//               </filter>
//             </defs>
//             <path
//               d="M 0,0 L 1440,0 L 1440,82.0 L 1435,84.9 L 1430,89.0 L 1425,85.1 L 1420,81.9 L 1415,88.5 L 1410,84.7 L 1405,80.7 L 1400,86.9 L 1395,85.2 L 1390,80.9 L 1385,75.7 L 1380,69.1 L 1375,75.8 L 1370,79.7 L 1365,75.2 L 1360,81.2 L 1355,83.9 L 1350,79.3 L 1345,78.9 L 1340,76.4 L 1335,81.0 L 1330,87.4 L 1325,79.1 L 1320,76.4 L 1315,79.9 L 1310,75.6 L 1305,77.0 L 1300,81.3 L 1295,86.1 L 1290,95.7 L 1285,92.6 L 1280,87.8 L 1275,96.0 L 1270,97.6 L 1265,97.0 L 1260,100.9 L 1255,99.7 L 1250,101.7 L 1245,98.9 L 1240,90.4 L 1235,98.0 L 1230,106.1 L 1225,104.5 L 1220,108.0 L 1215,108.4 L 1210,107.9 L 1205,109.7 L 1200,103.3 L 1195,105.6 L 1190,113.5 L 1185,106.1 L 1180,99.9 L 1175,98.4 L 1170,95.1 L 1165,98.3 L 1160,97.5 L 1155,97.3 L 1150,106.8 L 1145,103.9 L 1140,95.7 L 1135,98.3 L 1130,98.9 L 1125,100.8 L 1120,101.1 L 1115,94.1 L 1110,96.2 L 1105,95.4 L 1100,85.5 L 1095,89.1 L 1090,96.3 L 1085,98.5 L 1080,101.6 L 1075,97.1 L 1070,97.1 L 1065,102.8 L 1060,96.7 L 1055,96.2 L 1050,103.0 L 1045,99.4 L 1040,95.1 L 1035,89.5 L 1030,85.4 L 1025,93.1 L 1020,93.2 L 1015,89.8 L 1010,97.1 L 1005,96.5 L 1000,90.7 L 995,89.4 L 990,86.6 L 985,91.6 L 980,93.0 L 975,82.1 L 970,81.0 L 965,81.4 L 960,74.2 L 955,75.2 L 950,78.0 L 945,82.3 L 940,88.2 L 935,80.8 L 930,78.1 L 925,85.4 L 920,83.1 L 915,82.5 L 910,85.7 L 905,84.1 L 900,85.2 L 895,79.5 L 890,73.7 L 885,84.2 L 880,89.4 L 875,88.0 L 870,93.3 L 865,93.7 L 860,94.4 L 855,95.1 L 850,90.0 L 845,96.6 L 840,102.5 L 835,93.6 L 830,90.3 L 825,89.5 L 820,87.1 L 815,90.4 L 810,88.9 L 805,91.7 L 800,100.2 L 795,93.4 L 790,87.0 L 785,90.6 L 780,89.7 L 775,90.8 L 770,88.6 L 765,82.3 L 760,84.8 L 755,79.5 L 750,70.0 L 745,76.0 L 740,81.1 L 735,82.0 L 730,83.5 L 725,78.6 L 720,80.7 L 715,83.7 L 710,76.4 L 705,79.5 L 700,85.6 L 695,80.4 L 690,76.7 L 685,71.7 L 680,71.1 L 675,79.3 L 670,77.5 L 665,77.8 L 660,86.9 L 655,84.2 L 650,79.7 L 645,79.9 L 640,79.3 L 635,85.5 L 630,84.0 L 625,74.4 L 620,76.6 L 615,74.6 L 610,67.4 L 605,70.2 L 600,73.1 L 595,77.9 L 590,80.7 L 585,71.7 L 580,72.1 L 575,77.5 L 570,72.4 L 565,72.9 L 560,75.2 L 555,72.8 L 550,72.3 L 545,64.4 L 540,61.8 L 535,73.1 L 530,74.7 L 525,74.5 L 520,80.8 L 515,80.8 L 510,82.1 L 505,81.9 L 500,79.6 L 495,89.7 L 490,93.0 L 485,84.8 L 480,85.6 L 475,85.9 L 470,85.6 L 465,90.3 L 460,90.7 L 455,98.2 L 450,106.0 L 445,98.2 L 440,96.7 L 435,102.3 L 430,101.9 L 425,104.1 L 420,101.9 L 415,98.6 L 410,101.6 L 405,93.7 L 400,87.5 L 395,96.2 L 390,99.4 L 385,100.0 L 380,100.5 L 375,96.3 L 370,99.6 L 365,99.1 L 360,91.9 L 355,97.9 L 350,101.2 L 345,94.1 L 340,90.6 L 335,85.9 L 330,87.4 L 325,93.9 L 320,90.6 L 315,94.5 L 310,102.8 L 305,97.7 L 300,94.9 L 295,96.2 L 290,97.4 L 285,103.8 L 280,99.8 L 275,93.3 L 270,97.7 L 265,93.4 L 260,88.0 L 255,93.1 L 250,96.5 L 245,101.8 L 240,101.9 L 235,93.5 L 230,97.2 L 225,99.8 L 220,93.2 L 215,95.3 L 210,96.3 L 205,92.6 L 200,89.6 L 195,79.9 L 190,80.1 L 185,89.2 L 180,86.3 L 175,86.5 L 170,91.4 L 165,88.7 L 160,88.2 L 155,85.3 L 150,84.1 L 145,93.6 L 140,91.4 L 135,82.8 L 130,84.8 L 125,83.3 L 120,82.7 L 115,86.5 L 110,87.6 L 105,97.0 L 100,101.2 L 95,92.6 L 90,95.0 L 85,100.3 L 80,99.5 L 75,102.3 L 70,100.3 L 65,99.6 L 60,101.7 L 55,92.2 L 50,90.5 L 45,100.6 L 40,102.0 L 35,102.9 L 30,103.1 L 25,100.0 L 20,103.5 L 15,99.7 L 10,94.1 L 5,101.8 L 0,101.0 Z"
//               fill="var(--header-bg)"
//               filter="url(#wrinkleShadow)"
//             />
//           </svg>
//         </div>

//         <div className="top-nav">
//           <a href="/" className="brand-logo" title="රන් පොළොව Home">
//             <div className="logo-sprout-icon">
//               <Sprout size={22} style={{ color: '#22c55e' }} />
//             </div>
//             <span className="logo-text">
//               රන් <span>පොළොව</span>
//             </span>
//             <span className="module-tag">Procurement Desk</span>
//           </a>

//           <div className="nav-right-actions">
//             <button
//               type="button"
//               className="theme-toggle-btn"
//               onClick={() => setIsDark(!isDark)}
//               title="Toggle Dark / Light Theme"
//             >
//               {isDark ? <Sun size={18} /> : <Moon size={18} />}
//             </button>

//             <UserProfileMenu />

//             <a href="/managerdashboard" className="nav-back-link">
//               <span>&larr; Manager Operations</span>
//             </a>
//           </div>
//         </div>
//       </header>


//       <section className="page-hero-banner">
//         <div className="hero-doodle-bg" />
//         <div className="hero-content-inner">
//           <h1 className="hero-page-title">
//             <Scale className="w-7 h-7 text-emerald-500" />
//             <span>Field Procurement &amp; Farm Intake Desk</span>
//           </h1>
//           <p className="hero-page-desc">
//             Field weighing, farmer direct payout confirmation, and automated routing into designated regional Collection Centers.
//           </p>
//         </div>
//       </section>

    
//       <main className="buy-main-container flex flex-col gap-6">
//         {/* Filter & Control Banner */}
//         <div className={`p-5 rounded-2xl border flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
//           <div className="flex items-center gap-3.5">
//             <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
//               <Truck className="w-6 h-6" />
//             </div>
//             <div>
//               <h2 className="text-base font-bold">Field Collection &amp; Weighing Desk</h2>
//               <p className="text-xs text-slate-400 mt-0.5">
//                 Displays strictly <strong>BOOKED</strong> farmer quotas. Stock routes automatically to each farm's assigned Collection Center.
//               </p>
//             </div>
//           </div>

//           <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
//             {/* District Filter */}
//             <select
//               value={districtFilter}
//               onChange={(e) => setDistrictFilter(e.target.value)}
//               className={`px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none ${isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-200'}`}
//             >
//               <option value="ALL">All Districts</option>
//               {availableDistricts.map((dist) => (
//                 <option key={dist} value={dist}>
//                   {dist}
//                 </option>
//               ))}
//             </select>

//             {/* Date Picker */}
//             <input
//               type="date"
//               value={selectedDate}
//               disabled={showAllDates}
//               onChange={(e) => {
//                 setSelectedDate(e.target.value);
//                 setShowAllDates(false);
//               }}
//               className={`px-3 py-2 rounded-xl border text-xs font-mono font-bold focus:outline-none disabled:opacity-40 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}
//             />

//             {/* Show All Dates Toggle */}
//             <button
//               type="button"
//               onClick={() => setShowAllDates(!showAllDates)}
//               className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 cursor-pointer transition-all ${
//                 showAllDates
//                   ? 'bg-emerald-600 text-white border-emerald-500'
//                   : isDark
//                   ? 'bg-slate-800 border-slate-700 text-slate-300'
//                   : 'bg-slate-100 border-slate-200 text-slate-700'
//               }`}
//             >
//               <Layers className="w-3.5 h-3.5" />
//               <span>{showAllDates ? 'All Dates' : 'By Date'}</span>
//             </button>

//             {/* Refresh */}
//             <button
//               type="button"
//               onClick={fetchFieldQueue}
//               disabled={isLoading}
//               className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 cursor-pointer"
//               title="Refresh Queue"
//             >
//               <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
//             </button>
//           </div>
//         </div>

        
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
//             <span className="text-xs text-amber-400 uppercase font-semibold">Pending Booked Quota</span>
//             <div className="text-2xl font-bold font-mono text-amber-300 mt-1">{stats.pendingKg.toLocaleString()} kg</div>
//             <span className="text-[11px] text-slate-500">{pendingPickups.length} farms awaiting pickup</span>
//           </div>

//           <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
//             <span className="text-xs text-sky-400 uppercase font-semibold">Collected &amp; Routed to Hubs</span>
//             <div className="text-2xl font-bold font-mono text-sky-300 mt-1">{stats.collectedKg.toLocaleString()} kg</div>
//             <span className="text-[11px] text-slate-500">{completedPurchases.length} verified intake batches</span>
//           </div>

//           <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
//             <span className="text-xs text-emerald-400 uppercase font-semibold">Total Farmer Payouts</span>
//             <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">Rs. {stats.totalPaid.toLocaleString()}</div>
//             <span className="text-[11px] text-emerald-500/80">Settled at farm-gate</span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//           <section className="lg:col-span-7 flex flex-col gap-4">
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//               <h3 className={`font-bold text-sm flex items-center gap-2 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
//                 <Scale className="w-4 h-4 text-emerald-500" />
//                 <span>Booked Farm Pickups ({pendingPickups.length})</span>
//               </h3>

//               <div className="relative w-full sm:w-64">
//                 <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
//                 <input
//                   type="text"
//                   placeholder="Search harvest ID, farmer, crop, hub..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border focus:outline-none ${isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-200'}`}
//                 />
//               </div>
//             </div>

//             {pendingPickups.length === 0 ? (
//               <div className={`p-12 text-center rounded-2xl border ${isDark ? 'bg-slate-900/40 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'}`}>
//                 {isLoading
//                   ? 'Fetching booked harvest queue...'
//                   : 'No pending BOOKED harvests found for the selected filter.'}
//               </div>
//             ) : (
//               <div className="flex flex-col gap-3.5">
//                 {pendingPickups.map((item) => {
//                   const inputWeight = weighedQuantities[item.harvestId] ?? item.bookedQty;
//                   const payoutPreview = Number((inputWeight * (item.buyingPrice || 0)).toFixed(2));
//                   const hubName =
//                     item.farmId?.collectionCenterId?.centerName ||
//                     item.farmId?.collectionCenterId?.name ||
//                     'Assigned Farm Hub';

//                   return (
//                     <div
//                       key={item._id}
//                       className={`p-4 rounded-2xl border flex flex-col gap-3.5 transition-all ${
//                         isDark ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 shadow-sm'
//                       }`}
//                     >
//                       {/* Top Info Row */}
//                       <div className="flex items-start justify-between gap-3">
//                         <div>
//                           <div className="flex items-center gap-2 flex-wrap">
//                             <span className="font-mono font-bold text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
//                               {item.harvestId}
//                             </span>
//                             <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
//                               BOOKED
//                             </span>
//                             <span className="text-[11px] text-slate-400 font-mono">
//                               {item.date ? new Date(item.date).toLocaleDateString() : ''}
//                             </span>
//                           </div>

//                           <h4 className={`font-extrabold text-base mt-1.5 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
//                             {item.productId?.name || 'Produce Item'}
//                           </h4>

//                           <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
//                             <span className="flex items-center gap-1">
//                               <Sprout className="w-3.5 h-3.5 text-emerald-500" />
//                               <strong className={isDark ? 'text-slate-200' : 'text-slate-800'}>
//                                 {item.farmId?.fullName || item.farmId?.name || 'Registered Farmer'}
//                               </strong>
//                             </span>

//                             {item.farmId?.district && (
//                               <span className="flex items-center gap-1">
//                                 <MapPin className="w-3.5 h-3.5 text-slate-400" />
//                                 {item.farmId.district}
//                               </span>
//                             )}

//                             {item.farmId?.phone && (
//                               <span className="flex items-center gap-1 font-mono">
//                                 <Phone className="w-3 h-3 text-slate-400" />
//                                 {item.farmId.phone}
//                               </span>
//                             )}
//                           </div>

//                           {/* Assigned Collection Center Badge */}
//                           <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-300 text-[11px] font-semibold">
//                             <Building2 className="w-3.5 h-3.5" />
//                             <span>Destination Hub: {hubName}</span>
//                           </div>
//                         </div>

//                         <div className="text-right font-mono shrink-0">
//                           <span className={`text-[10px] block font-sans ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Buying Rate</span>
//                           <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Rs. {item.buyingPrice}/kg</span>
//                           <span className="text-[11px] text-sky-600 dark:text-sky-400 block mt-1 font-bold">
//                             Booked: {item.bookedQty} kg
//                           </span>
//                           <span className={`text-[10px] block ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
//                             (Offered: {item.qty} kg)
//                           </span>
//                         </div>
//                       </div>

              
//                       <div
//                         className={`p-3 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
//                           isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
//                         }`}
//                       >
//                         <div className="flex items-center gap-2 w-full sm:w-auto">
//                           <label className={`text-xs font-semibold whitespace-nowrap ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
//                             Weighed Qty (kg):
//                           </label>
//                           <input
//                             type="number"
//                             min="0.1"
//                             step="0.5"
//                             value={inputWeight}
//                             onChange={(e) =>
//                               setWeighedQuantities((prev) => ({
//                                 ...prev,
//                                 [item.harvestId]: parseFloat(e.target.value) || 0
//                               }))
//                             }
//                             className={`w-28 px-3 py-1.5 rounded-lg border font-mono text-xs font-bold focus:outline-none ${
//                               isDark ? 'bg-slate-900 border-slate-700 text-sky-400' : 'bg-white border-slate-300'
//                             }`}
//                           />
//                         </div>

//                         <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
//                           <div className="text-right">
//                             <span className="text-[10px] text-slate-400 block">Farmer Payout</span>
//                             <span className="font-mono font-extrabold text-sm text-emerald-400">
//                               Rs. {payoutPreview.toLocaleString()}
//                             </span>
//                           </div>

//                           <button
//                             type="button"
//                             onClick={() => handleConfirmPurchase(item)}
//                             disabled={submittingId === item.harvestId}
//                             className="px-4 py-2 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 disabled:opacity-50 cursor-pointer transition-all"
//                           >
//                             {submittingId === item.harvestId ? (
//                               <RefreshCw className="w-3.5 h-3.5 animate-spin" />
//                             ) : (
//                               <CheckCircle2 className="w-3.5 h-3.5" />
//                             )}
//                             <span>Confirm &amp; Pay</span>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </section>

     
//           <section className="lg:col-span-5 flex flex-col gap-4">
//             <div className={`p-4 rounded-2xl border flex items-center justify-between ${isDark ? 'bg-emerald-950/20 border-emerald-800/40' : 'bg-emerald-50 border-emerald-200'}`}>
//               <div className="flex items-center gap-3">
//                 <Wallet className="w-6 h-6 text-emerald-400" />
//                 <div>
//                   <span className="text-[11px] uppercase font-bold text-emerald-400">Settled Vouchers Total</span>
//                   <div className="text-xl font-mono font-extrabold text-emerald-300">Rs. {stats.totalPaid.toLocaleString()}</div>
//                 </div>
//               </div>
//               <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400">
//                 {completedPurchases.length} Vouchers
//               </span>
//             </div>

//             <h3 className={`font-bold text-sm ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Completed Farm-Gate Vouchers</h3>

//             <div className="flex flex-col gap-3 max-h-[560px] overflow-y-auto pr-1">
//               {completedPurchases.length === 0 ? (
//                 <div className={`p-8 text-center rounded-2xl border text-xs ${isDark ? 'bg-slate-900/40 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'}`}>
//                   No completed purchases logged yet.
//                 </div>
//               ) : (
//                 completedPurchases.map((v) => {
//                   const hubName =
//                     v.farmId?.collectionCenterId?.centerName ||
//                     v.farmId?.collectionCenterId?.name ||
//                     'Farm Hub';

//                   return (
//                     <div
//                       key={v._id}
//                       className={`p-3.5 rounded-xl border flex flex-col gap-2 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}
//                     >
//                       <div className="flex items-center justify-between">
//                         <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">{v.harvestId}</span>
//                         <span
//                           className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
//                             v.status === 'PURCHASED'
//                               ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
//                               : 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30'
//                           }`}
//                         >
//                           {v.status.replace('_', ' ')}
//                         </span>
//                       </div>

//                       <div className="flex justify-between text-xs">
//                         <span className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{v.productId?.name}</span>
//                         <span className="font-mono text-sky-600 dark:text-sky-400">
//                           {v.actualQtyPickedUp} / {v.bookedQty} kg &times; Rs.{v.buyingPrice}
//                         </span>
//                       </div>

//                       <div className="text-[11px] text-slate-400">
//                         Farmer: {v.farmId?.fullName || v.farmId?.name || 'Farmer'} ({v.farmId?.district || 'District'})
//                       </div>

//                       <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1.5 border-t border-slate-800/60">
//                         <span className="text-teal-400 font-medium">Hub: {hubName}</span>
//                         <strong className="font-mono text-emerald-400 text-xs">
//                           Rs. {(v.totalPaid || 0).toLocaleString()}
//                         </strong>
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//             </div>
//           </section>
//         </div>
//       </main>

//       {toast && (
//         <div className="fixed top-20 right-5 z-50">
//           <div
//             className={`px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold text-white border ${
//               toast.type === 'error' ? 'bg-rose-600 border-rose-500' : 'bg-emerald-600 border-emerald-500'
//             }`}
//           >
//             <CheckCircle2 className="w-4 h-4" />
//             <span>{toast.msg}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RepFieldPurchaseDesk;