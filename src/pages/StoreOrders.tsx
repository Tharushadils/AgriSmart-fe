import React, { useState, useEffect, useRef, useMemo, useCallback, type FC, type SVGProps } from 'react';
import {
  Sprout,
  Sun,
  Moon,
  Search,
  X,
  Video,
  VideoOff,
  FlipHorizontal,
  Plus,
  Minus,
  ShoppingCart,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  RotateCcw,
  SlidersHorizontal,
  AlertCircle,
  Send,
  Calendar
} from 'lucide-react';
import api from '../service/api';
import UserProfileMenu from '../components/UserProfileMenu';
import '../StoreOrders.css';

export interface ProductItem {
  _id: string;
  name: string;
  unit: string;
  category?: string;
}

export interface PreOrderBasketItem {
  productId: string;
  name: string;
  quantity: number;
  unit: string;
}

export type FacingMode = 'environment' | 'user';

export interface ToastMessage {
  msg: string;
  type: 'success' | 'error' | 'info';
}

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

const BaseIcon: FC<IconProps & { children: React.ReactNode }> = ({
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


const PreOrderSlipIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M16.5 9.4 7.55 4.24" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.29 7 12 12 20.71 7" />
    <line x1="12" y1="22" x2="12" y2="12" />
  </BaseIcon>
);

const StoreBranchIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
  </BaseIcon>
);

const FinalOrderBoxIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path d="M7 7h.01" />
  </BaseIcon>
);

const OrderHistoryIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </BaseIcon>
);

const SettingsGearIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </BaseIcon>
);

