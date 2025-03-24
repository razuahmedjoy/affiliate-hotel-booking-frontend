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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const bankFormSchema = z.object({
    bankName: z.string().min(2, 'Bank name must be at least 2 characters'),
    accountHolderName: z.string().min(2, 'Account holder name must be at least 2 characters'),
    accountNumber: z.string().regex(/^\d{9,18}$/, 'Invalid account number (9-18 digits)'),
    routingNumber: z.string().regex(/^\d{9}$/, 'Must be a valid 9-digit routing number'),
    accountType: z.enum(['checking', 'savings'], {
        required_error: 'Please select an account type',
    }),
})


export default function UpdateBankInfo() {
    const [isEditing, setIsEditing] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    // Mock initial bank data - replace with actual API call
    const mockBankData = {
        bankName: 'Example Bank',
        accountHolderName: 'John Doe',
        accountNumber: '123456789',
        routingNumber: '123456789',
        accountType: 'checking',
    }

    const form = useForm({
        resolver: zodResolver(bankFormSchema),
        defaultValues: mockBankData,
    })

    useEffect(() => {
        if (!isEditing) {
            form.reset(mockBankData)
        }
    }, [isEditing])

    async function onSubmit(data) {
        setIsLoading(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            // In real app:
            // await updateBankDetails(data)

            setIsEditing(false)
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full mx-auto md:px-4">
            <h2 className="text-2xl font-bold mb-6">Bank Details</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Bank Name */}
                    <FormField
                        control={form.control}
                        name="bankName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bank Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={!isEditing || isLoading}
                                        placeholder="Enter bank name"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Account Holder Name */}
                    <FormField
                        control={form.control}
                        name="accountHolderName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account Holder Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={!isEditing || isLoading}
                                        placeholder="Full name as on account"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Account Number */}
                    <FormField
                        control={form.control}
                        name="accountNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account Number</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        inputMode="numeric"
                                        disabled={!isEditing || isLoading}
                                        placeholder="Enter account number"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Routing Number */}
                    <FormField
                        control={form.control}
                        name="routingNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Routing Number</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        inputMode="numeric"
                                        disabled={!isEditing || isLoading}
                                        placeholder="Enter routing number"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Account Type */}
                    <FormField
                        control={form.control}
                        name="accountType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account Type</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    disabled={!isEditing || isLoading}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select account type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="checking">Checking</SelectItem>
                                        <SelectItem value="savings">Savings</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-4">

                        <>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setIsEditing(false)}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                        </>

                    </div>
                </form>
            </Form>
        </div>
    )
}