import { create } from "zustand";
import type { SkinType, SubStationType } from "@/types";
import { subStations } from "@/data/subStations";
import { skins } from "@/data/skins";

interface AppState {
  currentStation: SubStationType;
  currentSkin: SkinType;
  isPreviewMode: boolean;
  showBookingModal: boolean;

  setCurrentStation: (s: SubStationType) => void;
  setCurrentSkin: (s: SkinType) => void;
  togglePreviewMode: () => void;
  setPreviewMode: (v: boolean) => void;
  openBooking: () => void;
  closeBooking: () => void;
  applySkinToDocument: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentStation: "scenic",
  currentSkin: "default",
  isPreviewMode: false,
  showBookingModal: false,

  setCurrentStation: (s) => set({ currentStation: s }),
  setCurrentSkin: (s) => {
    set({ currentSkin: s });
    get().applySkinToDocument();
  },
  togglePreviewMode: () => set((st) => ({ isPreviewMode: !st.isPreviewMode })),
  setPreviewMode: (v) => set({ isPreviewMode: v }),
  openBooking: () => set({ showBookingModal: true }),
  closeBooking: () => set({ showBookingModal: false }),

  applySkinToDocument: () => {
    const { currentSkin } = get();
    const skin = skins.find((sk) => sk.name === currentSkin);
    const root = document.documentElement;

    if (!skin) return;

    root.setAttribute("data-skin", skin.name);
    Object.entries(skin.cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  },
}));

export const getCurrentStationConfig = () => {
  const { currentStation } = useAppStore.getState();
  return subStations[currentStation];
};
