import React, { useState, useEffect, useRef, useMemo, type FC } from 'react';
import {
  Sprout,
  Sun,
  Moon,
  User,
  Search,
  X,
  Video,
  VideoOff,
  FlipHorizontal,
  Plus,
  Minus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  Lock,
  RotateCcw,
  SlidersHorizontal,
  AlertCircle,
  LayoutDashboard,
  Package,
  ClipboardList,
  Warehouse,
  Check,
  Send,
  Info,
  Calendar,
  Award,
  Tractor
} from 'lucide-react';

// ============================================================================
// TypeScript Types & Domain Interfaces
// ============================================================================

export type BatchStatusType = 'DRAFT' | 'COMMITTED' | 'CANCELLED';

export const BatchStatus = {
  DRAFT: 'DRAFT' as BatchStatusType,
  COMMITTED: 'COMMITTED' as BatchStatusType,
  CANCELLED: 'CANCELLED' as BatchStatusType
} as const;

export type ProduceGrade = 'Grade A (Premium)' | 'Grade B (Standard)' | 'Organic Certified';

export interface ProduceCatalogItem {
  id: string;
  name: string;
  unit: string;
  defaultGrade: ProduceGrade;
}

export interface HarvestBatchItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  unit: string;
  grade: ProduceGrade;
  harvestDate: string;
}

export type FacingMode = 'environment' | 'user';

export interface ToastMessage {
  msg: string;
  type: 'success' | 'error' | 'info';
}

// Sri Lanka Farm Produce Catalog
const PRODUCE_CATALOG: ProduceCatalogItem[] = [
  { id: 'prod-tom', name: 'Tomato (Keppetipola Fresh)', unit: 'kg', defaultGrade: 'Grade A (Premium)' },
  { id: 'prod-car', name: 'Nuwara Eliya Premium Carrots', unit: 'kg', defaultGrade: 'Grade A (Premium)' },
  { id: 'prod-gbn', name: 'Upcountry Green Beans', unit: 'kg', defaultGrade: 'Grade A (Premium)' },
  { id: 'prod-cab', name: 'Crisp Green Cabbage', unit: 'kg', defaultGrade: 'Grade B (Standard)' },
  { id: 'prod-pot', name: 'Jaffna Red Star Potatoes', unit: 'kg', defaultGrade: 'Grade A (Premium)' },
  { id: 'prod-oni', name: 'Dambulla Local Red Onions', unit: 'kg', defaultGrade: 'Grade B (Standard)' },
  { id: 'prod-ban', name: 'Ambul Bananas (Mature Bunches)', unit: 'kg', defaultGrade: 'Grade A (Premium)' },
  { id: 'prod-pap', name: 'Red Lady Papaya (Ripe/Semi-Ripe)', unit: 'kg', defaultGrade: 'Grade A (Premium)' },
  { id: 'prod-chi', name: 'Green Chillies (Hot Fresh)', unit: 'kg', defaultGrade: 'Grade A (Premium)' },
];

