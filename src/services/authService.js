import { useMutation } from 'react-query'
import axiosInstance from './axiosInstance'
import useLoaderStore from '@/store/loaderStore'

// Register a new user
export const registerUser = async (userData) => {
    const response = await axiosInstance.post('/affiliates/register', userData)
    return response.data
}


// Login a user
export const loginUser = async (loginData) => {
    const response = await axiosInstance.post('/affiliates/login', loginData)
    return response.data
}

// Register hook using React Query's `useMutation`
export const useRegisterUser = () => {

    const { setLoading } = useLoaderStore()
    return useMutation(registerUser, {
        onMutate: () => {
            setLoading(true)  // Start loading
        },
        onSuccess: (data) => {
            console.log('Registration successful:', data)
            setLoading(false)  // Stop loading after success
        },
        onError: (error) => {
            console.error('Error during registration:', error)
            setLoading(false)  // Stop loading after error
        },
        onSettled: () => {
            setLoading(false)  // Always stop loading after mutation is settled (success or error)
        },
    })
}


// Login hook using React Query's `useMutation`
export const useLoginUser = () => {

    
    const { setLoading } = useLoaderStore()

    return useMutation(loginUser, {
        onMutate: () => {
            setLoading(true)  // Start
        },
        onSuccess: (data) => {
            console.log('Login successful:', data)
            setLoading(false)  // Stop loading after success
        },
        onError: (error) => {
            console.error('Error during login:', error)
            setLoading(false)  // Stop loading after error
   
        },
        onSettled: () => {
            setLoading(false)  // Always stop loading after mutation is settled (success or error)
        },
    })
}