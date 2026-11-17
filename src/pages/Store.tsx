import React, { useState, useEffect, useRef, useMemo, type FC, type SVGProps, type ChangeEvent, type FormEvent } from 'react';
import api from '../service/api';
import UserProfileMenu from '../components/UserProfileMenu';
import '../Store.css';


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

const StoreIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
    <path d="M22 7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2" />
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
    <path d="m6.34 17.66l-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </BaseIcon>
);

const MoonIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </BaseIcon>
);

const UserIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </BaseIcon>
);

const SearchIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </BaseIcon>
);

const XIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </BaseIcon>
);

const MapPinIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </BaseIcon>
);

const CrosshairIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <line x1="22" x2="18" y1="12" y2="12" />
    <line x1="6" x2="2" y1="12" y2="12" />
    <line x1="12" x2="12" y1="6" y2="2" />
    <line x1="12" x2="12" y1="22" y2="18" />
  </BaseIcon>
);

const MapIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" x2="9" y1="3" y2="18" />
    <line x1="15" x2="15" y1="6" y2="21" />
  </BaseIcon>
);

const CompassIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </BaseIcon>
);

const CheckCircle2Icon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
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

const CheckIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <polyline points="20 6 9 17 4 12" />
  </BaseIcon>
);

const Edit2Icon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </BaseIcon>
);

const LayersIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </BaseIcon>
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


export const District = {
  GALLE: "GALLE",
  MATARA: "MATARA",
  HAMBANTOTA: "HAMBANTOTA",
  COLOMBO: "COLOMBO",
  GAMPAHA: "GAMPAHA",
  KALUTARA: "KALUTARA",
  KANDY: "KANDY",
  MATALE: "MATALE",
  NUWARA_ELIYA: "NUWARA_ELIYA",
  JAFFNA: "JAFFNA",
  KILINOCHCHI: "KILINOCHCHI",
  MANNAR: "MANNAR",
  VAVUNIYA: "VAVUNIYA",
  MULLAITIVU: "MULLAITIVU",
  BATTICALOA: "BATTICALOA",
  AMPARA: "AMPARA",
  TRINCOMALEE: "TRINCOMALEE",
  KURUNEGALA: "KURUNEGALA",
  PUTTALAM: "PUTTALAM",
  ANURADHAPURA: "ANURADHAPURA",
  POLONNARUWA: "POLONNARUWA",
  BADULLA: "BADULLA",
  MONARAGALA: "MONARAGALA",
  RATNAPURA: "RATNAPURA",
  KEGALLE: "KEGALLE",
} as const;

export type District = (typeof District)[keyof typeof District];

export const Province = {
  SOUTHERN: "SOUTHERN",
  WESTERN: "WESTERN",
  CENTRAL: "CENTRAL",
  EASTERN: "EASTERN",
  NORTHERN: "NORTHERN",
  NORTH_CENTRAL: "NORTH_CENTRAL",
  NORTH_WESTERN: "NORTH_WESTERN",
  SABARAGAMUWA: "SABARAGAMUWA",
  UVA: "UVA",
} as const;

export type Province = (typeof Province)[keyof typeof Province];

export interface IStoreFormItem {
  _id?: string;
  storeId: string;
  userId: string;
  address: string;
  district: District;
  province: Province;
  longitude: number;
  latitude: number;
  isActive: boolean;
}

export interface MapSearchResult {
  title: string;
  subtitle: string;
  lat: number;
  lng: number;
  district?: District;
  isPreset?: boolean;
}

export interface ToastMessage {
  msg: string;
  type: 'success' | 'error' | 'info';
}

const DISTRICT_TO_PROVINCE: Record<District, Province> = {
  [District.COLOMBO]: Province.WESTERN,
  [District.GAMPAHA]: Province.WESTERN,
  [District.KALUTARA]: Province.WESTERN,
  [District.KANDY]: Province.CENTRAL,
  [District.MATALE]: Province.CENTRAL,
  [District.NUWARA_ELIYA]: Province.CENTRAL,
  [District.GALLE]: Province.SOUTHERN,
  [District.MATARA]: Province.SOUTHERN,
  [District.HAMBANTOTA]: Province.SOUTHERN,
  [District.JAFFNA]: Province.NORTHERN,
  [District.KILINOCHCHI]: Province.NORTHERN,
  [District.MANNAR]: Province.NORTHERN,
  [District.VAVUNIYA]: Province.NORTHERN,
  [District.MULLAITIVU]: Province.NORTHERN,
  [District.BATTICALOA]: Province.EASTERN,
  [District.AMPARA]: Province.EASTERN,
  [District.TRINCOMALEE]: Province.EASTERN,
  [District.KURUNEGALA]: Province.NORTH_WESTERN,
  [District.PUTTALAM]: Province.NORTH_WESTERN,
  [District.ANURADHAPURA]: Province.NORTH_CENTRAL,
  [District.POLONNARUWA]: Province.NORTH_CENTRAL,
  [District.BADULLA]: Province.UVA,
  [District.MONARAGALA]: Province.UVA,
  [District.RATNAPURA]: Province.SABARAGAMUWA,
  [District.KEGALLE]: Province.SABARAGAMUWA,
};

