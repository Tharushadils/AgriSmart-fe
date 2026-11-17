import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  type FC,
  type SVGProps,
  type ChangeEvent,
  type FormEvent
} from 'react';
import '../Products.css';
import api from '../service/api';
import logoImg from '../assets/logo.jpg';
import UserProfileMenu from '../components/UserProfileMenu';


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

const PackagePlusIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M16.5 9.4 7.55 4.24" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.29 7 12 12 20.71 7" />
    <line x1="12" y1="22" x2="12" y2="12" />
  </BaseIcon>
);

const SunIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </BaseIcon>
);

const MoonIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </BaseIcon>
);

const SearchIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </BaseIcon>
);

const CheckIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <polyline points="20 6 9 17 4 12" />
  </BaseIcon>
);

const Trash2Icon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </BaseIcon>
);

const Edit2Icon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </BaseIcon>
);

const SlidersHorizontalIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <line x1="21" y1="4" x2="14" y2="4" />
    <line x1="10" y1="4" x2="3" y2="4" />
    <line x1="21" y1="12" x2="12" y2="12" />
    <line x1="8" y1="12" x2="3" y2="12" />
    <line x1="21" y1="20" x2="16" y2="20" />
    <line x1="12" y1="20" x2="3" y2="20" />
    <line x1="14" y1="2" x2="14" y2="6" />
    <line x1="8" y1="10" x2="8" y2="14" />
    <line x1="16" y1="18" x2="16" y2="22" />
  </BaseIcon>
);

const ImageIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </BaseIcon>
);

const ClockIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </BaseIcon>
);

const LayersIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </BaseIcon>
);

const ShieldCheckIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </BaseIcon>
);

const ChevronDownIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <polyline points="6 9 12 15 18 9" />
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

const MapPinIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
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

export const ProductCategory = {
  FRUITS: "FRUITS",
  VEGETABLES: "VEGETABLES",
  GRAINS_CEREALS: "GRAINS/CEREALS",
  LEGUMES_PULSES: "LEGUMES/PULSES",
  ROOT_TUBER_CROPS: "ROOT & TUBER CROPS",
  SPICES_CONDIMENTS: "SPICES & CONDIMENTS",
  PLANTATION_CROPS: "PLANTATION CROPS",
  OIL_CROPS: "OIL_CROPS",
  MUSHROOMS: "MUSHROOMS",
  LEAFY_GREENS: "LEAFY_GREENS",
  HERBS: "HERBS",
  FLOWERS_ORNAMENTALS: "FLOWERS / ORNAMENTALS PLANTS",
  NUTS: "NUTS"
} as const;

export type ProductCategory = (typeof ProductCategory)[keyof typeof ProductCategory];

export interface ProductFormState {
  _id?: string;
  name: string;
  scientificName?: string;
  category: ProductCategory;
  imageUrl?: string;
  stockQty: number;
  averageExp: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ToastMessage {
  msg: string;
  type: 'success' | 'error' | 'info';
}

export interface CurrentUserProfile {
  name?: string;
  role?: string;
  initials?: string;
}

export interface ProductManagementProps {
  currentUser?: CurrentUserProfile;
}

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  [ProductCategory.FRUITS]: 'Fruits & Orchards',
  [ProductCategory.VEGETABLES]: 'Fresh Vegetables',
  [ProductCategory.GRAINS_CEREALS]: 'Grains & Cereals',
  [ProductCategory.LEGUMES_PULSES]: 'Legumes & Pulses',
  [ProductCategory.ROOT_TUBER_CROPS]: 'Root & Tuber Crops',
  [ProductCategory.SPICES_CONDIMENTS]: 'Spices & Condiments',
  [ProductCategory.PLANTATION_CROPS]: 'Plantation Crops',
  [ProductCategory.OIL_CROPS]: 'Oil Crops',
  [ProductCategory.MUSHROOMS]: 'Cultivated Mushrooms',
  [ProductCategory.LEAFY_GREENS]: 'Leafy Greens',
  [ProductCategory.HERBS]: 'Herbs & Aromatic Plants',
  [ProductCategory.FLOWERS_ORNAMENTALS]: 'Flowers & Ornamental Plants',
  [ProductCategory.NUTS]: 'Nuts & Seeds'
};


