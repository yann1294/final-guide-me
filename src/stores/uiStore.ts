import { create } from "zustand";

interface UIStore {
    isSidebarOpen: boolean;

    toggleSidebar: () => void;
    openSidebar: () => void;
    closeSidebar: () => void;
}

// Define the Zustand store
const useUIStore = create<UIStore>((set) => ({
  // Sidebar state
  isSidebarOpen: false,

  // Action to toggle the sidebar
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  // Action to explicitly open the sidebar
  openSidebar: () => set({ isSidebarOpen: true }),

  // Action to explicitly close the sidebar
  closeSidebar: () => set({ isSidebarOpen: false }),
}));

export default useUIStore;