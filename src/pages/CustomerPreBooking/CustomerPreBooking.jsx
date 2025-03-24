import React, { useState } from 'react';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import useLoaderStore from '@/store/loaderStore';
import { useParams } from 'react-router';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePreBooking } from '@/services/bookingService';

const CustomerPreBooking = () => {
    // State for form inputs

    const { isLoading, setLoading } = useLoaderStore()
    const { affiliateId } = useParams();

    const mutatePrebooking = usePreBooking()




    const form = useForm({
        defaultValues: {
            name: "",
            phone: "",
            waitingTime: "10",
            affiliateId: affiliateId
        },
    })


    const onSubmit = async (data) => {
        // console.log(data);
        try {
            console.log(data);

            const res = await mutatePrebooking.mutateAsync(data)
            console.log(res);

            // redirect to the payment page
            // Redirect to the payment page
            const paymentLink = res?.data?.paymentLink
            // Redirect to the payment page
            window.location = paymentLink
            // setLoading(true)



            // Redirect to login page

            // Store user, token, and role in Zustand
            // Redirect to dashboard or another protected route
        } catch (error) {

        } finally {
        }

    }


    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center">

            <div className="w-full h-full flex flex-col items-center justify-center text-sm md:text-base md:p-0  rounded-lg shadow-lg sm:w-96">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full max-w-md p-6  text-md bg-white">

                        <h2 className="text-center text-3xl font-semibold mb-4">Customer Prebooking</h2>

                        {/* Name Field */}
                        <FormField
                            control={form.control}
                            name="name"

                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input className="bg-white shadow-none" placeholder="John Doe" {...field} required />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email Field */}
              

                        {/* Phone Field */}
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="tel"
                                            className="bg-white shadow-none"
                                            placeholder="+1234567890" {...field}
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Address Field */}
                        {/* render all the address field in different input fields and in 2 columns */}
                        <div className="grid grid-cols-2 gap-4">
                           

                            {/* add a dropdown select field for waitingTIme */}
                            <FormField
                                control={form.control}
                                name="waitingTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Waiting Time</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a Waiting Time" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="10">10 Mins</SelectItem>
                                                <SelectItem value="60">60 Mins</SelectItem>
                                                <SelectItem value="1440">24 Hours</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="serviceType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Service Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a Service Type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Homestay">Homestay</SelectItem>
                                                <SelectItem value="Hotel">Hotel</SelectItem>
                                                <SelectItem value="Tour Guides">Tour Guides</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>


                        {/* Submit Button */}
                        <Button type="submit" disabled={isLoading} className="cursor-pointer w-full mt-4">
                            {isLoading ? "Redirecting..." : "Continue"}
                        </Button>

                    </form>
                </Form>


            </div>
        </div>
    );
};

export default CustomerPreBooking;