export const ProductManagement: FC<ProductManagementProps> = ({ currentUser }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') || localStorage.getItem('ranpolowa_theme_preference');
      if (saved) return saved === 'dark';
      return false;
    }
    return false;
  });

  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

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
          name: u.fullName || u.name || 'Manager',
          role: u.role || u.roles?.[0] || 'MANAGER',
          email: u.email || '',
          initials: (u.fullName || u.name || 'MG').slice(0, 2).toUpperCase(),
        });
      } catch {
        // ignore parse error
      }
    }
  }, [currentUser]);

  // Form Inputs
  const [name, setName] = useState<string>('');
  const [scientificName, setScientificName] = useState<string>('');
  const [category, setCategory] = useState<ProductCategory>(ProductCategory.VEGETABLES);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [stockQty, setStockQty] = useState<number | ''>(0);
  const [averageExp, setAverageExp] = useState<number | ''>(7);

  // Editing State
  const [editingId, setEditingId] = useState<string | null>(null);

  // Filter & Search States
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState<string>('');


  const [toast, setToast] = useState<ToastMessage | null>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Products Roster and Loading
  const [productsList, setProductsList] = useState<ProductFormState[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch Products from Backend API (GET /api/products)
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products');
      const items = res.data?.products || [];
      setProductsList(items);
    } catch (err: any) {
      console.error('Failed to fetch products:', err);
      triggerToast(' Failed to load produce catalog from server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isDark) {
        document.documentElement.classList.add('dark', 'dark-theme');
        document.body.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark', 'dark-theme');
        document.body.classList.remove('dark-theme');
      }
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      localStorage.setItem('ranpolowa_theme_preference', isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const triggerToast = (msg: string, type: ToastMessage['type'] = 'success'): void => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast({ msg, type });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Form Submission Handler 
  const handleSubmitProduct = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      triggerToast('Product name is required.', 'error');
      return;
    }

    const parsedStock = typeof stockQty === 'number' ? stockQty : parseInt(stockQty as string, 10);
    const parsedExp = typeof averageExp === 'number' ? averageExp : parseInt(averageExp as string, 10);

    if (isNaN(parsedStock) || parsedStock < 0) {
      triggerToast('Stock quantity must be a non-negative number.', 'error');
      return;
    }

    if (isNaN(parsedExp) || parsedExp <= 0) {
      triggerToast('Average expiry days must be at least 1 day.', 'error');
      return;
    }

    try {
      if (editingId) {
        // Update product 
        await api.put(`/products/${editingId}`, {
          name: trimmedName,
          scientificName: scientificName.trim() || undefined,
          category,
          imageUrl: imageUrl.trim() || undefined,
          averageExp: parsedExp
        });
        triggerToast(`Product "${trimmedName}" updated successfully!`, 'success');
      } else {
        // Create product 
        await api.post('/products', {
          name: trimmedName,
          scientificName: scientificName.trim() || undefined,
          category,
          imageUrl: imageUrl.trim() || undefined,
          stockQty: parsedStock,
          averageExp: parsedExp
        });
        triggerToast(`New product "${trimmedName}" added to catalog!`, 'success');
      }

      fetchProducts();
      handleCancelEdit();
    } catch (err: any) {
      console.error('Failed to save product:', err);
      const serverMsg = err.response?.data?.message || 'Failed to save product to database.';
      triggerToast(` ${serverMsg}`, 'error');
    }
  };

  const handleEdit = (p: ProductFormState) => {
    setEditingId(p._id || null);
    setName(p.name);
    setScientificName(p.scientificName || '');
    setCategory(p.category);
    setImageUrl(p.imageUrl || '');
    setStockQty(p.stockQty);
    setAverageExp(p.averageExp);

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    triggerToast(`Editing "${p.name}"`, 'info');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setScientificName('');
    setImageUrl('');
    setStockQty(0);
    setAverageExp(7);
  };

  // Toggle Product Status
  const handleToggleActive = async (id?: string) => {
    if (!id) return;
    const target = productsList.find((p) => p._id === id);
    if (!target) return;

    try {
      const res = await api.patch(`/products/${id}/status`);
      const nextActive = res.data?.product?.isActive ?? !target.isActive;

      setProductsList((prev) =>
        prev.map((p) => (p._id === id ? { ...p, isActive: nextActive } : p))
      );

      triggerToast(`"${target.name}" is now ${nextActive ? 'ACTIVE' : 'INACTIVE'}`, nextActive ? 'success' : 'info');
    } catch (err: any) {
      console.error('Failed to toggle status:', err);
      triggerToast(' Failed to toggle product status.', 'error');
    }
  };

  const filteredProducts = useMemo(() => {
    return productsList.filter((p) => {
      const matchesCategory = filterCategory === 'ALL' || p.category === filterCategory;
      const q = searchFilter.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.scientificName && p.scientificName.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [productsList, filterCategory, searchFilter]);

  const totalProductsCount = productsList.length;
  const activeProductsCount = useMemo(() => productsList.filter((p) => p.isActive).length, [productsList]);
  const totalStockKg = useMemo(() => {
    return productsList.reduce((acc, curr) => acc + (curr.isActive ? curr.stockQty : 0), 0);
  }, [productsList]);
  const totalCategoriesCount = Object.keys(ProductCategory).length;

  const profileName = userState?.name || currentUser?.name || 'Supply Chain Manager';
  const profileRole = userState?.role || currentUser?.role || 'ROLE: PRODUCE OVERSIGHT';
  const profileInitials = userState?.initials || currentUser?.initials || (profileName ? profileName.slice(0, 2).toUpperCase() : 'M');

  return (
    <div className={`product-page-root ${isDark ? 'dark-theme' : ''}`}>
      
      <header className="header-wrapper">
        <div className="header-bg-svg-wrap">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="wrinkleShadowProducts" x="-5%" y="-10%" width="110%" height="150%">
                <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#143412" floodOpacity="0.22" />
              </filter>
            </defs>
            <path
              d="M 0,0 L 1440,0 L 1440,82.0 L 1435,84.9 L 1430,89.0 L 1425,85.1 L 1420,81.9 L 1415,88.5 L 1410,84.7 L 1405,80.7 L 1400,86.9 L 1395,85.2 L 1390,80.9 L 1385,75.7 L 1380,69.1 L 1375,75.8 L 1370,79.7 L 1365,75.2 L 1360,81.2 L 1355,83.9 L 1350,79.3 L 1345,78.9 L 1340,76.4 L 1335,81.0 L 1330,87.4 L 1325,79.1 L 1320,76.4 L 1315,79.9 L 1310,75.6 L 1305,77.0 L 1300,81.3 L 1295,86.1 L 1290,95.7 L 1285,92.6 L 1280,87.8 L 1275,96.0 L 1270,97.6 L 1265,97.0 L 1260,100.9 L 1255,99.7 L 1250,101.7 L 1245,98.9 L 1240,90.4 L 1235,98.0 L 1230,106.1 L 1225,104.5 L 1220,108.0 L 1215,108.4 L 1210,107.9 L 1205,109.7 L 1200,103.3 L 1195,105.6 L 1190,113.5 L 1185,106.1 L 1180,99.9 L 1175,98.4 L 1170,95.1 L 1165,98.3 L 1160,97.5 L 1155,97.3 L 1150,106.8 L 1145,103.9 L 1140,95.7 L 1135,98.3 L 1130,98.9 L 1125,100.8 L 1120,101.1 L 1115,94.1 L 1110,96.2 L 1105,95.4 L 1100,85.5 L 1095,89.1 L 1090,96.3 L 1085,98.5 L 1080,101.6 L 1075,97.1 L 1070,97.1 L 1065,102.8 L 1060,96.7 L 1055,96.2 L 1050,103.0 L 1045,99.4 L 1040,95.1 L 1035,89.5 L 1030,85.4 L 1025,93.1 L 1020,93.2 L 1015,89.8 L 1010,97.1 L 1005,96.5 L 1000,90.7 L 995,89.4 L 990,86.6 L 985,91.6 L 980,93.0 L 975,82.1 L 970,81.0 L 965,81.4 L 960,74.2 L 955,75.2 L 950,78.0 L 945,82.3 L 940,88.2 L 935,80.8 L 930,78.1 L 925,85.4 L 920,83.1 L 915,82.5 L 910,85.7 L 905,84.1 L 900,85.2 L 895,79.5 L 890,73.7 L 885,84.2 L 880,89.4 L 875,88.0 L 870,93.3 L 865,93.7 L 860,94.4 L 855,95.1 L 850,90.0 L 845,96.6 L 840,102.5 L 835,93.6 L 830,90.3 L 825,89.5 L 820,87.1 L 815,90.4 L 810,88.9 L 805,91.7 L 800,100.2 L 795,93.4 L 790,87.0 L 785,90.6 L 780,89.7 L 775,90.8 L 770,88.6 L 765,82.3 L 760,84.8 L 755,79.5 L 750,70.0 L 745,76.0 L 740,81.1 L 735,82.0 L 730,83.5 L 725,78.6 L 720,80.7 L 715,83.7 L 710,76.4 L 705,79.5 L 700,85.6 L 695,80.4 L 690,76.7 L 685,71.7 L 680,71.1 L 675,79.3 L 670,77.5 L 665,77.8 L 660,86.9 L 655,84.2 L 650,79.7 L 645,79.9 L 640,79.3 L 635,85.5 L 630,84.0 L 625,74.4 L 620,76.6 L 615,74.6 L 610,67.4 L 605,70.2 L 600,73.1 L 595,77.9 L 590,80.7 L 585,71.7 L 580,72.1 L 575,77.5 L 570,72.4 L 565,72.9 L 560,75.2 L 555,72.8 L 550,72.3 L 545,64.4 L 540,61.8 L 535,73.1 L 530,74.7 L 525,74.5 L 520,80.8 L 515,80.8 L 510,82.1 L 505,81.9 L 500,79.6 L 495,89.7 L 490,93.0 L 485,84.8 L 480,85.6 L 475,85.9 L 470,85.6 L 465,90.3 L 460,90.7 L 455,98.2 L 450,106.0 L 445,98.2 L 440,96.7 L 435,102.3 L 430,101.9 L 425,104.1 L 420,101.9 L 415,98.6 L 410,101.6 L 405,93.7 L 400,87.5 L 395,96.2 L 390,99.4 L 385,100.0 L 380,100.5 L 375,96.3 L 370,99.6 L 365,99.1 L 360,91.9 L 355,97.9 L 350,101.2 L 345,94.1 L 340,90.6 L 335,85.9 L 330,87.4 L 325,93.9 L 320,90.6 L 315,94.5 L 310,102.8 L 305,97.7 L 300,94.9 L 295,96.2 L 290,97.4 L 285,103.8 L 280,99.8 L 275,93.3 L 270,97.7 L 265,93.4 L 260,88.0 L 255,93.1 L 250,96.5 L 245,101.8 L 240,101.9 L 235,93.5 L 230,97.2 L 225,99.8 L 220,93.2 L 215,95.3 L 210,96.3 L 205,92.6 L 200,89.6 L 195,79.9 L 190,80.1 L 185,89.2 L 180,86.3 L 175,86.5 L 170,91.4 L 165,88.7 L 160,88.2 L 155,85.3 L 150,84.1 L 145,93.6 L 140,91.4 L 135,82.8 L 130,84.8 L 125,83.3 L 120,82.7 L 115,86.5 L 110,87.6 L 105,97.0 L 100,101.2 L 95,92.6 L 90,95.0 L 85,100.3 L 80,99.5 L 75,102.3 L 70,100.3 L 65,99.6 L 60,101.7 L 55,92.2 L 50,90.5 L 45,100.6 L 40,102.0 L 35,102.9 L 30,103.1 L 25,100.0 L 20,103.5 L 15,99.7 L 10,94.1 L 5,101.8 L 0,101.0 Z"
              fill="var(--header-bg)"
              filter="url(#wrinkleShadowProducts)"
            />
          </svg>
        </div>

        <div className="top-nav">
          <a href="/user" className="brand-logo" title="රන් පොළොව Products Portal">
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
              aria-label="Toggle Theme"
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
          <div className="hero-flex-wrap">
            <div>
             
              <h1 className="page-title">
                Produce Catalog &amp; <span>Inventory Control</span>
              </h1>
              <p className="page-subtitle">
                Enroll certified agricultural produce, administer botanical classifications, monitor stock reserves, shelf-life, and market trading clearances.
              </p>
            </div>

            
          </div>
        </div>
      </section>

  
      <section className="kpi-section">
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Listed Products</span>
              <div className="kpi-icon-badge" style={{ background: 'rgba(34, 197, 94, 0.12)', color: '#22c55e' }}>
                <PackagePlusIcon size={18} />
              </div>
            </div>
            <div className="kpi-value">{totalProductsCount}</div>
            <div className="kpi-subtext">Registered catalog produce items</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Active in Market</span>
              <div className="kpi-icon-badge" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>
                <span className="ping-dot" />
              </div>
            </div>
            <div className="kpi-value" style={{ color: '#22c55e' }}>{activeProductsCount}</div>
            <div className="kpi-subtext">Currently available for trading</div>
          </div>

          {/* <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Total Stock Reserve</span>
              <div className="kpi-icon-badge" style={{ background: 'rgba(56, 189, 248, 0.12)', color: '#0284c7' }}>
                <LayersIcon size={18} />
              </div>
            </div>
            <div className="kpi-value" style={{ color: '#38bdf8' }}>{totalStockKg.toLocaleString()} kg</div>
            <div className="kpi-subtext">Active catalog stock volume</div>
          </div> */}

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Categories</span>
              <div className="kpi-icon-badge" style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b' }}>
                <SlidersHorizontalIcon size={18} />
              </div>
            </div>
            <div className="kpi-value" style={{ color: '#f59e0b' }}>{totalCategoriesCount}</div>
            <div className="kpi-subtext">Agricultural classifications</div>
          </div>
        </div>
      </section>


      <main className="workspace-container">
        <section className="form-panel">
          <div className="form-header">
            <div className="form-header-title">
              <SlidersHorizontalIcon size={18} style={{ color: '#22c55e' }} />
              <span>{editingId ? 'Modify System Product' : 'Add Product to Catalog'}</span>
            </div>
            <span className={`editing-badge ${editingId ? 'show' : ''}`}>Editing Mode</span>
          </div>

          <form onSubmit={handleSubmitProduct}>
            <div className="form-group">
              <label className="form-label">
                <span>Product Name (name)</span>
                <span className="req">*</span>
              </label>
              <div className="input-wrap">
                <span className="input-icon">
                  <PackagePlusIcon size={15} />
                </span>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Nuwara Eliya Premium Carrots"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>Scientific / Botanical Name (scientificName)</span>
                <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 'normal' }}>Optional</span>
              </label>
              <div className="input-wrap">
                <span className="input-icon">
                  <SlidersHorizontalIcon size={15} />
                </span>
                <input
                  type="text"
                  className="form-input italic"
                  placeholder="e.g. Daucus carota subsp. sativus"
                  value={scientificName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setScientificName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>Product Category (category)</span>
                <span className="req">*</span>
              </label>
              <div className="input-wrap">
                <span className="input-icon">
                  <LayersIcon size={15} />
                </span>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value as ProductCategory)}
                >
                  {Object.values(ProductCategory).map((cat) => (
                    <option key={cat} value={cat}>
                      {CATEGORY_LABELS[cat]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row-2col">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">
                  <span>Initial Stock (kg/units)</span>
                  <span className="req">*</span>
                </label>
                <div className="input-wrap">
                  <span className="input-icon">
                    <LayersIcon size={15} />
                  </span>
                  <input
                    type="number"
                    min="0"
                    disabled={!!editingId}
                    className="form-input mono"
                    placeholder="e.g. 500"
                    value={stockQty}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const val = e.target.value;
                      setStockQty(val === '' ? '' : parseInt(val, 10));
                    }}
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">
                  <span>Shelf Life (averageExp Days)</span>
                  <span className="req">*</span>
                </label>
                <div className="input-wrap">
                  <span className="input-icon">
                    <ClockIcon size={15} />
                  </span>
                  <input
                    type="number"
                    min="1"
                    className="form-input mono"
                    placeholder="e.g. 7"
                    value={averageExp}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const val = e.target.value;
                      setAverageExp(val === '' ? '' : parseInt(val, 10));
                    }}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: 16 }}>
              <label className="form-label">
                <span>Produce Image URL (imageUrl)</span>
                <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 'normal' }}>Optional</span>
              </label>
              <div className="image-input-row">
                <div className="input-wrap" style={{ flex: 1 }}>
                  <span className="input-icon">
                    <ImageIcon size={15} />
                  </span>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://images.unsplash.com/... or /assets/produce.jpg"
                    value={imageUrl}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)}
                  />
                </div>
                {imageUrl && (
                  <div className="image-preview-box">
                    <img
                      src={imageUrl}
                      alt="Produce Preview"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=100&q=80';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="form-actions-bar">
              {editingId && (
                <button type="button" className="btn-cancel-edit show" onClick={handleCancelEdit}>
                  Cancel
                </button>
              )}
              <button type="submit" className="btn-submit-product">
                <CheckIcon size={16} />
                <span>{editingId ? 'Update Product Metadata' : 'Add to Catalog'}</span>
              </button>
            </div>
          </form>
        </section>


        <section className="roster-panel">
          <div className="roster-header">
            <div className="roster-header-text">
              <h2>Master Produce Catalog</h2>
              <p>Inventory reserves, scientific classifications, and produce availability.</p>
            </div>

            <div className="live-badge-wrap">
              <span className="live-status-pill">
                <span className="ping-dot" style={{ width: 6, height: 6 }} />
                <span>Live Sync</span>
              </span>
            </div>
          </div>

          <div className="roster-filters-bar">
            <div className="search-input-wrap">
              <span className="search-icon">
                <SearchIcon size={15} />
              </span>
              <input
                type="text"
                className="search-input"
                placeholder="Search produce name or scientific classification..."
                value={searchFilter}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchFilter(e.target.value)}
              />
            </div>

            <select
              className="category-filter-select"
              value={filterCategory}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterCategory(e.target.value)}
            >
              <option value="ALL">All Categories</option>
              {Object.values(ProductCategory).map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY_LABELS[cat]}
                </option>
              ))}
            </select>
          </div>

          <div className="roster-list-container">
            {loading ? (
              <div className="empty-state">
                <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Loading produce catalog from server...</div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="empty-state">
                <SearchIcon size={40} />
                <div className="empty-state-title">No Produce Items Found</div>
                <div style={{ fontSize: '12.5px' }}>
                  {productsList.length === 0
                    ? 'No products have been registered yet. Add your first produce item on the left.'
                    : 'No produce records match the active search or category filter.'}
                </div>
              </div>
            ) : (
              filteredProducts.map((p) => {
                const isEditing = editingId === p._id;

                return (
                  <div key={p._id} className={`product-card ${isEditing ? 'is-editing' : ''}`}>
                    <div className="product-thumb-wrap">
                      {p.imageUrl ? (
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="product-thumb-img"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=150&q=80';
                          }}
                        />
                      ) : (
                        <div className="product-thumb-placeholder">
                          <ImageIcon size={22} />
                        </div>
                      )}
                      <span className={`product-thumb-status-dot ${p.isActive ? 'active' : 'inactive'}`} />
                    </div>

                    <div className="product-details-wrap">
                      <div className="product-name-row">
                        <span className="product-name">{p.name}</span>
                        <span className={`badge ${p.isActive ? 'badge-active' : 'badge-inactive'}`}>
                          {p.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>

                      {p.scientificName && (
                        <div className="product-scientific-name">{p.scientificName}</div>
                      )}

                      <div className="product-meta-row">
                        <span className="meta-category-tag">{CATEGORY_LABELS[p.category] || p.category}</span>
                        <span className="meta-sep">•</span>
                        <span className="meta-stock-val">{p.stockQty.toLocaleString()} kg</span>
                        <span className="meta-sep">•</span>
                        <span className="meta-shelf-val">~{p.averageExp} days shelf life</span>
                      </div>
                    </div>

                    <div className="product-actions-wrap">
                      <button
                        type="button"
                        className={`icon-action-btn active-toggle ${p.isActive ? 'is-active' : ''}`}
                        onClick={() => handleToggleActive(p._id)}
                        title={p.isActive ? 'Deactivate Produce (Soft Delete)' : 'Activate Produce'}
                      >
                        <ShieldCheckIcon size={14} />
                      </button>

                      <button
                        type="button"
                        className="icon-action-btn"
                        onClick={() => handleEdit(p)}
                        title="Edit Produce Metadata"
                      >
                        <Edit2Icon size={14} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="roster-footer">
            <span>
              Displaying {filteredProducts.length} of {totalProductsCount} products
            </span>
            <span>
              Active in Market: <strong style={{ color: '#22c55e' }}>{activeProductsCount}</strong>
            </span>
          </div>
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
        <div className={`toast-notice ${toast.type} show`}>
          <CheckIcon size={16} />
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="footer-wrapper">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="/user" className="footer-logo">
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
            <a href="/user" className="footer-link-item">Owner Dashboard</a>
            <a href="/farmer-harvest" className="footer-link-item">Farm Operations</a>
            <a href="/stores" className="footer-link-item">Store Dashboard</a>
            <a href="/transfer" className="footer-link-item">Distribution Fleet</a>
            <a href="/buy" className="footer-link-item">Procurement Rep</a>
            <a href="/pre-order" className="footer-link-item">Store Pre-Orders</a>
            <a href="/login" className="footer-link-item">Member Sign In</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2026 රන් පොළොව (Agri SMART) Sri Lanka. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default ProductManagement;