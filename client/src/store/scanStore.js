import { create } from 'zustand';

const useScanStore = create((set) => ({
  isScanning: false,
  scanResults: null,
  error: null,
  
  setScanning: (isScanning) => set({ isScanning }),
  setScanResults: (results) => set({ scanResults: results, isScanning: false, error: null }),
  clearScan: () => set({ scanResults: null, error: null }),
  setError: (error) => set({ error, isScanning: false })
}));

export default useScanStore;
