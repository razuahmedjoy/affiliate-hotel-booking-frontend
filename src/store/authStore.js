import { create } from 'zustand'
import { persist } from 'zustand/middleware'


// Store for authentication management
const useAuthStore = create(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            token: null,
            role: null,  // New property to store user role (Affiliate, Admin, Customer)
            login: (user, token, role) => set({ isAuthenticated: true, user, token, role }),
            logout: () => set({ isAuthenticated: false, user: null, token: null, role: null }),
        }),
        {
            name: 'auth-storage', // Persisted state key
            getStorage: () => localStorage, // Use localStorage to persist the state
        }
    )
)

export default useAuthStore
