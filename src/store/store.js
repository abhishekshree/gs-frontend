import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
    persist(
        (set,get) => ({
            dayStarted: {} || get()?.dayStarted,
            setDayStarted: (dayStarted) => set({dayStarted}),
            allDriverDestinations: {} || get()?.allDriverDestinations,
            setAllDriverDestinations: (allDriverDestinations) => set({allDriverDestinations}),
            unroutedPoints: [] || get()?.unroutedPoints,
            setUnroutedPoints: (unroutedPoints) => set({unroutedPoints}),
        }),
        {
            name: 'global-store',
        })
    )