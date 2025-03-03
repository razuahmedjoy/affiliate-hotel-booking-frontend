import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Store for managing global loading state
const useLoaderStore = create((set) => ({
    isLoading: false,
    setLoading: (isLoading) => set({ isLoading }), // Action to set the loading state
}))

export default useLoaderStore
