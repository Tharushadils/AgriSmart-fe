import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  type FC,
  type SVGProps,
  type ChangeEvent,
  type FormEvent
} from 'react';
import api from '../service/api';
import '../FarmerHarvest.css';

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

export const SproutIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
    <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4.1 1-4.9 2z" />
  </BaseIcon>
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

export const SearchIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </BaseIcon>
);

export const XIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </BaseIcon>
);

export const VideoIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="m22 8-6 4 6 4V8Z" />
    <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
  </BaseIcon>
);

export const VideoOffIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M10.66 6H14a2 2 0 0 1 2 2v2.34l1 1L22 8v8" />
    <path d="M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l10 10Z" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </BaseIcon>
);

export const FlipHorizontalIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="m3 7 5 5-5 5V7Z" />
    <path d="m21 7-5 5 5 5V7Z" />
    <path d="M12 20v2" />
    <path d="M12 14v2" />
    <path d="M12 8v2" />
    <path d="M12 2v2" />
  </BaseIcon>
);

export const CheckCircle2Icon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </BaseIcon>
);

export const SlidersHorizontalIcon: FC<IconProps> = (p) => (
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

export const CheckIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <polyline points="20 6 9 17 4 12" />
  </BaseIcon>
);

export const Trash2Icon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </BaseIcon>
);

export const Edit2Icon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </BaseIcon>
);

export const LayersIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </BaseIcon>
);

export const ChevronDownIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <polyline points="6 9 12 15 18 9" />
  </BaseIcon>
);

export const PackageIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </BaseIcon>
);

export const ScaleIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </BaseIcon>
);

export const ClockIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </BaseIcon>
);

export const LockIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </BaseIcon>
);

export const RotateCcwIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </BaseIcon>
);

export const SendIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </BaseIcon>
);

export const AlertCircleIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </BaseIcon>
);

export const PlusIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </BaseIcon>
);

export const MinusIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M5 12h14" />
  </BaseIcon>
);

export const SeedlingHarvestIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
    <path d="M12 20V10" />
    <path d="M12 14c-3-3-3-7 0-9" />
    <path d="M12 14c-1-4-5-4-7-2 1 4 4 6 7 2z" />
  </BaseIcon>
);

export const HarvestHistoryIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </BaseIcon>
);

export const PriceTagTrendIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path d="M7 7h.01" />
  </BaseIcon>
);

export const MapPinIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </BaseIcon>
);

export const SettingsGearIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </BaseIcon>
);

export interface ProduceCatalogItem {
  id: string;
  name: string;
  unit: string;
}

export interface HarvestDraftItem {
  tempId: string;
  productId: string;
  name: string;
  qty: number;
  unit: string;
  date: string;
}

export interface ToastMessage {
  msg: string;
  type: 'success' | 'error' | 'info';
}

export interface FarmerHarvestProps {
  currentUser?: {
    _id?: string;
    name?: string;
    role?: string;
  };
}

