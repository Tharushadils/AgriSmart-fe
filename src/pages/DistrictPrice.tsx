import React, { useState, useEffect, useMemo, useRef, type FC, type SVGProps, type ChangeEvent } from 'react';
import api from '../service/api';
import logoImg from '../assets/logo.jpg';
import UserProfileMenu from '../components/UserProfileMenu';
import '../DistrictPrice.css';


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

const TrendingUpIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
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

const MapPinIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </BaseIcon>
);

const CheckIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <polyline points="20 6 9 17 4 12" />
  </BaseIcon>
);

const SlidersHorizontalIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <line x1="21" x2="14" y1="4" y2="4" />
    <line x1="10" x2="3" y1="4" y2="4" />
    <line x1="21" x2="12" y1="12" y2="12" />
    <line x1="8" x2="3" y1="12" y2="12" />
    <line x1="21" x2="16" y1="20" y2="20" />
    <line x1="12" x2="3" y1="20" y2="20" />
    <line x1="14" x2="14" y1="2" y2="6" />
    <line x1="8" x2="8" y1="10" y2="14" />
    <line x1="16" x2="16" y1="18" y2="22" />
  </BaseIcon>
);

const CheckCircle2Icon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </BaseIcon>
);

const CalendarIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </BaseIcon>
);

const AlertCircleIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </BaseIcon>
);

const RefreshIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 21h5v-5" />
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

const OrderChecklistIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="m9 14 2 2 4-4" />
  </BaseIcon>
);

const PriceTagTrendIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path d="M7 7h.01" />
  </BaseIcon>
);

const WarehouseIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z" />
    <path d="M6 18h12" />
    <path d="M6 14h12" />
    <rect width="12" height="12" x="6" y="10" />
  </BaseIcon>
);

const PrecisionGearsIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </BaseIcon>
);

const SeedlingAllocationIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
    <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
  </BaseIcon>
);

const FarmerPromiseIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
    <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
    <path d="m2 16 6 6" />
    <circle cx="16" cy="9" r="2.9" />
    <circle cx="6" cy="5" r="3" />
  </BaseIcon>
);

const HarvestTransferIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M8 3 4 7l4 4" />
    <path d="M4 7h16" />
    <path d="m16 21 4-4-4-4" />
    <path d="M20 17H4" />
  </BaseIcon>
);

const FarmBarnIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M3 10.5 12 4l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5Z" />
    <path d="M9 21v-7h6v7" />
    <path d="m9 14 6 7" />
    <path d="m15 14-6 7" />
  </BaseIcon>
);

const StoreFrontIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
  </BaseIcon>
);

const UsersGroupIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </BaseIcon>
);

const CargoTruckIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </BaseIcon>
);

const SettingsGearIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </BaseIcon>
);

export const District = {
  AMPARA: "AMPARA",
  ANURADHAPURA: "ANURADHAPURA",
  BADULLA: "BADULLA",
  BATTICALOA: "BATTICALOA",
  COLOMBO: "COLOMBO",
  GALLE: "GALLE",
  GAMPAHA: "GAMPAHA",
  HAMBANTOTA: "HAMBANTOTA",
  JAFFNA: "JAFFNA",
  KALUTARA: "KALUTARA",
  KANDY: "KANDY",
  KEGALLE: "KEGALLE",
  KILINOCHCHI: "KILINOCHCHI",
  KURUNEGALA: "KURUNEGALA",
  MANNAR: "MANNAR",
  MATALE: "MATALE",
  MATARA: "MATARA",
  MONARAGALA: "MONARAGALA",
  MULLAITIVU: "MULLAITIVU",
  NUWARA_ELIYA: "NUWARA_ELIYA",
  POLONNARUWA: "POLONNARUWA",
  PUTTALAM: "PUTTALAM",
  RATNAPURA: "RATNAPURA",
  TRINCOMALEE: "TRINCOMALEE",
  VAVUNIYA: "VAVUNIYA",
} as const;

