import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Schema for personal information validation
const PersonalInfoSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    gender: z.string().optional(),
    phone: z.string().min(10, "Valid phone number is required"),
    whatsappNumber: z.string().optional(),
    email: z.string().email("Valid email is required"),
    password: z.string().min(8, "Password must be at least 8 characters")
});

const PersonalInfoForm = ({ initialData, onNext, isLoading }) => {
    const form = useForm({
        resolver: zodResolver(PersonalInfoSchema),
        defaultValues: initialData || {
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            gender: "",
            phone: "",
            whatsappNumber: "",
            email: "",
            password: ""
        }
    });

    const handleSubmit = (data) => {
        // Typically you would verify OTP and email here
        onNext(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input className="bg-white shadow-none" placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input className="bg-white shadow-none" placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                    <Input type="date" className="bg-white shadow-none" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender (Optional)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                        <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mobile Number</FormLabel>
                            <FormControl>
                                <div className="flex">
                                    <Input type="tel" className="bg-white shadow-none" placeholder="+91 98765 43210" {...field} />
                                    <Button type="button" className="ml-2" variant="outline" size="sm">
                                        Verify
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="whatsappNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>WhatsApp Number (If different)</FormLabel>
                            <FormControl>
                                <Input type="tel" className="bg-white shadow-none" placeholder="+91 98765 43210" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <div className="flex">
                                    <Input type="email" className="bg-white shadow-none" placeholder="john@example.com" {...field} />
                                    <Button type="button" className="ml-2" variant="outline" size="sm">
                                        Verify
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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

                <Button type="submit" disabled={isLoading} className="w-full mt-4">
                    {isLoading ? "Processing..." : "Next: Business Details"}
                </Button>
            </form>
        </Form>
    );
};

export default PersonalInfoForm;