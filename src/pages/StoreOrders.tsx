import React, { useState, useEffect, useRef, useMemo,type FC } from 'react';
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
  ShoppingCart,
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
  Info
} from 'lucide-react';


export type OrderStatusType = 'PENDING' | 'FINALIZED' | 'CANCELLED';

export const OrderStatus = {
  PENDING: 'PENDING' as OrderStatusType,
  FINALIZED: 'FINALIZED' as OrderStatusType,
  CANCELLED: 'CANCELLED' as OrderStatusType
} as const;

export interface ProduceCatalogItem {
  id: string;
  name: string;
  unit: string;
}

export interface PreOrderItem {
  id: string;
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


const PRODUCE_CATALOG: ProduceCatalogItem[] = [
  { id: 'prod-tom', name: 'Tomato (Fresh Grade A)', unit: 'kg' },
  { id: 'prod-car', name: 'Nuwara Eliya Carrots', unit: 'kg' },
  { id: 'prod-gbn', name: 'Tender Green Beans', unit: 'kg' },
  { id: 'prod-cab', name: 'Crisp Green Cabbage', unit: 'kg' },
  { id: 'prod-pot', name: 'Jaffna Red Potatoes', unit: 'kg' },
  { id: 'prod-oni', name: 'Local Red Onions', unit: 'kg' },
  { id: 'prod-ban', name: 'Ambul Banana (Cluster)', unit: 'kg' },
  { id: 'prod-pap', name: 'Red Lady Sweet Papaya', unit: 'kg' },
];



export const AgriSmartPreOrder: FC = () => {
  
  const [isDark, setIsDark] = useState<boolean>(true);

  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProduceCatalogItem>(PRODUCE_CATALOG[0]);
  const [qtyInput, setQtyInput] = useState<number | ''>(10);
  const [qtyError, setQtyError] = useState<string>('');

 
  const [orderItems, setOrderItems] = useState<PreOrderItem[]>([
    { id: 'ord-1', productId: 'prod-tom', name: 'Tomato (Fresh Grade A)', quantity: 25, unit: 'kg' },
    { id: 'ord-2', productId: 'prod-car', name: 'Nuwara Eliya Carrots', quantity: 15, unit: 'kg' }
  ]);
  const [orderStatus, setOrderStatus] = useState<OrderStatusType>(OrderStatus.PENDING);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editQtyValue, setEditQtyValue] = useState<number | string>(1);
  const [editQtyError, setEditQtyError] = useState<string>('');

  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<FacingMode>('environment');
  const [hasMultipleCameras, setHasMultipleCameras] = useState<boolean>(false);

  
  const [toast, setToast] = useState<ToastMessage | null>(null);

  
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
    if (orderStatus === OrderStatus.FINALIZED) {
      triggerToast('Finalized pre-orders are locked and cannot be edited.', 'error');
      return;
    }

    const qty = typeof qtyInput === 'number' ? qtyInput : parseInt(qtyInput, 10);
    if (isNaN(qty) || qty <= 0) {
      setQtyError('Please enter a quantity greater than zero');
      return;
    }

