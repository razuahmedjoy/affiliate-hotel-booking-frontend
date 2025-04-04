import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AffiliateRegistrationSchema } from "@/lib/zodResolvers"
import AffiliateRegisterImage from "@/assets/imgs/affiliate.png"
import { Link, useNavigate } from "react-router"  // Make sure you have react-router-dom installed for navigation
import { useRegisterUser } from "@/services/authService"
import useAuthStore from "@/store/authStore"
import toast from "react-hot-toast"
import useLoaderStore from "@/store/loaderStore"
import { navigateBasedOnRole } from "@/lib/utils"


const AffiliateRegister = () => {

    const { login, user } = useAuthStore()

    const { isLoading } = useLoaderStore()

    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(AffiliateRegistrationSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            street: "101 MG Road",
            city: "Mumbai",
            state: "Maharashtra",
            country: "India",
            zipCode: "400001"
        },
    })
    const { mutateAsync: registerUser } = useRegisterUser()

    const onSubmit = async (data) => {
        // console.log(data);
        try {
            console.log(data);

            const response = await registerUser(data)  // API call using React Query

            toast.success("Registration successful. Redirecting to login...")

            // Redirect to login page
            navigate('/auth/affiliate/login')

            // Store user, token, and role in Zustand
            // Redirect to dashboard or another protected route
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred. Please try again.")

        } finally {
        }

    }

    if (user) {

        navigate(navigateBasedOnRole(user.role))
    }
    // console.log(user);
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-full h-full grid md:grid-cols-2 gap-x-8 ">

                {/* Left Column - Image */}
                <div className="hidden md:block">
                    <img
                        src={AffiliateRegisterImage} // Replace with your image URL
                        alt="Affiliate Registration"
                        className="w-full h-full object-contain rounded-md"
                    />
                </div>

                {/* Right Column - Registration Form */}
                <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50 p-4 text-sm md:text-base md:p-0">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full max-w-md p-6  text-md bg-white">

                            <h2 className="text-center text-3xl font-semibold mb-4">Affiliate Registration</h2>

                            {/* Name Field */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input className="bg-white shadow-none" placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Email Field */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" className="bg-white shadow-none" placeholder="john@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Phone Field */}
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input type="tel" className="bg-white shadow-none" placeholder="+1234567890" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Address Field */}
                            {/* render all the address field in different input fields and in 2 columns */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="street"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Street</FormLabel>
                                            <FormControl>
                                                <Input className="bg-white shadow-none" placeholder="101 MG Road" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input className="bg-white shadow-none" placeholder="Mumbai" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>State</FormLabel>
                                            <FormControl>
                                                <Input className="bg-white shadow-none" placeholder="Maharashtra" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Country</FormLabel>
                                            <FormControl>
                                                <Input className="bg-white shadow-none" placeholder="India" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="zipCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Zip Code</FormLabel>
                                            <FormControl>
                                                <Input className="bg-white shadow-none" placeholder="400001" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* Password Field */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" className="bg-white shadow-none" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <Button type="submit" disabled={isLoading} className="cursor-pointer w-full mt-4">
                                {isLoading ? "Submitting..." : "Register"}
                            </Button>
                            {/* Footer Links */}
                            <div className="text-center">
                                <Link to="/auth/affiliate/login" className="text-blue-600 hover:text-blue-800 text-xs">
                                    Already have an account? Login
                                </Link>

                            </div>
                        </form>
                    </Form>


                </div>
            </div>
        </div>
    );
};

export default AffiliateRegister;