export const AgriSmartPreOrder: FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);

  const currentUser = useMemo(() => {
    if (typeof window !== 'undefined') {
      const u = localStorage.getItem('user');
      return u ? JSON.parse(u) : null;
    }
    return null;
  }, []);

  const loggedInUserId = currentUser?._id || currentUser?.userId || localStorage.getItem('userId');

  const [productsCatalog, setProductsCatalog] = useState<ProductItem[]>([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState<boolean>(true);

  const [deliveryDate, setDeliveryDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [qtyInput, setQtyInput] = useState<number | ''>(10);
  const [qtyError, setQtyError] = useState<string>('');

  const [orderItems, setOrderItems] = useState<PreOrderBasketItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editQtyValue, setEditQtyValue] = useState<number | string>(1);
  const [editQtyError, setEditQtyError] = useState<string>('');

  // Camera States
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<FacingMode>('environment');
  const [hasMultipleCameras, setHasMultipleCameras] = useState<boolean>(false);

  // --- AI Auto-Detection State & Refs ---
  const [isAiScanning, setIsAiScanning] = useState<boolean>(false);
  const [aiDetectedLabel, setAiDetectedLabel] = useState<string | null>(null);
  const [scanHint, setScanHint] = useState<string | null>(null);

  const isRequestInFlightRef = useRef<boolean>(false);
  const scanSessionRef = useRef<number>(0);
  const orderItemsRef = useRef<PreOrderBasketItem[]>(orderItems);
  const productsCatalogRef = useRef<ProductItem[]>(productsCatalog);
  
  const searchDropdownRef = useRef<HTMLDivElement | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    orderItemsRef.current = orderItems;
  }, [orderItems]);

  useEffect(() => {
    productsCatalogRef.current = productsCatalog;
  }, [productsCatalog]);

  const [toast, setToast] = useState<ToastMessage | null>(null);

  const triggerToast = useCallback((msg: string, type: ToastMessage['type'] = 'success'): void => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ msg, type });
    toastTimerRef.current = setTimeout(() => setToast(null), 3500);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Cleanly restart AI scanning
  const resumeAiScanningForNextItem = useCallback((customHint?: string) => {
    scanSessionRef.current += 1;
    isRequestInFlightRef.current = false;
    setAiDetectedLabel(null);
    setScanHint(customHint || null);
    if (isCameraActive) {
      setIsAiScanning(true);
    }
  }, [isCameraActive]);


  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const prodRes = await api.get('/products');
        const list = Array.isArray(prodRes.data)
          ? prodRes.data
          : prodRes.data?.data || prodRes.data?.products || [];

        if (list.length > 0) {
          setProductsCatalog(list);
          setSelectedProduct(list[0]);
        }
      } catch (err) {
        console.error('Failed to load produce catalog:', err);
        triggerToast('Failed to load produce catalog from database.', 'error');
      } finally {
        setIsLoadingCatalog(false);
      }
    };

    fetchCatalog();
  }, [triggerToast]);

  useEffect(() => {
    async function checkDevices(): Promise<void> {
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        try {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const videoInputs = devices.filter((d) => d.kind === 'videoinput');
          if (videoInputs.length > 1) {
            setHasMultipleCameras(true);
          }
        } catch {}
      }
    }
    checkDevices();
  }, []);

  const stopCamera = (): void => {
    scanSessionRef.current += 1;
    isRequestInFlightRef.current = false;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setIsAiScanning(false);
    setAiDetectedLabel(null);
    setScanHint(null);
  };

  const startCamera = async (targetFacing: FacingMode = facingMode): Promise<void> => {
    setCameraError(null);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera API not accessible. Ensure HTTPS or localhost.');
      setIsCameraActive(false);
      return;
    }

    stopCamera();

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: targetFacing },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCameraActive(true);
      setFacingMode(targetFacing);
      setAiDetectedLabel(null);
      setScanHint(null);
      setIsAiScanning(true);
    } catch (err: unknown) {
      console.error('Camera stream error:', err);
      let errorMsg = 'Could not access camera feed.';
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          errorMsg = 'Camera permission was denied.';
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          errorMsg = 'No video capture hardware detected.';
        } else if (err.name === 'NotReadableError') {
          errorMsg = 'Camera hardware is currently in use.';
        }
      }
      setCameraError(errorMsg);
      setIsCameraActive(false);
    }
  };

  const toggleCamera = (): void => {
    if (isCameraActive) {
      stopCamera();
    } else {
      startCamera(facingMode);
    }
  };

  const flipCamera = (): void => {
    const nextMode: FacingMode = facingMode === 'environment' ? 'user' : 'environment';
    startCamera(nextMode);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // --- AI Frame Capture & Auto-Select Logic ---
  const captureAndDetectProduce = useCallback(async (): Promise<void> => {
    if (!videoRef.current || !isCameraActive || !isAiScanning || isRequestInFlightRef.current) {
      return;
    }

    if (videoRef.current.readyState < 2) return;

    const currentSession = scanSessionRef.current;
    isRequestInFlightRef.current = true;

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 480;
      canvas.height = 360;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageBase64 = canvas.toDataURL('image/jpeg', 0.75);

      const res = await api.post('/ai/detect-product', { imageBase64 });

      // Ignore stale responses if user moved on
      if (currentSession !== scanSessionRef.current) {
        return;
      }

      if (res.data?.detected && res.data?.product) {
        const detected = res.data.product;
        const currentCatalog = productsCatalogRef.current;

        const matchedFromCatalog = currentCatalog.find(
          (p) =>
            p._id === String(detected._id) ||
            p.name.trim().toLowerCase() === detected.name?.trim().toLowerCase()
        );

        const finalItem: ProductItem = matchedFromCatalog || {
          _id: String(detected._id),
          name: detected.name,
          unit: detected.unit || 'kg',
          category: detected.category || ''
        };

        // Check if already in basket
        const alreadyInBasket = orderItemsRef.current.some(
          (item) => item.productId === finalItem._id
        );

        if (alreadyInBasket) {
           setScanHint(`"${finalItem.name}" is already in basket. Scan next produce...`);
           return;
        }

        setScanHint(null);
        setSelectedProduct(finalItem);
        setSearchQuery(finalItem.name);
        setIsSearchOpen(false);
        setAiDetectedLabel(finalItem.name);
        setIsAiScanning(false);
        triggerToast(`AI Detected: ${finalItem.name} selected automatically!`, 'success');
      }
    } catch (err) {
      console.error('AI Product Scan Error:', err);
    } finally {
      if (currentSession === scanSessionRef.current) {
        isRequestInFlightRef.current = false;
      }
    }
  }, [isCameraActive, isAiScanning, triggerToast]);


  useEffect(() => {
    if (!isCameraActive || !isAiScanning) return;

    const initialTimer = setTimeout(() => {
      captureAndDetectProduce();
    }, 500);

    const intervalId = setInterval(() => {
      captureAndDetectProduce();
    }, 2200);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalId);
    };
  }, [isCameraActive, isAiScanning, captureAndDetectProduce]);


  const filteredCatalog = useMemo(() => {
    if (!searchQuery.trim()) return productsCatalog;
    return productsCatalog.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  }, [searchQuery, productsCatalog]);

  const handleQtyChange = (val: string): void => {
    setQtyError('');
    const parsed = parseInt(val, 10);
    if (isNaN(parsed) || parsed <= 0) {
      setQtyInput('');
      setQtyError('Enter a valid quantity (> 0)');
      return;
    }
    setQtyInput(parsed);
  };

  const stepQuantity = (delta: number): void => {
    const current = typeof qtyInput === 'number' ? qtyInput : 1;
    const next = current + delta;
    if (next < 1) return;
    setQtyError('');
    setQtyInput(next);
  };

  const handleAddToOrder = (): void => {
    if (!selectedProduct) {
      triggerToast('Please select a produce item first.', 'error');
      return;
    }

    const qty = typeof qtyInput === 'number' ? qtyInput : parseInt(qtyInput as string, 10);
    if (isNaN(qty) || qty <= 0) {
      setQtyError('Please enter a quantity greater than zero');
      return;
    }

    setOrderItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.productId === selectedProduct._id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: qty
        };
        return updated;
      }
      return [
        ...prev,
        {
          productId: selectedProduct._id,
          name: selectedProduct.name,
          quantity: qty,
          unit: selectedProduct.unit || 'kg'
        }
      ];
    });

    triggerToast(
       isCameraActive 
        ? `Added ${selectedProduct.name} (${qty} ${selectedProduct.unit || 'kg'}). Scanning next...` 
        : `Added ${selectedProduct.name} (${qty} ${selectedProduct.unit || 'kg'}) to pre-order.`
    );
    
    // Reset selection and resume scanning
    setQtyInput(10);
    setIsSearchOpen(false);
    
    if (isCameraActive) {
      setSelectedProduct(null);
      setSearchQuery('');
      resumeAiScanningForNextItem('Scanning for next produce item...');
    } else {
        const nextAvailable = productsCatalog.find(
           (p) => !orderItemsRef.current.some((item) => item.productId === p._id) && p._id !== selectedProduct._id
        );
        if (nextAvailable) {
           setSelectedProduct(nextAvailable);
           setSearchQuery(nextAvailable.name);
        } else {
            setSelectedProduct(null);
            setSearchQuery('');
        }
    }
  };

  const handleRemoveItem = (productId: string, name: string): void => {
    setOrderItems((prev) => prev.filter((i) => i.productId !== productId));
    triggerToast(`Removed ${name} from pre-order.`, 'info');
  };

  const startEditItem = (item: PreOrderBasketItem): void => {
    setEditingItemId(item.productId);
    setEditQtyValue(item.quantity);
    setEditQtyError('');
    setIsAiScanning(false); // Pause AI while editing
  };

  const saveEditItem = (item: PreOrderBasketItem): void => {
    const parsed = typeof editQtyValue === 'number' ? editQtyValue : parseInt(editQtyValue as string, 10);
    if (isNaN(parsed) || parsed <= 0) {
      setEditQtyError('Quantity must be at least 1');
      return;
    }

    setOrderItems((prev) =>
      prev.map((i) => (i.productId === item.productId ? { ...i, quantity: parsed } : i))
    );
    setEditingItemId(null);
    triggerToast(`Updated ${item.name} quantity to ${parsed} ${item.unit}.`);
  };

  const handleFinalizeOrder = async (): Promise<void> => {
    if (orderItems.length === 0 || isSubmitting) return;

    if (!loggedInUserId) {
      triggerToast('Store user account not identified. Please log in again.', 'error');
      return;
    }

    const targetDelivery = new Date(deliveryDate);
    targetDelivery.setHours(0, 0, 0, 0);

    const deadline = new Date(targetDelivery);
    deadline.setDate(deadline.getDate() - 1);
    deadline.setHours(23, 59, 59, 999);

    if (new Date() > deadline) {
      triggerToast('Pre-order deadline passed! Orders must be placed before 12:00 AM the day before delivery.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post('/orders/create', {
        date: targetDelivery.toISOString(),
        userId: loggedInUserId,
        items: orderItems.map((item) => ({
          productId: item.productId,
          requestedQty: item.quantity
        }))
      });

      const count = response.data?.data?.length || orderItems.length;
      triggerToast(` Successfully submitted ${count} pre-order line(s) for delivery on ${deliveryDate}!`, 'success');
      setOrderItems([]);
      setIsAiScanning(false);
    } catch (err: any) {
      console.error('Order creation failed:', err);
      const msg = err.response?.data?.message || 'Failed to submit pre-order to server.';
      triggerToast(msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetOrder = (): void => {
    setOrderItems([]);
    if(isCameraActive) {
      setSelectedProduct(null);
      setSearchQuery('');
      resumeAiScanningForNextItem('Basket reset. Scanning for produce...');
    }
    triggerToast('Pre-Order basket cleared.', 'info');
  };

  const totalQuantityKg = useMemo(() => {
    return orderItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [orderItems]);

  return (
    <div className={`store-orders-root ${isDark ? 'dark-theme' : ''}`}>
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
            <span className="module-tag">Store Orders</span>
          </a>

          <div className="nav-right-actions">
            <button
              onClick={() => setIsDark(!isDark)}
              className="theme-toggle-btn"
              title="Toggle color theme"
              aria-label="Toggle color theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <UserProfileMenu />
          </div>
        </div>
      </header>

  
      <section className="page-hero-banner">
        <div className="hero-doodle-bg" />
        <div className="hero-content-inner">
          <h1 className="hero-page-title">
            <ShoppingCart className="w-7 h-7 text-emerald-500" />
            <span>Store Wholesale Pre-Order &amp; Requisitions</span>
          </h1>
          <p className="hero-page-desc">
            Direct farmer produce pre-ordering, custom barcode intake scanner, and seasonal crop basket submissions.
          </p>
        </div>
      </section>

      {/*  Main Content Container */}
      <main className="store-orders-container max-w-7xl mx-auto px-4 sm:px-6 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-7 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Create Store Pre-Order</h1>
              <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Select fresh produce, configure order volume, and submit your store requisition.
              </p>
            </div>

            <div className={`p-2 rounded-xl border flex items-center gap-2 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <Calendar className="w-4 h-4 text-emerald-400 ml-1" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Target Delivery</span>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="bg-transparent text-xs font-bold font-mono focus:outline-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="relative" ref={searchDropdownRef}>
            <div className={`flex items-center px-3.5 py-2.5 rounded-xl border transition-all ${
              isDark 
                ? 'bg-slate-900/90 border-slate-800 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20' 
                : 'bg-white border-slate-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 shadow-sm'
            }`}>
              <Search className={`w-4 h-4 mr-2.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              <input
                type="text"
                placeholder={isLoadingCatalog ? 'Loading products catalog...' : isCameraActive && isAiScanning ? 'AI is scanning camera feed... or type to search' : 'Search produce from database...'}
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const val = e.target.value;
                  setSearchQuery(val);
                  setIsSearchOpen(true);
                  const exactMatch = productsCatalog.find(
                     (p) => p.name.toLowerCase() === val.trim().toLowerCase()
                  );
                  setSelectedProduct(exactMatch || null);
                }}
                className={`w-full bg-transparent text-sm focus:outline-none ${isDark ? 'text-slate-100 placeholder:text-slate-500' : 'text-slate-900 placeholder:text-slate-400'}`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchOpen(false);
                    setSelectedProduct(null);
                  }}
                  className="p-1 text-slate-400 hover:text-slate-200 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {isSearchOpen && (
              <div className={`absolute mt-1.5 w-full max-h-60 overflow-y-auto rounded-xl border shadow-xl z-30 transition-all ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
              }`}>
                {filteredCatalog.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400">
                    No matching produce found for &quot;{searchQuery}&quot;.
                  </div>
                ) : (
                  filteredCatalog.map((item) => {
                     const isAlreadyAdded = orderItems.some((h) => h.productId === item._id);
                     return (
                        <button
                          key={item._id}
                          type="button"
                          onClick={() => {
                            setSelectedProduct(item);
                            setQtyInput(10);
                            setQtyError('');
                            setIsSearchOpen(false);
                            setSearchQuery(item.name);
                            setAiDetectedLabel(item.name);
                            setIsAiScanning(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm border-b transition-colors last:border-b-0 cursor-pointer ${
                            selectedProduct?._id === item._id
                              ? isDark ? 'bg-emerald-950/50 text-emerald-300' : 'bg-emerald-50 text-emerald-800'
                              : isDark ? 'border-slate-800 hover:bg-slate-800/60' : 'border-slate-100 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span className="font-semibold">{item.name} {isAlreadyAdded ? '(Added)' : ''}</span>
                            {item.category && (
                              <span className="text-[10px] text-slate-400 uppercase font-mono">({item.category})</span>
                            )}
                          </div>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                            {item.unit || 'kg'}
                          </span>
                        </button>
                      );
                  })
                )}
              </div>
            )}
          </div>

          <div className={`rounded-2xl border overflow-hidden transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className={`px-4 py-3 border-b flex items-center justify-between ${
              isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${isCameraActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                <span className="text-xs font-semibold tracking-wide">
                  {isCameraActive ? `Optical Feed Active (${facingMode === 'environment' ? 'Rear' : 'Front'})` : 'Camera Standby'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                 {isCameraActive && !isAiScanning && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProduct(null);
                        setSearchQuery('');
                        resumeAiScanningForNextItem('Scanning for new produce...');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-all cursor-pointer ${
                        isDark ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-700 shadow-xs'
                      }`}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Scan Again</span>
                    </button>
                  )}
                {hasMultipleCameras && isCameraActive && (
                  <button
                    type="button"
                    onClick={flipCamera}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-all cursor-pointer ${
                      isDark ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-700 shadow-xs'
                    }`}
                  >
                    <FlipHorizontal className="w-3.5 h-3.5" />
                    <span>Flip</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={toggleCamera}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                    isCameraActive
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {isCameraActive ? <VideoOff className="w-3.5 h-3.5" /> : <Video className="w-3.5 h-3.5" />}
                  <span>{isCameraActive ? 'Stop Camera' : 'Start Camera'}</span>
                </button>
              </div>
            </div>

            <div className="relative aspect-[16/9] sm:aspect-[21/10] bg-black flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                playsInline
                autoPlay
                muted
                className={`w-full h-full object-cover transition-opacity duration-300 ${isCameraActive ? 'opacity-100' : 'opacity-0 absolute'}`}
              />
               {isCameraActive && (
                  <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
                    <div className="flex justify-center">
                       <span className="px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/20 shadow-lg">
                         {aiDetectedLabel
                          ? `Detected: ${aiDetectedLabel}`
                          : scanHint
                          ? scanHint
                          : isAiScanning
                          ? 'AI Scanning Produce...'
                          : 'Live Inspection Active'}
                       </span>
                    </div>
                    
                    {/* Corner Brackets Reticle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 border-2 border-emerald-500/50 rounded-xl opacity-50">
                        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl"></div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl"></div>
                        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl"></div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-xl"></div>
                    </div>
                    
                    <div className="flex justify-center">
                       <span className="px-3 py-1 bg-black/60 text-white/80 text-[10px] uppercase tracking-wider rounded border border-white/10">
                           {aiDetectedLabel
                            ? 'Auto-Selected in Form (Add to Order to scan next)'
                            : `Mode: ${facingMode}`}
                       </span>
                    </div>
                  </div>
                )}
              {!isCameraActive && (
                <div className="p-6 text-center flex flex-col items-center justify-center max-w-sm">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 ${
                    cameraError ? 'bg-rose-950/60 text-rose-400 border border-rose-800' : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {cameraError ? <AlertCircle className="w-7 h-7" /> : <Video className="w-7 h-7" />}
                  </div>
                  <h3 className="font-semibold text-sm">
                    {cameraError ? 'Camera Feed Error' : 'Live Camera Inactive'}
                  </h3>
                  <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {cameraError ? cameraError : "Click 'Start Camera' to automatically identify products for your pre-order."}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-dashed border-slate-700/50">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-500" />
                <span className="font-semibold text-sm">Quantity Configuration</span>
              </div>
              <div className="text-xs">
                Selected: <span className="font-bold text-emerald-400">{selectedProduct?.name || 'None'}</span>
                <span className={`ml-2 px-2 py-0.5 rounded ${isDark ? 'bg-slate-800 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>
                  Unit: {selectedProduct?.unit || 'kg'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className={`flex items-center rounded-xl border p-1 ${
                isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => stepQuantity(-5)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                  aria-label="Decrease quantity by 5"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex items-center px-2">
                  <input
                    type="number"
                    min="1"
                    value={qtyInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleQtyChange(e.target.value)}
                    className="w-16 text-center font-bold text-base bg-transparent focus:outline-none"
                  />
                  <span className="text-xs font-semibold text-slate-400 select-none">{selectedProduct?.unit || 'kg'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => stepQuantity(5)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                  aria-label="Increase quantity by 5"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToOrder}
                disabled={!!qtyError || !selectedProduct}
                className="flex-1 py-3 px-5 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Produce to Pre-Order</span>
              </button>
            </div>

            {qtyError && (
              <p className="text-xs text-rose-400 mt-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{qtyError}</span>
              </p>
            )}
          </div>
        </section>

        {/*  Pre Order Basket */}
        <section className="lg:col-span-5 flex flex-col gap-5">
          <div className={`rounded-2xl border flex flex-col h-full transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${
                  isDark ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base leading-tight">Your Pre-Order Basket</h2>
                  <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {orderItems.length} distinct items &bull; Delivery: {deliveryDate}
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                DRAFT
              </span>
            </div>

            <div className="p-4 sm:p-5 flex-1 overflow-y-auto max-h-[380px] space-y-2.5">
              {orderItems.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2.5 ${
                    isDark ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-400'
                  }`}>
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold">No produce in pre-order</p>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Use produce catalog search above to select and add items.
                  </p>
                </div>
              ) : (
                orderItems.map((item) => {
                  const isEditing = editingItemId === item.productId;
                  return (
                    <div key={item.productId} className={`p-3 rounded-xl border transition-all ${
                      isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isDark ? 'bg-emerald-950/70 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            <Sprout className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-semibold text-xs sm:text-sm truncate">{item.name}</h4>
                            <span className="text-[11px] font-bold text-emerald-500">{item.quantity} {item.unit}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => (isEditing ? setEditingItemId(null) : startEditItem(item))}
                            className="p-2 rounded-lg text-xs cursor-pointer"
                            aria-label="Edit quantity"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.productId, item.name)}
                            className="p-2 rounded-lg text-xs text-rose-400 cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="mt-2.5 pt-2.5 border-t border-dashed border-slate-700 flex items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            value={editQtyValue}
                            onChange={(e) => setEditQtyValue(e.target.value)}
                            className="w-20 px-2 py-1 text-xs rounded border bg-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => saveEditItem(item)}
                            className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-600 text-white ml-auto cursor-pointer"
                          >
                            Save
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <div className={`p-4 border-t space-y-3 ${isDark ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="text-xs text-slate-400">Total Lines</div>
                  <div className="text-base font-bold text-emerald-500">{orderItems.length} lines</div>
                </div>
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="text-xs text-slate-400">Total Volume</div>
                  <div className="text-base font-bold text-emerald-500">{totalQuantityKg} kg</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleFinalizeOrder}
                  disabled={orderItems.length === 0 || isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Finalize Pre-Order ({orderItems.length} Items)</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetOrder}
                  className="p-3 rounded-xl border border-dashed border-slate-600 text-slate-400 hover:text-white cursor-pointer"
                  aria-label="Reset order basket"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
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

      
      {toast && (
        <div className="fixed top-20 right-5 z-50">
          <div className={`px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold text-white border ${
            toast.type === 'error' ? 'bg-rose-600 border-rose-500' : 'bg-emerald-600 border-emerald-500'
          }`}>
            <CheckCircle2 className="w-4 h-4" />
            <span>{toast.msg}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgriSmartPreOrder;