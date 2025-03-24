import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AffiliateLoginSchema } from "@/lib/zodResolvers"
import AffiliateRegisterImage from "@/assets/imgs/affiliate.png"
import { Link, useNavigate } from "react-router"  // Make sure you have react-router-dom installed for navigation
import useLoaderStore from "@/store/loaderStore"
import useAuthStore from "@/store/authStore"
import { useLoginUser } from "@/services/authService"
import ForgotPasswordLottie from "@/assets/lottiefiles/lottie.json"
import LottieAnimation from "@/components/ui/LottieAnimation"
const ForgotPasswordPage = () => {
    const { isLoading } = useLoaderStore();
    const { login, isAuthenticated, role } = useAuthStore()
    const { mutateAsync: loginUser } = useLoginUser()
    const navigate = useNavigate()


    const form = useForm({
        resolver: zodResolver(AffiliateLoginSchema),
        defaultValues: {

            email: "",
            password: "",
        },
    })

    const onSubmit = async (data) => {

        try {
            const response = await loginUser(data)  // API call using React Query
            console.log(response?.data?.user)
            login(response?.data?.user, response?.data?.token, "affiliate")  // Store user, token, and role in Zustand


            // Redirect to the appropriate dashboard based on the role
        } catch (error) {
            console.error('Login failed:', error)
        }
    }

    useEffect(() => {

        if (isAuthenticated && role === 'affiliate') {
            navigate('/affiliate/dashboard')
        }

    }, [isAuthenticated, role])

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="max-w-7xl w-full p-8 md:p-12 grid md:grid-cols-2 gap-8 place-items-center">

                {/* Left Column - Image */}
                <div className="hidden md:block">
                    <LottieAnimation path={ForgotPasswordLottie} loop autoplay />
     
                </div>

                {/* Right Column - Registration Form */}
                <div className="w-full flex flex-col items-center justify-center">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md bg-white p-6 rounded-lg shadow-md">

                            <h2 className="text-center text-3xl font-semibold mb-4">Reset Your Password</h2>



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

                      



                            {/* Submit Button */}
                            <Button type="submit" disabled={isLoading} className="cursor-pointer w-full mt-4">
                                {isLoading ? "Submitting..." : "Login"}
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

export default ForgotPasswordPage;
