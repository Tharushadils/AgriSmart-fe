import React, { useState, useEffect, useRef, useMemo, type FC, type SVGProps, type ChangeEvent, type FormEvent } from 'react';

// ============================================================================
// 1. INLINE SVG ICONS (Self-contained, zero external package dependencies)
// ============================================================================
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

const RotateCcwIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
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

const Trash2Icon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
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

const NavigationIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </BaseIcon>
);

// ============================================================================
// 2. MONGOOSE SCHEMA DOMAIN ENUMS & INTERFACES
// ============================================================================

// ============================================================================
// ErasableSyntaxOnly Compliant Const Objects & Types
// ============================================================================

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
  id: string;
  code: string;
  name: string;
  district: District;
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

// 25 Districts -> 9 Provinces mapping
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

// District Default Coordinates
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

// Sri Lankan Major Agrarian Hubs & Economic Centers (Fast Offline Pre-suggestions)
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

const COLLECTION_CENTERS: CollectionCenterOption[] = [
  { id: '65f1a2b3c4d5e6f7a8b90101', code: 'CC-DMB', name: 'Dambulla Dedicated Economic Centre Hub', district: District.MATALE },
  { id: '65f1a2b3c4d5e6f7a8b90102', code: 'CC-KEP', name: 'Keppetipola Agro Logistic Center', district: District.BADULLA },
  { id: '65f1a2b3c4d5e6f7a8b90103', code: 'CC-MEE', name: 'Meegoda Agrarian Collection Terminal', district: District.COLOMBO },
  { id: '65f1a2b3c4d5e6f7a8b90104', code: 'CC-NWE', name: 'Nuwara Eliya Cold Chain Center', district: District.NUWARA_ELIYA },
  { id: '65f1a2b3c4d5e6f7a8b90105', code: 'CC-THB', name: 'Thambuttegama Economic Complex', district: District.ANURADHAPURA },
  { id: '65f1a2b3c4d5e6f7a8b90106', code: 'CC-EMB', name: 'Embilipitiya Regional Produce Point', district: District.RATNAPURA },
  { id: '65f1a2b3c4d5e6f7a8b90107', code: 'CC-JAF', name: 'Jaffna Farm Link Depot', district: District.JAFFNA }
];

// Helper to determine closest district from name
function detectDistrictFromName(text: string): District | undefined {
  const upper = text.toUpperCase().replace(/\s+/g, '_');
  for (const d of Object.values(District)) {
    if (upper.includes(d) || upper.includes(d.replace('_', ' '))) {
      return d;
    }
  }
  return undefined;
}

// ============================================================================
// 3. MAIN COMPONENT IMPLEMENTATION
// ============================================================================

