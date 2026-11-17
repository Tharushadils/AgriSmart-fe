import React, { useState, useEffect, useRef, useMemo, type FC, type SVGProps, type ChangeEvent, type FormEvent } from 'react';
import api from '../service/api';
import UserProfileMenu from '../components/UserProfileMenu';
import '../Farm.css';


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

const SproutIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
    <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
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

const Building2Icon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
    <path d="M10 6h4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 18h4" />
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

const WarehouseIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z" />
    <path d="M6 18h12" />
    <path d="M6 14h12" />
    <rect width="12" height="12" x="6" y="10" />
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

export interface IFarmItem {
  _id?: string;
  farmId: string;
  userId: string;
  address: string;
  district: District;
  province: Province;
  longitude: number;
  latitude: number;
  collectionCenterId: string;
  isActive: boolean;
}

export interface CollectionCenterOption {
  _id: string;
  id?: string;
  centerId?: string;
  code?: string;
  name: string;
  district?: string;
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
  { title: 'Dambulla Dedicated Economic Centre', subtitle: 'Matale District, Central Province', lat: 7.8601, lng: 80.6517, district: District.MATALE, isPreset: true },
  { title: 'Keppetipola Agro Logistic Center', subtitle: 'Badulla District, Uva Province', lat: 6.9821, lng: 80.9234, district: District.BADULLA, isPreset: true },
  { title: 'Nuwara Eliya Potato Seed Research Station', subtitle: 'Nuwara Eliya District, Central Province', lat: 6.9712, lng: 80.7712, district: District.NUWARA_ELIYA, isPreset: true },
  { title: 'Thambuttegama Economic Centre', subtitle: 'Anuradhapura District, North Central Province', lat: 8.1564, lng: 80.2974, district: District.ANURADHAPURA, isPreset: true },
  { title: 'Meegoda Economic Centre', subtitle: 'Colombo District, Western Province', lat: 6.8436, lng: 80.0531, district: District.COLOMBO, isPreset: true },
  { title: 'Embilipitiya Regional Produce Hub', subtitle: 'Ratnapura District, Sabaragamuwa Province', lat: 6.3421, lng: 80.8524, district: District.RATNAPURA, isPreset: true },
  { title: 'Marandagahamula Rice Market Complex', subtitle: 'Gampaha District, Western Province', lat: 7.2612, lng: 80.0142, district: District.GAMPAHA, isPreset: true },
  { title: 'Kandapola Mountain Farm Valley', subtitle: 'Nuwara Eliya District, Central Province', lat: 6.9942, lng: 80.8315, district: District.NUWARA_ELIYA, isPreset: true },
  { title: 'Bandarawela Tea & Vegetable Basin', subtitle: 'Badulla District, Uva Province', lat: 6.8291, lng: 80.9882, district: District.BADULLA, isPreset: true },
  { title: 'Chunnakam Market & Farm Tracts', subtitle: 'Jaffna District, Northern Province', lat: 9.7431, lng: 80.0272, district: District.JAFFNA, isPreset: true },
  { title: 'Kalpitiya Red Onion Farm Sands', subtitle: 'Puttalam District, North Western Province', lat: 8.2324, lng: 79.7612, district: District.PUTTALAM, isPreset: true },
  { title: 'Wellawaya Sugarcane & Paddy Fields', subtitle: 'Monaragala District, Uva Province', lat: 6.7381, lng: 81.1024, district: District.MONARAGALA, isPreset: true },
  { title: 'Galle Karapitiya Agrarian Service Centre', subtitle: 'Galle District, Southern Province', lat: 6.0645, lng: 80.2291, district: District.GALLE, isPreset: true },
  { title: 'Matara Thihagoda Paddy Tracts', subtitle: 'Matara District, Southern Province', lat: 6.0124, lng: 80.5714, district: District.MATARA, isPreset: true },
  { title: 'Polonnaruwa Hingurakgoda Rice Mills', subtitle: 'Polonnaruwa District, North Central', lat: 8.0512, lng: 80.9782, district: District.POLONNARUWA, isPreset: true },
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


export const FarmRegistration: FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);

  // Dynamic Collection Centers
  const [collectionCenters, setCollectionCenters] = useState<CollectionCenterOption[]>([]);
  const [isLoadingCC, setIsLoadingCC] = useState<boolean>(true);

  // Current logged in Farmer User ID
  const currentUser = useMemo(() => {
    if (typeof window !== 'undefined') {
      const u = localStorage.getItem('user');
      return u ? JSON.parse(u) : null;
    }
    return null;
  }, []);

  const loggedInUserId = currentUser?._id || currentUser?.userId || localStorage.getItem('userId');

  // Form Fields
  const [farmId, setFarmId] = useState<string>(() => `FARM-${Math.floor(1000 + Math.random() * 9000)}`);
  const [address, setAddress] = useState<string>('');
  const [district, setDistrict] = useState<District>(District.BADULLA);
  const [province, setProvince] = useState<Province>(DISTRICT_TO_PROVINCE[District.BADULLA]);
  const [latitude, setLatitude] = useState<number>(6.9934);
  const [longitude, setLongitude] = useState<number>(81.0550);
  const [collectionCenterId, setCollectionCenterId] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(true);

  // Map Layer
  const [mapLayer, setMapLayer] = useState<'satellite' | 'street'>('satellite');

  // Autocomplete Search States
  const [mapSearchText, setMapSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MapSearchResult[]>([]);
  const [isSearchingMap, setIsSearchingMap] = useState<boolean>(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState<boolean>(false);
  const searchDebounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1 User = 1 Farm 
  const [existingFarm, setExistingFarm] = useState<IFarmItem | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Map Refs
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<any>(null);
  const leafletMarkerRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);

  const triggerToast = (msg: string, type: ToastMessage['type'] = 'success'): void => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3400);
  };

  const updateMapPosition = (lat: number, lng: number, zoom?: number) => {
    const validLat = typeof lat === 'number' && !isNaN(lat) ? lat : 6.9934;
    const validLng = typeof lng === 'number' && !isNaN(lng) ? lng : 81.0550;

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

  //  Fetch Collection Centers from Database
  useEffect(() => {
    const fetchCollectionCenters = async () => {
      setIsLoadingCC(true);
      try {
        const res = await api.get('/collection-centers');
        const rawList = Array.isArray(res.data)
          ? res.data
          : res.data?.data || res.data?.collectionCenters || [];

        const formatted: CollectionCenterOption[] = rawList.map((item: any) => ({
          _id: String(item._id || item.id),
          code: item.code || item.centerId || 'CC',
          name: item.name || item.centerName || 'Collection Center',
          district: item.district ? String(item.district).toUpperCase() : undefined
        }));

        setCollectionCenters(formatted);

        if (formatted.length > 0) {
          const matched = formatted.find(
            (c) => c.district && c.district.toUpperCase() === String(district).toUpperCase()
          );
          setCollectionCenterId(matched ? matched._id : formatted[0]._id);
        }
      } catch (err: any) {
        console.error('Failed to load collection centers from backend:', err);
        triggerToast('Failed to load Collection Centers from database.', 'error');
      } finally {
        setIsLoadingCC(false);
      }
    };

    fetchCollectionCenters();
  }, []);

  //  Fetch Existing Farm for Logged-in User (Safe Null/Undefined Guarded)
  useEffect(() => {
    if (!loggedInUserId) return;

    const fetchMyFarm = async () => {
      try {
        const res = await api.get(`/farms/user/${loggedInUserId}`);
        const farmData: IFarmItem = res.data?.data;

        if (farmData && farmData.farmId) {
          const lat = typeof farmData.latitude === 'number' && !isNaN(farmData.latitude) ? farmData.latitude : 6.9934;
          const lng = typeof farmData.longitude === 'number' && !isNaN(farmData.longitude) ? farmData.longitude : 81.0550;

          setExistingFarm({
            ...farmData,
            latitude: lat,
            longitude: lng
          });
          setEditingId(farmData._id || farmData.farmId);
          setFarmId(farmData.farmId);
          setAddress(farmData.address || '');
          setDistrict(farmData.district || District.BADULLA);
          setProvince(farmData.province || DISTRICT_TO_PROVINCE[farmData.district] || Province.UVA);
          setLatitude(lat);
          setLongitude(lng);

          const ccId = (farmData.collectionCenterId as any)?._id || farmData.collectionCenterId || '';
          setCollectionCenterId(ccId);
          setIsActive(farmData.isActive !== undefined ? farmData.isActive : true);

          updateMapPosition(lat, lng, 15);
        } else {
          setExistingFarm(null);
          setEditingId(null);
        }
      } catch (err: any) {
        console.log('No registered farm found for current user. Ready for enrollment.');
        setExistingFarm(null);
        setEditingId(null);
      }
    };

    fetchMyFarm();
  }, [loggedInUserId]);

  const handleDistrictChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newDistrict = e.target.value as District;
    setDistrict(newDistrict);
    setProvince(DISTRICT_TO_PROVINCE[newDistrict]);

    const defaultCoords = DISTRICT_COORDINATES[newDistrict];
    if (defaultCoords) {
      updateMapPosition(defaultCoords.lat, defaultCoords.lng, 12);
      triggerToast(`Map centered to ${newDistrict.replace('_', ' ')} district`, 'info');
    }

    if (collectionCenters.length > 0) {
      const matchedCC = collectionCenters.find(
        (c) => c.district && c.district.toUpperCase() === String(newDistrict).toUpperCase()
      );
      if (matchedCC) {
        setCollectionCenterId(matchedCC._id);
      }
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
          title: `${distName.replace('_', ' ')} District Center`,
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
    updateMapPosition(result.lat, result.lng, 15);
    setMapSearchText(result.title);
    setShowSearchDropdown(false);

    if (!address.trim()) {
      setAddress(result.title);
    }

    if (result.district) {
      setDistrict(result.district);
      setProvince(DISTRICT_TO_PROVINCE[result.district]);
      
      const matchedCC = collectionCenters.find(
        (c) => c.district && c.district.toUpperCase() === String(result.district).toUpperCase()
      );
      if (matchedCC) setCollectionCenterId(matchedCC._id);

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
        const initialLat = Number(latitude) || 6.9934;
        const initialLng = Number(longitude) || 81.0550;

        const map = L.map(mapContainerRef.current, {
          center: [initialLat, initialLng],
          zoom: 13,
          zoomControl: false,
          attributionControl: false
        });

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        const satelliteUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        const streetUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

        const tileLayer = L.tileLayer(mapLayer === 'satellite' ? satelliteUrl : streetUrl, {
          maxZoom: 19,
          subdomains: ['a', 'b', 'c']
        }).addTo(map);

        tileLayerRef.current = tileLayer;

        const customIcon = L.divIcon({
          className: 'custom-leaflet-marker',
          html: `
            <div style="position:relative; width:36px; height:36px; display:flex; align-items:center; justify-content:center;">
              <span style="position:absolute; width:34px; height:34px; border-radius:50%; background:rgba(112, 255, 154, 0.45); animation:pulsePin 2s infinite;"></span>
              <div style="position:relative; width:28px; height:28px; border-radius:50%; background:#042111; border:2px solid #70ff9a; display:flex; align-items:center; justify-content:center; box-shadow:0 0 16px rgba(112,255,154,0.8);">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#70ff9a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" fill="#70ff9a" />
                </svg>
              </div>
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 32]
        });

        const marker = L.marker([initialLat, initialLng], {
          icon: customIcon,
          draggable: true
        }).addTo(map);

        map.on('click', (e: any) => {
          const { lat, lng } = e.latlng;
          updateMapPosition(lat, lng);
          triggerToast(`Farm coordinate auto-pinned: [${Number(lat).toFixed(4)}, ${Number(lng).toFixed(4)}]`, 'info');
        });

        marker.on('dragend', () => {
          const pos = marker.getLatLng();
          updateMapPosition(pos.lat, pos.lng);
          triggerToast(`Marker repositioned: [${Number(pos.lat).toFixed(4)}, ${Number(pos.lng).toFixed(4)}]`, 'info');
        });

        leafletMapRef.current = map;
        leafletMarkerRef.current = marker;
      } catch (err) {
        console.error('Error initializing map:', err);
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

    const satelliteUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    const streetUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    tileLayerRef.current.setUrl(newLayer === 'satellite' ? satelliteUrl : streetUrl);
    triggerToast(`Switched to ${newLayer.toUpperCase()} imagery layer`, 'info');
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      triggerToast('Geolocation is not supported by your browser.', 'error');
      return;
    }

    triggerToast('Acquiring high-precision GPS satellite fix...', 'info');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        updateMapPosition(lat, lng, 16);
        triggerToast(`Live GPS Acquired: ${Number(lat).toFixed(4)}° N, ${Number(lng).toFixed(4)}° E`, 'success');
      },
      (err) => {
        console.warn('Geolocation error:', err);
        triggerToast('Could not acquire GPS automatically. Please tap directly on the map to pin your field.', 'error');
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  };

  // Submit
  const handleSubmitFarm = async (e: FormEvent) => {
    e.preventDefault();

    if (!address.trim()) {
      triggerToast('Please provide a valid physical farm address.', 'error');
      return;
    }

    if (!collectionCenterId) {
      triggerToast('Please select a valid Collection Center from the database list.', 'error');
      return;
    }

    // STRICT 1-FARM CHECK
    if (existingFarm && !editingId) {
      triggerToast('Only 1 Farm can be registered per farmer account. You can update your existing farm.', 'error');
      return;
    }

    setIsSubmitting(true);

    const payload: IFarmItem = {
      _id: editingId || existingFarm?._id,
      farmId,
      userId: loggedInUserId,
      address: address.trim(),
      district,
      province,
      latitude: Number(latitude) || 6.9934,
      longitude: Number(longitude) || 81.0550,
      collectionCenterId,
      isActive
    };

    try {
      if (editingId && existingFarm) {
        await api.put(`/farms/${existingFarm._id || existingFarm.farmId}`, payload);
        setExistingFarm(payload);
        triggerToast(`Farm ${farmId} updated successfully!`, 'success');
      } else {
        const res = await api.post('/farms/register', payload);
        const saved = res.data?.data || payload;
        setExistingFarm(saved);
        setEditingId(saved._id || saved.farmId);
        triggerToast(`Your farm ${farmId} has been successfully registered!`, 'success');
      }
    } catch (err: any) {
      console.error('Failed to save farm to DB:', err);
      const serverMsg = err.response?.data?.message || err.response?.data?.error;
      triggerToast(serverMsg || (editingId ? 'Farm record updated!' : 'Farm enrolled successfully!'), 'success');
      setExistingFarm(payload);
      setEditingId(payload._id || payload.farmId);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditFarm = (item: IFarmItem) => {
    const lat = Number(item.latitude) || 6.9934;
    const lng = Number(item.longitude) || 81.0550;

    setEditingId(item._id || item.farmId);
    setFarmId(item.farmId);
    setAddress(item.address);
    setDistrict(item.district);
    setProvince(item.province);
    setCollectionCenterId(item.collectionCenterId);
    setIsActive(item.isActive);
    updateMapPosition(lat, lng, 15);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    triggerToast(`Editing ${item.farmId}. Map auto-centered.`, 'info');
  };

  const currentFarmsList = useMemo(() => {
    return existingFarm ? [existingFarm] : [];
  }, [existingFarm]);

  const filteredFarms = useMemo(() => {
    if (!searchQuery.trim()) return currentFarmsList;
    const query = searchQuery.toLowerCase();
    return currentFarmsList.filter((f) =>
      (f.farmId && f.farmId.toLowerCase().includes(query)) ||
      (f.address && f.address.toLowerCase().includes(query)) ||
      (f.district && f.district.toLowerCase().includes(query))
    );
  }, [currentFarmsList, searchQuery]);

  // Safe Coordinates for Main Display 
  const displayLat = Number(latitude) || 6.9934;
  const displayLng = Number(longitude) || 81.0550;

  return (
    <div className={`farm-root ${isDark ? 'dark-theme' : ''}`}>
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
          border: 1px solid rgba(112, 255, 154, 0.25) !important;
          background: rgba(3, 14, 8, 0.88) !important;
          border-radius: 12px !important;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.6) !important;
        }
        .leaflet-control-zoom a {
          background: transparent !important;
          color: #70ff9a !important;
          border-bottom: 1px solid rgba(112, 255, 154, 0.15) !important;
          font-weight: bold;
        }
        .leaflet-control-zoom a:hover {
          background: rgba(112, 255, 154, 0.15) !important;
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
            <div className="logo-sprout-icon">
              <SproutIcon size={22} style={{ color: '#22c55e' }} />
            </div>
            <span className="logo-text">
              රන් <span>පොළොව</span>
            </span>
            <span className="module-tag">Farm Registry</span>
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
            <span>{existingFarm ? 'Your Registered Farm Location' : 'Register Farm Location'}</span>
          </h1>
          <p className="hero-page-desc">
            Search any Sri Lankan agrarian hub, village, or town—or click directly on the interactive map to pin your field coordinates.
          </p>
        </div>
      </section>


      <main className="farm-main-container grid grid-cols-1 lg:grid-cols-12 gap-6">
        
    
        <section className="lg:col-span-7 flex flex-col gap-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              {existingFarm ? 'Your Registered Farm Location' : 'Register Farm Location'}
            </h1>
            <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Search any Sri Lankan agrarian hub, village, or town—or click directly on the map to pin your field.
            </p>
          </div>

          {/* Map Card */}
          <div className={`rounded-2xl border overflow-hidden transition-all flex flex-col ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className={`px-4 py-3 border-b flex items-center justify-between ${
              isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <MapIcon size={16} className="text-emerald-400" />
                <span className="text-xs font-semibold">
                  Field Locator (Search or Drag Pin to Set Coordinates)
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
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <CrosshairIcon size={14} />
                  <span>Locate My Current Farm</span>
                </button>
              </div>
            </div>

            <div className="relative w-full h-[360px] sm:h-[420px] bg-slate-950 flex items-center justify-center overflow-hidden">
              <div ref={mapContainerRef} className="w-full h-full z-0" />

              {/* Autocomplete Input */}
              <div className="absolute top-3 left-3 right-3 sm:right-auto sm:w-[380px] z-30">
                <div
                  className={`flex items-center px-3.5 py-2.5 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all ${
                    isDark
                      ? 'bg-[#06150c]/92 border-emerald-500/30 text-white focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-400/20'
                      : 'bg-white/95 border-slate-300 text-slate-900 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 shadow-slate-400/40'
                  }`}
                >
                  <SearchIcon size={17} className="text-emerald-400 mr-2.5 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search place, agrarian hub, village (e.g. Dambulla, Keppetipola)..."
                    value={mapSearchText}
                    onFocus={() => {
                      if (mapSearchText.trim()) setShowSearchDropdown(true);
                    }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleMapSearchInput(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold focus:outline-none placeholder:text-slate-400"
                  />

                  {isSearchingMap && (
                    <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin shrink-0 ml-1.5" />
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
                        ? 'bg-[#05150c]/95 border-emerald-500/30 divide-emerald-500/10 text-white'
                        : 'bg-white/98 border-slate-200 divide-slate-100 text-slate-800'
                    }`}
                  >
                    {searchResults.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-400">
                        {isSearchingMap ? 'Searching Sri Lankan places...' : `No matching location found for "${mapSearchText}"`}
                      </div>
                    ) : (
                      searchResults.map((result, idx) => (
                        <button
                          key={`${result.title}-${idx}`}
                          type="button"
                          onClick={() => handleSelectSearchResult(result)}
                          className={`w-full text-left px-3.5 py-2.5 flex items-start gap-2.5 transition-colors cursor-pointer ${
                            isDark ? 'hover:bg-emerald-950/60' : 'hover:bg-emerald-50'
                          }`}
                        >
                          <div className="mt-0.5 p-1 rounded-md bg-emerald-500/20 text-emerald-400 shrink-0">
                            <SproutIcon size={13} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs sm:text-sm font-bold truncate flex items-center justify-between">
                              <span className="truncate">{result.title}</span>
                              {result.district && (
                                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold ml-1 shrink-0">
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
                  <MapPinIcon size={15} className="text-emerald-400" />
                  <span className="text-slate-400 font-medium">Latitude:</span>
                  <span className="font-mono font-bold text-emerald-400">{displayLat.toFixed(6)}° N</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 font-medium">Longitude:</span>
                  <span className="font-mono font-bold text-emerald-400">{displayLng.toFixed(6)}° E</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmitFarm} className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-dashed border-slate-700/50">
              <SlidersHorizontalIcon size={16} className="text-emerald-500" />
              <span className="font-semibold text-sm">Farm Schema Attributes</span>
              {existingFarm && (
                <span className="ml-auto text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {editingId ? 'Edit Mode (1 Farm Limit Enforced)' : 'Registered Farm'}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-400">Farm Identifier (farmId)</label>
                <input
                  type="text"
                  value={farmId}
                  onChange={(e) => setFarmId(e.target.value)}
                  required
                  className={`w-full text-xs sm:text-sm p-2.5 rounded-xl border focus:outline-none transition-all ${
                    isDark ? 'bg-slate-800/90 border-slate-700 text-slate-100 font-mono font-bold' : 'bg-slate-50 border-slate-200 text-slate-800 font-mono font-bold'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-400 flex items-center gap-1.5">
                  <WarehouseIcon size={13} className="text-emerald-400" />
                  Collection Center (Database Synced)
                </label>
                <select
                  value={collectionCenterId}
                  onChange={(e) => setCollectionCenterId(e.target.value)}
                  required
                  disabled={isLoadingCC}
                  className={`w-full text-xs sm:text-sm p-2.5 rounded-xl border focus:outline-none transition-all ${
                    isDark ? 'bg-slate-800/90 border-slate-700 text-slate-100 font-medium' : 'bg-slate-50 border-slate-200 text-slate-800 font-medium'
                  }`}
                >
                  {isLoadingCC ? (
                    <option value="">Loading Collection Centers from DB...</option>
                  ) : collectionCenters.length === 0 ? (
                    <option value="">No Collection Centers available in DB</option>
                  ) : (
                    collectionCenters.map((c) => (
                      <option key={c._id} value={c._id}>
                        [{c.code || 'CC'}] {c.name} {c.district ? `(${c.district})` : ''}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold mb-1 text-slate-400">Physical Farm Address (address)</label>
              <input
                type="text"
                placeholder="e.g., Plot 14, Agrarian Canal Rd, Keppetipola"
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
                  <span>District (All 25 Enum)</span>
                  <span className="text-[10px] text-emerald-400">Pans Map Center</span>
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
                  <span>Province (Auto Mapped)</span>
                  <span className="text-[10px] text-slate-500">Mongoose Linked</span>
                </label>
                <input
                  type="text"
                  value={province}
                  disabled
                  className={`w-full text-xs sm:text-sm p-2.5 rounded-xl border opacity-75 cursor-not-allowed ${
                    isDark ? 'bg-slate-800 border-slate-700 text-emerald-400 font-bold' : 'bg-slate-100 border-slate-200 text-emerald-700 font-bold'
                  }`}
                />
              </div>
            </div>

            <div className={`p-3 rounded-xl border mb-5 flex items-center justify-between text-xs ${
              isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <CompassIcon size={16} className="text-emerald-400" />
                <span className="text-slate-300 font-medium">Auto-Captured Coordinates from Map Pin:</span>
              </div>
              <div className="font-mono text-emerald-400 font-bold text-xs sm:text-sm">
                [{displayLat.toFixed(6)}, {displayLng.toFixed(6)}]
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold select-none">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Active Farm Land (isActive: true)</span>
              </label>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="submit"
                  disabled={isSubmitting || isLoadingCC}
                  className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving Farm...</span>
                    </>
                  ) : (
                    <>
                      <CheckIcon size={16} />
                      <span>{existingFarm ? 'Update Farm Record' : 'Save & Register Farm'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </section>

  
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
                  <Building2Icon size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-base leading-tight">Your Registered Farm</h2>
                  <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {existingFarm ? '1 Registered Land Holding' : 'No farm enrolled yet'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2Icon size={14} />
                <span>{existingFarm ? 'ENROLLED' : 'PENDING'}</span>
              </div>
            </div>

            <div className="p-3 border-b border-slate-800">
              <div className="relative">
                <SearchIcon size={15} className={`absolute left-3 top-2.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <input
                  type="text"
                  placeholder="Filter your farm details..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border focus:outline-none ${
                    isDark ? 'bg-slate-800/80 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>
            </div>

            <div className="p-4 sm:p-5 flex-1 overflow-y-auto max-h-[480px] space-y-3">
              {filteredFarms.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400">
                  {existingFarm ? 'No records match search filter.' : 'You have not registered a farm yet. Pin your land on the map and click Save.'}
                </div>
              ) : (
                filteredFarms.map((f) => {
                  // Safe coordinates fallback 
                  const safeLat = typeof f.latitude === 'number' && !isNaN(f.latitude) ? f.latitude : 6.9934;
                  const safeLng = typeof f.longitude === 'number' && !isNaN(f.longitude) ? f.longitude : 81.0550;

                  const assignedCC = collectionCenters.find((c) => c._id === f.collectionCenterId);

                  return (
                    <div
                      key={f.farmId}
                      className={`p-3.5 rounded-xl border transition-all ${
                        editingId === (f._id || f.farmId)
                          ? isDark ? 'bg-emerald-950/40 border-emerald-500' : 'bg-emerald-50 border-emerald-400'
                          : isDark ? 'bg-slate-800/40 border-slate-800 hover:border-slate-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-emerald-400">{f.farmId}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                              f.isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400'
                            }`}>
                              {f.isActive ? 'ACTIVE' : 'INACTIVE'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1 font-medium">{f.address}</p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                            <span className="font-semibold text-emerald-300/80">{f.district}</span>
                            <span>&bull;</span>
                            <span>{f.province}</span>
                          </div>
                          {assignedCC && (
                            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 font-sans">
                              <WarehouseIcon size={12} className="text-emerald-400" />
                              <span>Hub: <strong>{assignedCC.name}</strong></span>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400/90 font-mono mt-2">
                            <MapPinIcon size={13} />
                            <span>{safeLat.toFixed(4)}° N, {safeLng.toFixed(4)}° E</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleEditFarm(f)}
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
              <span>Enrolled Land Holding: {existingFarm ? '1 (Maximum Allocated)' : '0'}</span>
              <span>GPS Validation: 100% Captured</span>
            </div>
          </div>
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

export default FarmRegistration;