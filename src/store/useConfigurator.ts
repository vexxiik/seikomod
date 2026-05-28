import { create } from "zustand";
import { persist } from "zustand/middleware";
import { configuratorData, ConfiguratorCategory, ConfiguratorPart, BASE_WATCH_PRICE } from "@/lib/configuratorData";

interface ConfiguratorState {
  // Selected parts by category
  selections: Record<ConfiguratorCategory, ConfiguratorPart | null>;
  // UI State
  currentStepIndex: number;
  
  // Actions
  setSelection: (category: ConfiguratorCategory, part: ConfiguratorPart) => void;
  setCurrentStepIndex: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetConfigurator: () => void;
  
  // Computed values (can be derived in UI, but handy to have)
  getTotalPrice: () => number;
}

// Initialize with the first option of each category as default
const initialSelections = configuratorData.reduce((acc, cat) => {
  acc[cat.category] = cat.options[0] || null;
  return acc;
}, {} as Record<ConfiguratorCategory, ConfiguratorPart | null>);

export const useConfigurator = create<ConfiguratorState>()(
  persist(
    (set, get) => ({
      selections: initialSelections,
      currentStepIndex: 0,

      setSelection: (category, part) => 
        set((state) => ({
          selections: {
            ...state.selections,
            [category]: part,
          },
        })),

      setCurrentStepIndex: (index) => 
        set({ currentStepIndex: index }),

      nextStep: () => 
        set((state) => ({
          currentStepIndex: Math.min(state.currentStepIndex + 1, configuratorData.length - 1)
        })),

      prevStep: () => 
        set((state) => ({
          currentStepIndex: Math.max(state.currentStepIndex - 1, 0)
        })),

      resetConfigurator: () => 
        set({
          selections: initialSelections,
          currentStepIndex: 0,
        }),

      getTotalPrice: () => {
        const { selections } = get();
        let total = BASE_WATCH_PRICE;
        Object.values(selections).forEach(part => {
          if (part) {
            total += part.price;
          }
        });
        return total;
      }
    }),
    {
      name: "seiko-configurator-storage",
    }
  )
);
