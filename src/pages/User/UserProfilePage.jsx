import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useAuthStore from '@/store/authStore'
import toast from 'react-hot-toast'
import UpdateBankInfo from '../Affiliate/AffiliateDashboard/UpdateBankInfo'

// Validation schema
const profileFormSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    phone: z.string().regex(/^\+\d{1,3}\d{7,14}$/, {

        message: 'Contact number must include a valid country code and be numeric.',

    })
})


const UserProfilePage = () => {
    const { user } = useAuthStore()
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(true)

    // Mock initial user data - replace with actual API call
    const mockUserData = {
        name: user?.name,
        email: user?.email,
        phone: user?.phone,

    }

    const form = useForm({
        resolver: zodResolver(profileFormSchema),
        defaultValues: mockUserData,
    })

    // Reset form when editing state changes


    // Handle form submission
    async function onSubmit(data) {
        setIsLoading(true)
        try {
            // Simulate API call
            await updateUserData({
                name: data.name,
                phone: data.phone,
            })

            toast.success('Profile updated successfully!')

        } catch (error) {
            toast.error('Failed to update profile. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    // Mock API update function
    async function updateUserData(data) {
        return new Promise((resolve) => setTimeout(resolve, 1000))
    }

    return (
        <div className="w-full mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h1 className="text-2xl font-bold mb-6">User Profile</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name Field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={!isEditing || isLoading}
                                            placeholder="Your name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email Field (disabled) */}
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <Input
                                value={mockUserData.email}
                                disabled
                                placeholder="Your email"
                            />
                        </FormItem>

                        {/* Contact Number Field */}
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={!isEditing || isLoading}
                                            placeholder="1234567890"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <div className="flex gap-4">

                            <>
                                <Button
                                    className="cursor-pointer"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </Button>
                                <Button
                                    variant="outline"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                            </>

                        </div>
                    </form>
                </Form>

            </div>
            <UpdateBankInfo />
        </div>
    )
}

export default UserProfilePage