    setOrderItems(prev => {
      const existingIdx = prev.findIndex(item => item.productId === selectedProduct.id);
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
          id: `ord-${Date.now()}`,
          productId: selectedProduct.id,
          name: selectedProduct.name,
          quantity: qty,
          unit: selectedProduct.unit
        }
      ];
    });

    triggerToast(`Added ${selectedProduct.name} (${qty} ${selectedProduct.unit}) to pre-order.`);
  };

  
  const handleRemoveItem = (id: string, name: string): void => {
    if (orderStatus === OrderStatus.FINALIZED) return;
    setOrderItems(prev => prev.filter(i => i.id !== id));
    triggerToast(`Removed ${name} from pre-order.`, 'info');
  };

  const startEditItem = (item: PreOrderItem): void => {
    if (orderStatus === OrderStatus.FINALIZED) return;
    setEditingItemId(item.id);
    setEditQtyValue(item.quantity);
    setEditQtyError('');
  };

  const saveEditItem = (item: PreOrderItem): void => {
    const parsed = typeof editQtyValue === 'number' ? editQtyValue : parseInt(editQtyValue, 10);
    if (isNaN(parsed) || parsed <= 0) {
      setEditQtyError('Quantity must be at least 1');
      return;
    }

    setOrderItems(prev =>
      prev.map(i => (i.id === item.id ? { ...i, quantity: parsed } : i))
    );
    setEditingItemId(null);
    triggerToast(`Updated ${item.name} quantity to ${parsed} ${item.unit}.`);
  };

  
  const handleFinalizeOrder = async (): Promise<void> => {
    if (orderItems.length === 0 || orderStatus === OrderStatus.FINALIZED || isSubmitting) return;

    setIsSubmitting(true);
    
    await new Promise(r => setTimeout(r, 650));

    setOrderStatus(OrderStatus.FINALIZED);
    setIsSubmitting(false);
    triggerToast('Pre-Order successfully finalized and submitted to warehouse supply!', 'success');
  };

  
  const handleResetOrder = (): void => {
    setOrderItems([]);
    setOrderStatus(OrderStatus.PENDING);
    triggerToast('Pre-Order cleared and reset to PENDING.', 'info');
  };

  
  const totalQuantityKg = useMemo(() => {
    return orderItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [orderItems]);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'bg-[#090f1d] text-slate-100' : 'bg-slate-50 text-slate-900'} font-sans pb-28`}>
      
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        isDark ? 'bg-[#0e1628]/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
         
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                  AgriSMART
                </span>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  isDark ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  Pre-Order
                </span>
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} hidden sm:block`}>
                Smart Agriculture. Smarter Supply.
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
                <div className="text-xs font-bold leading-tight">Dambulla Central</div>
                <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Store #402</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        
        <section className="lg:col-span-7 flex flex-col gap-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Create Store Pre-Order</h1>
            <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Select fresh produce, configure quantities, and finalize your store pre-order immediately.
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
                placeholder="Search produce (e.g., Tomato, Carrot, Cabbage, Onion)..."
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
                        setQtyInput(10);
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
                  {isCameraActive ? `Optical Feed Active (${facingMode === 'environment' ? 'Rear' : 'Front'})` : 'Camera Standby'}
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
                      <span>Start Camera</span>
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
                    Live Produce Inspection
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
                    {cameraError ? 'Camera Feed Error' : 'Live Camera Inactive'}
                  </h3>
                  <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {cameraError 
                      ? cameraError 
                      : "Click 'Start Camera' to initiate optical produce verification directly via your device hardware."
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
                <span className="font-semibold text-sm">Quantity Configuration</span>
              </div>
              <div className="text-xs">
                Selected: <span className="font-bold text-emerald-400">{selectedProduct.name}</span>
                <span className={`ml-2 px-2 py-0.5 rounded ${isDark ? 'bg-slate-800 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>
                  Unit: {selectedProduct.unit}
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
                  disabled={orderStatus === OrderStatus.FINALIZED}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-colors disabled:opacity-30"
                  aria-label="Decrease quantity by 5"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex items-center px-2">
                  <input
                    type="number"
                    min="1"
                    value={qtyInput}
                    disabled={orderStatus === OrderStatus.FINALIZED}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleQtyChange(e.target.value)}
                    className="w-16 text-center font-bold text-base bg-transparent focus:outline-none disabled:opacity-40"
                  />
                  <span className="text-xs font-semibold text-slate-400 select-none">{selectedProduct.unit}</span>
                </div>
                <button
                  type="button"
                  onClick={() => stepQuantity(5)}
                  disabled={orderStatus === OrderStatus.FINALIZED}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-colors disabled:opacity-30"
                  aria-label="Increase quantity by 5"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

           
              <button
                type="button"
                onClick={handleAddToOrder}
                disabled={orderStatus === OrderStatus.FINALIZED || !!qtyError}
                className="flex-1 py-3 px-5 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 disabled:opacity-40 disabled:cursor-not-allowed"
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
                  <h2 className="font-bold text-base leading-tight">Your Pre-Order</h2>
                  <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {orderItems.length} distinct item{orderItems.length === 1 ? '' : 's'}
                  </span>
                </div>
              </div>

             
              <div className="flex items-center">
                {orderStatus === OrderStatus.PENDING && (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>PENDING</span>
                  </span>
                )}
                {orderStatus === OrderStatus.FINALIZED && (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>FINALIZED</span>
                  </span>
                )}
              </div>
            </div>

          
            <div className={`px-4 py-2.5 text-xs flex items-center gap-2 border-b ${
              orderStatus === OrderStatus.PENDING 
                ? isDark ? 'bg-amber-950/20 text-amber-300 border-amber-900/30' : 'bg-amber-50 text-amber-800 border-amber-100'
                : isDark ? 'bg-emerald-950/20 text-emerald-300 border-emerald-900/30' : 'bg-emerald-50 text-emerald-800 border-emerald-100'
            }`}>
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>
                {orderStatus === OrderStatus.PENDING 
                  ? (orderItems.length > 0 
                      ? "Pre-Order is ready. Click 'Finalize Pre-Order' below to submit immediately." 
                      : "Add at least one produce item to enable pre-order finalization.")
                  : "Pre-Order is FINALIZED and locked for dispatch. Read-only mode."
                }
              </span>
            </div>

           
            <div className="p-4 sm:p-5 flex-1 overflow-y-auto max-h-[380px] space-y-2.5">
              {orderItems.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2.5 ${
                    isDark ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-400'
                  }`}>
                    <Package className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold">No produce in pre-order</p>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Use produce search above to add items.
                  </p>
                </div>
              ) : (
                orderItems.map((item) => {
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
                            <span className="text-[11px] font-bold text-emerald-500">
                              {item.quantity} {item.unit}
                            </span>
                          </div>
                        </div>

                       
                        <div className="flex items-center gap-1 shrink-0">
                          {orderStatus !== OrderStatus.FINALIZED ? (
                            <>
                              <button
                                type="button"
                                onClick={() => (isEditing ? setEditingItemId(null) : startEditItem(item))}
                                className={`p-2 rounded-lg text-xs transition-colors ${
                                  isEditing 
                                    ? 'bg-emerald-600 text-white' 
                                    : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-700' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200'
                                }`}
                                title="Edit requested quantity"
                                aria-label={`Edit ${item.name} quantity`}
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(item.id, item.name)}
                                className={`p-2 rounded-lg text-xs transition-colors ${
                                  isDark ? 'text-slate-400 hover:text-rose-400 hover:bg-rose-950/40' : 'text-slate-500 hover:text-rose-600 hover:bg-rose-50'
                                }`}
                                title="Remove item"
                                aria-label={`Remove ${item.name}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          ) : (
                            <span className="p-2 text-slate-500" title="Locked (Finalized)">
                              <Lock className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </div>

                    
                      {isEditing && (
                        <div className="mt-2.5 pt-2.5 border-t border-dashed border-slate-700/60 flex items-center gap-2">
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
                          <button
                            type="button"
                            onClick={() => saveEditItem(item)}
                            className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white ml-auto"
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
                  <div className="text-xs text-slate-400">Total Produce Items</div>
                  <div className="text-base font-bold text-emerald-500">{orderItems.length} lines</div>
                </div>
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="text-xs text-slate-400">Total Volume</div>
                  <div className="text-base font-bold text-emerald-500">{totalQuantityKg} kg</div>
                </div>
              </div>

             
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleFinalizeOrder}
                    disabled={orderItems.length === 0 || orderStatus === OrderStatus.FINALIZED || isSubmitting}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      orderStatus === OrderStatus.FINALIZED
                        ? 'bg-emerald-600/80 text-white cursor-default'
                        : orderItems.length > 0
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Finalizing Pre-Order...</span>
                      </>
                    ) : orderStatus === OrderStatus.FINALIZED ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Pre-Order Finalized</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Finalize Pre-Order</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleResetOrder}
                    className={`p-3 rounded-xl border border-dashed text-slate-400 hover:text-slate-200 transition-colors ${
                      isDark ? 'border-slate-700' : 'border-slate-300'
                    }`}
                    title="Reset pre-order"
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
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <button type="button" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-900'
          }`}>
            <Package className="w-4 h-4" />
            <span className="hidden sm:inline">Products</span>
          </button>

          <button type="button" className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
            <ClipboardList className="w-4 h-4" />
            <span>Pre-Orders</span>
          </button>

          <button type="button" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-900'
          }`}>
            <Warehouse className="w-4 h-4" />
            <span className="hidden sm:inline">Inventory</span>
          </button>

          <button type="button" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-900'
          }`}>
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
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

export default AgriSmartPreOrder;