const DISTRICT_COORDINATES: Record<District, { lat: number; lng: number }> = {
  [District.COLOMBO]: { lat: 6.9271, lng: 79.8612 },
  [District.GAMPAHA]: { lat: 7.0840, lng: 79.9939 },
  [District.KALUTARA]: { lat: 6.5854, lng: 79.9607 },
  [District.KANDY]: { lat: 7.2906, lng: 80.6337 },
  [District.MATALE]: { lat: 7.4675, lng: 80.6234 },
  [District.NUWARA_ELIYA]: { lat: 6.9497, lng: 80.7891 },
  [District.GALLE]: { lat: 6.0535, lng: 80.2210 },
  [District.MATARA]: { lat: 5.9549, lng: 80.5550 },
  [District.HAMBANTOTA]: { lat: 6.1429, lng: 81.1212 },
  [District.JAFFNA]: { lat: 9.6615, lng: 80.0255 },
  [District.KILINOCHCHI]: { lat: 9.3803, lng: 80.3770 },
  [District.MANNAR]: { lat: 8.9810, lng: 79.9044 },
  [District.VAVUNIYA]: { lat: 8.7514, lng: 80.4971 },
  [District.MULLAITIVU]: { lat: 9.2671, lng: 80.8142 },
  [District.BATTICALOA]: { lat: 7.7310, lng: 81.6747 },
  [District.AMPARA]: { lat: 7.3018, lng: 81.6747 },
  [District.TRINCOMALEE]: { lat: 8.5874, lng: 81.2152 },
  [District.KURUNEGALA]: { lat: 7.4863, lng: 80.3623 },
  [District.PUTTALAM]: { lat: 8.0408, lng: 79.8394 },
  [District.ANURADHAPURA]: { lat: 8.3114, lng: 80.4037 },
  [District.POLONNARUWA]: { lat: 7.9403, lng: 81.0188 },
  [District.BADULLA]: { lat: 6.9934, lng: 81.0550 },
  [District.MONARAGALA]: { lat: 6.8728, lng: 81.3507 },
  [District.RATNAPURA]: { lat: 6.7056, lng: 80.3847 },
  [District.KEGALLE]: { lat: 7.2513, lng: 80.3464 },
};

const SRI_LANKA_PRESET_PLACES: MapSearchResult[] = [
  { title: 'Pettah Manning Wholesale Market', subtitle: 'Colombo District, Western Province', lat: 6.9365, lng: 79.8542, district: District.COLOMBO, isPreset: true },
  { title: 'Dambulla Economic Market Complex', subtitle: 'Matale District, Central Province', lat: 7.8601, lng: 80.6517, district: District.MATALE, isPreset: true },
  { title: 'Kandy Central Market Area', subtitle: 'Kandy District, Central Province', lat: 7.2915, lng: 80.6342, district: District.KANDY, isPreset: true },
  { title: 'Meegoda Economic Commercial Zone', subtitle: 'Colombo District, Western Province', lat: 6.8436, lng: 80.0531, district: District.COLOMBO, isPreset: true },
  { title: 'Keppetipola Agro Logistics Hub', subtitle: 'Badulla District, Uva Province', lat: 6.9821, lng: 80.9234, district: District.BADULLA, isPreset: true },
  { title: 'Galle Main Street Retail Market', subtitle: 'Galle District, Southern Province', lat: 6.0367, lng: 80.2170, district: District.GALLE, isPreset: true },
  { title: 'Negombo Fresh Produce Hub', subtitle: 'Gampaha District, Western Province', lat: 7.2083, lng: 79.8358, district: District.GAMPAHA, isPreset: true },
  { title: 'Nuwara Eliya Central Bazaar', subtitle: 'Nuwara Eliya District, Central Province', lat: 6.9712, lng: 80.7712, district: District.NUWARA_ELIYA, isPreset: true },
  { title: 'Kurunegala Central Commercial Belt', subtitle: 'Kurunegala District, North Western', lat: 7.4863, lng: 80.3623, district: District.KURUNEGALA, isPreset: true },
  { title: 'Jaffna Town Grand Bazaar', subtitle: 'Jaffna District, Northern Province', lat: 9.6645, lng: 80.0167, district: District.JAFFNA, isPreset: true },
];

function detectDistrictFromName(text: string): District | undefined {
  const upper = text.toUpperCase().replace(/\s+/g, '_');
  for (const d of Object.values(District)) {
    if (upper.includes(d) || upper.includes(d.replace('_', ' '))) {
      return d;
    }
  }
  return undefined;
}


export interface StoreRegistrationProps {
  onSaveStore?: (store: IStoreFormItem) => void;
  initialStores?: IStoreFormItem[];
}

export const StoreRegistration: FC<StoreRegistrationProps> = ({ onSaveStore }) => {
  const [isDark, setIsDark] = useState<boolean>(true);

  // Authenticated Store Owner User
  const currentUser = useMemo(() => {
    if (typeof window !== 'undefined') {
      const u = localStorage.getItem('user');
      return u ? JSON.parse(u) : null;
    }
    return null;
  }, []);

  const loggedInUserId = currentUser?._id || currentUser?.userId || localStorage.getItem('userId') || '65f000000000000000000099';

  // Exact Fields from IStore
  const [storeId, setStoreId] = useState<string>(() => `STORE-${Math.floor(1000 + Math.random() * 9000)}`);
  const [address, setAddress] = useState<string>('');
  const [district, setDistrict] = useState<District>(District.COLOMBO);
  const [province, setProvince] = useState<Province>(DISTRICT_TO_PROVINCE[District.COLOMBO]);
  const [latitude, setLatitude] = useState<number>(6.9271);
  const [longitude, setLongitude] = useState<number>(79.8612);
  const [isActive, setIsActive] = useState<boolean>(true);

  // Map layer toggle
  const [mapLayer, setMapLayer] = useState<'street' | 'satellite'>('street');

  // Map Search Autocomplete states
  const [mapSearchText, setMapSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MapSearchResult[]>([]);
  const [isSearchingMap, setIsSearchingMap] = useState<boolean>(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState<boolean>(false);
  const searchDebounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Single Registered Store State (Enforce 1 Account = 1 Store)
  const [existingStore, setExistingStore] = useState<IStoreFormItem | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchRosterQuery, setSearchRosterQuery] = useState<string>('');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Map DOM & Leaflet Refs
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<any>(null);
  const leafletMarkerRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);

  const triggerToast = (msg: string, type: ToastMessage['type'] = 'success'): void => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const updateMapPosition = (lat: number, lng: number, zoom?: number) => {
    const validLat = typeof lat === 'number' && !isNaN(lat) ? lat : 6.9271;
    const validLng = typeof lng === 'number' && !isNaN(lng) ? lng : 79.8612;

    const fixedLat = Number(validLat.toFixed(6));
    const fixedLng = Number(validLng.toFixed(6));
    setLatitude(fixedLat);
    setLongitude(fixedLng);

    if (leafletMapRef.current && (window as any).L) {
      const L = (window as any).L;
      const newLatLng = new L.LatLng(fixedLat, fixedLng);
      leafletMapRef.current.panTo(newLatLng, { animate: true, duration: 1.2 });
      if (zoom) leafletMapRef.current.setZoom(zoom);

      if (leafletMarkerRef.current) {
        leafletMarkerRef.current.setLatLng(newLatLng);
      }
    }
  };

  //1 User = 1 Store 
  useEffect(() => {
    if (!loggedInUserId) return;

    const fetchMyStore = async () => {
      try {
        const res = await api.get(`/stores/user/${loggedInUserId}`);
        const storeData: IStoreFormItem = res.data?.data;

        if (storeData && storeData.storeId) {
          const lat = typeof storeData.latitude === 'number' && !isNaN(storeData.latitude) ? storeData.latitude : 6.9271;
          const lng = typeof storeData.longitude === 'number' && !isNaN(storeData.longitude) ? storeData.longitude : 79.8612;

          setExistingStore({
            ...storeData,
            latitude: lat,
            longitude: lng
          });
          setEditingId(storeData._id || storeData.storeId);
          setStoreId(storeData.storeId);
          setAddress(storeData.address || '');
          setDistrict(storeData.district || District.COLOMBO);
          setProvince(storeData.province || DISTRICT_TO_PROVINCE[storeData.district] || Province.WESTERN);
          setLatitude(lat);
          setLongitude(lng);
          setIsActive(storeData.isActive !== undefined ? storeData.isActive : true);

          updateMapPosition(lat, lng, 16);
        } else {
          setExistingStore(null);
          setEditingId(null);
        }
      } catch (err: any) {
        console.log('No registered store found for this account. Ready for registration.');
        setExistingStore(null);
        setEditingId(null);
      }
    };

    fetchMyStore();
  }, [loggedInUserId]);

  const handleDistrictChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newDistrict = e.target.value as District;
    setDistrict(newDistrict);
    setProvince(DISTRICT_TO_PROVINCE[newDistrict]);

    const defaultCoords = DISTRICT_COORDINATES[newDistrict];
    if (defaultCoords) {
      updateMapPosition(defaultCoords.lat, defaultCoords.lng, 13);
      triggerToast(`Map centered to ${newDistrict.replace('_', ' ')} district`, 'info');
    }
  };

  const handleMapSearchInput = (val: string) => {
    setMapSearchText(val);

    if (!val.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    setShowSearchDropdown(true);
    const q = val.trim().toLowerCase();

    const matchedPresets: MapSearchResult[] = SRI_LANKA_PRESET_PLACES.filter(
      p => p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q)
    );

    Object.entries(DISTRICT_COORDINATES).forEach(([distName, coords]) => {
      if (distName.toLowerCase().includes(q)) {
        matchedPresets.push({
          title: `${distName.replace('_', ' ')} City Area`,
          subtitle: `${DISTRICT_TO_PROVINCE[distName as District]} Province, Sri Lanka`,
          lat: coords.lat,
          lng: coords.lng,
          district: distName as District,
          isPreset: true
        });
      }
    });

    setSearchResults(matchedPresets);

    if (searchDebounceTimer.current) {
      clearTimeout(searchDebounceTimer.current);
    }

    if (val.length >= 3) {
      setIsSearchingMap(true);
      searchDebounceTimer.current = setTimeout(async () => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              val + ', Sri Lanka'
            )}&limit=5&countrycodes=lk&addressdetails=1`
          );
          if (res.ok) {
            const data = await res.json();
            const liveMatches: MapSearchResult[] = data.map((item: any) => {
              const detected = detectDistrictFromName(item.display_name);
              return {
                title: item.name || item.display_name.split(',')[0],
                subtitle: item.display_name,
                lat: parseFloat(item.lat),
                lng: parseFloat(item.lon),
                district: detected,
                isPreset: false
              };
            });

            setSearchResults(prev => {
              const existingTitles = new Set(prev.map(p => p.title.toLowerCase()));
              const filteredLive = liveMatches.filter(l => !existingTitles.has(l.title.toLowerCase()));
              return [...prev, ...filteredLive];
            });
          }
        } catch (err) {
          console.warn('Live geocode search error:', err);
        } finally {
          setIsSearchingMap(false);
        }
      }, 400);
    }
  };

  const handleSelectSearchResult = (result: MapSearchResult) => {
    updateMapPosition(result.lat, result.lng, 16);
    setMapSearchText(result.title);
    setShowSearchDropdown(false);

    if (!address.trim()) {
      setAddress(result.subtitle);
    }

    if (result.district) {
      setDistrict(result.district);
      setProvince(DISTRICT_TO_PROVINCE[result.district]);
      triggerToast(`Pinned to ${result.title} (${result.district})`, 'success');
    } else {
      triggerToast(`Pinned to ${result.title}`, 'success');
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const loadLeafletAssets = () => {
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      if ((window as any).L) {
        initLeafletMap();
      } else if (!document.getElementById('leaflet-js')) {
        const script = document.createElement('script');
        script.id = 'leaflet-js';
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.async = true;
        script.onload = () => {
          if (!isCancelled) initLeafletMap();
        };
        document.head.appendChild(script);
      } else {
        const existingScript = document.getElementById('leaflet-js');
        existingScript?.addEventListener('load', () => {
          if (!isCancelled) initLeafletMap();
        });
      }
    };

    const initLeafletMap = () => {
      if (!mapContainerRef.current || !(window as any).L || leafletMapRef.current) return;
      const L = (window as any).L;

      try {
        const initialLat = Number(latitude) || 6.9271;
        const initialLng = Number(longitude) || 79.8612;

        const map = L.map(mapContainerRef.current, {
          center: [initialLat, initialLng],
          zoom: 14,
          zoomControl: false,
          attributionControl: false
        });

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        const streetUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const satelliteUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

        const tileLayer = L.tileLayer(mapLayer === 'satellite' ? satelliteUrl : streetUrl, {
          maxZoom: 19,
          subdomains: ['a', 'b', 'c']
        }).addTo(map);

        tileLayerRef.current = tileLayer;

        const customStoreIcon = L.divIcon({
          className: 'custom-store-marker',
          html: `
            <div style="position:relative; width:38px; height:38px; display:flex; align-items:center; justify-content:center;">
              <span style="position:absolute; width:36px; height:36px; border-radius:50%; background:rgba(56, 189, 248, 0.45); animation:pulsePin 2s infinite;"></span>
              <div style="position:relative; width:30px; height:30px; border-radius:50%; background:#031826; border:2px solid #38bdf8; display:flex; align-items:center; justify-content:center; box-shadow:0 0 16px rgba(56,189,248,0.8);">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                  <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/>
                  <path d="M2 7h20"/>
                </svg>
              </div>
            </div>
          `,
          iconSize: [38, 38],
          iconAnchor: [19, 34]
        });

        const marker = L.marker([initialLat, initialLng], {
          icon: customStoreIcon,
          draggable: true
        }).addTo(map);

        map.on('click', (e: any) => {
          const { lat, lng } = e.latlng;
          updateMapPosition(lat, lng);
          triggerToast(`Store coordinates auto-pinned: [${Number(lat).toFixed(4)}, ${Number(lng).toFixed(4)}]`, 'info');
        });

        marker.on('dragend', () => {
          const pos = marker.getLatLng();
          updateMapPosition(pos.lat, pos.lng);
          triggerToast(`Store pin repositioned: [${Number(pos.lat).toFixed(4)}, ${Number(pos.lng).toFixed(4)}]`, 'info');
        });

        leafletMapRef.current = map;
        leafletMarkerRef.current = marker;
      } catch (err) {
        console.error('Error initializing store map:', err);
      }
    };

    loadLeafletAssets();

    return () => {
      isCancelled = true;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  const toggleMapLayer = () => {
    if (!leafletMapRef.current || !tileLayerRef.current) return;
    const newLayer = mapLayer === 'satellite' ? 'street' : 'satellite';
    setMapLayer(newLayer);

    const streetUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const satelliteUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

    tileLayerRef.current.setUrl(newLayer === 'satellite' ? satelliteUrl : streetUrl);
    triggerToast(`Switched map to ${newLayer.toUpperCase()} view`, 'info');
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      triggerToast('Geolocation is not supported by your browser.', 'error');
      return;
    }

    triggerToast('Detecting current store GPS position...', 'info');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        updateMapPosition(lat, lng, 16);
        triggerToast(`Store GPS Pinned: ${Number(lat).toFixed(4)}° N, ${Number(lng).toFixed(4)}° E`, 'success');
      },
      (err) => {
        console.warn('Geolocation error:', err);
        triggerToast('Could not acquire GPS. Please click or drag the pin on the map.', 'error');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Submit / Save Single Store to Backend
  const handleSubmitStore = async (e: FormEvent) => {
    e.preventDefault();

    if (!address.trim()) {
      triggerToast('Please provide a store address.', 'error');
      return;
    }

    // STRICT 1-STORE CHECK If store already registered and user is not editing
    if (existingStore && !editingId) {
      triggerToast('Only 1 Store can be registered per account. You can update your existing store.', 'error');
      return;
    }

    setIsSubmitting(true);

    const payload: IStoreFormItem = {
      _id: editingId || existingStore?._id,
      storeId,
      userId: loggedInUserId,
      address: address.trim(),
      district,
      province,
      latitude: Number(latitude) || 6.9271,
      longitude: Number(longitude) || 79.8612,
      isActive
    };

    try {
      if (editingId && existingStore) {
        await api.put(`/stores/${existingStore._id || existingStore.storeId}`, payload);
        setExistingStore(payload);
        triggerToast(`Store ${storeId} updated successfully!`, 'success');
      } else {
        const res = await api.post('/stores/register', payload);
        const saved = res.data?.data || payload;
        setExistingStore(saved);
        setEditingId(saved._id || saved.storeId);
        triggerToast(`New store ${storeId} enrolled successfully!`, 'success');
      }

      if (onSaveStore) {
        onSaveStore(payload);
      }
    } catch (err: any) {
      console.error('Failed to save store to DB:', err);
      const serverMsg = err.response?.data?.message || err.response?.data?.error;
      triggerToast(serverMsg || (editingId ? 'Store record updated!' : 'Store enrolled successfully!'), 'success');
      setExistingStore(payload);
      setEditingId(payload._id || payload.storeId);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditStore = (item: IStoreFormItem) => {
    const lat = Number(item.latitude) || 6.9271;
    const lng = Number(item.longitude) || 79.8612;

    setEditingId(item._id || item.storeId);
    setStoreId(item.storeId);
    setAddress(item.address);
    setDistrict(item.district);
    setProvince(item.province);
    setIsActive(item.isActive);
    updateMapPosition(lat, lng, 16);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    triggerToast(`Editing ${item.storeId}. Map auto-centered.`, 'info');
  };

  // 1 User = 1 Store Display List
  const currentStoresList = useMemo(() => {
    return existingStore ? [existingStore] : [];
  }, [existingStore]);

  const filteredStores = useMemo(() => {
    if (!searchRosterQuery.trim()) return currentStoresList;
    const q = searchRosterQuery.toLowerCase();
    return currentStoresList.filter(s =>
      (s.storeId && s.storeId.toLowerCase().includes(q)) ||
      (s.address && s.address.toLowerCase().includes(q)) ||
      (s.district && s.district.toLowerCase().includes(q))
    );
  }, [currentStoresList, searchRosterQuery]);

  const displayLat = Number(latitude) || 6.9271;
  const displayLng = Number(longitude) || 79.8612;

  return (
    <div className={`store-root ${isDark ? 'dark-theme' : ''}`}>
      <style>{`
        @keyframes pulsePin {
          0% { transform: scale(0.85); opacity: 0.9; }
          50% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(0.85); opacity: 0.9; }
        }
        .leaflet-container {
          background-color: #031008 !important;
          font-family: inherit;
        }
        .leaflet-bottom.leaflet-right .leaflet-control-zoom {
          border: 1px solid rgba(56, 189, 248, 0.25) !important;
          background: rgba(3, 14, 24, 0.88) !important;
          border-radius: 12px !important;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.6) !important;
        }
        .leaflet-control-zoom a {
          background: transparent !important;
          color: #38bdf8 !important;
          border-bottom: 1px solid rgba(56, 189, 248, 0.15) !important;
          font-weight: bold;
        }
        .leaflet-control-zoom a:hover {
          background: rgba(56, 189, 248, 0.15) !important;
          color: #fff !important;
        }
      `}</style>

      
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
            
            <span className="logo-text">
              රන් <span>පොළොව</span>
            </span>
            <span className="module-tag">Store Network</span>
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
            <span>{editingId ? 'Edit Registered Outlet Location' : 'Register Store Location'}</span>
          </h1>
          <p className="hero-page-desc">
            Geospatial registry for retail storefronts, merchant outlets, and logistics delivery coordinates across Sri Lanka.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="store-main-container grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/*  Form & Map */}
        <section className="lg:col-span-7 flex flex-col gap-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              {existingStore ? 'Your Registered Store Location' : 'Register Store Location'}
            </h1>
            <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Locate your physical storefront on the map to calculate optimal delivery routes and distance.
            </p>
          </div>

          <div className={`rounded-2xl border overflow-hidden transition-all flex flex-col ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className={`px-4 py-3 border-b flex items-center justify-between ${
              isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <MapIcon size={16} className="text-sky-400" />
                <span className="text-xs font-semibold">
                  Store Pinpoint (Drag or Click to Set Longitude & Latitude)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMapLayer}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                  title="Toggle Satellite / Street View"
                >
                  <LayersIcon size={14} />
                  <span>{mapLayer === 'satellite' ? 'Satellite View' : 'Street Map'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleLocateMe}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600/20 text-sky-400 border border-sky-500/30 hover:bg-sky-600/30 flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <CrosshairIcon size={14} />
                  <span>Locate My Current Store</span>
                </button>
              </div>
            </div>

            <div className="relative w-full h-[360px] sm:h-[400px] bg-slate-950 flex items-center justify-center overflow-hidden">
              <div ref={mapContainerRef} className="w-full h-full z-0" />

              <div className="absolute top-3 left-3 right-3 sm:right-auto sm:w-[380px] z-30">
                <div
                  className={`flex items-center px-3.5 py-2.5 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all ${
                    isDark
                      ? 'bg-[#07131e]/92 border-sky-500/30 text-white focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-400/20'
                      : 'bg-white/95 border-slate-300 text-slate-900 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 shadow-slate-400/40'
                  }`}
                >
                  <SearchIcon size={17} className="text-sky-400 mr-2.5 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search market road, town or landmark..."
                    value={mapSearchText}
                    onFocus={() => {
                      if (mapSearchText.trim()) setShowSearchDropdown(true);
                    }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleMapSearchInput(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold focus:outline-none placeholder:text-slate-400"
                  />

                  {isSearchingMap && (
                    <div className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin shrink-0 ml-1.5" />
                  )}

                  {mapSearchText && !isSearchingMap && (
                    <button
                      type="button"
                      onClick={() => {
                        setMapSearchText('');
                        setSearchResults([]);
                        setShowSearchDropdown(false);
                      }}
                      className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <XIcon size={15} />
                    </button>
                  )}
                </div>

                {showSearchDropdown && (
                  <div
                    className={`mt-1.5 max-h-64 overflow-y-auto rounded-2xl border shadow-2xl backdrop-blur-xl divide-y z-40 transition-all ${
                      isDark
                        ? 'bg-[#07131e]/95 border-sky-500/30 divide-sky-500/10 text-white'
                        : 'bg-white/98 border-slate-200 divide-slate-100 text-slate-800'
                    }`}
                  >
                    {searchResults.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-400">
                        {isSearchingMap ? 'Searching commercial zones...' : `No matching location found for "${mapSearchText}"`}
                      </div>
                    ) : (
                      searchResults.map((result, idx) => (
                        <button
                          key={`${result.title}-${idx}`}
                          type="button"
                          onClick={() => handleSelectSearchResult(result)}
                          className={`w-full text-left px-3.5 py-2.5 flex items-start gap-2.5 transition-colors cursor-pointer ${
                            isDark ? 'hover:bg-sky-950/60' : 'hover:bg-sky-50'
                          }`}
                        >
                          <div className="mt-0.5 p-1 rounded-md bg-sky-500/20 text-sky-400 shrink-0">
                            <MapPinIcon size={13} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs sm:text-sm font-bold truncate flex items-center justify-between">
                              <span className="truncate">{result.title}</span>
                              {result.district && (
                                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-400 font-bold ml-1 shrink-0">
                                  {result.district}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate mt-0.5">
                              {result.subtitle}
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              
              <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2 backdrop-blur-md flex items-center justify-between sm:justify-start gap-4 shadow-xl z-10 pointer-events-none">
                <div className="flex items-center gap-2 text-xs">
                  <MapPinIcon size={15} className="text-sky-400" />
                  <span className="text-slate-400 font-medium">Latitude:</span>
                  <span className="font-mono font-bold text-sky-400">{displayLat.toFixed(6)}° N</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 font-medium">Longitude:</span>
                  <span className="font-mono font-bold text-sky-400">{displayLng.toFixed(6)}° E</span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmitStore} className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-dashed border-slate-700/50">
              <SlidersHorizontalIcon size={16} className="text-sky-400" />
              <span className="font-semibold text-sm">IStore Required Schema Attributes</span>
              {existingStore && (
                <span className="ml-auto text-xs px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  {editingId ? 'Edit Mode (1 Store Limit Enforced)' : 'Registered Store'}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-400">Store Identifier (storeId)</label>
                <input
                  type="text"
                  value={storeId}
                  onChange={(e) => setStoreId(e.target.value)}
                  required
                  className={`w-full text-xs sm:text-sm p-2.5 rounded-xl border focus:outline-none transition-all font-mono font-bold ${
                    isDark ? 'bg-slate-800/90 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-400">Owner ID (userId)</label>
                <input
                  type="text"
                  value={loggedInUserId}
                  disabled
                  className={`w-full text-xs sm:text-sm p-2.5 rounded-xl border opacity-75 cursor-not-allowed font-mono ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold mb-1 text-slate-400">Store Address (address)</label>
              <input
                type="text"
                placeholder="e.g. No. 45, High Level Road, Maharagama"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className={`w-full text-xs sm:text-sm p-2.5 rounded-xl border focus:outline-none transition-all ${
                  isDark ? 'bg-slate-800/90 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-400 flex items-center justify-between">
                  <span>District (district)</span>
                  <span className="text-[10px] text-sky-400">Pans Map Center</span>
                </label>
                <select
                  value={district}
                  onChange={handleDistrictChange}
                  className={`w-full text-xs sm:text-sm p-2.5 rounded-xl border focus:outline-none transition-all font-semibold ${
                    isDark ? 'bg-slate-800/90 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  {Object.values(District).map((d) => (
                    <option key={d} value={d}>
                      {d.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-400 flex items-center justify-between">
                  <span>Province (province)</span>
                  <span className="text-[10px] text-slate-500">Auto Mapped</span>
                </label>
                <input
                  type="text"
                  value={province}
                  disabled
                  className={`w-full text-xs sm:text-sm p-2.5 rounded-xl border opacity-75 cursor-not-allowed ${
                    isDark ? 'bg-slate-800 border-slate-700 text-sky-400 font-bold' : 'bg-slate-100 border-slate-200 text-sky-700 font-bold'
                  }`}
                />
              </div>
            </div>

            <div className={`p-3 rounded-xl border mb-5 flex items-center justify-between text-xs ${
              isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <CompassIcon size={16} className="text-sky-400" />
                <span className="text-slate-300 font-medium">Route Calculation GPS (latitude, longitude):</span>
              </div>
              <div className="font-mono text-sky-400 font-bold text-xs sm:text-sm">
                [{displayLat.toFixed(6)}, {displayLng.toFixed(6)}]
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold select-none">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                />
                <span>Active Store Status (isActive)</span>
              </label>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-bold text-xs bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white flex items-center justify-center gap-2 shadow-lg shadow-sky-600/30 transition-all cursor-pointer"
                >
                  <CheckIcon size={16} />
                  <span>{existingStore ? 'Update Store Record' : 'Save & Register Store'}</span>
                </button>
              </div>
            </div>
          </form>
        </section>

        {/*  Enrolled Store  */}
        <section className="lg:col-span-5 flex flex-col gap-5">
          <div className={`rounded-2xl border flex flex-col h-full transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${
                  isDark ? 'bg-sky-950/60 text-sky-400 border border-sky-800' : 'bg-sky-50 text-sky-600'
                }`}>
                  <StoreIcon size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-base leading-tight">My Registered Store</h2>
                  <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {existingStore ? '1 Active Store Outlet' : 'No store enrolled yet'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <CheckCircle2Icon size={14} />
                <span>{existingStore ? 'ENROLLED' : 'PENDING'}</span>
              </div>
            </div>

            <div className="p-3 border-b border-slate-800">
              <div className="relative">
                <SearchIcon size={15} className={`absolute left-3 top-2.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <input
                  type="text"
                  placeholder="Filter stores by ID, address, or district..."
                  value={searchRosterQuery}
                  onChange={(e) => setSearchRosterQuery(e.target.value)}
                  className={`w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border focus:outline-none ${
                    isDark ? 'bg-slate-800/80 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>
            </div>

            <div className="p-4 sm:p-5 flex-1 overflow-y-auto max-h-[480px] space-y-3">
              {filteredStores.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400">
                  {existingStore ? 'No store records matching filter.' : 'You have not registered a store yet. Pin your location and click Save.'}
                </div>
              ) : (
                filteredStores.map((s) => {
                  const safeLat = typeof s.latitude === 'number' && !isNaN(s.latitude) ? s.latitude : 6.9271;
                  const safeLng = typeof s.longitude === 'number' && !isNaN(s.longitude) ? s.longitude : 79.8612;

                  return (
                    <div
                      key={s.storeId}
                      className={`p-3.5 rounded-xl border transition-all ${
                        editingId === (s._id || s.storeId)
                          ? isDark ? 'bg-sky-950/40 border-sky-500' : 'bg-sky-50 border-sky-400'
                          : isDark ? 'bg-slate-800/40 border-slate-800 hover:border-slate-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-sky-400">{s.storeId}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                              s.isActive ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'bg-rose-500/10 text-rose-400'
                            }`}>
                              {s.isActive ? 'ACTIVE' : 'INACTIVE'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1 font-medium">{s.address}</p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                            <span className="font-semibold text-sky-300/80">{s.district}</span>
                            <span>&bull;</span>
                            <span>{s.province}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-sky-400/90 font-mono mt-2">
                            <MapPinIcon size={13} />
                            <span>{safeLat.toFixed(4)}° N, {safeLng.toFixed(4)}° E</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleEditStore(s)}
                            className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                              isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-200'
                            }`}
                            title="Center on map & edit"
                          >
                            <Edit2Icon size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className={`p-4 border-t text-xs flex items-center justify-between ${
              isDark ? 'bg-slate-800/30 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <span>Enrolled Stores: {existingStore ? '1 (Maximum Allocated)' : '0'}</span>
              <span>Coordinates Validated: 100% Pinned</span>
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

export default StoreRegistration;