export const FarmRegistration: FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);

  // Form Fields
  const [farmId, setFarmId] = useState<string>(() => `FARM-${Math.floor(1000 + Math.random() * 9000)}`);
  const [address, setAddress] = useState<string>('');
  const [district, setDistrict] = useState<District>(District.BADULLA);
  const [province, setProvince] = useState<Province>(DISTRICT_TO_PROVINCE[District.BADULLA]);
  const [latitude, setLatitude] = useState<number>(6.9934);
  const [longitude, setLongitude] = useState<number>(81.0550);
  const [collectionCenterId, setCollectionCenterId] = useState<string>(COLLECTION_CENTERS[1].id);
  const [isActive, setIsActive] = useState<boolean>(true);

  // Map Layer
  const [mapLayer, setMapLayer] = useState<'satellite' | 'street'>('satellite');

  // Google Maps Style Autocomplete Search States
  const [mapSearchText, setMapSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MapSearchResult[]>([]);
  const [isSearchingMap, setIsSearchingMap] = useState<boolean>(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState<boolean>(false);
  const searchDebounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Enrolled Farms Store
  const [farmsList, setFarmsList] = useState<IFarmItem[]>([
    {
      _id: '65f210000000000000000001',
      farmId: 'FARM-4821',
      userId: '65f000000000000000000088',
      address: 'No. 42, Highland Farm Road, Keppetipola',
      district: District.BADULLA,
      province: Province.UVA,
      latitude: 6.9821,
      longitude: 80.9234,
      collectionCenterId: '65f1a2b3c4d5e6f7a8b90102',
      isActive: true
    },
    {
      _id: '65f210000000000000000002',
      farmId: 'FARM-9140',
      userId: '65f000000000000000000088',
      address: 'Pattiya Road, Kandapola Mountain Valley',
      district: District.NUWARA_ELIYA,
      province: Province.CENTRAL,
      latitude: 6.9942,
      longitude: 80.8315,
      collectionCenterId: '65f1a2b3c4d5e6f7a8b90104',
      isActive: true
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Map DOM and Leaflet References
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<any>(null);
  const leafletMarkerRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);

  const triggerToast = (msg: string, type: ToastMessage['type'] = 'success'): void => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3400);
  };

  // Helper to dynamically update map and marker coordinates
  const updateMapPosition = (lat: number, lng: number, zoom?: number) => {
    const fixedLat = Number(lat.toFixed(6));
    const fixedLng = Number(lng.toFixed(6));
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

  // Auto-sync District & Province & pan map
  const handleDistrictChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newDistrict = e.target.value as District;
    setDistrict(newDistrict);
    setProvince(DISTRICT_TO_PROVINCE[newDistrict]);

    // Center map to district coordinates
    const defaultCoords = DISTRICT_COORDINATES[newDistrict];
    if (defaultCoords) {
      updateMapPosition(defaultCoords.lat, defaultCoords.lng, 12);
      triggerToast(`Map centered to ${newDistrict.replace('_', ' ')} district`, 'info');
    }

    // Auto-match collection center
    const matchedCC = COLLECTION_CENTERS.find(c => c.district === newDistrict);
    if (matchedCC) {
      setCollectionCenterId(matchedCC.id);
    }
  };

  // ============================================================================
  // GOOGLE MAPS STYLE SEARCH AUTOCOMPLETE (Local Agrarian Hubs + Live Geocoding)
  // ============================================================================
  const handleMapSearchInput = (val: string) => {
    setMapSearchText(val);

    if (!val.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    setShowSearchDropdown(true);
    const q = val.trim().toLowerCase();

    // 1. Fast match against Sri Lanka agrarian hubs and district centers
    const matchedPresets: MapSearchResult[] = SRI_LANKA_PRESET_PLACES.filter(
      p => p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q)
    );

    // Also match district names directly
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

    // 2. Debounced Live OpenStreetMap Geocoding (Sri Lanka bounded) for village/road search
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
              // Combine presets with live matches, deduplicating by title
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

  // When farmer clicks a search suggestion
  const handleSelectSearchResult = (result: MapSearchResult) => {
    updateMapPosition(result.lat, result.lng, 15);
    setMapSearchText(result.title);
    setShowSearchDropdown(false);

    // Auto-prefill address if not filled
    if (!address.trim()) {
      setAddress(result.title);
    }

    // Auto-detect & sync district/province if present
    if (result.district) {
      setDistrict(result.district);
      setProvince(DISTRICT_TO_PROVINCE[result.district]);
      const matchedCC = COLLECTION_CENTERS.find(c => c.district === result.district);
      if (matchedCC) setCollectionCenterId(matchedCC.id);
      triggerToast(`Pinned to ${result.title} (${result.district})`, 'success');
    } else {
      triggerToast(`Pinned to ${result.title}`, 'success');
    }
  };

  // Load Leaflet JS & CSS dynamically
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
        const map = L.map(mapContainerRef.current, {
          center: [latitude, longitude],
          zoom: 13,
          zoomControl: false,
          attributionControl: false
        });

        // Add custom zoom controls to bottom-right (Google Maps style)
        L.control.zoom({ position: 'bottomright' }).addTo(map);

        const satelliteUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        const streetUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

        const tileLayer = L.tileLayer(mapLayer === 'satellite' ? satelliteUrl : streetUrl, {
          maxZoom: 19,
          subdomains: ['a', 'b', 'c']
        }).addTo(map);

        tileLayerRef.current = tileLayer;

        // Custom Emerald Pin Icon
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

        const marker = L.marker([latitude, longitude], {
          icon: customIcon,
          draggable: true
        }).addTo(map);

        map.on('click', (e: any) => {
          const { lat, lng } = e.latlng;
          updateMapPosition(lat, lng);
          triggerToast(`Farm coordinate auto-pinned: [${lat.toFixed(4)}, ${lng.toFixed(4)}]`, 'info');
        });

        marker.on('dragend', () => {
          const pos = marker.getLatLng();
          updateMapPosition(pos.lat, pos.lng);
          triggerToast(`Marker repositioned: [${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)}]`, 'info');
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

  // Toggle Map Layer Style (Satellite Imagery vs Clean Street Map)
  const toggleMapLayer = () => {
    if (!leafletMapRef.current || !tileLayerRef.current) return;
    const newLayer = mapLayer === 'satellite' ? 'street' : 'satellite';
    setMapLayer(newLayer);

    const satelliteUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    const streetUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    tileLayerRef.current.setUrl(newLayer === 'satellite' ? satelliteUrl : streetUrl);
    triggerToast(`Switched to ${newLayer.toUpperCase()} imagery layer`, 'info');
  };

  // GPS Device Auto-Detection
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
        triggerToast(`Live GPS Acquired: ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`, 'success');
      },
      (err) => {
        console.warn('Geolocation error:', err);
        triggerToast('Could not acquire GPS automatically. Please tap directly on the map to pin your field.', 'error');
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  };

  // Submit & Save Farm
  const handleSubmitFarm = async (e: FormEvent) => {
    e.preventDefault();

    if (!address.trim()) {
      triggerToast('Please provide a valid physical farm address.', 'error');
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 650));

    const payload: IFarmItem = {
      _id: editingId || `farm_doc_${Date.now()}`,
      farmId,
      userId: '65f000000000000000000088',
      address: address.trim(),
      district,
      province,
      latitude,
      longitude,
      collectionCenterId,
      isActive
    };

    if (editingId) {
      setFarmsList((prev) => prev.map((f) => (f._id === editingId ? payload : f)));
      triggerToast(`Farm ${farmId} updated successfully!`, 'success');
      setEditingId(null);
    } else {
      setFarmsList((prev) => [payload, ...prev]);
      triggerToast(`New farm ${farmId} successfully enrolled with GPS coordinates!`, 'success');
    }

    // Reset Form
    setFarmId(`FARM-${Math.floor(1000 + Math.random() * 9000)}`);
    setAddress('');
    setIsSubmitting(false);
  };

  // Edit Farm from Roster
  const handleEditFarm = (item: IFarmItem) => {
    setEditingId(item._id || null);
    setFarmId(item.farmId);
    setAddress(item.address);
    setDistrict(item.district);
    setProvince(item.province);
    setCollectionCenterId(item.collectionCenterId);
    setIsActive(item.isActive);
    updateMapPosition(item.latitude, item.longitude, 15);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    triggerToast(`Editing ${item.farmId}. Map auto-centered.`, 'info');
  };

  // Delete Farm
  const handleDeleteFarm = (id?: string) => {
    if (!id) return;
    setFarmsList((prev) => prev.filter((f) => f._id !== id));
    triggerToast('Farm record removed from registry.', 'info');
  };

  // Search filtered farms
  const filteredFarms = useMemo(() => {
    if (!searchQuery.trim()) return farmsList;
    const query = searchQuery.toLowerCase();
    return farmsList.filter((f) =>
      f.farmId.toLowerCase().includes(query) ||
      f.address.toLowerCase().includes(query) ||
      f.district.toLowerCase().includes(query)
    );
  }, [farmsList, searchQuery]);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'bg-[#090f1d] text-slate-100' : 'bg-slate-50 text-slate-900'} font-sans pb-28`}>
      
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

      
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        isDark ? 'bg-[#0e1628]/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold">
              <SproutIcon size={24} className="stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                  AgriSMART
                </span>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  isDark ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  Farm Registry
                </span>
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} hidden sm:block`}>
                Mongoose IFarm Geospatial Enrollment Portal &bull; Sri Lanka
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-xl border transition-all ${
                isDark 
                  ? 'bg-slate-800/80 border-slate-700 text-amber-400 hover:bg-slate-700' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? <SunIcon size={17} /> : <MoonIcon size={17} />}
            </button>

            <div className={`flex items-center gap-2.5 pl-3 border-l ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                isDark ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700' : 'bg-emerald-100 text-emerald-800'
              }`}>
                <UserIcon size={16} />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold leading-tight">Farmer System User</div>
                <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>UID: #88</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        
        <section className="lg:col-span-7 flex flex-col gap-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Register Farm Location</h1>
            <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Search any Sri Lankan agrarian hub, village, or town—or click directly on the map to pin your field.
            </p>
          </div>

          
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
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all ${
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
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <CrosshairIcon size={14} />
                  <span>Locate My Current Farm</span>
                </button>
              </div>
            </div>

            <div className="relative w-full h-[360px] sm:h-[420px] bg-slate-950 flex items-center justify-center overflow-hidden">
              <div ref={mapContainerRef} className="w-full h-full z-0" />

             
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
                      className="p-1 text-slate-400 hover:text-white transition-colors"
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
                          className={`w-full text-left px-3.5 py-2.5 flex items-start gap-2.5 transition-colors ${
                            isDark ? 'hover:bg-emerald-950/60' : 'hover:bg-emerald-50'
                          }`}
                        >
                          <div className="mt-0.5 p-1 rounded-md bg-emerald-500/20 text-emerald-400 shrink-0">
                            {result.isPreset ? <SproutIcon size={13} /> : <MapPinIcon size={13} />}
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
                  <span className="font-mono font-bold text-emerald-400">{latitude.toFixed(6)}° N</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 font-medium">Longitude:</span>
                  <span className="font-mono font-bold text-emerald-400">{longitude.toFixed(6)}° E</span>
                </div>
              </div>
            </div>
          </div>

          
          <form onSubmit={handleSubmitFarm} className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-dashed border-slate-700/50">
              <SlidersHorizontalIcon size={16} className="text-emerald-500" />
              <span className="font-semibold text-sm">Farm Schema Attributes</span>
              {editingId && (
                <span className="ml-auto text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Edit Mode
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
                  Collection Center (collectionCenterId)
                </label>
                <select
                  value={collectionCenterId}
                  onChange={(e) => setCollectionCenterId(e.target.value)}
                  className={`w-full text-xs sm:text-sm p-2.5 rounded-xl border focus:outline-none transition-all ${
                    isDark ? 'bg-slate-800/90 border-slate-700 text-slate-100 font-medium' : 'bg-slate-50 border-slate-200 text-slate-800 font-medium'
                  }`}
                >
                  {COLLECTION_CENTERS.map((c) => (
                    <option key={c.id} value={c.id}>
                      [{c.code}] {c.name}
                    </option>
                  ))}
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
                [{latitude.toFixed(6)}, {longitude.toFixed(6)}]
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
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setFarmId(`FARM-${Math.floor(1000 + Math.random() * 9000)}`);
                      setAddress('');
                    }}
                    className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving Farm...</span>
                    </>
                  ) : (
                    <>
                      <CheckIcon size={16} />
                      <span>{editingId ? 'Update Farm Record' : 'Save & Register Farm'}</span>
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
                  <h2 className="font-bold text-base leading-tight">Enrolled Farms</h2>
                  <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {farmsList.length} Registered Land Holding{farmsList.length === 1 ? '' : 's'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2Icon size={14} />
                <span>SYNCED</span>
              </div>
            </div>

           
            <div className="p-3 border-b border-slate-800">
              <div className="relative">
                <SearchIcon size={15} className={`absolute left-3 top-2.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <input
                  type="text"
                  placeholder="Filter farms by ID or district..."
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
                  No farm records matching search filter.
                </div>
              ) : (
                filteredFarms.map((f) => (
                  <div
                    key={f._id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      editingId === f._id
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
                        <div className="flex items-center gap-1.5 text-[11px] text-emerald-400/90 font-mono mt-2">
                          <MapPinIcon size={13} />
                          <span>{f.latitude.toFixed(4)}° N, {f.longitude.toFixed(4)}° E</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleEditFarm(f)}
                          className={`p-1.5 rounded-lg text-xs transition-colors ${
                            isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-200'
                          }`}
                          title="Center on map & edit"
                        >
                          <Edit2Icon size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteFarm(f._id)}
                          className={`p-1.5 rounded-lg text-xs transition-colors ${
                            isDark ? 'text-slate-400 hover:text-rose-400 hover:bg-rose-950/40' : 'text-slate-500 hover:bg-rose-50'
                          }`}
                          title="Remove farm"
                        >
                          <Trash2Icon size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

           
            <div className={`p-4 border-t text-xs flex items-center justify-between ${
              isDark ? 'bg-slate-800/30 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <span>Enrolled Land Holdings: {farmsList.length}</span>
              <span>GPS Validation: 100% Captured</span>
            </div>
          </div>
        </section>
      </main>

       
      <div className="fixed bottom-4 inset-x-0 flex justify-center z-40 pointer-events-none px-4">
        <nav className={`pointer-events-auto rounded-full border shadow-2xl backdrop-blur-lg px-3 py-1.5 flex items-center gap-1 sm:gap-2 transition-all ${
          isDark 
            ? 'bg-slate-900/90 border-slate-700/80 shadow-black/60' 
            : 'bg-white/95 border-slate-200 shadow-slate-300/60'
        }`}>
          <button type="button" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-900'
          }`}>
            <MapIcon size={15} />
            <span className="hidden sm:inline">Overview</span>
          </button>

          <button type="button" className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
            <SproutIcon size={15} />
            <span>Farm Registry</span>
          </button>

          <button type="button" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-900'
          }`}>
            <WarehouseIcon size={15} />
            <span className="hidden sm:inline">Collection Centers</span>
          </button>

          <button type="button" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-900'
          }`}>
            <UserIcon size={15} />
            <span className="hidden sm:inline">Profile</span>
          </button>
        </nav>
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