export type District = (typeof District)[keyof typeof District];

export interface PendingProduct {
  productId: string;
  productName: string;
  category: string;
  unit: string;
  totalSubmittedQty: number;
  harvestCount: number;
  existingPrice?: {
    buyingPrice: number;
    sellingPrice: number;
    profitMarginUnit: number;
    isReleased: boolean;
  };
}

interface PriceItemInput {
  buyingPrice: number | '';
  sellingPrice: number | '';
}

export interface ToastMessage {
  msg: string;
  type: 'success' | 'error' | 'info';
}


export const DistrictPricingManagement: FC = () => {
  
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

  // Delivery Date default to Tomorrow 
  const defaultDeliveryDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  const [date, setDate] = useState<string>(defaultDeliveryDate);
  const [selectedDistrict, setSelectedDistrict] = useState<District>(District.ANURADHAPURA);

 
  const [pendingProducts, setPendingProducts] = useState<PendingProduct[]>([]);
  const [priceFormState, setPriceFormState] = useState<Record<string, PriceItemInput>>({});

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerToast = (msg: string, type: ToastMessage['type'] = 'success'): void => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ msg, type });
    toastTimeoutRef.current = setTimeout(() => setToast(null), 3600);
  };

  //  Fetch pending submitted crops for chosen District & Delivery Date
  const fetchPendingDistrictCrops = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/district-pricing/pending-products', {
        params: { date, district: selectedDistrict }
      });

      const list: PendingProduct[] = res.data?.data || [];
      setPendingProducts(list);

      // Populate initial price inputs 
      const initialMap: Record<string, PriceItemInput> = {};
      list.forEach((p) => {
        initialMap[p.productId] = {
          buyingPrice: p.existingPrice?.buyingPrice ?? '',
          sellingPrice: p.existingPrice?.sellingPrice ?? ''
        };
      });
      setPriceFormState(initialMap);
    } catch (err: any) {
      console.error('Failed to load pending district products:', err);
      setPendingProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingDistrictCrops();
  }, [date, selectedDistrict]);

  const handlePriceChange = (
    productId: string,
    field: 'buyingPrice' | 'sellingPrice',
    val: string
  ) => {
    const parsed = val === '' ? '' : parseFloat(val);
    setPriceFormState((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: parsed
      }
    }));
  };

  //  Validate and Batch Release Prices across all submitted crops
  const handleReleasePricingBatch = async () => {
    if (pendingProducts.length === 0) return;

    const payload = [];

    for (const p of pendingProducts) {
      const pPrices = priceFormState[p.productId];
      const buy = typeof pPrices?.buyingPrice === 'number' ? pPrices.buyingPrice : 0;
      const sell = typeof pPrices?.sellingPrice === 'number' ? pPrices.sellingPrice : 0;

      if (buy <= 0 || sell <= 0) {
        triggerToast(`Please enter valid Buying & Selling prices for "${p.productName}".`, 'error');
        return;
      }

      if (sell < buy) {
        triggerToast(`Selling price cannot be less than Buying price for "${p.productName}".`, 'error');
        return;
      }

      payload.push({
        productId: p.productId,
        buyingPrice: buy,
        sellingPrice: sell
      });
    }

    setIsSubmitting(true);
    try {
      await api.post('/district-pricing/release', {
        date,
        district: selectedDistrict,
        prices: payload
      });

      triggerToast(`Prices successfully released for ${selectedDistrict.replace(/_/g, ' ')}!`, 'success');

      // Refresh list to update status markers
      const res = await api.get('/district-pricing/pending-products', {
        params: { date, district: selectedDistrict }
      });
      setPendingProducts(res.data?.data || []);
    } catch (err: any) {
      console.error('Batch release failed:', err);
      const serverMsg = err.response?.data?.message || 'Failed to release district pricing.';
      triggerToast(serverMsg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Aggregate stats derived strictly from loaded data
  const summaryMetrics = useMemo(() => {
    let totalIntakeKg = 0;
    let totalLots = 0;
    let pricedCount = 0;

    pendingProducts.forEach((p) => {
      totalIntakeKg += p.totalSubmittedQty;
      totalLots += p.harvestCount;
      const price = priceFormState[p.productId];
      if (typeof price?.buyingPrice === 'number' && price.buyingPrice > 0) {
        pricedCount++;
      }
    });

    return { totalIntakeKg, totalLots, pricedCount };
  }, [pendingProducts, priceFormState]);

  return (
    <div className={`district-price-root ${isDark ? 'dark-theme' : ''}`}>
      <header className="header-wrapper">
        <div className="header-bg-svg-wrap">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="wrinkleShadowDistrict" x="-5%" y="-10%" width="110%" height="150%">
                <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#143412" floodOpacity="0.22" />
              </filter>
            </defs>
            <path
              d="M 0,0 L 1440,0 L 1440,82.0 L 1435,84.9 L 1430,89.0 L 1425,85.1 L 1420,81.9 L 1415,88.5 L 1410,84.7 L 1405,80.7 L 1400,86.9 L 1395,85.2 L 1390,80.9 L 1385,75.7 L 1380,69.1 L 1375,75.8 L 1370,79.7 L 1365,75.2 L 1360,81.2 L 1355,83.9 L 1350,79.3 L 1345,78.9 L 1340,76.4 L 1335,81.0 L 1330,87.4 L 1325,79.1 L 1320,76.4 L 1315,79.9 L 1310,75.6 L 1305,77.0 L 1300,81.3 L 1295,86.1 L 1290,95.7 L 1285,92.6 L 1280,87.8 L 1275,96.0 L 1270,97.6 L 1265,97.0 L 1260,100.9 L 1255,99.7 L 1250,101.7 L 1245,98.9 L 1240,90.4 L 1235,98.0 L 1230,106.1 L 1225,104.5 L 1220,108.0 L 1215,108.4 L 1210,107.9 L 1205,109.7 L 1200,103.3 L 1195,105.6 L 1190,113.5 L 1185,106.1 L 1180,99.9 L 1175,98.4 L 1170,95.1 L 1165,98.3 L 1160,97.5 L 1155,97.3 L 1150,106.8 L 1145,103.9 L 1140,95.7 L 1135,98.3 L 1130,98.9 L 1125,100.8 L 1120,101.1 L 1115,94.1 L 1110,96.2 L 1105,95.4 L 1100,85.5 L 1095,89.1 L 1090,96.3 L 1085,98.5 L 1080,101.6 L 1075,97.1 L 1070,97.1 L 1065,102.8 L 1060,96.7 L 1055,96.2 L 1050,103.0 L 1045,99.4 L 1040,95.1 L 1035,89.5 L 1030,85.4 L 1025,93.1 L 1020,93.2 L 1015,89.8 L 1010,97.1 L 1005,96.5 L 1000,90.7 L 995,89.4 L 990,86.6 L 985,91.6 L 980,93.0 L 975,82.1 L 970,81.0 L 965,81.4 L 960,74.2 L 955,75.2 L 950,78.0 L 945,82.3 L 940,88.2 L 935,80.8 L 930,78.1 L 925,85.4 L 920,83.1 L 915,82.5 L 910,85.7 L 905,84.1 L 900,85.2 L 895,79.5 L 890,73.7 L 885,84.2 L 880,89.4 L 875,88.0 L 870,93.3 L 865,93.7 L 860,94.4 L 855,95.1 L 850,90.0 L 845,96.6 L 840,102.5 L 835,93.6 L 830,90.3 L 825,89.5 L 820,87.1 L 815,90.4 L 810,88.9 L 805,91.7 L 800,100.2 L 795,93.4 L 790,87.0 L 785,90.6 L 780,89.7 L 775,90.8 L 770,88.6 L 765,82.3 L 760,84.8 L 755,79.5 L 750,70.0 L 745,76.0 L 740,81.1 L 735,82.0 L 730,83.5 L 725,78.6 L 720,80.7 L 715,83.7 L 710,76.4 L 705,79.5 L 700,85.6 L 695,80.4 L 690,76.7 L 685,71.7 L 680,71.1 L 675,79.3 L 670,77.5 L 665,77.8 L 660,86.9 L 655,84.2 L 650,79.7 L 645,79.9 L 640,79.3 L 635,85.5 L 630,84.0 L 625,74.4 L 620,76.6 L 615,74.6 L 610,67.4 L 605,70.2 L 600,73.1 L 595,77.9 L 590,80.7 L 585,71.7 L 580,72.1 L 575,77.5 L 570,72.4 L 565,72.9 L 560,75.2 L 555,72.8 L 550,72.3 L 545,64.4 L 540,61.8 L 535,73.1 L 530,74.7 L 525,74.5 L 520,80.8 L 515,80.8 L 510,82.1 L 505,81.9 L 500,79.6 L 495,89.7 L 490,93.0 L 485,84.8 L 480,85.6 L 475,85.9 L 470,85.6 L 465,90.3 L 460,90.7 L 455,98.2 L 450,106.0 L 445,98.2 L 440,96.7 L 435,102.3 L 430,101.9 L 425,104.1 L 420,101.9 L 415,98.6 L 410,101.6 L 405,93.7 L 400,87.5 L 395,96.2 L 390,99.4 L 385,100.0 L 380,100.5 L 375,96.3 L 370,99.6 L 365,99.1 L 360,91.9 L 355,97.9 L 350,101.2 L 345,94.1 L 340,90.6 L 335,85.9 L 330,87.4 L 325,93.9 L 320,90.6 L 315,94.5 L 310,102.8 L 305,97.7 L 300,94.9 L 295,96.2 L 290,97.4 L 285,103.8 L 280,99.8 L 275,93.3 L 270,97.7 L 265,93.4 L 260,88.0 L 255,93.1 L 250,96.5 L 245,101.8 L 240,101.9 L 235,93.5 L 230,97.2 L 225,99.8 L 220,93.2 L 215,95.3 L 210,96.3 L 205,92.6 L 200,89.6 L 195,79.9 L 190,80.1 L 185,89.2 L 180,86.3 L 175,86.5 L 170,91.4 L 165,88.7 L 160,88.2 L 155,85.3 L 150,84.1 L 145,93.6 L 140,91.4 L 135,82.8 L 130,84.8 L 125,83.3 L 120,82.7 L 115,86.5 L 110,87.6 L 105,97.0 L 100,101.2 L 95,92.6 L 90,95.0 L 85,100.3 L 80,99.5 L 75,102.3 L 70,100.3 L 65,99.6 L 60,101.7 L 55,92.2 L 50,90.5 L 45,100.6 L 40,102.0 L 35,102.9 L 30,103.1 L 25,100.0 L 20,103.5 L 15,99.7 L 10,94.1 L 5,101.8 L 0,101.0 Z"
              fill="var(--header-bg)"
              filter="url(#wrinkleShadowDistrict)"
            />
          </svg>
        </div>

        <div className="top-nav">
          <a href="/" className="brand-logo" title="රන් පොළොව Home">
            <img
              src={logoImg}
              alt="Logo"
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
              onClick={() => setIsDark(!isDark)}
              className="theme-toggle-btn"
              title="Toggle color theme"
            >
              {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
            </button>

            <UserProfileMenu />

          
          </div>
        </div>
      </header>


      <section className="page-hero-banner">
        <div className="hero-doodle-bg" />
        <div className="hero-content-inner">
          <h1 className="hero-page-title">
            <TrendingUpIcon size={26} style={{ color: '#22c55e' }} />
            <span>District Wholesale Procurement &amp; Retail Tariff Authority</span>
          </h1>
          <p className="hero-page-desc">
            Island-wide daily farmgate tariff release, district market floors, and retail price stabilization controls across Sri Lanka.
          </p>
        </div>
      </section>

   
      <main className="district-price-container">
        {/* District & Date Parameter Filter */}
        <section className="surface-card parameter-filter-card">
          <div className="filter-header-bar">
            <span className="filter-header-title">
              <SlidersHorizontalIcon size={16} style={{ color: '#22c55e' }} />
              <span>Target Scope &bull; District Harvest Filter</span>
            </span>
          </div>

          <div className="filter-grid-row">
            {/* Delivery Date */}
            <div className="filter-field-col">
              <label>
                <span>Delivery Date</span>
                <CalendarIcon size={13} style={{ color: '#22c55e' }} />
              </label>
              <input
                type="date"
                value={date}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                className="filter-field-input"
              />
            </div>

            {/* Target District */}
            <div className="filter-field-col">
              <label>
                <span>Target Agricultural District</span>
                <MapPinIcon size={13} style={{ color: '#22c55e' }} />
              </label>
              <select
                value={selectedDistrict}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedDistrict(e.target.value as District)}
                className="filter-field-select"
              >
                {Object.values(District).map((d) => (
                  <option key={d} value={d}>
                    {d.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>

     
            <div className="filter-field-col">
              <div className="filter-indicator-box">
                <span className="filter-indicator-label">Submitted Crops Found</span>
                <span className="filter-indicator-value">
                  {pendingProducts.length} Product{pendingProducts.length === 1 ? '' : 's'}
                </span>
              </div>
            </div>
          </div>
        </section>


        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Active District</span>
              <span className="stat-trend">Target</span>
            </div>
            <div className="stat-value district-val" title={selectedDistrict.replace(/_/g, ' ')}>
              {selectedDistrict.replace(/_/g, ' ')}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Total Volume</span>
              <span className="stat-trend">Islandwide</span>
            </div>
            <div className="stat-value volume-val">
              {summaryMetrics.totalIntakeKg.toLocaleString()}
              <span className="stat-unit">kg</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Farmer Lots</span>
              <span className="stat-trend">Batches</span>
            </div>
            <div className="stat-value lots-val">
              {summaryMetrics.totalLots}
              <span className="stat-unit">Lots</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Tariff Completion</span>
              <span className="stat-trend">
                {pendingProducts.length > 0 && summaryMetrics.pricedCount === pendingProducts.length
                  ? 'Complete'
                  : 'Pending'}
              </span>
            </div>
            <div className="stat-value completion-val">
              {summaryMetrics.pricedCount} / {pendingProducts.length}
            </div>
          </div>
        </section>

        {/* Wholesale Tariff Assignment Table Card */}
        <section className="surface-card table-ledger-card">
          <div className="table-card-header">
            <div className="table-title-group">
              <h2 className="table-card-title">
                <TrendingUpIcon size={18} style={{ color: '#22c55e' }} />
                <span>Wholesale Price Assignment &bull; {selectedDistrict.replace(/_/g, ' ')}</span>
              </h2>
              <span className="table-header-desc">
                Crops with verified submissions from registered farms in {selectedDistrict.replace(/_/g, ' ')}.
              </span>
            </div>

            {pendingProducts.length > 0 && (
              <span className="batch-active-badge">
                Batch Mode Active
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="table-empty-box">
              <RefreshIcon size={24} className="animate-spin" style={{ color: '#22c55e' }} />
              <span>Loading submitted crops for {selectedDistrict.replace(/_/g, ' ')}...</span>
            </div>
          ) : pendingProducts.length === 0 ? (
            <div className="table-empty-box">
              <div className="empty-icon-wrap">
                <AlertCircleIcon size={24} />
              </div>
              <div style={{ fontWeight: 800, fontSize: '15px' }}>
                No Harvest Submissions Found for {selectedDistrict.replace(/_/g, ' ')}
              </div>
              <div style={{ maxWidth: '440px', lineHeight: 1.5, opacity: 0.85 }}>
                No farmer batches have been registered in this district for delivery date {date}. Prices can only be released for crops with active harvest submissions.
              </div>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="tariff-table">
                <thead>
                  <tr>
                    <th>Crop Produce</th>
                    <th>Category</th>
                    <th>Submitted Volume</th>
                    <th>Farmer Buying Price (LKR)</th>
                    <th>Store Selling Price (LKR)</th>
                    <th>Unit Margin</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingProducts.map((p) => {
                    const buy = priceFormState[p.productId]?.buyingPrice ?? '';
                    const sell = priceFormState[p.productId]?.sellingPrice ?? '';
                    const margin = (typeof sell === 'number' && typeof buy === 'number') ? sell - buy : 0;
                    const isPositive = margin >= 0;

                    return (
                      <tr key={p.productId}>
                        {/* Crop Name & Lot Count */}
                        <td>
                          <div className="crop-title">{p.productName}</div>
                          <div className="crop-lot-subtext">
                            {p.harvestCount} farmer submission{p.harvestCount === 1 ? '' : 's'}
                          </div>
                        </td>

                        {/* Category */}
                        <td>
                          <span className="crop-category-badge">{p.category}</span>
                        </td>

                        {/* Volume */}
                        <td>
                          <span className="crop-volume-text">
                            {p.totalSubmittedQty.toLocaleString()} {p.unit}
                          </span>
                        </td>

                        {/* Buying Price Input */}
                        <td>
                          <div className="price-input-box">
                            <span className="currency-prefix">Rs.</span>
                            <input
                              type="number"
                              min="1"
                              step="0.5"
                              placeholder="0.00"
                              value={buy}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handlePriceChange(p.productId, 'buyingPrice', e.target.value)
                              }
                              className="tariff-number-input"
                            />
                          </div>
                        </td>

                        {/* Selling Price Input */}
                        <td>
                          <div className="price-input-box">
                            <span className="currency-prefix">Rs.</span>
                            <input
                              type="number"
                              min="1"
                              step="0.5"
                              placeholder="0.00"
                              value={sell}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handlePriceChange(p.productId, 'sellingPrice', e.target.value)
                              }
                              className="tariff-number-input selling"
                            />
                          </div>
                        </td>

                        {/* Unit Margin Calculated */}
                        <td>
                          <span className={`margin-badge ${isPositive ? 'positive' : 'negative'}`}>
                            Rs. {margin.toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="table-action-footer">
                <div className="tariff-alert-note">
                  <AlertCircleIcon size={16} style={{ flexShrink: 0 }} />
                  <span>
                    Releasing tariffs locks procurement rates and alerts enrolled farmers across {selectedDistrict.replace(/_/g, ' ')}.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleReleasePricingBatch}
                  disabled={isSubmitting || pendingProducts.length === 0}
                  className="btn-release-prices"
                >
                  <CheckIcon size={16} />
                  <span>
                    {isSubmitting ? 'Releasing Pricing Batch...' : `Release ${selectedDistrict.replace(/_/g, ' ')} Prices`}
                  </span>
                </button>
              </div>
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
        <div className={`action-toast show ${toast.type}`}>
          <CheckCircle2Icon size={17} style={{ color: toast.type === 'error' ? '#ef4444' : '#22c55e' }} />
          <span>{toast.msg}</span>
        </div>
      )}

    
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
            <a href="/district-price" className="footer-link-item">Market Prices</a>
            <a href="/farmdashboard" className="footer-link-item">Farm Operations</a>
            <a href="/user" className="footer-link-item">Stakeholder Ops</a>
            <a href="/allocation" className="footer-link-item">Resource Allocation</a>
            <a href="/buy" className="footer-link-item">Procurement Desk</a>
            <a href="/login" className="footer-link-item">Sign Out</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} රන් පොළොව Ecosystem Sri Lanka. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default DistrictPricingManagement;
