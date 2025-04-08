import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import countries from "@/data/countries.json"; // Assuming you have a JSON file with country data
import { useEffect, useState } from "react";
import axios from "axios";
import useLoaderStore from "@/store/loaderStore";
// Schema for address and business information validation
const AddressBusinessSchema = z.object({
    street: z.string().min(3, "Street address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    country: z.string().min(2, "Country is required"),
    zipCode: z.string().min(5, "Valid zip code is required"),
    affiliateType: z.string().min(1, "Please select affiliate type"),
    businessName: z.string().optional(),
    socialMediaLinks: z.string().optional(),
    gstNumber: z.string().optional(),
    promotionMethod: z.array(z.string()).nonempty("Select at least one promotion method")
});

const AddressBusinessForm = ({ initialData, onNext, onPrevious, isLoading }) => {
    const { setLoading } = useLoaderStore();
    const [states, setStates] = useState([])
    const form = useForm({
        resolver: zodResolver(AddressBusinessSchema),
        defaultValues: initialData || {
            street: "",
            city: "",
            state: "",
            country: "India",
            zipCode: "",
            affiliateType: "",
            businessName: "",
            socialMediaLinks: "",
            gstNumber: "",
            promotionMethod: []
        }
    });

    // get countries from a api and create a json file and save it

    const affiliateType = form.watch("affiliateType");

    const handleSubmit = (data) => {
        onNext(data);
    };

    const promotionMethods = [
        { id: "qr_code", label: "QR Code" },
        { id: "online_link", label: "Online Link" }
    ];

    const onCountryChange = async (country) => {
        // Fetch states and cities based on the selected country
        try {
            setLoading(true);


            const response = await axios.post(`https://countriesnow.space/api/v0.1/countries/states`, {
                country: country
            });
            const states = response.data.data.states;
            setStates(states);
        }
        catch (error) {
            console.error("Error fetching states:", error);
        }
        finally {
            setLoading(false);
        }

    }

    // check if country is selected or changed fetch states and cities from api
    useEffect(() => {
        if (form.getValues("country")) {
            onCountryChange(form.getValues("country"));

        }
    }, []);
    // console.log(form.getValues("country"));
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
                <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                                <Input className="bg-white shadow-none" placeholder="101 MG Road" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-3">
                    {/* render a select field for country */}
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <Select onValueChange={
                                    (value) => {
                                        field.onChange(value);
                                        onCountryChange(value);
                                    }
                                } defaultValue={field.value} >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Country" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {countries?.map((country) => (
                                            <SelectItem key={country.country} value={country.country}>
                                                {country.country}
                                            </SelectItem>
                                        ))}
                                        {/* Add more countries as needed */}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>State / Province</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select State" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {states?.map((state) => (
                                            <SelectItem key={state?.state_code} value={state.name}>
                                                {state.name}
                                            </SelectItem>
                                        ))}
                                        {/* Add more countries as needed */}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">

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

                <h3 className="text-lg font-medium mt-4 mb-2">Business Details</h3>
                <FormField
                    control={form.control}
                    name="affiliateType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Affiliate Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Affiliate Type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Individual">Individual</SelectItem>
                                    <SelectItem value="Business">Business</SelectItem>
                                    <SelectItem value="Store">Store</SelectItem>
                                    <SelectItem value="Youtuber">Youtuber</SelectItem>
                                    <SelectItem value="Blogger">Blogger</SelectItem>
                                    <SelectItem value="OtherSocialMedia">Other Social Media</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-3">


                    {affiliateType && affiliateType !== "Individual" && (
                        <FormField
                            control={form.control}
                            name="businessName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Business Name</FormLabel>
                                    <FormControl>
                                        <Input className="bg-white shadow-none" placeholder="Your Business Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}


                    {(affiliateType === "Business" || affiliateType === "Store") && (
                        <FormField
                            control={form.control}
                            name="gstNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>GST Number (Optional)</FormLabel>
                                    <FormControl>
                                        <Input className="bg-white shadow-none" placeholder="GST1234567890ABC" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                </div>
                <FormField
                    control={form.control}
                    name="socialMediaLinks"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Website / Social Media Links (Optional)</FormLabel>
                            <FormControl>
                                <Input className="bg-white shadow-none" placeholder="https://instagram.com/yourusername" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="promotionMethod"
                    render={() => (
                        <FormItem>
                            <FormLabel>Preferred Promotion Method</FormLabel>
                            <div className="flex gap-2 mt-1">
                                {promotionMethods.map((method) => (
                                    <FormField
                                        key={method.id}
                                        control={form.control}
                                        name="promotionMethod"
                                        render={({ field }) => {
                                            return (
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        id={method.id}
                                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                        checked={field.value?.includes(method.id)}
                                                        onChange={(e) => {
                                                            const updatedValue = e.target.checked
                                                                ? [...field.value, method.id]
                                                                : field.value?.filter((value) => value !== method.id);
                                                            field.onChange(updatedValue);
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor={method.id}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {method.label}
                                                    </label>
                                                </div>
                                            );
                                        }}
                                    />
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />






                <div className="flex justify-between gap-3 mt-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-1/2"
                        onClick={onPrevious}
                    >
                        Previous
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-1/2"
                    >
                        {isLoading ? "Processing..." : "Next: Payment Details"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default AddressBusinessForm;