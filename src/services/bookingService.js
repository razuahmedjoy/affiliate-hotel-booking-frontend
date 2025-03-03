import useLoaderStore from "@/store/loaderStore"
import axiosInstance from "./axiosInstance"
import { useMutation } from "react-query"

// Register a new user
export const prebookingRequest = async (data) => {
    const response = await axiosInstance.post(`booking/${data?.affiliateId}/prebooking`, data)
    return response.data
}



// Register hook using React Query's `useMutation`
export const usePreBooking = () => {

    const { setLoading } = useLoaderStore()

    return useMutation(prebookingRequest, {
        onMutate: () => {
            setLoading(true)  // Start loading
        },
        onSuccess: (data) => {
            console.log('Request successful:', data)
            setLoading(false)  // Stop loading after success
        },
        onError: (error) => {
            console.error('Error during Request:', error)
            setLoading(false)  // Stop loading after error
        },
        onSettled: () => {
            setLoading(false)  // Always stop loading after mutation is settled (success or error)
        },
    })
}