export const FarmerHarvest: FC = () => {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(true);

  // Produce Search & Form selections
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProduceCatalogItem>(PRODUCE_CATALOG[0]);
  const [selectedGrade, setSelectedGrade] = useState<ProduceGrade>('Grade A (Premium)');
  const [harvestDate, setHarvestDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [qtyInput, setQtyInput] = useState<number | ''>(50);
  const [qtyError, setQtyError] = useState<string>('');

  // Harvest Batch Items
  const [harvestItems, setHarvestItems] = useState<HarvestBatchItem[]>([
    {
      id: 'harv-1',
      productId: 'prod-tom',
      name: 'Tomato (Keppetipola Fresh)',
      quantity: 120,
      unit: 'kg',
      grade: 'Grade A (Premium)',
      harvestDate: new Date().toISOString().split('T')[0]
    },
    {
      id: 'harv-2',
      productId: 'prod-car',
      name: 'Nuwara Eliya Premium Carrots',
      quantity: 75,
      unit: 'kg',
      grade: 'Grade A (Premium)',
      harvestDate: new Date().toISOString().split('T')[0]
    }
  ]);
  const [batchStatus, setBatchStatus] = useState<BatchStatusType>(BatchStatus.DRAFT);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Inline edit state
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editQtyValue, setEditQtyValue] = useState<number | string>(1);
  const [editGradeValue, setEditGradeValue] = useState<ProduceGrade>('Grade A (Premium)');
  const [editQtyError, setEditQtyError] = useState<string>('');

  // Camera State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<FacingMode>('environment');
  const [hasMultipleCameras, setHasMultipleCameras] = useState<boolean>(false);

  // Toast Notification state
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Check camera hardware
  useEffect(() => {
    async function checkDevices(): Promise<void> {
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        try {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const videoInputs = devices.filter(d => d.kind === 'videoinput');
          if (videoInputs.length > 1) {
            setHasMultipleCameras(true);
          }
        } catch {
          // ignore device enumeration errors
        }
      }
    }
    checkDevices();
  }, []);

  const stopCamera = (): void => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const startCamera = async (targetFacing: FacingMode = facingMode): Promise<void> => {
    setCameraError(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera API not accessible in this context. Run via HTTPS or localhost.');
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
    } catch (err: unknown) {
      console.error('Camera stream error:', err);
      let errorMsg = 'Could not access camera feed.';
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          errorMsg = 'Camera permission was denied. Please update browser permissions.';
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          errorMsg = 'No video capture hardware detected on this device.';
        } else if (err.name === 'NotReadableError') {
          errorMsg = 'Camera hardware is currently in use by another app.';
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

  // Filter produce catalog
  const filteredCatalog = useMemo(() => {
    if (!searchQuery.trim()) return PRODUCE_CATALOG;
    return PRODUCE_CATALOG.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  }, [searchQuery]);

  const triggerToast = (msg: string, type: ToastMessage['type'] = 'success'): void => {
    setToast({ msg, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Quantity input handling
  const handleQtyChange = (val: string): void => {
    setQtyError('');
    const parsed = parseInt(val, 10);
    if (isNaN(parsed) || parsed <= 0) {
      setQtyInput('');
      setQtyError('Enter a valid harvest yield (> 0)');
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

  // Add Produce to Harvest Intake Batch
  const handleAddToBatch = (): void => {
    if (batchStatus === BatchStatus.COMMITTED) {
      triggerToast('Committed harvest batches are locked and cannot be edited.', 'error');
      return;
    }

    const qty = typeof qtyInput === 'number' ? qtyInput : parseInt(qtyInput, 10);
    if (isNaN(qty) || qty <= 0) {
      setQtyError('Please enter a harvest yield greater than zero');
      return;
    }

    setHarvestItems(prev => {
      const existingIdx = prev.findIndex(
        item => item.productId === selectedProduct.id && item.grade === selectedGrade
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + qty,
          harvestDate
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: `harv-${Date.now()}`,
          productId: selectedProduct.id,
          name: selectedProduct.name,
          quantity: qty,
          unit: selectedProduct.unit,
          grade: selectedGrade,
          harvestDate
        }
      ];
    });

    triggerToast(`Added ${selectedProduct.name} (${qty} ${selectedProduct.unit} - ${selectedGrade}) to batch.`);
  };

  const handleRemoveItem = (id: string, name: string): void => {
    if (batchStatus === BatchStatus.COMMITTED) return;
    setHarvestItems(prev => prev.filter(i => i.id !== id));
    triggerToast(`Removed ${name} from harvest batch.`, 'info');
  };

  const startEditItem = (item: HarvestBatchItem): void => {
    if (batchStatus === BatchStatus.COMMITTED) return;
    setEditingItemId(item.id);
    setEditQtyValue(item.quantity);
    setEditGradeValue(item.grade);
    setEditQtyError('');
  };

  const saveEditItem = (item: HarvestBatchItem): void => {
    const parsed = typeof editQtyValue === 'number' ? editQtyValue : parseInt(editQtyValue as string, 10);
    if (isNaN(parsed) || parsed <= 0) {
      setEditQtyError('Yield must be at least 1');
      return;
    }

    setHarvestItems(prev =>
      prev.map(i =>
        i.id === item.id ? { ...i, quantity: parsed, grade: editGradeValue } : i
      )
    );
    setEditingItemId(null);
    triggerToast(`Updated ${item.name} yield to ${parsed} ${item.unit}.`);
  };

  // Submit & Commit Harvest
  const handleCommitBatch = async (): Promise<void> => {
    if (harvestItems.length === 0 || batchStatus === BatchStatus.COMMITTED || isSubmitting) return;

    setIsSubmitting(true);
    // Simulate backend submission roundtrip
    await new Promise(r => setTimeout(r, 650));

    setBatchStatus(BatchStatus.COMMITTED);
    setIsSubmitting(false);
    triggerToast('Harvest batch registered successfully and broadcasted to wholesale buyers!', 'success');
  };

  const handleResetBatch = (): void => {
    setHarvestItems([]);
    setBatchStatus(BatchStatus.DRAFT);
    triggerToast('Harvest batch cleared and reset to DRAFT.', 'info');
  };

  const totalYieldKg = useMemo(() => {
    return harvestItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [harvestItems]);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'bg-[#090f1d] text-slate-100' : 'bg-slate-50 text-slate-900'} font-sans pb-28`}>
   
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        isDark ? 'bg-[#0e1628]/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white">
              <Tractor className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                  AgriSMART
                </span>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  isDark ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  Farmer Portal
                </span>
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} hidden sm:block`}>
                Direct Farm-to-Market Produce Intake.
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
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle color theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div className={`flex items-center gap-2.5 pl-3 border-l ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                isDark ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700' : 'bg-emerald-100 text-emerald-800'
              }`}>
                <User className="w-4 h-4" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold leading-tight">Keppetipola Farm Unit</div>
                <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Producer #914</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        
        <section className="lg:col-span-7 flex flex-col gap-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Register Farm Harvest</h1>
            <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Record harvested crops, assign quality grades, verify produce via live camera, and list for buyers.
            </p>
          </div>

          
          <div className="relative">
            <div className={`flex items-center px-3.5 py-2.5 rounded-xl border transition-all ${
              isDark 
                ? 'bg-slate-900/90 border-slate-800 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20' 
                : 'bg-white border-slate-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 shadow-sm'
            }`}>
              <Search className={`w-4 h-4 mr-2.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              <input
                type="text"
                placeholder="Search harvested crop (e.g., Carrots, Green Beans, Chillies, Cabbage)..."
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                className={`w-full bg-transparent text-sm focus:outline-none ${isDark ? 'text-slate-100 placeholder:text-slate-500' : 'text-slate-900 placeholder:text-slate-400'}`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchOpen(false);
                  }}
                  className="p-1 text-slate-400 hover:text-slate-200"
                  aria-label="Clear produce search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {isSearchOpen && (
              <div 
                className={`absolute top-full left-0 right-0 mt-1.5 max-h-60 overflow-y-auto rounded-xl border shadow-xl z-30 transition-all ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                }`}
              >
                {filteredCatalog.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400">
                    No matching produce found for &quot;{searchQuery}&quot;.
                  </div>
                ) : (
                  filteredCatalog.map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedProduct(item);
                        setSelectedGrade(item.defaultGrade);
                        setQtyInput(50);
                        setQtyError('');
                        setIsSearchOpen(false);
                        setSearchQuery(item.name);
                      }}
                      className={`w-full text-left px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm border-b transition-colors last:border-b-0 ${
                        selectedProduct.id === item.id
                          ? isDark ? 'bg-emerald-950/50 text-emerald-300' : 'bg-emerald-50 text-emerald-800'
                          : isDark ? 'border-slate-800 hover:bg-slate-800/60' : 'border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="font-semibold">{item.name}</span>
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                        {item.unit}
                      </span>
                    </button>
                  ))
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
                  {isCameraActive ? `Optical Quality Scanner (${facingMode === 'environment' ? 'Rear Field' : 'Front'})` : 'Produce Camera Standby'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {hasMultipleCameras && isCameraActive && (
                  <button
                    type="button"
                    onClick={flipCamera}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-all ${
                      isDark 
                        ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200' 
                        : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700 shadow-xs'
                    }`}
                    title="Flip camera"
                  >
                    <FlipHorizontal className="w-3.5 h-3.5" />
                    <span>Flip</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={toggleCamera}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
                    isCameraActive
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {isCameraActive ? (
                    <>
                      <VideoOff className="w-3.5 h-3.5" />
                      <span>Stop Camera</span>
                    </>
                  ) : (
                    <>
                      <Video className="w-3.5 h-3.5" />
                      <span>Verify Produce</span>
                    </>
                  )}
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
                <div className="absolute inset-5 sm:inset-8 border-2 border-dashed border-emerald-400/40 rounded-xl pointer-events-none flex flex-col justify-between p-3">
                  <div className="flex justify-between items-start text-[10px] uppercase font-mono text-emerald-400/80 tracking-widest bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs w-max">
                    Quality Grading Scanner &bull; Sri Lanka Standard
                  </div>
                  <div className="self-end text-[10px] font-mono text-emerald-400/80 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                    Optical Mode: {facingMode.toUpperCase()}
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
                    {cameraError ? 'Camera Stream Error' : 'Live Camera Standby'}
                  </h3>
                  <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {cameraError 
                      ? cameraError 
                      : "Use camera verification to inspect visual freshness and grade before submitting your harvest."
                    }
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
                <span className="font-semibold text-sm">Harvest Yield & Grading</span>
              </div>
              <div className="text-xs">
                Crop: <span className="font-bold text-emerald-400">{selectedProduct.name}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-slate-400 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  Quality Grade
                </label>
                <select
                  value={selectedGrade}
                  disabled={batchStatus === BatchStatus.COMMITTED}
                  onChange={(e) => setSelectedGrade(e.target.value as ProduceGrade)}
                  className={`w-full text-xs sm:text-sm p-2.5 rounded-xl border focus:outline-none transition-all ${
                    isDark ? 'bg-slate-800/90 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <option value="Grade A (Premium)">Grade A (Premium / Export Quality)</option>
                  <option value="Grade B (Standard)">Grade B (Standard Wholesale)</option>
                  <option value="Organic Certified">Organic Certified (No Chemical Pesticides)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  Harvest Date
                </label>
                <input
                  type="date"
                  value={harvestDate}
                  disabled={batchStatus === BatchStatus.COMMITTED}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className={`w-full text-xs sm:text-sm p-2 rounded-xl border focus:outline-none transition-all ${
                    isDark ? 'bg-slate-800/90 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className={`flex items-center rounded-xl border p-1 ${
                isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => stepQuantity(-10)}
                  disabled={batchStatus === BatchStatus.COMMITTED}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-colors disabled:opacity-30"
                  aria-label="Decrease yield by 10"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex items-center px-2">
                  <input
                    type="number"
                    min="1"
                    value={qtyInput}
                    disabled={batchStatus === BatchStatus.COMMITTED}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleQtyChange(e.target.value)}
                    className="w-16 text-center font-bold text-base bg-transparent focus:outline-none disabled:opacity-40"
                  />
                  <span className="text-xs font-semibold text-slate-400 select-none">{selectedProduct.unit}</span>
                </div>
                <button
                  type="button"
                  onClick={() => stepQuantity(10)}
                  disabled={batchStatus === BatchStatus.COMMITTED}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-colors disabled:opacity-30"
                  aria-label="Increase yield by 10"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToBatch}
                disabled={batchStatus === BatchStatus.COMMITTED || !!qtyError}
                className="flex-1 py-3 px-5 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                <span>Add Crop to Harvest Batch</span>
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
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base leading-tight">Harvest Manifest</h2>
                  <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {harvestItems.length} registered crop lot{harvestItems.length === 1 ? '' : 's'}
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                {batchStatus === BatchStatus.DRAFT && (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>DRAFT</span>
                  </span>
                )}
                {batchStatus === BatchStatus.COMMITTED && (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>COMMITTED</span>
                  </span>
                )}
              </div>
            </div>

            <div className={`px-4 py-2.5 text-xs flex items-center gap-2 border-b ${
              batchStatus === BatchStatus.DRAFT 
                ? isDark ? 'bg-amber-950/20 text-amber-300 border-amber-900/30' : 'bg-amber-50 text-amber-800 border-amber-100'
                : isDark ? 'bg-emerald-950/20 text-emerald-300 border-emerald-900/30' : 'bg-emerald-50 text-emerald-800 border-emerald-100'
            }`}>
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>
                {batchStatus === BatchStatus.DRAFT 
                  ? (harvestItems.length > 0 
                      ? "Harvest batch ready. Click 'Broadcast Harvest Batch' to inform buyers." 
                      : "Add harvested produce to build your dispatch batch.")
                  : "Harvest batch is COMMITTED to wholesale market network. Locked."
                }
              </span>
            </div>

            <div className="p-4 sm:p-5 flex-1 overflow-y-auto max-h-[380px] space-y-2.5">
              {harvestItems.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2.5 ${
                    isDark ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-400'
                  }`}>
                    <Package className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold">No harvest entered</p>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Select crop and yield on the left to add items.
                  </p>
                </div>
              ) : (
                harvestItems.map((item) => {
                  const isEditing = editingItemId === item.id;

                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-xl border transition-all ${
                        isDark ? 'bg-slate-800/40 border-slate-800 hover:border-slate-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isDark ? 'bg-emerald-950/70 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            <Sprout className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-semibold text-xs sm:text-sm truncate leading-tight">
                              {item.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[11px] font-bold text-emerald-500">
                                {item.quantity} {item.unit}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                &bull; {item.grade}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {batchStatus !== BatchStatus.COMMITTED ? (
                            <>
                              <button
                                type="button"
                                onClick={() => (isEditing ? setEditingItemId(null) : startEditItem(item))}
                                className={`p-2 rounded-lg text-xs transition-colors ${
                                  isEditing 
                                    ? 'bg-emerald-600 text-white' 
                                    : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-700' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200'
                                }`}
                                title="Edit harvest line"
                                aria-label={`Edit ${item.name}`}
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(item.id, item.name)}
                                className={`p-2 rounded-lg text-xs transition-colors ${
                                  isDark ? 'text-slate-400 hover:text-rose-400 hover:bg-rose-950/40' : 'text-slate-500 hover:text-rose-600 hover:bg-rose-50'
                                }`}
                                title="Remove harvest line"
                                aria-label={`Remove ${item.name}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          ) : (
                            <span className="p-2 text-slate-500" title="Locked (Committed)">
                              <Lock className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </div>

                    
                      {isEditing && (
                        <div className="mt-2.5 pt-2.5 border-t border-dashed border-slate-700/60 flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="1"
                              value={editQtyValue}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditQtyValue(e.target.value)}
                              className={`w-20 px-2 py-1 text-xs rounded border focus:outline-none ${
                                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'
                              }`}
                            />
                            <span className="text-xs text-slate-400">{item.unit}</span>

                            <select
                              value={editGradeValue}
                              onChange={(e) => setEditGradeValue(e.target.value as ProduceGrade)}
                              className={`text-xs p-1 rounded border focus:outline-none ml-auto ${
                                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'
                              }`}
                            >
                              <option value="Grade A (Premium)">Grade A</option>
                              <option value="Grade B (Standard)">Grade B</option>
                              <option value="Organic Certified">Organic</option>
                            </select>
                          </div>

                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => saveEditItem(item)}
                              className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingItemId(null)}
                              className="px-2 py-1 rounded text-xs text-slate-400 hover:text-slate-200"
                            >
                              Cancel
                            </button>
                          </div>
                          {editQtyError && (
                            <span className="text-[10px] text-rose-400">{editQtyError}</span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            
            <div className={`p-4 border-t space-y-3 ${
              isDark ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="text-xs text-slate-400">Total Crop Batches</div>
                  <div className="text-base font-bold text-emerald-500">{harvestItems.length} lines</div>
                </div>
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="text-xs text-slate-400">Total Harvest Yield</div>
                  <div className="text-base font-bold text-emerald-500">{totalYieldKg} kg</div>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCommitBatch}
                    disabled={harvestItems.length === 0 || batchStatus === BatchStatus.COMMITTED || isSubmitting}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      batchStatus === BatchStatus.COMMITTED
                        ? 'bg-emerald-600/80 text-white cursor-default'
                        : harvestItems.length > 0
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Broadcasting to Market...</span>
                      </>
                    ) : batchStatus === BatchStatus.COMMITTED ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Harvest Batch Committed</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Broadcast Harvest Batch</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleResetBatch}
                    className={`p-3 rounded-xl border border-dashed text-slate-400 hover:text-slate-200 transition-colors ${
                      isDark ? 'border-slate-700' : 'border-slate-300'
                    }`}
                    title="Reset batch"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
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
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">Farm Overview</span>
          </button>

         
          <button type="button" className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
            <Sprout className="w-4 h-4" />
            <span>My Harvest</span>
          </button>

          <button type="button" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-900'
          }`}>
            <ClipboardList className="w-4 h-4" />
            <span className="hidden sm:inline">Buyer Orders</span>
          </button>

          <button type="button" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-900'
          }`}>
            <Warehouse className="w-4 h-4" />
            <span className="hidden sm:inline">Barn Stock</span>
          </button>

          <button type="button" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-900'
          }`}>
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Farmer Profile</span>
          </button>
        </nav>
      </div>

    
      {toast && (
        <div className="fixed top-20 right-5 z-50 animate-bounce-in">
          <div className={`px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold text-white border ${
            toast.type === 'error'
              ? 'bg-rose-600 border-rose-500'
              : toast.type === 'info'
                ? 'bg-sky-600 border-sky-500'
                : 'bg-emerald-600 border-emerald-500'
          }`}>
            <CheckCircle2 className="w-4 h-4" />
            <span>{toast.msg}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerHarvest;