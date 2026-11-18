import React, { useState, useEffect, useRef, useMemo, type FC, type SVGProps, type ChangeEvent, type FormEvent } from 'react';
import '../CollectionCenter.css';
import api from '../service/api';


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

export const WarehouseIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z" />
    <path d="M6 18h12" />
    <path d="M6 14h12" />
    <rect width="12" height="12" x="6" y="10" />
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

export const MapPinIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </BaseIcon>
);

export const CrosshairIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <line x1="22" x2="18" y1="12" y2="12" />
    <line x1="6" x2="2" y1="12" y2="12" />
    <line x1="12" x2="12" y1="6" y2="2" />
    <line x1="12" x2="12" y1="22" y2="18" />
  </BaseIcon>
);

export const MapIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" x2="9" y1="3" y2="18" />
    <line x1="15" x2="15" y1="6" y2="21" />
  </BaseIcon>
);

export const CompassIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
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


export const SeedlingHarvestIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
    <path d="M12 20V10" />
    <path d="M12 14c-3-3-3-7 0-9" />
    <path d="M12 14c-1-4-5-4-7-2 1 4 4 6 7 2z" />
  </BaseIcon>
);

export const OrderChecklistIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="m9 14 2 2 4-4" />
  </BaseIcon>
);

export const PriceTagTrendIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path d="M7 7h.01" />
  </BaseIcon>
);

export const PrecisionGearsIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </BaseIcon>
);

export const SeedlingAllocationIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
    <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
  </BaseIcon>
);

export const FarmerPromiseIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
    <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
    <path d="m2 16 6 6" />
    <circle cx="16" cy="9" r="2.9" />
    <circle cx="6" cy="5" r="3" />
  </BaseIcon>
);

export const HarvestTransferIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M8 3 4 7l4 4" />
    <path d="M4 7h16" />
    <path d="m16 21 4-4-4-4" />
    <path d="M20 17H4" />
  </BaseIcon>
);

export const FarmBarnIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M3 10.5 12 4l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5Z" />
    <path d="M9 21v-7h6v7" />
    <path d="m9 14 6 7" />
    <path d="m15 14-6 7" />
  </BaseIcon>
);

export const StoreFrontIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
  </BaseIcon>
);

export const UsersGroupIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </BaseIcon>
);

export const CargoTruckIcon: FC<IconProps> = (p) => (
  <BaseIcon {...p}>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </BaseIcon>
);