export const FarmerHarvest: FC<FarmerHarvestProps> = ({ currentUser }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ranpolowa_theme_preference');
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
      localStorage.setItem('ranpolowa_theme_preference', isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  const [userState, setUserState] = useState(currentUser);

  useEffect(() => {
    if (currentUser?.name) {
      setUserState(currentUser);
      return;
    }
    const userRaw = localStorage.getItem('user');
    if (userRaw) {
      try {
        const u = JSON.parse(userRaw);
        setUserState({
          name: u.fullName || u.name || 'Farmer Operator',
          role: u.role || u.roles?.[0] || 'FARMER',
          email: u.email || '',
          initials: (u.fullName || u.name || 'FO').slice(0, 2).toUpperCase(),
        });
      } catch {
        // ignore parse error
      }
    }
  }, [currentUser]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const [produceCatalog, setProduceCatalog] = useState<ProduceCatalogItem[]>([]);
  const [cropSearchQuery, setCropSearchQuery] = useState<string>('');
  const [showCropDropdown, setShowCropDropdown] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProduceCatalogItem | null>(null);

  // Delivery date: Deadline check 
  const minDeliveryDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }, []);

  const [qtyInput, setQtyInput] = useState<number | ''>(50);
  const [harvestDate, setHarvestDate] = useState<string>(minDeliveryDate);

  const [editingTempId, setEditingTempId] = useState<string | null>(null);
  const [harvestItems, setHarvestItems] = useState<HarvestDraftItem[]>([]);
  const [isCommitted, setIsCommitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchRosterQuery, setSearchRosterQuery] = useState<string>('');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const triggerToast = (msg: string, type: ToastMessage['type'] = 'success'): void => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        const rawList = Array.isArray(res.data)
          ? res.data
          : res.data?.products || res.data?.data || [];

        if (Array.isArray(rawList) && rawList.length > 0) {
          const catalog: ProduceCatalogItem[] = rawList.map((item: any) => ({
            id: String(item._id || item.id),
            name: item.name || item.cropName || item.productName || 'Unnamed Crop',
            unit: item.unit || 'kg'
          }));

          setProduceCatalog(catalog);
          setSelectedProduct(catalog[0]);
          setCropSearchQuery(catalog[0].name);
        }
      } catch (err: any) {
        console.error('Failed to load products:', err);
        triggerToast('Failed to load produce catalog from backend.', 'error');
      }
    };

    fetchProducts();
  }, []);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [hasMultipleCameras, setHasMultipleCameras] = useState<boolean>(false);

  useEffect(() => {
    async function checkDevices(): Promise<void> {
      if (typeof navigator !== 'undefined' && navigator.mediaDevices?.enumerateDevices) {
        try {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const videoInputs = devices.filter((d) => d.kind === 'videoinput');
          if (videoInputs.length > 1) {
            setHasMultipleCameras(true);
          }
        } catch {
          // Ignore
        }
      }
    }
    checkDevices();
  }, []);

  const stopCamera = (): void => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const startCamera = async (targetFacing: 'environment' | 'user' = facingMode): Promise<void> => {
    setCameraError(null);
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setCameraError('Camera API not accessible.');
      setIsCameraActive(false);
      return;
    }

    stopCamera();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: targetFacing }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCameraActive(true);
      setFacingMode(targetFacing);
    } catch {
      setCameraError('Camera permission denied or hardware unavailable.');
      setIsCameraActive(false);
    }
  };

  const toggleCamera = (): void => {
    if (isCameraActive) stopCamera();
    else startCamera(facingMode);
  };

  const flipCamera = (): void => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    startCamera(nextMode);
  };

  useEffect(() => () => stopCamera(), []);

  const filteredCatalog = useMemo(() => {
    if (!cropSearchQuery.trim()) return produceCatalog;
    const q = cropSearchQuery.trim().toLowerCase();
    return produceCatalog.filter((p) => p.name.toLowerCase().includes(q));
  }, [produceCatalog, cropSearchQuery]);

  const stepQuantity = (delta: number): void => {
    const current = typeof qtyInput === 'number' ? qtyInput : 0;
    const next = current + delta;
    if (next < 1) return;
    setQtyInput(next);
  };

  const handleCancelEdit = () => {
    setEditingTempId(null);
    if (produceCatalog.length > 0) {
      setSelectedProduct(produceCatalog[0]);
      setCropSearchQuery(produceCatalog[0].name);
    } else {
      setSelectedProduct(null);
      setCropSearchQuery('');
    }
    setQtyInput(50);
  };

  const handleSubmitHarvest = (e: FormEvent) => {
    e.preventDefault();

    if (isCommitted) {
      triggerToast('Harvest batch is already submitted and locked.', 'error');
      return;
    }

    if (!selectedProduct) {
      triggerToast('Please select a valid crop product from the catalog.', 'error');
      return;
    }

    const qty = typeof qtyInput === 'number' ? qtyInput : parseFloat(qtyInput as string);
    if (isNaN(qty) || qty < 0.1) {
      triggerToast('Submitted quantity must be at least 0.1 kg/units.', 'error');
      return;
    }

    const payload: HarvestDraftItem = {
      tempId: editingTempId || `draft_${Date.now()}`,
      productId: selectedProduct.id,
      name: selectedProduct.name,
      qty: qty,
      unit: selectedProduct.unit || 'kg',
      date: harvestDate
    };

    if (editingTempId) {
      setHarvestItems((prev) => prev.map((item) => (item.tempId === editingTempId ? payload : item)));
      triggerToast(`Harvest line "${payload.name}" updated!`, 'success');
      setEditingTempId(null);
    } else {
      const exists = harvestItems.some((i) => i.productId === payload.productId && i.date === payload.date);
      if (exists) {
        triggerToast('This crop on this delivery date is already added to this batch.', 'error');
        return;
      }
      setHarvestItems((prev) => [payload, ...prev]);
      triggerToast(`Added ${payload.name} (${payload.qty} ${payload.unit}) to batch.`, 'success');
    }

    setQtyInput(50);
  };

  const handleEditItem = (item: HarvestDraftItem) => {
    setEditingTempId(item.tempId);
    setHarvestDate(item.date);
    setQtyInput(item.qty);

    const found = produceCatalog.find((p) => p.id === item.productId);
    if (found) {
      setSelectedProduct(found);
      setCropSearchQuery(found.name);
    }

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDeleteItem = (tempId: string) => {
    if (isCommitted) return;
    if (editingTempId === tempId) handleCancelEdit();
    setHarvestItems((prev) => prev.filter((i) => i.tempId !== tempId));
    triggerToast('Harvest line removed.', 'info');
  };

  
  const handleCommitBatch = async (): Promise<void> => {
    if (harvestItems.length === 0 || isCommitted || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const userRaw = localStorage.getItem('user');
      const user = userRaw ? JSON.parse(userRaw) : null;
      // Farm ID = User ID
      const resolvedUserId = currentUser?._id || user?._id || user?.userId || localStorage.getItem('farmId');

      if (!resolvedUserId) {
        triggerToast('User session expired. Please sign in again.', 'error');
        setIsSubmitting(false);
        return;
      }

      // Submit each harvest concurrently
      await Promise.all(
        harvestItems.map((item) =>
          api.post('/harvests/create', {
            farmId: resolvedUserId,
            productId: item.productId,
            qty: Number(item.qty),
            date: item.date
          })
        )
      );

      setIsCommitted(true);
      triggerToast(' Harvest batch successfully broadcasted to wholesale network!', 'success');

      setTimeout(() => {
        window.location.href = '/farmdashboard';
      }, 1500);
    } catch (err: any) {
      console.error('Submission failed:', err);
      const serverMsg = err.response?.data?.message || err.response?.data?.error;
      triggerToast(serverMsg || 'Failed to submit harvest to backend.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetBatch = (): void => {
    setHarvestItems([]);
    setIsCommitted(false);
    triggerToast('Intake batch reset to DRAFT.', 'info');
  };

  const filteredHarvestItems = useMemo(() => {
    if (!searchRosterQuery.trim()) return harvestItems;
    const q = searchRosterQuery.toLowerCase().trim();
    return harvestItems.filter((i) => i.name.toLowerCase().includes(q) || i.date.includes(q));
  }, [harvestItems, searchRosterQuery]);

  const totalBatchesCount = harvestItems.length;
  const totalYieldKg = useMemo(
    () => harvestItems.reduce((acc, curr) => acc + curr.qty, 0),
    [harvestItems]
  );

  const profileName = userState?.name || currentUser?.name || 'Farmer Operator';

  return (
    <div className={`farmer-harvest-root ${isDark ? 'dark-theme' : ''}`}>
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
          <a href="/farmdashboard" className="brand-logo" title="රන් පොළොව Farmer Portal">
            <div className="logo-sprout-icon">
              <SproutIcon size={22} style={{ color: '#22c55e' }} />
            </div>
            <span className="logo-text">
              රන් <span>පොළොව</span>
            </span>
            <span className="module-tag">Farmer Harvest</span>
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
              >
                <div className="user-avatar-circle">
                  <span>{profileName.slice(0, 1).toUpperCase()}</span>
                </div>
                <span className="user-profile-name">{profileName}</span>
                <ChevronDownIcon size={14} />
              </button>

              <div className={`profile-dropdown ${isProfileOpen ? 'show' : ''}`}>
                <div className="dropdown-header">
                  <div className="dropdown-title">{profileName}</div>
                  <div className="dropdown-subtitle">ROLE: FARMER</div>
                </div>
                <a href="/farmdashboard" className="dropdown-link">
                  <SproutIcon size={15} /> Farm Operations
                </a>
                <div className="dropdown-divider" />
                <a
                  href="/login"
                  className="dropdown-link"
                  style={{ color: '#f43f5e' }}
                  onClick={() => localStorage.clear()}
                >
                  <XIcon size={15} /> Sign Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="page-hero-banner">
        <div className="hero-doodle-bg" />
        <div className="hero-flex-wrap">
          <div>
            <div className="breadcrumb-trail">
              <a href="/farmdashboard">Portal</a>
              <span>/</span>
              <span style={{ color: '#22c55e' }}>Harvest Intake</span>
            </div>
            <h1 className="page-title">
              Direct Farm <span>Harvest Intake</span>
            </h1>
            <p className="page-subtitle">
              Record harvest yields and dispatch verified lot details directly to the wholesale network.
            </p>
          </div>
        </div>
      </section>

      <section className="kpi-section">
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Registered Lots</span>
              <div className="kpi-icon-badge" style={{ background: 'rgba(34, 197, 94, 0.14)', color: '#22c55e' }}>
                <PackageIcon size={18} />
              </div>
            </div>
            <div className="kpi-value">{totalBatchesCount}</div>
            <div className="kpi-subtext">Active crop lines</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Total Yield Weight</span>
              <div className="kpi-icon-badge" style={{ background: 'rgba(20, 184, 166, 0.14)', color: '#14b8a6' }}>
                <ScaleIcon size={18} />
              </div>
            </div>
            <div className="kpi-value" style={{ color: '#14b8a6' }}>{totalYieldKg} kg</div>
            <div className="kpi-subtext">Intake weight</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Camera Scanner</span>
              <div className="kpi-icon-badge" style={{ background: 'rgba(245, 158, 11, 0.14)', color: '#d97706' }}>
                {isCameraActive ? <span className="ping-dot" /> : <VideoIcon size={18} />}
              </div>
            </div>
            <div className="kpi-value" style={{ color: isCameraActive ? '#22c55e' : '#f59e0b' }}>
              {isCameraActive ? 'LIVE' : 'STANDBY'}
            </div>
            <div className="kpi-subtext">Visual Verification</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Batch Status</span>
              <div className="kpi-icon-badge" style={{ background: 'rgba(168, 85, 247, 0.14)', color: '#a855f7' }}>
                {isCommitted ? <LockIcon size={18} /> : <ClockIcon size={18} />}
              </div>
            </div>
            <div className="kpi-value" style={{ color: isCommitted ? '#22c55e' : '#a855f7' }}>
              {isCommitted ? 'SUBMITTED' : 'DRAFT'}
            </div>
            <div className="kpi-subtext">
              {isCommitted ? 'Committed & Locked' : 'Open Draft'}
            </div>
          </div>
        </div>
      </section>

      <section className="workspace-section">
        <div className="workspace-grid">
          <div className="left-column">
            <div className="camera-card">
              <div className="camera-toolbar">
                <div className="camera-toolbar-left">
                  <VideoIcon size={16} style={{ color: '#22c55e' }} />
                  <span>Optical Quality Scanner &bull; Produce Inspection</span>
                </div>

                <div className="camera-toolbar-right">
                  {hasMultipleCameras && isCameraActive && (
                    <button type="button" onClick={flipCamera} className="camera-action-btn">
                      <FlipHorizontalIcon size={14} />
                      <span>Flip Camera</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={toggleCamera}
                    className={`camera-action-btn verify-btn ${isCameraActive ? 'live' : ''}`}
                  >
                    {isCameraActive ? <VideoOffIcon size={14} /> : <VideoIcon size={14} />}
                    <span>{isCameraActive ? 'Stop Camera' : 'Verify Produce'}</span>
                  </button>
                </div>
              </div>

              <div className="camera-frame-wrapper">
                <video
                  ref={videoRef}
                  playsInline
                  autoPlay
                  muted
                  className="camera-video-element"
                  style={{ display: isCameraActive ? 'block' : 'none' }}
                />

                {isCameraActive ? (
                  <div className="camera-overlay-reticle">
                    <span className="reticle-badge-top">Live Inspection Active</span>
                    <span className="reticle-badge-bottom">Mode: {facingMode.toUpperCase()}</span>
                  </div>
                ) : (
                  <div className={`camera-standby-placeholder ${cameraError ? 'has-error' : ''}`}>
                    <div className="camera-standby-icon">
                      {cameraError ? <AlertCircleIcon size={26} /> : <VideoIcon size={26} />}
                    </div>
                    <div className="camera-standby-title">
                      {cameraError ? 'Camera Stream Error' : 'Live Camera Standby'}
                    </div>
                    <p className="camera-standby-desc">
                      {cameraError || 'Use optical verification to inspect visual freshness prior to submission.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmitHarvest} className="center-form-card">
              <div className="form-header-bar">
                <div className="form-header-left">
                  <SlidersHorizontalIcon size={16} style={{ color: '#22c55e' }} />
                  <span>Harvest Intake Attributes</span>
                </div>
                {editingTempId && (
                  <span className="editing-mode-pill">Editing: {selectedProduct?.name}</span>
                )}
              </div>

              <div className="form-field-group">
                <label className="form-label">
                  <span>Harvested Crop Produce (productId)</span>
                  <span className="form-label-tag">Required &bull; Catalog</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={cropSearchQuery}
                    onFocus={() => setShowCropDropdown(true)}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setCropSearchQuery(e.target.value);
                      setShowCropDropdown(true);
                    }}
                    required
                    placeholder="Search crop from catalog..."
                    className="form-input"
                    disabled={isCommitted}
                  />

                  {showCropDropdown && (
                    <div className="floating-results-dropdown">
                      {filteredCatalog.length > 0 ? (
                        filteredCatalog.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setSelectedProduct(item);
                              setCropSearchQuery(item.name);
                              setShowCropDropdown(false);
                            }}
                            className={`search-result-row ${selectedProduct?.id === item.id ? 'active' : ''}`}
                          >
                            <span style={{ fontWeight: 700 }}>{item.name}</span>
                            <span className="search-result-badge">{item.unit}</span>
                          </button>
                        ))
                      ) : (
                        <div style={{ padding: '12px 14px', fontSize: '12px', color: 'var(--text-muted)' }}>
                          No products found in catalog.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-two-col">
                <div className="form-field-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">
                    <span>Delivery Date (date)</span>
                    <span className="form-label-tag">Min: Tomorrow</span>
                  </label>
                  <input
                    type="date"
                    min={minDeliveryDate}
                    value={harvestDate}
                    disabled={isCommitted}
                    onChange={(e) => setHarvestDate(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-field-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">
                    <span>Yield Quantity (qty)</span>
                    <span className="form-label-tag">Min: 0.1</span>
                  </label>
                  <div className="stepper-wrap">
                    <button
                      type="button"
                      onClick={() => stepQuantity(-10)}
                      disabled={isCommitted}
                      className="stepper-btn"
                    >
                      <MinusIcon size={16} />
                    </button>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={qtyInput}
                      disabled={isCommitted}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const val = e.target.value;
                        if (val === '') {
                          setQtyInput('');
                          return;
                        }
                        const parsed = parseFloat(val);
                        if (!isNaN(parsed) && parsed > 0) {
                          setQtyInput(parsed);
                        }
                      }}
                      className="stepper-input"
                      required
                    />
                    <span className="stepper-unit">{selectedProduct?.unit || 'kg'}</span>
                    <button
                      type="button"
                      onClick={() => stepQuantity(10)}
                      disabled={isCommitted}
                      className="stepper-btn"
                    >
                      <PlusIcon size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-footer-actions">
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Status: <span style={{ fontWeight: 700, color: '#22c55e' }}>{isCommitted ? 'SUBMITTED' : 'DRAFT'}</span>
                </div>

                <div className="form-btn-group">
                  {editingTempId && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="cancel-edit-btn"
                    >
                      Cancel
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={isCommitted || !selectedProduct}
                    className="submit-center-btn"
                  >
                    <CheckIcon size={16} />
                    <span>{editingTempId ? 'Update Harvest Line' : 'Add to Batch Roster'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="right-column">
            <div className="roster-card">
              <div className="roster-header">
                <div className="roster-header-left">
                  <div className="roster-icon-wrap">
                    <SproutIcon size={20} />
                  </div>
                  <div>
                    <h2 className="roster-title">Harvest Manifest</h2>
                    <span className="roster-subtitle">
                      {harvestItems.length} registered lot{harvestItems.length === 1 ? '' : 's'}
                    </span>
                  </div>
                </div>

                <div className={`roster-online-pill ${isCommitted ? 'committed' : ''}`}>
                  {isCommitted ? <LockIcon size={13} /> : <CheckCircle2Icon size={13} />}
                  <span>{isCommitted ? 'SUBMITTED' : 'DRAFT'}</span>
                </div>
              </div>

              <div className="roster-search-bar">
                <SearchIcon size={15} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Filter lots by crop name or date..."
                  value={searchRosterQuery}
                  onChange={(e) => setSearchRosterQuery(e.target.value)}
                  className="roster-filter-input"
                />
              </div>

              <div className="roster-list-scroll">
                {filteredHarvestItems.length === 0 ? (
                  <div style={{ padding: '40px 16px', textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
                    {searchRosterQuery.trim()
                      ? `No items found matching "${searchRosterQuery}".`
                      : 'No items in batch. Use the form on the left to add harvest records.'}
                  </div>
                ) : (
                  filteredHarvestItems.map((item) => (
                    <div
                      key={item.tempId}
                      className={`center-item-card ${editingTempId === item.tempId ? 'is-editing' : ''}`}
                    >
                      <div className="center-item-content">
                        <div className="center-item-header">
                          <span className="center-id-badge">{item.name}</span>
                          <span className="center-status-badge active">
                            {item.qty} {item.unit}
                          </span>
                        </div>
                        <p className="center-address-text">
                          Delivery Date: {item.date}
                        </p>
                      </div>

                      <div className="center-item-actions">
                        {!isCommitted ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleEditItem(item)}
                              className="item-action-icon-btn"
                              title="Edit line"
                            >
                              <Edit2Icon size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteItem(item.tempId)}
                              className="item-action-icon-btn delete-btn"
                              title="Remove line"
                            >
                              <Trash2Icon size={14} />
                            </button>
                          </>
                        ) : (
                          <span title="Locked" style={{ color: '#94a3b8', padding: '6px' }}>
                            <LockIcon size={15} />
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="roster-footer">
                <div className="roster-footer-stats">
                  <span>Enrolled: {harvestItems.length} lines</span>
                  <span>Total: {totalYieldKg} kg</span>
                </div>

                <div className="roster-footer-actions">
                  <button
                    type="button"
                    onClick={handleCommitBatch}
                    disabled={harvestItems.length === 0 || isCommitted || isSubmitting}
                    className={`btn-broadcast-manifest ${isCommitted ? 'committed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <ClockIcon size={15} />
                        <span>Submitting to Database...</span>
                      </>
                    ) : isCommitted ? (
                      <>
                        <CheckIcon size={15} />
                        <span>Harvest Submitted</span>
                      </>
                    ) : (
                      <>
                        <SendIcon size={15} />
                        <span>Broadcast Harvest Batch</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleResetBatch}
                    className="btn-reset-manifest"
                    title="Reset batch"
                  >
                    <RotateCcwIcon size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
        <div className={`toast-notice ${toast.type}`}>
          <CheckCircle2Icon size={16} />
          <span>{toast.msg}</span>
        </div>
      )}
    </div>
  );
};

export default FarmerHarvest;