export const SettingsGearIcon: FC<IconProps> = (p) => (
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

export interface ICollectionCenterStockItem {
  _id?: string;
  centerId: string;
  address: string;
  district: District;
  province: Province;
  latitude: number;
  longitude: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
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

export const DISTRICT_TO_PROVINCE: Record<District, Province> = {
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

export const DISTRICT_COORDINATES: Record<District, { lat: number; lng: number }> = {
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

export const SRI_LANKA_PRESET_PLACES: MapSearchResult[] = [
  { title: 'Dambulla Dedicated Economic Centre', subtitle: 'Matale District, Central Province', lat: 7.8601, lng: 80.6517, district: District.MATALE, isPreset: true },
  { title: 'Keppetipola Agro Logistic Center', subtitle: 'Badulla District, Uva Province', lat: 6.9821, lng: 80.9234, district: District.BADULLA, isPreset: true },
  { title: 'Meegoda Agrarian Collection Terminal', subtitle: 'Colombo District, Western Province', lat: 6.8436, lng: 80.0531, district: District.COLOMBO, isPreset: true },
  { title: 'Nuwara Eliya Cold Chain Center', subtitle: 'Nuwara Eliya District, Central Province', lat: 6.9712, lng: 80.7712, district: District.NUWARA_ELIYA, isPreset: true },
  { title: 'Thambuttegama Economic Complex', subtitle: 'Anuradhapura District, North Central', lat: 8.1564, lng: 80.2974, district: District.ANURADHAPURA, isPreset: true },
  { title: 'Embilipitiya Regional Produce Point', subtitle: 'Ratnapura District, Sabaragamuwa Province', lat: 6.3421, lng: 80.8524, district: District.RATNAPURA, isPreset: true },
  { title: 'Jaffna Farm Link Depot', subtitle: 'Jaffna District, Northern Province', lat: 9.6645, lng: 80.0167, district: District.JAFFNA, isPreset: true },
  { title: 'Kandy Central Produce Hub', subtitle: 'Kandy District, Central Province', lat: 7.2915, lng: 80.6342, district: District.KANDY, isPreset: true },
  { title: 'Kurunegala Grain & Stock Terminal', subtitle: 'Kurunegala District, North Western', lat: 7.4863, lng: 80.3623, district: District.KURUNEGALA, isPreset: true },
];

export function detectDistrictFromName(text: string): District | undefined {
  const upper = text.toUpperCase().replace(/\s+/g, '_');
  for (const d of Object.values(District)) {
    if (upper.includes(d) || upper.includes(d.replace('_', ' '))) {
      return d;
    }
  }
  return undefined;
}

export interface CurrentUserProfile {
  name?: string;
  role?: string;
  initials?: string;
}

export interface CollectionCenterRegistrationProps {
  currentUser?: CurrentUserProfile;
}


export const CollectionCenterRegistration: FC<CollectionCenterRegistrationProps> = ({ currentUser }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ranpolowa_theme_preference');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

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

  // Form Fields State
  const [centerId, setCenterId] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [district, setDistrict] = useState<District>(District.COLOMBO);
  const [province, setProvince] = useState<Province>(DISTRICT_TO_PROVINCE[District.COLOMBO]);
  const [latitude, setLatitude] = useState<number>(DISTRICT_COORDINATES[District.COLOMBO].lat);
  const [longitude, setLongitude] = useState<number>(DISTRICT_COORDINATES[District.COLOMBO].lng);
  const [isActive, setIsActive] = useState<boolean>(true);

  // Map layer toggle
  const [mapLayer, setMapLayer] = useState<'street' | 'satellite'>('street');

  // Search autocomplete states
  const [mapSearchText, setMapSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MapSearchResult[]>([]);
  const [isSearchingMap, setIsSearchingMap] = useState<boolean>(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState<boolean>(false);
  const searchDebounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Centers Roster & Loading State
  const [centersList, setCentersList] = useState<ICollectionCenterStockItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchRosterQuery, setSearchRosterQuery] = useState<string>('');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<any>(null);
  const leafletMarkerRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);

  // Fetch Centers from Backend API 
  const fetchCenters = async () => {
    try {
      setLoading(true);
      const res = await api.get('/collection-centers');
      const items = Array.isArray(res.data?.data) ? res.data.data : [];
      setCentersList(items);
    } catch (err: any) {
      console.error('Failed to fetch collection centers:', err);
      setCentersList([]);
      triggerToast(' Failed to load collection centers from server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isDark) {
        document.documentElement.classList.add('dark-theme');
        document.body.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
        document.body.classList.remove('dark-theme');
      }
      localStorage.setItem('ranpolowa_theme_preference', isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const triggerToast = (msg: string, type: ToastMessage['type'] = 'success'): void => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const updateMapPosition = (lat: number, lng: number, zoom?: number) => {
    const safeLat = typeof lat === 'number' && !isNaN(lat) ? lat : 6.9271;
    const safeLng = typeof lng === 'number' && !isNaN(lng) ? lng : 79.8612;

    const fixedLat = Number(safeLat.toFixed(6));
    const fixedLng = Number(safeLng.toFixed(6));
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
          title: `${distName.replace('_', ' ')} Agrarian Zone`,
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
          console.warn('Geocoding search error:', err);
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

    const initLeafletMap = () => {
      if (!mapContainerRef.current || !(window as any).L || leafletMapRef.current) return;
      const L = (window as any).L;

      try {
        if ((mapContainerRef.current as any)._leaflet_id) {
          (mapContainerRef.current as any)._leaflet_id = null;
        }

        const map = L.map(mapContainerRef.current, {
          center: [latitude ?? 6.9271, longitude ?? 79.8612],
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

        const customCenterIcon = L.divIcon({
          className: 'custom-center-marker',
          html: `
            <div style="position:relative; width:38px; height:38px; display:flex; align-items:center; justify-content:center;">
              <span style="position:absolute; width:36px; height:36px; border-radius:50%; background:rgba(251, 191, 36, 0.45); animation:pulsePin 2s infinite;"></span>
              <div style="position:relative; width:30px; height:30px; border-radius:50%; background:#241604; border:2px solid #fbbf24; display:flex; align-items:center; justify-content:center; box-shadow:0 0 16px rgba(251,191,36,0.8);">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/>
                  <path d="M6 18h12"/>
                  <path d="M6 14h12"/>
                </svg>
              </div>
            </div>
          `,
          iconSize: [38, 38],
          iconAnchor: [19, 34]
        });

        const marker = L.marker([latitude ?? 6.9271, longitude ?? 79.8612], {
          icon: customCenterIcon,
          draggable: true
        }).addTo(map);

        map.on('click', (e: any) => {
          const { lat, lng } = e.latlng;
          updateMapPosition(lat, lng);
          triggerToast(`Center coordinates auto-pinned: [${lat.toFixed(4)}, ${lng.toFixed(4)}]`, 'info');
        });

        marker.on('dragend', () => {
          const pos = marker.getLatLng();
          updateMapPosition(pos.lat, pos.lng);
          triggerToast(`Center marker repositioned: [${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)}]`, 'info');
        });

        leafletMapRef.current = map;
        leafletMarkerRef.current = marker;
      } catch (err) {
        console.error('Error initializing collection center map:', err);
      }
    };

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

    triggerToast('Detecting current collection center GPS position...', 'info');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        updateMapPosition(lat, lng, 16);
        triggerToast(`GPS Located: ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`, 'success');
      },
      (err) => {
        console.warn('Geolocation error:', err);
        triggerToast('Could not acquire GPS. Click or drag the marker on the map directly.', 'error');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setCenterId('');
    setAddress('');
    setDistrict(District.COLOMBO);
    setProvince(DISTRICT_TO_PROVINCE[District.COLOMBO]);
    setLatitude(DISTRICT_COORDINATES[District.COLOMBO].lat);
    setLongitude(DISTRICT_COORDINATES[District.COLOMBO].lng);
    setIsActive(true);
  };

  
  const handleSubmitCenter = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedCenterId = centerId.trim();
    if (!trimmedCenterId) {
      triggerToast('Please provide a Center Identifier (centerId).', 'error');
      return;
    }

    const trimmedAddress = address.trim();
    if (!trimmedAddress) {
      triggerToast('Please provide an address for the collection center.', 'error');
      return;
    }

    const payload = {
      centerId: trimmedCenterId,
      address: trimmedAddress,
      district,
      province,
      latitude: latitude ?? 0,
      longitude: longitude ?? 0,
      isActive
    };

    try {
      if (editingId) {
        await api.put(`/collection-centers/${editingId}`, payload);
        triggerToast(`Collection Center "${trimmedCenterId}" updated successfully!`, 'success');
      } else {
        await api.post('/collection-centers', payload);
        triggerToast(`New Collection Center "${trimmedCenterId}" enrolled successfully!`, 'success');
      }

      fetchCenters();
      handleCancelEdit();
    } catch (err: any) {
      console.error('Failed to save center:', err);
      const msg = err.response?.data?.message || 'Failed to save collection center.';
      triggerToast(` ${msg}`, 'error');
    }
  };

  const handleEditCenter = (item: ICollectionCenterStockItem) => {
    setEditingId(item._id || null);
    setCenterId(item.centerId);
    setAddress(item.address);
    setDistrict(item.district);
    setProvince(item.province);
    setIsActive(item.isActive);
    updateMapPosition(item.latitude ?? 6.9271, item.longitude ?? 79.8612, 16);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    triggerToast(`Editing Collection Center "${item.centerId}". Map auto-centered.`, 'info');
  };

  // Delete Collection Center 
  const handleDeleteCenter = async (id?: string) => {
    if (!id) return;
    const target = centersList.find(c => c._id === id);
    if (!target) return;

    if (window.confirm(`Are you sure you want to delete center "${target.centerId}"?`)) {
      try {
        await api.delete(`/collection-centers/${id}`);
        if (editingId === id) handleCancelEdit();
        fetchCenters();
        triggerToast('Collection Center record removed.', 'info');
      } catch (err: any) {
        console.error('Failed to delete center:', err);
        triggerToast(' Failed to delete collection center.', 'error');
      }
    }
  };


  const handleToggleCenterActive = async (id?: string) => {
    if (!id) return;
    const target = centersList.find(c => c._id === id);
    if (!target) return;

    try {
      const res = await api.patch(`/collection-centers/${id}/status`);
      const nextActive = res.data?.data?.isActive ?? !target.isActive;

      setCentersList(prev =>
        prev.map(c => (c._id === id ? { ...c, isActive: nextActive } : c))
      );

      triggerToast(
        `Center "${target.centerId}" is now ${nextActive ? 'ACTIVE' : 'INACTIVE'}`,
        nextActive ? 'success' : 'info'
      );
    } catch (err: any) {
      console.error('Failed to toggle status:', err);
      triggerToast(' Failed to toggle center status.', 'error');
    }
  };

  const filteredCenters = useMemo(() => {
    if (!Array.isArray(centersList)) return [];
    if (!searchRosterQuery.trim()) return centersList;
    const q = searchRosterQuery.toLowerCase();
    return centersList.filter(c =>
      (c.centerId && c.centerId.toLowerCase().includes(q)) ||
      (c.address && c.address.toLowerCase().includes(q)) ||
      (c.district && c.district.toLowerCase().includes(q))
    );
  }, [centersList, searchRosterQuery]);

  const totalCentersCount = Array.isArray(centersList) ? centersList.length : 0;
  const activeCentersCount = useMemo(() => Array.isArray(centersList) ? centersList.filter(c => c.isActive).length : 0, [centersList]);
  const districtsCount = useMemo(() => Array.isArray(centersList) ? new Set(centersList.map(c => c.district)).size : 0, [centersList]);
  const provincesCount = useMemo(() => Array.isArray(centersList) ? new Set(centersList.map(c => c.province)).size : 0, [centersList]);

  const profileName = userState?.name || currentUser?.name || 'Terminal Supervisor';
  const profileRole = userState?.role || currentUser?.role || 'ROLE: INTAKE & HUBS';
  const profileInitials = userState?.initials || currentUser?.initials || (profileName ? profileName.slice(0, 2).toUpperCase() : 'TS');

  return (
    <div className={`collection-page-root ${isDark ? 'dark-theme' : ''}`}>
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
          <a href="/user" className="brand-logo" title="රන් පොළොව Collection Centers">
            <div className="logo-sprout-icon">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 30C18 30 14 20 6 18C6 10 14 6 18 14" fill="#32b849" />
                <path d="M18 30C18 30 14 20 6 18C6 10 14 6 18 14" stroke="#1f8b32" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M18 30C18 30 22 17 30 14C30 7 21 4 18 14" fill="#46d35f" />
                <path d="M18 30C18 30 22 17 30 14C30 7 21 4 18 14" stroke="#229a37" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M18 14V33" stroke="#1a6e29" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
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

            <div className="user-profile-menu" ref={profileMenuRef}>
              <button
                type="button"
                className="user-profile-btn"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-expanded={isProfileOpen}
              >
                <div className="user-avatar-circle">
                  <span>{profileInitials}</span>
                  <span className="user-status-dot" />
                </div>
                <span className="user-profile-name">{profileName}</span>
                <ChevronDownIcon size={14} />
              </button>

              <div className={`profile-dropdown ${isProfileOpen ? 'show' : ''}`}>
                <div className="dropdown-header">
                  <div className="dropdown-title">{profileName}</div>
                  <div className="dropdown-subtitle">{profileRole}</div>
                </div>
                <a href="/user" className="dropdown-link">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                  Owner Dashboard
                </a>
                <a href="/farmer-harvest" className="dropdown-link">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                  Farm Operations
                </a>
                <a href="/stores" className="dropdown-link">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  Store Dashboard
                </a>
                <a href="/allocation" className="dropdown-link">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  Quota Allocations
                </a>
                <a href="/pre-order" className="dropdown-link">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Store Pre-Orders
                </a>
                <div className="dropdown-divider" />
                <a href="/login" className="dropdown-link" style={{ color: '#f43f5e' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="page-hero-banner">
        <div className="hero-flex-wrap">
          <div>
            
            <h1 className="page-title">
              Agrarian Intake & <span>Collection Centers</span>
            </h1>
            <p className="page-subtitle">
              Locate, pin, and administer certified agricultural collection terminals where registered farmers deliver harvest produce for grading and cold-storage distribution.
            </p>
          </div>

          <div className="hero-nav-actions">
            <a href="/user" className="hero-pill-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Owner Dashboard</span>
            </a>
            <a href="/farmer-harvest" className="hero-pill-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              <span>Farm Operations</span>
            </a>
          </div>
        </div>
      </section>

 
      <section className="kpi-section">
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Total Centers</span>
              <div className="kpi-icon-badge" style={{ background: 'rgba(245, 158, 11, 0.14)', color: '#d97706' }}>
                <WarehouseIcon size={18} />
              </div>
            </div>
            <div className="kpi-value">{totalCentersCount}</div>
            <div className="kpi-subtext">Registered agrarian intake hubs</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Active Hubs</span>
              <div className="kpi-icon-badge" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>
                <span className="ping-dot" />
              </div>
            </div>
            <div className="kpi-value" style={{ color: '#22c55e' }}>{activeCentersCount}</div>
            <div className="kpi-subtext">Receiving farm produce currently</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Districts Covered</span>
              <div className="kpi-icon-badge" style={{ background: 'rgba(56, 189, 248, 0.14)', color: '#0284c7' }}>
                <MapPinIcon size={18} />
              </div>
            </div>
            <div className="kpi-value" style={{ color: '#38bdf8' }}>{districtsCount} / 25</div>
            <div className="kpi-subtext">Agrarian district nodes connected</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">Province Networks</span>
              <div className="kpi-icon-badge" style={{ background: 'rgba(168, 85, 247, 0.14)', color: '#9333ea' }}>
                <LayersIcon size={18} />
              </div>
            </div>
            <div className="kpi-value" style={{ color: '#a855f7' }}>{provincesCount} / 9</div>
            <div className="kpi-subtext">Provincial supply-chain chains</div>
          </div>
        </div>
      </section>

    
      <section className="workspace-section">
        <div className="workspace-grid">
          <div className="left-column">
            <div className="map-card">
              <div className="map-toolbar">
                <div className="map-toolbar-left">
                  <MapIcon size={16} style={{ color: '#f59e0b' }} />
                  <span>Interactive Map &bull; Click or Drag Pin to Set Coordinates</span>
                </div>

                <div className="map-toolbar-right">
                  <button
                    type="button"
                    onClick={toggleMapLayer}
                    className="map-action-btn"
                    title="Toggle Satellite / Street View"
                  >
                    <LayersIcon size={14} />
                    <span>{mapLayer === 'satellite' ? 'Satellite View' : 'Street Map'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLocateMe}
                    className="map-action-btn locate-btn"
                    title="Use Device GPS"
                  >
                    <CrosshairIcon size={14} />
                    <span>Locate Terminal</span>
                  </button>
                </div>
              </div>

              <div className="map-frame-wrapper">
                <div ref={mapContainerRef} className="leaflet-map-element" />

                <div className="floating-map-search">
                  <div className="floating-search-bar">
                    <SearchIcon size={17} style={{ color: '#f59e0b', flexShrink: 0 }} />
                    <input
                      type="text"
                      placeholder="Search economic center, market hub, town..."
                      value={mapSearchText}
                      onFocus={() => {
                        if (mapSearchText.trim()) setShowSearchDropdown(true);
                      }}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleMapSearchInput(e.target.value)}
                      className="floating-search-input"
                    />

                    {isSearchingMap && <div className="search-spinner" />}

                    {mapSearchText && !isSearchingMap && (
                      <button
                        type="button"
                        onClick={() => {
                          setMapSearchText('');
                          setSearchResults([]);
                          setShowSearchDropdown(false);
                        }}
                        className="search-clear-btn"
                        title="Clear search"
                      >
                        <XIcon size={15} />
                      </button>
                    )}
                  </div>

                  {showSearchDropdown && (
                    <div className="floating-results-dropdown">
                      {searchResults.length === 0 ? (
                        <div className="search-empty-state">
                          {isSearchingMap ? 'Searching agrarian hubs in Sri Lanka...' : `No matching location for "${mapSearchText}"`}
                        </div>
                      ) : (
                        searchResults.map((result, idx) => (
                          <button
                            key={`${result.title}-${idx}`}
                            type="button"
                            onClick={() => handleSelectSearchResult(result)}
                            className="search-result-row"
                          >
                            <div className="search-result-icon">
                              <WarehouseIcon size={13} />
                            </div>
                            <div className="search-result-info">
                              <div className="search-result-title">
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {result.title}
                                </span>
                                {result.district && (
                                  <span className="search-result-badge">{result.district}</span>
                                )}
                              </div>
                              <div className="search-result-subtitle">
                                {result.subtitle}
                              </div>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>

                <div className="coordinates-hud">
                  <div className="hud-item">
                    <MapPinIcon size={14} style={{ color: '#fbbf24' }} />
                    <span>LAT:</span>
                    <span className="hud-val">{(latitude ?? 0).toFixed(6)}° N</span>
                  </div>
                  <div className="hud-item">
                    <span>LNG:</span>
                    <span className="hud-val">{(longitude ?? 0).toFixed(6)}° E</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Form Card */}
            <form onSubmit={handleSubmitCenter} className="center-form-card">
              <div className="form-header-bar">
                <div className="form-header-left">
                  <SlidersHorizontalIcon size={16} style={{ color: '#f59e0b' }} />
                  <span>ICollectionCenterStock Schema Attributes</span>
                </div>
                {editingId && (
                  <span className="editing-mode-pill">
                    Editing: {centerId}
                  </span>
                )}
              </div>

              {/* centerId */}
              <div className="form-field-group">
                <label className="form-label">
                  <span>Center Identifier (centerId)</span>
                  <span className="form-label-tag">Unique Hub Key</span>
                </label>
                <input
                  type="text"
                  value={centerId}
                  onChange={(e) => setCenterId(e.target.value)}
                  required
                  className="form-input font-mono"
                  placeholder="e.g. CC-DMB-01"
                />
              </div>

              {/* address */}
              <div className="form-field-group">
                <label className="form-label">
                  <span>Physical Terminal Address (address)</span>
                  <span className="form-label-tag">Delivery Point</span>
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  placeholder="e.g. Dedicated Economic Centre Premises, Dambulla"
                  className="form-input"
                />
              </div>

              {/* district & province */}
              <div className="form-two-col">
                <div className="form-field-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">
                    <span>District (district)</span>
                    <span className="form-label-tag" style={{ color: '#f59e0b' }}>Auto-pans Map</span>
                  </label>
                  <select
                    value={district}
                    onChange={handleDistrictChange}
                    className="form-select"
                  >
                    {Object.values(District).map((d) => (
                      <option key={d} value={d}>
                        {d.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">
                    <span>Province (province)</span>
                    <span className="form-label-tag">Auto-Mapped</span>
                  </label>
                  <input
                    type="text"
                    value={province}
                    disabled
                    className="form-input"
                    style={{ fontWeight: 700, color: '#f59e0b' }}
                  />
                </div>
              </div>

              {/* Location Readout */}
              <div className="geo-readout-box">
                <div className="geo-readout-left">
                  <CompassIcon size={15} style={{ color: '#f59e0b' }} />
                  <span>Terminal Geo-Location (latitude, longitude):</span>
                </div>
                <div className="geo-readout-coords">
                  [{(latitude ?? 0).toFixed(6)}, {(longitude ?? 0).toFixed(6)}]
                </div>
              </div>

              {/* isActive & Actions */}
              <div className="form-footer-actions">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                  <span>Active Intake Operations (isActive)</span>
                </label>

                <div className="form-btn-group">
                  {editingId && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="cancel-edit-btn"
                    >
                      Cancel
                    </button>
                  )}

                  <button type="submit" className="submit-center-btn">
                    <CheckIcon size={16} />
                    <span>{editingId ? 'Update Center Hub' : 'Save & Register Center'}</span>
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
                    <WarehouseIcon size={20} />
                  </div>
                  <div>
                    <h2 className="roster-title">Registered Hubs</h2>
                    <span className="roster-subtitle">
                      {totalCentersCount} Active Intake Terminal{totalCentersCount === 1 ? '' : 's'}
                    </span>
                  </div>
                </div>

                <div className="roster-online-pill">
                  <CheckCircle2Icon size={13} />
                  <span>ONLINE</span>
                </div>
              </div>

              <div className="roster-search-bar">
                <SearchIcon size={15} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Filter hubs by ID, address, or district..."
                  value={searchRosterQuery}
                  onChange={(e) => setSearchRosterQuery(e.target.value)}
                  className="roster-filter-input"
                />
              </div>

              <div className="roster-list-scroll">
                {loading ? (
                  <div style={{ padding: '36px 16px', textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
                    Loading collection centers from server...
                  </div>
                ) : filteredCenters.length === 0 ? (
                  <div style={{ padding: '36px 16px', textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
                    {searchRosterQuery.trim()
                      ? `No collection center records matching query "${searchRosterQuery}".`
                      : 'No collection center records registered yet. Use the map and registration form to enroll an intake hub.'}
                  </div>
                ) : (
                  filteredCenters.map((c) => (
                    <div
                      key={c._id || c.centerId}
                      className={`center-item-card ${editingId === c._id ? 'is-editing' : ''}`}
                    >
                      <div className="center-item-content">
                        <div className="center-item-header">
                          <span className="center-id-badge">{c.centerId}</span>
                          <span
                            onClick={() => handleToggleCenterActive(c._id)}
                            style={{ cursor: 'pointer' }}
                            title="Click to toggle active status"
                            className={`center-status-badge ${c.isActive ? 'active' : 'inactive'}`}
                          >
                            {c.isActive ? 'ACTIVE' : 'INACTIVE'}
                          </span>
                        </div>
                        <p className="center-address-text">{c.address}</p>
                        <div className="center-meta-row">
                          <span className="district-pill">{c.district}</span>
                          <span>&bull;</span>
                          <span>{c.province}</span>
                        </div>
                        <div className="center-coords-row">
                          <MapPinIcon size={13} style={{ color: '#f59e0b' }} />
                          <span>
                            {(c.latitude ?? 0).toFixed(4)}° N, {(c.longitude ?? 0).toFixed(4)}° E
                          </span>
                        </div>
                      </div>

                      <div className="center-item-actions">
                        <button
                          type="button"
                          onClick={() => handleEditCenter(c)}
                          className="item-action-icon-btn"
                          title="Center on map & edit details"
                        >
                          <Edit2Icon size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCenter(c._id)}
                          className="item-action-icon-btn delete-btn"
                          title="Remove collection hub record"
                        >
                          <Trash2Icon size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="roster-footer">
                <span>Enrolled Hubs: {totalCentersCount}</span>
                <span>Coordinates Validated: 100% Pinned</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    
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
        <div className={`toast-notice ${toast.type}`}>
          <CheckCircle2Icon size={16} />
          <span>{toast.msg}</span>
        </div>
      )}

      
      <footer className="base-dark-footer">
        <div className="footer-left">
          <div className="logo-sprout-icon" style={{ width: 24, height: 24 }}>
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 30C18 30 14 20 6 18C6 10 14 6 18 14" fill="#32b849" />
              <path d="M18 30C18 30 22 17 30 14C30 7 21 4 18 14" fill="#46d35f" />
              <path d="M18 14V33" stroke="#1a6e29" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="footer-brand">රන් පොළොව &bull; Agri SMART Ecosystem</span>
        </div>
        <div className="footer-right">
          <a href="/user" className="footer-link">Owner Dashboard</a>
          <a href="/farmer-harvest" className="footer-link">Farm Operations</a>
          <a href="/stores" className="footer-link">Store Inventory</a>
          <a href="/pre-order" className="footer-link">Pre-Orders</a>
        </div>
      </footer>
    </div>
  );
};

export default CollectionCenterRegistration;